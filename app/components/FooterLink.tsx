import { FC } from "react";

interface FooterLinkProps {
  label: string;
  link: () => void;
}

const FooterLink: FC<FooterLinkProps> = ({ label, link }) => {
  return (
    <p
      className="cursor-pointer transition duration-200 hover:text-white md:text-lg xl:text-xl"
      onClick={link}
    >
      {label}
    </p>
  );
};

export default FooterLink;
