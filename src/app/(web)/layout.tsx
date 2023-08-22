import "../globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import HeaderHome from "./components/HeaderHome";
import Footer from "./components/Footer";
import BannerPages from "./components/BannerPages";

import { RiArrowUpDoubleFill } from "react-icons/ri";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biblioteca",
  description: "Projeto interdisciplinar 3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className}`}>
        <HeaderHome />
        <BannerPages />
        {children}
        <a
          href="#"
          className="text-2xl absolute right-5 mt-[-30px] bg-slate-300 p-2 animate-bounce rounded-full"
        >
          <RiArrowUpDoubleFill />
        </a>
        <Footer />
      </body>
    </html>
  );
}
