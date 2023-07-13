"use client";

import { SafePost } from "@/app/types";
import { motion } from "framer-motion";
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
    <motion.section
      whileInView="show"
      initial="hidden"
      viewport={{ once: true }}
      variants={{
        hidden: {
          opacity: 0,
        },
        show: {
          opacity: 1,
          transition: {
            duration: 0.75,
          },
        },
      }}
      className="z-50 mx-auto w-full max-w-[1750px] py-8"
    >
      <div className="relative z-50 mx-auto aspect-[2/3] w-full max-w-[1024px] overflow-hidden shadow-2xl shadow-zinc-700 md:aspect-[4/3] lg:aspect-[5/3]">
        <Image
          src={post.image}
          alt="post"
          fill
          className="absolute select-none object-cover lg:rounded-lg"
        />
        <div className="absolute left-0 top-0 h-fit w-fit bg-zinc-800 px-4 py-2 font-semibold text-white md:text-lg lg:rounded-tl-lg">
          <p>Featured Post</p>
        </div>
        <div className="absolute bottom-0 z-50 h-fit w-full bg-bg/20 px-4 py-3 shadow-xl backdrop-blur-md lg:rounded-b-lg lg:py-5">
          <div className="flex flex-col gap-3">
            <p
              tabIndex={0}
              onClick={() => router.push(`/post/${post.slug}`)}
              className="cursor-pointer font-josefin text-2xl hover:underline focus:underline sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {post.title}
            </p>
            <div className="">
              <p>
                {post.tags.map((tag) => (
                  <span
                    onClick={() =>
                      router.push(`/explore/?keyword=&tag=${tag}`)
                    }
                    key={tag}
                    className="cursor-pointer font-josefin text-neutral-800 transition-colors duration-300 hover:text-black md:text-lg lg:text-xl"
                  >
                    | {tag}{" "}
                  </span>
                ))}
              </p>
            </div>
            <p className="sm:text-lg md:text-xl lg:text-2xl">
              By {post.author.name}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
