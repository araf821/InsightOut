"use client";

import { Loader2, UserPlus } from "lucide-react";
import { FC } from "react";
import qs from "query-string";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FollowButtonProps {
  toFollowId: string;
  icon?: React.ReactNode;
}

const FollowButton: FC<FollowButtonProps> = ({ toFollowId, icon }) => {
  const router = useRouter();

  const {
    mutate: onFollow,
    isSuccess,
    isError,
    isLoading,
  } = useMutation({
    mutationFn: async (toFollowId: string) => {
      const url = qs.stringifyUrl({
        url: "/api/following",
        query: {
          toFollowId,
        },
      });

      await axios.post(url);
    },
    onError: (error: any) => {
      if (error?.response?.status === 403) {
        return toast.error("Can't follow yourself");
      }

      if (error?.response?.status === 409) {
        return toast.error("Already following");
      }

      toast.error("Something went wrong");
    },
    onSuccess: () => {
      toast.success("Followed Successfully");
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
            <p className="ml-auto text-sm">Following</p>
          ) : (
            <button
              title={icon ? "unfollow" : "follow"}
              onClick={() => onFollow(toFollowId)}
              className="ml-auto text-zinc-500 transition hover:text-zinc-600"
            >
              <UserPlus />
            </button>
          )}
        </>
      )}
    </>
  );
};

export default FollowButton;
