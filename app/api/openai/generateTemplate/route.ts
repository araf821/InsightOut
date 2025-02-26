import { templateRateLimiter } from "@/lib/rate-limiter";
import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { Configuration, CreateChatCompletionResponse, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1";
    const { success } = await templateRateLimiter.limit(ip);

    if (!success) {
      // return NextResponse.json(
      //   {
      //     message: "You can only generate a template once every 60 seconds.",
      //   },
      //   { status: 429 }
      // );
      return new NextResponse(
        "You can only generate a template once every 60 seconds.",
        { status: 429 }
      );
    }

    //@ts-ignore
    const aiResponse: AxiosResponse<CreateChatCompletionResponse, any> =
      await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 1,
        n: 1,
        messages: [
          {
            role: "user",
            content: `Create a blog post starter template based on this title: "${title}". Each paragraph should only consist of one short sentence and the post template should only be of 5 paragraphs at most, that's it. Please keep it short. Make it so that the blog post is incomplete, but a good starting point for anyone who isn't sure where to start with their idea. Markdown is supported!
            `,
          },
          {
            role: "system",
            content: `I am an author's assistant.`,
          },
        ],
      });

    return NextResponse.json(
      {
        content: aiResponse.data.choices[0].message?.content,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error when generating content: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
