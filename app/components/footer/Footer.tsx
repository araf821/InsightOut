import Logo from "../navbar/Logo";

const Footer = () => {
  return (
    <footer className="text-white w-full bg-zinc-800 flex flex-col items-center justify-center px-8 pt-10 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-16 md:gap-24 lg:gap-28 xl:gap-48 2xl:gap-56">
        <div className="space-y-1">
          <div className="translate-x-[7px]">
            <Logo />
          </div>
          <p className="font-bold">Unleash Your Insights</p>
        </div>
        <div className="text-center lg:text-start font-semibold space-y-2">
          <p className="cursor-pointer">About Us</p>
          <p className="cursor-pointer">Contact Us</p>
          <p className="cursor-pointer">Ummmm </p>
        </div>
        <div className="text-center lg:text-start font-semibold space-y-2">
          <p className="cursor-pointer">About Us</p>
          <p className="cursor-pointer">Contact Us</p>
          <p className="cursor-pointer">Ummmm Idk</p>
        </div>
        <div className="text-center lg:text-start font-semibold space-y-2">
          <p className="cursor-pointer">About Us</p>
          <p className="cursor-pointer">Contact Us</p>
          <p className="cursor-pointer">Ummmm Idk</p>
        </div>
      </div>
      <div className="text-center flex flex-col items-center">
        {/* Custom Horizontal Rule */}
        <div className="flex flex-row items-center mt-6 sm:mt-10 mb-4 sm:mb-8">
          <div className="border-gray-500 border-t-[2px] w-[80vw]" />
        </div>
        <p className="text-sm bg-white px-0.5 text-black">Copyright © 2023</p>
        <p className="text-sm bg-white px-0.5 text-black">
          Designed & Developed by AAA :)
        </p>
      </div>
    </footer>
  );
};
export default Footer;
