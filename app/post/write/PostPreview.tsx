import EmptyState from "@/components/EmptyState";
import { FC } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface PostPreviewProps {
  content: string;
}

const PostPreview: FC<PostPreviewProps> = ({ content }) => {
  if (content === "") {
    return (
      <EmptyState
        title="Nothing to preview."
        subtitle="Please write something first."
      />
    );
  }

  return (
    <ReactMarkdown className="prose prose-base prose-img:rounded-lg max-w-full break-words rounded-md border-2 border-neutral-300 p-2 text-justify shadow-inner md:prose-lg prose-headings:font-josefin prose-headings:font-semibold prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap">
      {content}
    </ReactMarkdown>
  );
};

export default PostPreview;
