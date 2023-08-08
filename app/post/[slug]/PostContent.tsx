import { z } from "zod";

import { FC, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import EmptyState from "@/components/EmptyState";

interface PostContentProps {
  content: string;
}

const PostContent: FC<PostContentProps> = ({ content }) => {
  const [showMarkdown, setShowMarkdown] = useState<boolean>(true);
  const contentSchema = z.string().min(500).max(5000);

  const validateContent = (content: string) => {
    try {
      contentSchema.parse(content);
      return true;
    } catch (error: any) {
      console.error("Content validation error: ", error);
      return false;
    }
  };

  if (!validateContent(content)) {
    return (
      <EmptyState
        title="Hmmmm... Something seems to be off."
        subtitle="Please take a look at other posts in the meantime!"
      />
    );
  }

  return (
    <>
      <div className="flex gap-2">
        <button
          aria-label="show markdown button"
          onClick={() => setShowMarkdown(true)}
          className={`w-36 border-2 border-zinc-800 p-1 shadow-md transition duration-200 hover:bg-zinc-800 hover:text-white ${
            !showMarkdown
              ? "hover:-translate-y-1 hover:bg-zinc-800 hover:text-white"
              : "bg-zinc-800 text-white hover:opacity-80"
          }
          `}
        >
          Markdown
        </button>
        <button
          aria-label="show plain text button"
          onClick={() => setShowMarkdown(false)}
          className={`w-36 border-2 border-zinc-800 p-1 shadow-md transition duration-200 ${
            showMarkdown
              ? "hover:-translate-y-1 hover:bg-zinc-800 hover:text-white"
              : "bg-zinc-800 text-white hover:opacity-80"
          }`}
        >
          Plain Text
        </button>
      </div>
      <hr />
      {showMarkdown ? (
        <ReactMarkdown className="prose max-w-none break-words prose-xl prose-headings:text-left font-josefin lg:prose-2xl prose-headings:font-semibold prose-a:text-blue-600 prose-a:hover:text-primary prose-code:whitespace-pre-wrap">
          {content}
        </ReactMarkdown>
      ) : (
        <div className="whitespace-pre-line md:text-lg">{content}</div>
      )}
    </>
  );
};

export default PostContent;
