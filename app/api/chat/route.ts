import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { chatRateLimiter } from "@/lib/rate-limiter";
import { NextRequest, NextResponse } from "next/server";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const ip = req.ip ?? "127.0.0.1";
  const { success } = await chatRateLimiter.limit(ip);

  if (!success) {
    return new NextResponse(
      "You're sending messages too fast. Bebibot is a fragile little catobot and can only comprehend 1 user input every 7 seconds."
    );
  }

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: process.env.CHATBOT_ROLE,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
