"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { toast } from "react-hot-toast";

interface PostViewsProps {
  postId: string;
  views: number;
}

const PostViews: FC<PostViewsProps> = ({ postId, views: initialViews }) => {
  const router = useRouter();
  const [views, setViews] = useState(initialViews);
  const [isUpdating, setIsUpdating] = useState(true);

  useEffect(() => {
    const updateViewCount = async () => {
      try {
        const response = await axios.put(`/api/post/${postId}/viewCount`);
        if (response.status === 200) {
          setViews((current) => current + 1);
          router.refresh();
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 429) {
            // Rate limit error, silently fail
            return;
          }
          toast.error("Failed to update view count");
        }
        console.error("Error updating view count:", error);
      } finally {
        setIsUpdating(false);
      }
    };

    updateViewCount();
  }, [postId, router]);

  return (
    <div
      title="post view count"
      className={`flex items-center gap-2 text-lg text-neutral-700 sm:text-xl md:text-2xl
        ${isUpdating ? "opacity-70" : ""}`}
    >
      <AiFillEye className={isUpdating ? "animate-pulse" : ""} />
      <span>{views}</span>
    </div>
  );
};

export default PostViews;
