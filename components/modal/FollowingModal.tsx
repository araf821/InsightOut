"use client";

import { useModal } from "@/hooks/useModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import Avatar from "../Avatar";
import { UserMinus } from "lucide-react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import qs from "query-string";
import { useRouter } from "next/navigation";
import axios from "axios";
import FollowButton from "../FollowButton";

const FollowingModal = () => {
  const { onClose, onOpen, data, type, isOpen } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "followingModal";
  const { following } = data;

  const { mutate: onUnfollow } = useMutation({
    mutationFn: async (toUnfollowId: string) => {
      const url = qs.stringifyUrl({
        url: "/api/following",
        query: {
          toUnfollowId,
        },
      });

      const response = await axios.delete(url);

      onOpen("followingModal", { following: response.data });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      toast.success("Unfollowed Successfully");
      router.refresh();
    },
  });

  if (!following?.length) {
    return (
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-bg px-8 text-center">
          No Following Found
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[50%] overflow-y-auto bg-bg px-8">
        <DialogHeader className="">
          <DialogTitle className="text-center text-2xl text-zinc-700">
            Following
          </DialogTitle>
        </DialogHeader>
        <hr />
        {following.map((connection) => {
          if (!connection.following) {
            return null;
          }

          return (
            <div
              key={connection.following?.id}
              className="flex items-center gap-2"
            >
              <Avatar
                src={connection.following?.image}
                classNames="w-10 h-10"
              />
              <p>{connection.following?.name}</p>
              <FollowButton
                followerId={connection.following?.id}
                onClick={onUnfollow}
                icon={<UserMinus />}
              />
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

export default FollowingModal;
