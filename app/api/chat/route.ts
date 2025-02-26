import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { chatRateLimiter } from "@/lib/rate-limiter";
import { NextRequest, NextResponse } from "next/server";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

const handleError = (error: any) => {
  console.error("[Chat Error]", error);

  if (!process.env.OPENAI_API_KEY) {
    return new NextResponse(
      JSON.stringify({
        error: {
          message: "OpenAI API key is not configured",
          code: "MISSING_API_KEY",
        },
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  if (error.name === "ConfigError") {
    return new NextResponse(
      JSON.stringify({
        error: {
          message: "Chat service is not properly configured",
          code: "CONFIG_ERROR",
        },
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // Handle network errors
  if (error.message?.includes("fetch failed")) {
    return new NextResponse(
      JSON.stringify({
        error: {
          message: "Failed to connect to the chat service",
          code: "NETWORK_ERROR",
        },
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  return new NextResponse(
    JSON.stringify({
      error: {
        message: "An unexpected error occurred",
        code: "INTERNAL_ERROR",
      },
    }),
    { status: 500, headers: { "Content-Type": "application/json" } }
  );
};

export async function POST(req: NextRequest) {
  try {
    // Check for API key first
    if (!process.env.OPENAI_API_KEY) {
      return handleError(new Error("MISSING_API_KEY"));
    }

    let messages;
    try {
      const body = await req.json();
      messages = body.messages;
    } catch (e) {
      return new NextResponse(
        JSON.stringify({
          error: {
            message: "Invalid request body",
            code: "INVALID_REQUEST",
          },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate messages array
    if (!messages || !Array.isArray(messages)) {
      return new NextResponse(
        JSON.stringify({
          error: {
            message: "Invalid request format: messages array is required",
            code: "INVALID_REQUEST",
          },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate message format
    const isValidMessage = messages.every(
      (msg) =>
        typeof msg === "object" &&
        msg !== null &&
        typeof msg.content === "string" &&
        ["user", "assistant", "system"].includes(msg.role)
    );

    if (!isValidMessage) {
      return new NextResponse(
        JSON.stringify({
          error: {
            message: "Invalid message format",
            code: "INVALID_MESSAGE_FORMAT",
          },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1";
    const { success } = await chatRateLimiter.limit(ip);

    if (!success) {
      return new NextResponse(
        JSON.stringify({
          error: {
            message:
              "Rate limit exceeded. Please wait 7 seconds between messages.",
            code: "RATE_LIMIT_EXCEEDED",
          },
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const defaultRole =
      "You are Bebibot, a friendly and helpful AI chatbot. " +
      "You aim to be concise but informative in your responses, " +
      "and you have a warm, approachable personality. " +
      "You love helping users with their writing and creative tasks.";

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "system",
          content: process.env.CHATBOT_ROLE || defaultRole,
        },
        ...messages,
      ],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    return handleError(error);
  }
}
