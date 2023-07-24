"use client";

import { SafePost } from "@/app/types";
import { FC, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";

interface MoreOptionsMenuProps {
  post: SafePost;
  onDelete: () => void;
  onMove: () => void;
  onUpdate: () => void;
}

const MoreOptionsMenu: FC<MoreOptionsMenuProps> = ({
  post,
  onDelete,
  onMove,
  onUpdate,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);

  return (
    <>
      <div
        className={`absolute right-0 top-0 z-10 scale-105 rounded-bl-md p-1 text-3xl text-white transition duration-300 ${
          !isOpen && "bg-zinc-900"
        }
        `}
      >
        <div className="relative h-7 w-7 cursor-pointer">
          <IoCloseOutline
            onClick={() => setIsOpen(false)}
            className={`absolute right-0 top-0 origin-right transition duration-300 ${
              isOpen ? "scale-x-100 scale-y-100" : "scale-x-0 scale-y-0"
            }`}
          />
          <HiOutlineMenu
            onClick={() => setIsOpen(true)}
            className={`absolute right-0 top-0 origin-right transition duration-300 ${
              !isOpen ? "scale-x-100 scale-y-100" : "scale-x-0 scale-y-0"
            }`}
          />
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 flex origin-top-right flex-col items-center justify-center bg-zinc-900/80 px-8 py-8 transition duration-300
      ${
        isOpen
          ? "scale-x-100 scale-y-100"
          : "scale-x-[0.05] scale-y-[0.1] rounded-bl-2xl"
      }
        `}
      >
        <div
          className={`grid w-full gap-8 text-center text-bg transition duration-300 ${
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
                  className="w-full border-2 border-white py-1.5 text-sm font-semibold text-white transition duration-300 hover:bg-white hover:text-zinc-800 active:scale-90 sm:text-base md:text-lg"
                  onClick={() => setConfirmationModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="w-full border-2 border-accent py-1.5 text-sm font-semibold text-accent transition duration-300 hover:bg-accent hover:text-zinc-800 active:scale-90 sm:text-base md:text-lg"
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
                  className="w-full border-2 border-accent py-1.5 text-sm font-semibold text-accent transition duration-300 hover:bg-accent hover:text-zinc-800 active:scale-90 sm:text-base md:text-lg"
                  onClick={() => setConfirmationModal(true)}
                >
                  Delete Post
                </button>
                {post.published ? (
                  <button
                    className="w-full border-2 border-white py-1.5 text-sm font-semibold text-white transition duration-300 hover:bg-white hover:text-zinc-800 active:scale-90 sm:text-base md:text-lg"
                    onClick={onMove}
                  >
                    Mark As Draft
                  </button>
                ) : (
                  <button
                    className="w-full border-2 border-white py-1.5 text-sm font-semibold text-white transition duration-300 hover:bg-white hover:text-zinc-800 active:scale-90 sm:text-base md:text-lg"
                    onClick={onMove}
                  >
                    Mark As Published
                  </button>
                )}
                <button
                  className="w-full border-2 border-white py-1.5 text-sm font-semibold text-white transition duration-300 hover:bg-white hover:text-zinc-800 active:scale-90 sm:text-base md:text-lg"
                  onClick={onUpdate}
                >
                  Update Post
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MoreOptionsMenu;
