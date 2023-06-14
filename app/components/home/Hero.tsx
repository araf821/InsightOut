"use client";

import Image from "next/image";
import Container from "../Container";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <div className="w-full bg-primary">
      <Container>
        <p className="py-8 text-center font-nunito text-6xl">
          Post of the Week
          <hr className="mx-auto mt-3 w-32 border-2 border-zinc-700" />
        </p>
        <div className="flex flex-col items-center justify-between gap-8 pb-8 lg:flex-row xl:gap-12">
          {/* Image Container */}
          <div className="group relative aspect-[4/3] h-full w-full lg:min-w-[560px] lg:max-w-[650px] xl:max-w-[800px]">
            <Image
              src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt=""
              fill
              className="absolute border-2 border-zinc-700 object-cover outline outline-offset-4 outline-zinc-800 drop-shadow-2xl"
            />
          </div>

          {/* Info Container */}
          <div className="flex w-full flex-col justify-between gap-4 md:gap-6 xl:gap-8">
            <p>
              <span className="bg-zinc-800 px-2 py-1 text-sm text-white">
                {dummyPost.createdAt}
              </span>
            </p>
            <p
              onClick={() => router.push(`/post/${dummyPost.slug}`)}
              className={`cursor-pointer font-ubuntu text-5xl font-semibold text-zinc-800 hover:underline hover:underline-offset-8 sm:text-6xl lg:text-7xl`}
            >
              {dummyPost.title}
            </p>
            {/* Author Name */}
            <p
              className={`-mt-2 text-xl font-light tracking-wider md:text-2xl`}
            >
              {dummyPost.author}
            </p>
            {/* Post category tags */}
            <div className="flex h-fit max-w-[600px] flex-wrap gap-2">
              {dummyPost.category.map((cat) => (
                <span
                  key={cat}
                  className="rounded-md bg-bg px-2 py-1 font-bold tracking-wider text-zinc-800 md:text-lg"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
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
