import { SafePost } from "@/types";
import Heading from "@/components/Heading";
import PostCard from "@/components/post/PostCard";
import { FC } from "react";
import { Post, User } from "@prisma/client";
import CardsContainer from "@/components/CardsContainer";

interface MoreFromAuthorProps {
  posts: (Post & { author: User })[];
  authorName: string;
}

const MoreFromAuthor: FC<MoreFromAuthorProps> = ({ posts, authorName }) => {
  return (
    <section className="">
      <Heading title={authorName} small />
      <CardsContainer>
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </CardsContainer>
    </section>
  );
};

export default MoreFromAuthor;
