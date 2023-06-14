"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="mx-auto w-full max-w-[1750px] py-8">
      <div className="relative mx-auto aspect-[2/3] w-full max-w-[1280px] overflow-hidden shadow-xl md:aspect-[4/3] lg:aspect-[5/3]">
        <Image
          src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt=""
          fill
          className="absolute object-cover xl:rounded-lg"
        />
        <div className="absolute left-0 top-0 h-fit w-fit bg-zinc-800 px-4 py-2 font-semibold text-white md:text-lg xl:rounded-tl-lg">
          <p>Post of the Month</p>
        </div>
        <div className="absolute bottom-0 z-10 h-fit w-full bg-white/10 px-4 py-3 shadow-xl backdrop-blur-md lg:py-5 xl:rounded-b-lg">
          <div className="flex flex-col gap-3">
            <p
              onClick={() => router.push(`/post/${dummyPost.slug}`)}
              className="cursor-pointer font-merri text-2xl hover:underline sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {dummyPost.title}
            </p>
            <div className="flex h-fit max-w-[600px] flex-wrap gap-2">
              {dummyPost.category.map((cat) => (
                <span
                  key={cat}
                  className="rounded-md bg-bg px-2 py-1 tracking-wider text-zinc-800 md:text-lg"
                >
                  {cat}
                </span>
              ))}
            </div>
            <p className="sm:text-lg md:text-xl lg:text-2xl">
              By {dummyPost.author}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

const dummyPost = {
  title: "The Title of the Amazing Blog Post",
  image: "",
  slug: "asdf",
  author: "Author Name",
  category: ["ummm", "idk", "omg"],
  createdAt: "August 82, 1238",
};
