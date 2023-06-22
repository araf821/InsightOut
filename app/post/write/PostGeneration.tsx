"use client";

import Button from "@/app/components/Button";
import { FC } from "react";

interface PostGenerationProps {
  handleGenerate: () => void;
}

const PostGeneration: FC<PostGenerationProps> = ({ handleGenerate }) => {
  return (
    <div className="flex flex-col gap-1 rounded-md bg-accent">
      <p className="rounded-t-md bg-zinc-800 px-3 py-1.5 text-center font-semibold text-bg md:text-lg">
        Need a starting template for your post?
      </p>
      <div className="mb-2 mt-1 space-y-2 px-3 py-1.5">
        <p className="font-mono text-sm font-semibold tracking-tight md:text-base">
          Based on the title you&rsquo;ve given above, a short template for your
          blog post will be created!
        </p>
        <Button
          className=""
          small
          outline
          label="Generate Post"
          onClick={handleGenerate}
        />
      </div>
    </div>
  );
};

export default PostGeneration;
