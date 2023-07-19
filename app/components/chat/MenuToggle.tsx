import * as React from "react";
import { motion } from "framer-motion";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="1"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

interface MenuToggleProps {
  toggle: () => void;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({ toggle }) => (
  <button onClick={toggle}>
    Hello
  </button>
);
