"use client";

import { useModal } from "@/hooks/useModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import Avatar from "../Avatar";
import { UserPlus } from "lucide-react";
import { toast } from "react-hot-toast";

const FollowersModal = () => {
  const { onClose, data, type, isOpen } = useModal();

  const isModalOpen = isOpen && type === "followersModal";
  const { followers } = data;

  if (!followers) {
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
      <DialogContent className="bg-bg px-8 ">
        <DialogHeader className="">
          <DialogTitle className="text-center text-2xl">Followers</DialogTitle>
        </DialogHeader>
        <hr />
        {followers.map((connection) => (
          <div
            key={connection.follower?.id}
            className="flex items-center gap-2"
          >
            <Avatar src={connection.follower?.image} classNames="w-10 h-10" />
            <p>{connection.follower?.name}</p>
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

export default FollowersModal;
