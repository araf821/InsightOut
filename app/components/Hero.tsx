import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex justify-center max-w-[2520px] mx-auto 2xl:px-20">
      <div
        className="text-center aspect-video relative overflow-hidden xl:rounded-b-xl text
        flex flex-row justify-center items-center h-[400px] sm:h-[500px] lg:h-[60vw] max-h-[600px] w-full"
      >
        <div className="max-w-[550px] z-10 text-5xl font-bold tracking-wider sm:rounded-xl p-6 sm:text-7xl md:text-8xl bg-black/10 text-white">
          Unleash Your Insights
        </div>
        <Image
          fill
          src="/images/bg-2.jpg"
          alt="blog background"
          className="object-cover w-full xl:object-none"
        />
      </div>
    </div>
  );
};
export default Hero;
