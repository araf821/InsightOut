import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex justify-center max-w-[2520px] mx-auto 2xl:px-20 ">
      <div
        className="aspect-video relative overflow-hidden lg:rounded-b-xl text
        flex flex-row justify-center h-[400px] sm:h-[700px] lg:h-[60vw] max-h-[800px] "
      >
        <Image
          fill
          src="/images/bg-1.jpg"
          alt="blog background"
          className="object-cover w-full"
        />
      </div>
    </div>
  );
};
export default Hero;
