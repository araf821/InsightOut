"use client";

import { Check, UserPlus } from "lucide-react";
import { FC, useState } from "react";

interface FollowButtonProps {
  followerId: string;
  onClick: (id: string) => void;
}

const FollowButton: FC<FollowButtonProps> = ({ followerId, onClick }) => {
  const [showCheck, setShowCheck] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setShowCheck(true);
    setClicked(true);

    setTimeout(() => {
      setShowCheck(false);
    }, 2500);
  };

  return (
    <>
      {showCheck ? (
        <Check className="ml-auto" />
      ) : (
        !clicked && (
          <button
            title="follow"
            //@ts-ignore
            onClick={() => {
              onClick(followerId);
              handleClick();
            }}
            className="ml-auto text-zinc-500 transition hover:text-zinc-600"
          >
            <UserPlus />
          </button>
        )
      )}
    </>
  );
};

export default FollowButton;
