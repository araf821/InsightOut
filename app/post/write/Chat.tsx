"use client";

import getPostContent from "@/app/actions/getPostContent";
import { FC, useState } from "react";
import { BsFillRocketTakeoffFill } from "react-icons/bs";

interface ChatProps {}

const Chat: FC<ChatProps> = ({}) => {
  const [role, setRole] = useState<string>("I am a helpful assistant writer.");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("Content will show up here.");

  //   const postAiContent = async () => {
  //     setContent("Generating AI Content...");

  //     const response = await fetch(`/api/openai`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         //@ts-ignore
  //         title: title,
  //         role: role,
  //       }),
  //     });

  //     const data = await response.json();
  //     setContent(data.content);
  //   };

  const handleFetch = () => {
    // setContent("Loading AI Generated Content.");
    const data = getPostContent(title, role);
    //@ts-ignore
    setContent(data.content);
  };

  return (
    <div className="w-full max-w-[400px] rounded-md bg-primary p-4">
      <p className="text-xl">Generate AI Content</p>
      <p className="my-1">What type of a writer do you want?</p>
      <div className="flex justify-between gap-5">
        <input
          type="text"
          className="w-full rounded-md border-2 bg-white px-3 py-1"
          placeholder="Role"
          onChange={(e) => setRole(e.target.value)}
          value={role}
        />

        <button onClick={handleFetch} type="button">
          <BsFillRocketTakeoffFill className="h-8 w-8 text-black hover:text-zinc-700" />
        </button>
      </div>
      <input
        type="text"
        className="w-full rounded-md border-2 bg-white px-3 py-1"
        placeholder="Title of the post"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <p className="mt-2">Generated Content:</p>
      <div className="my-1 w-full bg-bg">{content}</div>
    </div>
  );
};

export default Chat;
