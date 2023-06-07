import Image from "next/image";
import { FC } from "react";

interface PostCardProps {
  image: string;
  title: string;
  author: string;
  main?: boolean;
  horizontal?: boolean;
}

const PostCard: FC<PostCardProps> = ({
  image,
  title,
  author,
  horizontal,
  main,
}) => {
  return (
    <div
      className={`w-full max-w-[800px] cursor-pointer ${
        horizontal &&
        "md:flex md:h-full md:min-w-[350px] md:flex-grow lg:min-w-[500px]"
      }`}
    >
      <div className="relative aspect-[5/4] w-full rounded-lg border-2 border-neutral-200 shadow-md">
        <Image
          src="https://res.cloudinary.com/dw7izgruq/image/upload/v1684769626/gys4evgyekggbzorixvk.jpg"
          fill
          alt=""
          className="absolute scale-[0.98] rounded-lg object-cover"
        />
      </div>

      {/* Post Info */}
      <div
        className={`h-full w-full p-2 text-center ${
          horizontal &&
          "md:my-auto md:h-fit md:space-y-3 md:p-0 md:pl-2 md:text-start"
        }`}
      >
        <p
          className={`text-2xl font-bold ${
            horizontal && "md:text-xl lg:text-[26px] xl:text-3xl"
          }
          ${main && "lg:text-[26px] xl:text-3xl"}`}
        >
          Title of the blog post goes here
        </p>
        <p className={`text-lg font-light ${horizontal && "xl:text-xl"}`}>
          Author Name
        </p>
      </div>
    </div>
  );
};

export default PostCard;
