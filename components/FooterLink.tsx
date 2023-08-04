import { motion } from "framer-motion";
import { FC } from "react";

interface FooterLinkProps {
  label: string;
  link: () => void;
}

const FooterLink: FC<FooterLinkProps> = ({ label, link }) => {
  
  return (
    <motion.p 
    whileHover={{scale: 1.2, color: 'white'}}
      className="cursor-pointer text-neutral-300 md:text-lg xl:text-xl"
      onClick={link}
    >
      {label}
    </motion.p>
  );
};

export default FooterLink;
