import { FC } from "react";
import { SafeUser, UserWithPosts } from "../types";
import Heading from "../components/Heading";
import AuthorCard from "../components/AuthorCard";

interface TopUserProps {
  authors: UserWithPosts[] | null;
}

const TopAuthors: FC<TopUserProps> = ({ authors }) => {
  if (!authors || !authors?.length) {
    return null;
  }

  return (
    <section className="w-full py-4">
      <Heading title="Top Authors" />
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:gap-8">
        {authors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
    </section>
  );
};

export default TopAuthors;
