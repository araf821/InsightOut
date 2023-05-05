import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import getCurrentUser from "./actions/getCurrentUser";
import Categories from "./components/categories/Categories";
import ToasterProvider from "./providers/ToasterProvider";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "InsightOut",
  description: "Blogging simplified.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <Navbar currentUser={currentUser} />
        <RegisterModal />
        <LoginModal />
        <div className="pb-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
