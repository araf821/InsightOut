"use client";

import Image from "next/image";
import Container from "./Container";
import { Ubuntu } from "next/font/google";
import { useRouter } from "next/navigation";
import ToolbarComponent from "./radix/Toolbar";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const Hero = () => {
  const router = useRouter();

  return (
    <div className="my-6 w-full bg-rose-600 shadow-[0px_0px_30px_#F43F5E]">
      <Container>
        <div className="flex flex-col items-center justify-between gap-8 py-8 lg:flex-row xl:gap-12">
          {/* Image Container */}
          <div className="group relative aspect-[4/3] h-full w-full lg:min-w-[560px] lg:max-w-[650px] xl:max-w-[800px]">
            <Image
              src="https://res.cloudinary.com/dw7izgruq/image/upload/v1684769626/gys4evgyekggbzorixvk.jpg"
              alt=""
              fill
              className="absolute border-4 border-zinc-900 object-cover drop-shadow-2xl transition-all group-hover:scale-[1]"
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
              className={`cursor-pointer text-5xl font-semibold text-zinc-900 hover:underline sm:text-6xl lg:text-7xl ${ubuntu.className}`}
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
                  className="bg-orange-50 px-2 py-1 font-bold tracking-wider text-rose-600 md:text-lg"
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
