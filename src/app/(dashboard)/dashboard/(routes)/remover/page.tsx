"use client";

import { useEffect, useState } from "react";

import { LivroProps } from "@/app/types/Types";

import InputBusca from "../../components/InputBusca";
import Pagination from "@/app/components/Pagination";
import Livro from "./components/Livro";

import { VscSearchStop } from "react-icons/vsc";

export default function Remover() {
  const [carregando, setCarregando] = useState(false);
  const [tituloBusca, setTituloBusca] = useState("");
  const [livros, setLivros] = useState<LivroProps[]>([]);
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState<LivroProps[]>([]);
  const [quantidadePaginas, setQuantidadePaginas] = useState(0);

  const itemPorPagina = 6;

  async function getLivros() {
    setCarregando(true);
    try {
      const res = await fetch("/api/todosLivros");
      const data = await res.json();

      setLivros(data);
      setQuantidadePaginas(Math.ceil(data.length / itemPorPagina));
      setCarregando(false);
    } catch (error) {
      setCarregando(false);
      console.log(error);
    }
  }

  useEffect(() => {
    setFilterData(
      livros.filter((item: LivroProps, index: number) => {
        return (
          index >= page * itemPorPagina && index < (page + 1) * itemPorPagina
        );
      })
    );
  }, [page, livros]);

  const filteredData = filterData.filter(
    (item: LivroProps) =>
      typeof item.titulo === "string" &&
      item.titulo.toLowerCase().includes(tituloBusca.toLowerCase())
  );

  useEffect(() => {
    getLivros();
  }, []);

  return (
    <div className="w-full p-10 items-center flex flex-col ">
      <InputBusca
        placeholderInput="Digite o nome do livro que procura"
        value={tituloBusca}
        onChange={(e) => setTituloBusca(e.target.value)}
      />
      <div className="flex flex-col items-center justify-center py-8  h-[380px]  w-11/12 ">
        {carregando ? (
          <span className="h-11 w-11 block rounded-full border-4 border-t-blue-600 animate-spin"></span>
        ) : (
          <div className=" flex flex-row items-center gap-10 justify-start py-8  w-full">
            {filteredData.length < 1 ? (
              <div className="w-full h-52 flex items-center justify-center flex-col  ">
                <VscSearchStop size={40} color="#8a9099" />
                <p className="text-gray-600 text-lg">Nenhum livro encontrado</p>
              </div>
            ) : (
              <>
                {filteredData.map((item: LivroProps, index: number) => (
                  <Livro key={index} {...item} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
      {quantidadePaginas > 1 ? (
        <Pagination quantidadePaginas={quantidadePaginas} setPage={setPage} />
      ) : null}
    </div>
  );
}
