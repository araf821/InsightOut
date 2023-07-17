import { z } from "zod";

import { FC } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import EmptyState from "@/app/components/EmptyState";

interface PostContentProps {
  content: string;
}

const PostContent: FC<PostContentProps> = ({ content }) => {
  const contentSchema = z.string().min(250).max(5000);

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
    return <EmptyState title="Hmmmm... Something seems to be off." subtitle="Please take a look at other posts in the meantime!" />;
  }

  return (
    <ReactMarkdown className="prose-base md:prose-lg prose-headings:font-josefin prose-headings:font-semibold prose-a:text-blue-600">
      {content}
    </ReactMarkdown>
  );
};

export default PostContent;
