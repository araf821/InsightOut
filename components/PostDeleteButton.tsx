import React, { useState } from "react";

import { FC } from "react";
import Button from "./Button";

interface PostDeleteButtonProps {
  onDelete: () => void;
}

const PostDeleteButton: FC<PostDeleteButtonProps> = ({ onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    onDelete(); // Perform the deletion logic
    setShowModal(false); // Close the modal
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="relative w-full">
      {/* <button onClick={handleClick}>Delete Post</button> */}
      <Button onClick={handleClick} label="Delete Post" outline small />

      <div
        className={`${
          showModal ? "scale-y-100 scale-x-100" : "scale-y-0 scale-x-0"
        } absolute top-0 z-10 w-full origin-top-left rounded-sm border-2 border-zinc-700 bg-bg p-2 transition  duration-300 shadow-xl`}
      >
        <div className="space-y-3">
          <p className="text-center text-xs md:text-base">
            Are you sure you want to delete this post?
          </p>
          <div className="flex gap-2">
            <Button label="Confirm" special small onClick={handleConfirm} />
            <Button label="Cancel" outline small onClick={handleCancel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDeleteButton;
