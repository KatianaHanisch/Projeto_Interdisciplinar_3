"use client";

import { useEffect, useState } from "react";

import { LivroProps } from "@/app/types/DashboardTypes";

import InputBusca from "../../components/InputBusca";
import Pagination from "@/app/components/Pagination";
import Livro from "./components/Livro";

export default function Remover() {
  const [page, setPage] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [livros, setLivros] = useState<LivroProps[]>([]);
  const [filterData, setFilterData] = useState<LivroProps[]>([]);
  const n = 6;

  async function getLivros() {
    setCarregando(true);
    try {
      const res = await fetch("/api/livro");
      const data = await res.json();

      setLivros(data);
      setCarregando(false);
    } catch (error) {
      setCarregando(false);
      console.log(error);
    }
  }

  useEffect(() => {
    setFilterData(
      livros.filter((item: LivroProps, index: number) => {
        return index >= page * n && index < (page + 1) * n;
      })
    );
  }, [page, livros]);

  useEffect(() => {
    getLivros();
  }, []);

  const quantidadePaginas = Math.ceil(livros.length / n);

  return (
    <div className="w-full p-10 items-center flex flex-col ">
      <InputBusca placeholderInput="Digite o nome do livro que procura" />
      <div className="flex flex-col items-center justify-center py-8  h-[380px]  w-11/12 ">
        {carregando ? (
          <span className="h-11 w-11 block rounded-full border-4 border-t-blue-600 animate-spin"></span>
        ) : (
          <div className=" flex flex-row items-center gap-10 justify-start py-8  w-full">
            {filterData &&
              filterData.map((item: LivroProps, index: number) => (
                <Livro key={index} {...item} />
              ))}
          </div>
        )}
      </div>
      {quantidadePaginas > 1 ? (
        <Pagination quantidadePaginas={quantidadePaginas} setPage={setPage} />
      ) : null}
    </div>
  );
}
