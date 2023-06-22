import { AxiosResponse } from "axios";
import { NextResponse } from "next/server";
import { Configuration, CreateChatCompletionResponse, OpenAIApi } from "openai";
import { role } from "@/app/constants/chatbot-prompt";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  try {
    const { title } = await request.json();

    //@ts-ignore
    const aiResponse: AxiosResponse<CreateChatCompletionResponse, any> =
      await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 1,
        n: 1,

        messages: [
          {
            role: "user",
            content: `Create a blog post template based on this title: ${title}. This template should have one small sentence for the introduction as well as three short sentences to start off the 3 body paragraphs and one small sentence to start off the conclusion of the blog post.`,
          },
          {
            role: "system",
            content: `${role}`,
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
