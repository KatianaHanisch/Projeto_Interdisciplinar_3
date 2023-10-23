"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

import Link from "next/link";

import { LivroProps } from "../types/Types";

import BannerHome from "./components/BannerHome";
import Footer from "./components/Footer";
import HeaderHome from "./components/HeaderHome";
import ListRecentBooks from "./components/ListRecentBooks";

import { RiArrowUpDoubleFill } from "react-icons/ri";

export default function Home() {
  const [livros, setLivros] = useState<LivroProps[]>([]);
  const [carregando, setCarregando] = useState(false);

  const { themeValue } = useTheme();

  async function getLivros() {
    setCarregando(true);
    try {
      const response = await fetch("/api/web/livrosRecemAdicionados");
      const data = await response.json();
      setLivros(data);

      setCarregando(false);
    } catch (error) {
      console.log(error);
      setCarregando(false);
    }
  }

  useEffect(() => {
    getLivros();
  }, []);

  return (
    <main
      className={`${themeValue === "light" ? "bg-light-back" : "bg-dark-back"}`}
    >
      <HeaderHome />
      <div className="mt-[70px] md:mt-0">
        <BannerHome themeValue={themeValue} />
      </div>
      <div className="mt-24 md:mt-40 mb-40">
        <ListRecentBooks
          themeValue={themeValue}
          livros={livros}
          carregando={carregando}
        />
      </div>
      <Link
        href=""
        className="text-2xl absolute right-5 mt-[-30px] bg-slate-300 p-2 animate-bounce rounded-full"
      >
        <RiArrowUpDoubleFill />
      </Link>
      <Footer />
    </main>
  );
}
