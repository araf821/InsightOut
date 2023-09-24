"use client";

import { useModal } from "@/hooks/useModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import Avatar from "../Avatar";
import { toast } from "react-hot-toast";
import qs from "query-string";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import FollowButton from "../FollowButton";
import { UserMinus, UserPlus } from "lucide-react";
import UnfollowButton from "../UnfollowButton";

const FollowersModal = () => {
  const { onClose, data, type, isOpen } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "followersModal";
  const { followers } = data;

  const { mutate: onFollow } = useMutation({
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

  const { mutate: onUnfollow } = useMutation({
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

  if (!followers?.length) {
    return (
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-bg px-8 text-center">
          No Followers Found
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[50%] overflow-y-auto bg-bg px-8">
        <DialogHeader className="">
          <DialogTitle className="text-center text-2xl">Followers</DialogTitle>
        </DialogHeader>
        <hr />
        {followers.map((connection) => {
          if (!connection.follower) {
            return null;
          }

          return (
            <div
              key={connection.follower?.id}
              className="flex items-center gap-2"
            >
              <Avatar src={connection.follower?.image} classNames="w-10 h-10" />
              <p>{connection.follower?.name}</p>
              {connection.isFollowed ? (
                <UnfollowButton toUnfollowId={connection.follower.id} />
              ) : (
                <FollowButton toFollowId={connection.follower.id} />
              )}
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

export default FollowersModal;
