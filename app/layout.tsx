import "./globals.css";
import getCurrentUser from "./actions/users/getCurrentUser";
import ToasterProvider from "./providers/ToasterProvider";
import Providers from "@/components/Providers";
import ChatComponent from "@/components/chat/ChatComponent";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { josefin, merri } from "./fonts";

export const metadata = {
  title: "Insight Out",
  description: "Discover New Insights.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html
      lang="en"
      className={`${merri.variable} ${josefin.variable}`}
    >
      <body
        className={`overflow-x-hidden break-words font-merri selection:bg-zinc-800 selection:text-white`}
      >
        <Providers>
          <ChatComponent />
          <ToasterProvider />
          <Sidebar currentUser={currentUser} />
          <Navbar />
          {children}
          <div className="mx-auto w-full 2xl:pb-6">
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
