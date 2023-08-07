import { FC } from "react";

interface PostTitleProps {
  title: string;
}

const PostTitle: FC<PostTitleProps> = ({ title }) => {
  return (
    <div>
      <p className={`balance overflow font-josefin `}>
        <span>{title}</span>
      </p>
      <hr className={`w-12 border-4 border-accent md:w-20`} />
    </div>
  );
};

export default PostTitle;
