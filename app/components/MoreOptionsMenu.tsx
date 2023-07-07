"use client";

import { FC, useState } from "react";
import {
  HiOutlineDotsHorizontal,
  HiOutlineMenu,
  HiOutlineMenuAlt3,
} from "react-icons/hi";
import Button from "./Button";
import { SafePost } from "../types";

interface MoreOptionsMenuProps {
  className?: string;
  post: SafePost;
  onDelete: () => void;
}

const MoreOptionsMenu: FC<MoreOptionsMenuProps> = ({
  className,
  post,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);

  return (
    <>
      <HiOutlineMenu
        onClick={() => setIsOpen((prev) => !prev)}
        className={`absolute right-0 top-0 z-10 scale-105 cursor-pointer rounded-bl-md px-1 text-4xl text-white transition duration-500 ${
          isOpen ? "" : "bg-zinc-900"
        }
        `}
      />
      <div
        onClick={() => {}}
        className={`absolute bottom-0 left-0 right-0 top-0 origin-top-right bg-zinc-900/90 transition duration-500
      ${
        isOpen
          ? " flex scale-x-100 scale-y-100 flex-col items-center justify-center px-8 py-8"
          : "scale-x-[0.05] scale-y-[0.1] rounded-bl-2xl"
      }
        `}
      >
        {isOpen ? (
          <div className="grid w-full gap-8 text-center text-bg">
            {confirmationModal ? (
              <>
                <p className="font-merri text-xl font-light">
                  Are you sure you want to delete this post?
                </p>
                <div className="space-y-2">
                  <Button
                    small
                    label="Cancel"
                    onClick={() => setConfirmationModal(false)}
                  />
                  <Button special small label="Confirm" onClick={onDelete} />
                </div>
              </>
            ) : (
              <>
                <p className="font-merri text-xl font-light">Post Options</p>
                <div className="space-y-2">
                  <Button
                    special
                    small
                    label="Delete Post"
                    onClick={() => setConfirmationModal(true)}
                  />
                  {post.published ? (
                    <Button label="Mark as Draft" small onClick={() => {}} />
                  ) : (
                    <Button
                      label="Mark as Published"
                      small
                      onClick={() => {}}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className=""></div>
        )}
      </div>
    </>
  );
};

export default MoreOptionsMenu;
