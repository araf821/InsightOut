"use client";

import Image from "next/image";
import { FC, useState } from "react";

interface ChatComponentProps {}

const ChatComponent: FC<ChatComponentProps> = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const body = isOpen ? null : (
    <div className="relative aspect-square overflow-hidden rounded-full outline outline-offset-4 outline-accent">
      <Image
        src="/images/bebibot.png"
        alt="chatbot profile picture"
        fill
        className="object-cover"
      />
    </div>
  );

  return (
    <div
      className={`fixed opacity-80 bottom-4 right-4 z-[9999] h-14 w-14 cursor-pointer rounded-full bg-pink-400 shadow-[0_0_20px] transition hover:shadow-[0_0_20px_2px] hover:opacity-100 shadow-accent hover:shadow-accent duration-500 hover:scale-110 lg:bottom-8 lg:right-12 xl:right-20 xl:bottom-12 ${
        isOpen ? "" : "h-12 w-12 md:h-16 md:w-16"
      }`}
    >
      {body}
    </div>
  );
};

export default ChatComponent;
