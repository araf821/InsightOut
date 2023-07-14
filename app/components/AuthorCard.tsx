import { FC } from "react";
import { UserWithPosts } from "../types";
import Image from "next/image";

interface AuthorCardProps {
  author: UserWithPosts;
}

const AuthorCard: FC<AuthorCardProps> = ({ author }) => {
  const postsPublished = author.posts.filter((post) => {
    if (post.published) return post;
  });

  return (
    <div className="aspect-[5/6] w-full">
      <div className="relative mx-auto aspect-square w-[70%] overflow-hidden rounded-full">
        <Image
          src={author.image || "/images/placeholder.jpg"}
          alt="author's profile photo"
          fill
          className="absolute w-full object-cover"
        />
      </div>
      <p>{author.name}</p>
      <p>{postsPublished.length}</p>
    </div>
  );
};

export default AuthorCard;
