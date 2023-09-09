'use client'

import { useModal } from "@/hooks/useModal";
import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";

interface FollowersModalProps {}

const FollowersModal: FC<FollowersModalProps> = ({}) => {
  const { onClose, data, type, isOpen } = useModal();

  const isModalOpen = isOpen && type === "followersModal";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-bg p-0">
        <DialogHeader className="pt-6">
          <DialogTitle className="text-center">Bebi</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FollowersModal;
