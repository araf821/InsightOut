import Logo from "../navbar/Logo";

const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-center bg-zinc-800 px-8 pb-8 pt-10 text-white">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16 md:gap-24 lg:grid-cols-4 lg:gap-28 xl:gap-48 2xl:gap-56">
        <div className="space-y-1">
          <div className="translate-x-[7px]">
            <Logo />
          </div>
          <p className="font-bold">Unleash Your Insights</p>
        </div>
        <div className="space-y-2 text-center font-semibold lg:text-start">
          <p className="cursor-pointer">About Us</p>
          <p className="cursor-pointer">Contact Us</p>
          <p className="cursor-pointer">Ummmm </p>
        </div>
        <div className="space-y-2 text-center font-semibold lg:text-start">
          <p className="cursor-pointer">About Us</p>
          <p className="cursor-pointer">Contact Us</p>
          <p className="cursor-pointer">Ummmm Idk</p>
        </div>
        <div className="space-y-2 text-center font-semibold lg:text-start">
          <p className="cursor-pointer">About Us</p>
          <p className="cursor-pointer">Contact Us</p>
          <p className="cursor-pointer">Ummmm Idk</p>
        </div>
      </div>
      <div className="flex flex-col items-center text-center">
        {/* Custom Horizontal Rule */}
        <div className="mb-4 mt-6 flex flex-row items-center sm:mb-8 sm:mt-10">
          <div className="w-[80vw] border-t-[2px] border-gray-500" />
        </div>
        <p className="bg-white px-0.5 text-sm text-black">Copyright © 2023</p>
        <p className="bg-white px-0.5 text-sm text-black">
          Designed & Developed by AAA :)
        </p>
      </div>
    </footer>
  );
};
export default Footer;
