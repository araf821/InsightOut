"use client";

import { motion } from "framer-motion";
import { FC, useState } from "react";
import MoreOptionsButton from "./MoreOptionsButton";
import { HashLoader } from "react-spinners";
import { Post } from "@prisma/client";
import { Edit, X } from "lucide-react";

interface MoreOptionsMenuProps {
  post: Post;
  onDelete: () => void;
  onMove: () => void;
  onUpdate: () => void;
  isLoading: boolean;
}

const Loader = () => {
  return (
    <div className="mx-auto w-fit p-12">
      <HashLoader size={75} className="" color="#E52B50" />
    </div>
  );
};

const MoreOptionsMenu: FC<MoreOptionsMenuProps> = ({
  post,
  onDelete,
  onMove,
  onUpdate,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);

  return (
    <>
      <div
        className={`absolute right-[2px] top-[2px] z-10 scale-105 rounded-bl-lg p-1 text-3xl text-white transition duration-300 ${
          !isOpen && "bg-zinc-900/60"
        }
        `}
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="relative h-6 w-6 cursor-pointer"
        >
          <X
            onClick={() => setIsOpen(false)}
            className={`absolute right-0 top-0 h-5 w-5 origin-right transition duration-300 ${
              isOpen ? "scale-x-100 scale-y-100" : "scale-x-0 scale-y-0"
            }`}
          />
          <Edit
            onClick={() => setIsOpen(true)}
            className={`absolute right-0 top-0 h-5 w-5 origin-right transition duration-300 ${
              !isOpen ? "scale-x-100 scale-y-100" : "scale-x-0 scale-y-0"
            }`}
          />
        </motion.div>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-[1px] top-[1px] flex origin-top-right flex-col items-center justify-center bg-zinc-900/60 px-8 py-8 transition duration-300
      ${
        isOpen
          ? "scale-x-100 scale-y-100"
          : "scale-0 rounded-bl-2xl"
      }
        `}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <div
            className={`grid w-full gap-8 text-center text-bg transition duration-300 ${
              isOpen ? "scale-x-100 scale-y-100" : "scale-x-0 scale-y-0"
            }`}
          >
            {confirmationModal ? (
              <>
                <p className="md:text-xl font-josefin font-semibold">
                  Are you sure you want to delete this post?
                </p>
                <div className="space-y-2">
                  <MoreOptionsButton
                    label="Cancel"
                    onClick={() => setConfirmationModal(false)}
                  />
                  <MoreOptionsButton
                    label="Delete Post"
                    onClick={onDelete}
                    destructive
                  />
                </div>
              </>
            ) : (
              <>
                <p className="font-josefin font-semibold md:text-xl">Post Options</p>
                <div className="space-y-2">
                  <MoreOptionsButton
                    destructive
                    label="Delete Post"
                    onClick={() => setConfirmationModal(true)}
                  />
                  {post.published ? (
                    <MoreOptionsButton
                      label="Move to Drafts"
                      onClick={onMove}
                    />
                  ) : (
                    <MoreOptionsButton label="Publish Post" onClick={onMove} />
                  )}
                  <MoreOptionsButton label="Update Post" onClick={onUpdate} />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MoreOptionsMenu;
