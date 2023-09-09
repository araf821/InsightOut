"use client";

import { useModal } from "@/hooks/useModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import Avatar from "../Avatar";
import { UserPlus } from "lucide-react";
import { toast } from "react-hot-toast";

const FollowingModal = () => {
  const { onClose, data, type, isOpen } = useModal();

  const isModalOpen = isOpen && type === "followingModal";
  const { following } = data;

  if (!following) {
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
      <DialogContent className="bg-bg px-8 ">
        <DialogHeader className="">
          <DialogTitle className="text-center text-zinc-700 text-2xl">Following</DialogTitle>
        </DialogHeader>
        <hr />
        {following.map((connection) => (
          <div
            key={connection.following?.id}
            className="flex items-center gap-2"
          >
            <Avatar src={connection.following?.image} classNames="w-10 h-10" />
            <p>{connection.following?.name}</p>
            <button
              onClick={() => {
                toast.error("Under Construction");
              }}
              className="ml-auto text-zinc-500 transition hover:text-zinc-600"
            >
              <UserPlus />
            </button>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default FollowingModal;
