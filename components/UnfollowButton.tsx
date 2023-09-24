"use client";

import { useMutation } from "@tanstack/react-query";
import { Check, Loader2, UserMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import qs from "query-string";
import axios from "axios";
import { toast } from "react-hot-toast";

interface UnfollowButtonProps {
  toUnfollowId: string;
  icon?: React.ReactNode;
}

const UnfollowButton: FC<UnfollowButtonProps> = ({ toUnfollowId, icon }) => {
  const router = useRouter();

  const {
    mutate: onUnfollow,
    isLoading,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (toUnfollowId: string) => {
      const url = qs.stringifyUrl({
        url: "/api/following",
        query: {
          toUnfollowId,
        },
      });

      await axios.delete(url);
    },
    onError: (error: any) => {
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      toast.success("Unfollowed Successfully");
      router.refresh();
    },
  });

  return (
    <>
      {isLoading ? (
        <Loader2 className="ml-auto animate-spin" />
      ) : (
        <>
          {isError ? null : isSuccess ? (
            <p className="ml-auto text-sm">Unfollowed</p>
          ) : (
            <button
              title="unfollow"
              onClick={() => onUnfollow(toUnfollowId)}
              className="ml-auto text-zinc-500 transition hover:text-zinc-600"
            >
              <UserMinus />
            </button>
          )}
        </>
      )}
    </>
  );
};

export default UnfollowButton;
