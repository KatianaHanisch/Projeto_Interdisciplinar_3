"use client";

import { useEffect, useState } from "react";

import { LivroProps } from "@/app/types/Types";

import InputBusca from "../../components/InputBusca";
import Pagination from "@/app/components/Pagination";
import Livro from "./components/Livro";

export default function Remover() {
  const [page, setPage] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [livroBusca, setLivroBusca] = useState("");
  const [livros, setLivros] = useState<LivroProps[]>([]);
  const [livrosFiltrados, setLivrosFiltrados] = useState<LivroProps[]>([]);
  const [filterData, setFilterData] = useState<LivroProps[]>([]);
  const [quantidadePaginas, setQuantidadePaginas] = useState(0);

  const n = 6;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
    setLivroBusca(formattedValue);
  };

  async function getLivroBusca(livroBusca: string) {
    setCarregando(true);
    try {
      const res = await fetch(`/api/buscaLivro?search=${livroBusca}`);
      const data = await res.json();
      setLivrosFiltrados(data);
      setQuantidadePaginas(Math.ceil(data.length / n));
      setCarregando(false);
    } catch (error) {
      setCarregando(false);
      console.log(error);
    }
  }

  async function getLivros() {
    setCarregando(true);
    try {
      const res = await fetch("/api/todosLivros");
      const data = await res.json();

      setLivros(data);
      setQuantidadePaginas(Math.ceil(data.length / n));
      setCarregando(false);
    } catch (error) {
      setCarregando(false);
      console.log(error);
    }
  }

  useEffect(() => {
    <>
      {livroBusca !== ""
        ? setFilterData(
            livrosFiltrados.filter((item: LivroProps, index: number) => {
              return index >= page * n && index < (page + 1) * n;
            })
          )
        : setFilterData(
            livros.filter((item: LivroProps, index: number) => {
              return index >= page * n && index < (page + 1) * n;
            })
          )}
    </>;
  }, [page, livros, livrosFiltrados]);

  useEffect(() => {
    getLivroBusca(livroBusca);
  }, [livroBusca]);

  useEffect(() => {
    getLivros();
  }, []);

  return (
    <div className="w-full p-10 items-center flex flex-col ">
      <InputBusca
        placeholderInput="Digite o nome do livro que procura"
        value={livroBusca}
        onChange={handleChange}
      />
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
