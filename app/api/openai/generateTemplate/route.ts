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
            content: `Create a blog post template based on this title: ${title}.

            Generate in this format:
            "
            Introduction: *introduction para*

            Body Paragraphs:

            *para 1*

            *para 2*
            
            *para 3*

            Conclusion: *conclusion para*
            "
            Each paragraph should just have one starting sentence to start off the user, that's it. Please keep it very short.
            `,
          },
          {
            role: "system",
            content: `I am a helpful assistant.`,
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
