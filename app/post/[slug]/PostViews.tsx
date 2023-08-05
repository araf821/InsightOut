"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";

interface PostViewsProps {
  postId: string;
  views: number;
}

const PostViews: FC<PostViewsProps> = ({ postId, views }) => {
  const router = useRouter();

  useEffect(() => {
    const updateViewCount = async () => {
      try {
        await axios.put(`/api/post/${postId}/viewCount`).then(() => {
          router.refresh();
        });
      } catch (error) {
        console.error("Error updating view count: ", error);
      }
    };

    updateViewCount();
  }, [postId, router]);

  return (
    <div
      title="post view count"
      className="flex items-center gap-2 text-lg text-neutral-700 sm:text-xl md:text-2xl"
    >
      <AiFillEye />
      <span>{views}</span>
    </div>
  );
};

export default PostViews;
