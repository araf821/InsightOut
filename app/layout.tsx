import { Josefin_Sans, Merriweather, Ubuntu } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import getCurrentUser from "./actions/getCurrentUser";
import ToasterProvider from "./providers/ToasterProvider";
import Providers from "./components/Providers";
import Sidebar from "./components/sidebar/Sidebar";

const merri = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merri",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-ubuntu",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
});

export const metadata = {
  title: "InsightOut",
  description: "Next Level Blogging.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`text-whi ${merri.variable} ${josefin.variable} ${ubuntu.variable} overflow-x-hidden bg-bg font-merri`}
      >
        <Providers>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <Sidebar currentUser={currentUser} />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
