import Image from "next/image";
import { FC } from "react";

interface PostCardProps {
  title: string;
  author: string;
}

const PostCard: FC<PostCardProps> = ({ title, author }) => {
  return (
    <div className="aspect-square w-full">
      <div className="relative aspect-[5/4] w-full shadow-md">
        <Image
          src="https://res.cloudinary.com/dw7izgruq/image/upload/v1684769626/gys4evgyekggbzorixvk.jpg"
          fill
          alt=""
          className="absolute rounded-lg object-cover"
        />
      </div>

      {/* Post Info */}
      <div className="p-2 text-center">
        <p className="text-2xl font-bold">Title of the blog post goes here</p>
        <p className="text-lg font-light">Author Name</p>
      </div>
    </div>
  );
};

export default PostCard;
