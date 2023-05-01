import Logo from "../navbar/Logo";

const Footer = () => {
  return (
    <footer className="text-white w-full bg-gray-800 flex flex-col items-center justify-center pt-10 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 md:gap-16 lg:gap-28">
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
        <div className="flex flex-row items-center mt-6 sm:mt-10 mb-4 sm:mb-8">
          <div className="border-white border-t-[2px] w-32 md:w-56 lg:w-72" />
          <div className="border-white border-t-[8px] rounded-full w-2" />
          <div className="border-white border-t-[2px] w-32 md:w-56 lg:w-72" />
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
