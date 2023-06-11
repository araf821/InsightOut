import { Ubuntu } from "next/font/google";
import Image from "next/image";
import { FC } from "react";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
      className={`w-full max-w-[800px] ${
        horizontal &&
        "md:flex md:h-full md:min-w-[350px] md:flex-grow lg:min-w-[500px]"
      }`}
    >
      <div className="relative aspect-[5/4] w-full rounded-lg shadow-lg">
        <Image
          src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          fill
          alt=""
          className="absolute rounded-lg object-cover"
        />
      </div>

      {/* Post Info */}
      <div
        className={`h-full w-full p-2 text-center capitalize ${
          horizontal &&
          "md:my-auto md:h-fit md:space-y-3 md:p-0 md:pl-2 md:text-start"
        }`}
      >
        <p
          className={`text-2xl font-bold font-ubuntu ${
            horizontal && "md:text-xl lg:text-[26px] xl:text-3xl"
          }
          ${main && "lg:text-[26px] xl:text-3xl"}`}
        >
          <span className="underline-offset-4 cursor-pointer hover:underline">
            Title of the blog post goes here
          </span>
        </p>
        <p className={`text-lg font-light ${horizontal && "xl:text-xl"}`}>
          Author Name
        </p>
      </div>
    </div>
  );
};

export default PostCard;
