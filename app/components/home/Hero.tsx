"use client";

import { SafePost } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeroProps {
  post: SafePost | null;
}

const Hero: React.FC<HeroProps> = ({ post }) => {
  const router = useRouter();

  if (!post) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-[1750px] py-8">
      <div className="relative mx-auto aspect-[2/3] w-full max-w-[1024px] overflow-hidden shadow-xl md:aspect-[4/3] lg:aspect-[5/3]">
        <Image
          src={post.image}
          alt="post"
          fill
          className="select-none absolute object-cover lg:rounded-lg"
        />
        <div className="absolute left-0 top-0 h-fit w-fit bg-zinc-800 px-4 py-2 font-semibold text-white md:text-lg lg:rounded-tl-lg">
          <p>Featured Post</p>
        </div>
        <div className="absolute bottom-0 z-10 h-fit w-full bg-bg/20 px-4 py-3 shadow-xl backdrop-blur-md lg:rounded-b-lg lg:py-5">
          <div className="flex flex-col gap-3">
            <p
              tabIndex={0}
              onClick={() => router.push(`/post/${post.slug}`)}
              className="cursor-pointer font-josefin text-2xl hover:underline focus:underline sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {post.title}
            </p>
            <div className="flex h-fit max-w-[600px] flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-zinc-800 px-2 py-1 tracking-wider text-bg md:text-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="sm:text-lg md:text-xl lg:text-2xl">
              By {post.author.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
