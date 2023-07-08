"use client";

import { FC, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import Button from "./Button";
import { SafePost } from "../types";
import { IoCloseOutline } from "react-icons/io5";

interface MoreOptionsMenuProps {
  post: SafePost;
  onDelete: () => void;
  onMove: () => void;
}

const MoreOptionsMenu: FC<MoreOptionsMenuProps> = ({
  post,
  onDelete,
  onMove,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);

  return (
    <>
      <div
        className={`absolute right-0 top-0 z-10 scale-105 cursor-pointer rounded-bl-md p-1 text-3xl text-white transition duration-500 ${
          !isOpen && "bg-zinc-900"
        }
        `}
      >
        <div className="relative h-7 w-7">
          <IoCloseOutline
            onClick={() => setIsOpen(false)}
            className={`absolute right-0 top-0 origin-right transition duration-500 ${
              isOpen ? "scale-x-100 scale-y-100" : "scale-x-0 scale-y-0"
            }`}
          />
          <HiOutlineMenu
            onClick={() => setIsOpen(true)}
            className={`absolute right-0 top-0 origin-right transition duration-500 ${
              !isOpen ? "scale-x-100 scale-y-100" : "scale-x-0 scale-y-0"
            }`}
          />
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 flex origin-top-right flex-col items-center justify-center bg-zinc-900/90 px-8 py-8 transition duration-500
      ${
        isOpen
          ? "scale-x-100 scale-y-100"
          : "scale-x-[0.05] scale-y-[0.1] rounded-bl-2xl"
      }
        `}
      >
        <div
          className={`grid w-full gap-8 text-center text-bg transition duration-500 ${
            isOpen ? "scale-x-100 scale-y-100" : "scale-x-0 scale-y-0"
          }`}
        >
          {confirmationModal ? (
            <>
              <p className="font-merri md:text-xl">
                Are you sure you want to delete this post?
              </p>
              <div className="space-y-2">
                <button
                  className="hover:scale0 w-full border-none bg-primary py-1 text-sm outline -outline-offset-4 outline-primary transition-all hover:outline-offset-2 focus:outline-offset-2 md:text-base lg:text-lg"
                  onClick={() => setConfirmationModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="hover:scale0 w-full border-none bg-accent py-1 text-sm outline -outline-offset-4 outline-accent transition-all hover:outline-offset-2 focus:outline-offset-2 md:text-base lg:text-lg"
                  onClick={onDelete}
                >
                  Confirm
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="font-merri md:text-xl">Post Options</p>
              <div className="space-y-2">
                <button
                  className="hover:scale0 w-full border-none bg-accent py-1 text-sm outline -outline-offset-4 outline-accent transition-all hover:outline-offset-2 focus:outline-offset-2 md:text-base lg:text-lg"
                  onClick={() => setConfirmationModal(true)}
                >
                  Delete Post
                </button>
                {post.published ? (
                  <button
                    className="hover:scale0 w-full border-none bg-primary py-1 text-sm outline -outline-offset-4 outline-primary transition-all hover:outline-offset-2 focus:outline-offset-2 md:text-base lg:text-lg"
                    onClick={onMove}
                  >
                    Mark As Draft
                  </button>
                ) : (
                  <button
                    className="hover:scale0 w-full border-none bg-primary py-1 text-sm outline -outline-offset-4 outline-primary transition-all hover:outline-offset-2 focus:outline-offset-2 md:text-base lg:text-lg"
                    onClick={onMove}
                  >
                    Mark As Published
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MoreOptionsMenu;
