import Logo from "../navbar/Logo";

const Footer = () => {
  return (
    <footer className="text-white w-full bg-gray-800 flex flex-col items-center justify-center p-8">
      <div className="space-y-1">
        <div className="translate-x-2">
          <Logo />
        </div>
        <p className="font-bold">Unleash Your Insights</p>
      </div>
      <div className="mt-4 text-center font-semibold space-y-4">
        <p className="cursor-pointer">About Us</p>
        <p className="cursor-pointer">Contact Us</p>
        <p className="cursor-pointer">Ummmm Idk</p>
      </div>
    </footer>
  );
};
export default Footer;
