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
import UnfollowButton from "../UnfollowButton";

const FollowingModal = () => {
  const { onClose, data, type, isOpen } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "followingModal";
  const { following } = data;

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
          <DialogTitle className="text-center text-2xl">Following</DialogTitle>
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
              {connection.isFollowed ? (
                <UnfollowButton toUnfollowId={connection.following.id} />
              ) : (
                <FollowButton toFollowId={connection.following.id} />
              )}
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

export default FollowingModal;
