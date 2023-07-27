"use client";

import { motion } from "framer-motion";
import { FC } from "react";

interface SidebarFooterLinkProps {
  label: string;
  onClick?: () => void;
  classNames?: string;
}

const SidebarFooterLink: FC<SidebarFooterLinkProps> = ({
  onClick,
  classNames,
  label,
}) => {
  return (
    <motion.p
      whileHover={{ scale: 1.1 }}
      whileTap={{
        scale: 1,
      }}
      onClick={onClick}
      className={`cursor-pointer text-neutral-300 hover:text-white ${classNames}`}
    >
      {label}
    </motion.p>
  );
};

export default SidebarFooterLink;
