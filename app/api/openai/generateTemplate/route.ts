import { templateRateLimiter } from "@/app/lib/rate-limiter";
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
    const ip = request.ip ?? "127.0.0.1";
    const { success } = await templateRateLimiter.limit(ip);

    if (!success) {
      return NextResponse.json(
        {
          message: "You can only generate a template once every 60 seconds.",
        },
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
            content: `Create a blog post template based on this title in markdown format: ${title}.

            Generate in this format:
            
            "*introduction para*

            *para 1*

            *para 2*
            
            *para 3*

            *conclusion para*"
            
            Each paragraph should just have one starting sentence, that's it. Please keep it short. Make it so that the blog post is incomplete, but a good starting point for anyone who isn't sure where to start with their idea. Markdown is supported!
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
    NextResponse.json(
      { error: "Error while generating content." },
      { status: 500 }
    );
  }
}
