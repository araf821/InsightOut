"use client";

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
  classNames?: string;
}

const Avatar: React.FC<AvatarProps> = ({ classNames, src }) => {
  return (
    <Image
      className={`self-start rounded-full ${classNames}`}
      height="75"
      width="75"
      alt="avatar"
      src={src || "/images/placeholder.jpg"}
    />
  );
};
export default Avatar;
