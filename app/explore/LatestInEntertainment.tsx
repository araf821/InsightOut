import { FC } from "react";
import Heading from "@/components/Heading";
import CardsContainer from "@/components/CardsContainer";
import PostCard from "@/components/post/PostCard";
import { Post, User } from "@prisma/client";

interface LatestInEntertainmentProps {
  posts: (Post & { author: User })[] | null;
}

const LatestInEntertainment: FC<LatestInEntertainmentProps> = ({ posts }) => {
  if (!posts?.length) return null;

  return (
    <section>
      <Heading small title="Entertainment" />
      <CardsContainer>
        {posts.map((post, index) => (
          <PostCard post={post} key={`${post.id}entertainment`} index={index} />
        ))}
      </CardsContainer>
    </section>
  );
};

export default LatestInEntertainment;
