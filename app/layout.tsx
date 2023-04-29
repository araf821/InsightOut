import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Modal from "./components/modals/Modal";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "InsightOut",
  description: "Blogging simplified.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar />
        <div className="pb-20 pt-28">
          {children}
          <RegisterModal />
          <LoginModal />
        </div>
        <Footer />
      </body>
    </html>
  );
}
