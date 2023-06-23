"use client";

import Button from "@/app/components/Button";
import { FC } from "react";
import { AiTwotoneCopy } from "react-icons/ai";
import TemplateLoader from "./TemplateLoader";

interface PostGenerationProps {
  isLoading: boolean;
  handleGenerate: () => void;
  generatedContent: string;
}

const PostGeneration: FC<PostGenerationProps> = ({
  isLoading,
  handleGenerate,
  generatedContent,
}) => {
  const handleCopy = () => {};

  return (
    <div className="flex flex-col gap-2 rounded-md bg-white shadow-md">
      <p className="rounded-t-md bg-zinc-800 font-merri px-3 py-1.5 text-center font-semibold text-bg md:text-lg">
        Need a starting template for your post?
      </p>
      <div className="mb-2 mt-1 space-y-4 px-3 py-1.5">
        <p className="balance text-center text-sm text-zinc-700 font-semibold tracking-tight md:text-base">
          Based on the title you&rsquo;ve given above, you can generate a short
          template for your post if you&rsquo;d like.
        </p>
        <Button
          className=""
          small
          disabled={isLoading}
          label="Generate Post"
          onClick={handleGenerate}
        />

        {/* Loader for the content generation */}
        {isLoading && <TemplateLoader />}

        {/* Generated Content */}
        {generatedContent && (
          <>
            <textarea
              name="generatedContent"
              id="generatedContent"
              cols={10}
              rows={10}
              disabled
              value={generatedContent}
              className="w-full resize-none overflow-x-hidden rounded-md border-2 border-zinc-800 px-3 py-1.5 text-sm text-primary disabled:bg-zinc-800 md:text-base"
            />
            <Button
              icon={AiTwotoneCopy}
              label="Copy Content"
              onClick={handleCopy}
              small
              special
              className="hover:-translate-y-1"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PostGeneration;
