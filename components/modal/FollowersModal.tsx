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

const FollowersModal = () => {
  const { onClose, data, type, isOpen, onOpen } = useModal();
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
    onError: () => {
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      toast.success("Followed Successfully");
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
              {connection.isFollowed ? null : (
                <FollowButton
                  followerId={connection.follower.id}
                  onClick={onFollow}
                />
              )}
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

export default FollowersModal;
