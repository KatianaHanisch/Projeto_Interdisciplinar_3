"use client";

import { useEffect, useState } from "react";

import { LivroProps } from "@/app/types/Types";

import InputBusca from "../../components/InputBusca";
import Pagination from "@/app/components/Pagination";
import Livro from "./components/Livro";

import { VscSearchStop } from "react-icons/vsc";

export default function Remover() {
  const [carregando, setCarregando] = useState(true);
  const [tituloBusca, setTituloBusca] = useState("");
  const [livros, setLivros] = useState<LivroProps[]>([]);
  const [page, setPage] = useState(0);
  const [filteredData, setFilteredData] = useState<LivroProps[]>([]);
  const [pagination, setPagination] = useState(false);
  const [quantidadePaginas, setQuantidadePaginas] = useState(0);

  const itemPorPagina = 6;

  async function getLivros() {
    try {
      const res = await fetch("/api/todosLivros");
      const data = await res.json();

      setLivros(data);
      const newQuantidadePaginas = Math.ceil(data.length / itemPorPagina);
      setQuantidadePaginas(newQuantidadePaginas);

      const newPagination = newQuantidadePaginas > 1;
      setPagination(newPagination);

      setCarregando(false);
    } catch (error) {
      setCarregando(false);
      console.log(error);
    }
  }

  const applyFilter = (data: LivroProps[]) => {
    const filteredData = data.filter(
      (item: LivroProps) =>
        typeof item.titulo === "string" &&
        item.titulo.toLowerCase().includes(tituloBusca.toLowerCase())
    );

    setFilteredData(filteredData);

    const newQuantidadePaginas = Math.ceil(filteredData.length / itemPorPagina);
    setQuantidadePaginas(newQuantidadePaginas);

    const newPagination = newQuantidadePaginas > 1;
    setPagination(newPagination);
  };

  useEffect(() => {
    applyFilter(livros);
  }, [livros]);

  const handleSearch = () => {
    applyFilter(livros);

    setPage(0);
  };

  const handleSearchClear = () => {
    setTituloBusca("");
    applyFilter(livros);
    setPage(0);
  };

  useEffect(() => {
    if (tituloBusca === "") {
      handleSearchClear();
    }
  }, [tituloBusca]);

  useEffect(() => {
    getLivros();
  }, []);

  return (
    <div className="bg-gray-100 h-full w-full rounded-lg shadow-md">
      <div className="w-full p-10 items-center flex flex-col ">
        <InputBusca
          placeholderInput="Digite o nome do livro que procura"
          value={tituloBusca}
          onChange={(e) => setTituloBusca(e.target.value)}
          onSearch={handleSearch}
        />
        <div className="flex flex-col items-center justify-center py-8  h-[380px]  w-11/12 ">
          {carregando ? (
            <span className="h-11 w-11 block rounded-full border-4 border-t-blue-600 animate-spin"></span>
          ) : (
            <div className=" flex flex-row items-center gap-10 justify-start py-8  w-full">
              {filteredData.length < 1 ? (
                <div className="w-full h-52 flex items-center justify-center flex-col  ">
                  <VscSearchStop size={40} color="#8a9099" />
                  <p className="text-gray-600 text-lg">
                    Nenhum livro encontrado
                  </p>
                </div>
              ) : (
                <>
                  {filteredData
                    .slice(page * itemPorPagina, (page + 1) * itemPorPagina)
                    .map((item: LivroProps, index: number) => (
                      <Livro key={index} {...item} />
                    ))}
                </>
              )}
            </div>
          )}
        </div>
        {pagination ? (
          <Pagination quantidadePaginas={quantidadePaginas} setPage={setPage} />
        ) : null}
      </div>
    </div>
  );
}
