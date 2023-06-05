import Image from "next/image";
import Container from "./Container";
import { Merriweather } from "next/font/google";

const merri = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const Hero = () => {
  return (
    <div className="my-6 w-full bg-rose-600 shadow-[0px_0px_30px_#F43F5E]">
      <Container>
        <div className="flex flex-col items-center justify-between gap-8 py-8 lg:flex-row xl:gap-12">
          {/* Image Container */}
          <div className="group relative aspect-[4/3] h-full w-full bg-orange-50 lg:min-w-[560px] lg:max-w-[650px] xl:max-w-[800px]">
            <Image
              src="https://res.cloudinary.com/dw7izgruq/image/upload/v1684769626/gys4evgyekggbzorixvk.jpg"
              alt=""
              fill
              className="absolute scale-[0.97] object-cover drop-shadow-2xl transition-all group-hover:scale-[1]"
            />
          </div>

          {/* Info Container */}
          <div className="flex w-full flex-col justify-between gap-4 xl:gap-6">
            <p>
              <span className="bg-zinc-800 px-2 py-1 text-sm text-white">
                {dummyPost.createdAt}
              </span>
            </p>
            <p
              className={`text-5xl font-bold tracking-wider text-zinc-900 sm:text-6xl lg:text-7xl ${merri.className}`}
            >
              {dummyPost.title}
            </p>
            <p className={`font-bold tracking-widest md:text-lg`}>
              {dummyPost.author}
            </p>
            <div className="flex gap-2">
              {dummyPost.category.map((cat) => (
                <span
                  key={cat}
                  className="bg-orange-50 px-2 py-1 font-bold tracking-wider text-rose-600 md:text-lg"
                >
                  {cat}
                </span>
              ))}
            </div>
            {/* Read Button */}
            <button className="group relative w-full max-w-[200px] overflow-hidden border  border-zinc-900 bg-orange-50 px-5 py-3 font-medium text-gray-600 shadow-inner">
              <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-gray-600 transition-all duration-200 group-hover:w-full"></span>
              <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-gray-600 transition-all duration-200 group-hover:w-full"></span>
              <span className="ease absolute left-0 top-0 h-0 w-full bg-gray-600 transition-all delay-200 duration-300 group-hover:h-full"></span>
              <span className="ease absolute bottom-0 left-0 h-0 w-full bg-gray-600 transition-all delay-200 duration-300 group-hover:h-full"></span>
              <span className="absolute inset-0 h-full w-full bg-gray-900 opacity-0 delay-300 duration-300 group-hover:opacity-100"></span>
              <span className="ease relative transition-colors delay-200 duration-300 group-hover:text-white">
                <p className="text-xl md:text-2xl">Read</p>
              </span>
            </button>
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
  author: "Author Name",
  category: ["ummm", "idk", "omg"],
  createdAt: "August 82, 1238",
};
