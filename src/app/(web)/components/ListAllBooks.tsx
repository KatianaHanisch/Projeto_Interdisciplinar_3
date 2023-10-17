"use client";

import React, { useState, useEffect } from "react";
import CardBookDetailed from "./CardBookDetailed";
import FilterBooks from "./FilterBooks";
import Pagination from "@/app/components/Pagination";
import { VscSearchStop } from "react-icons/vsc";
import { LivroProps } from "@/app/types/Types";

export default function TodosLivros() {
  const [livros, setLivros] = useState<LivroProps[]>([]);
  const [filteredData, setFilteredData] = useState<LivroProps[]>([]);
  const [tituloBusca, setTituloBusca] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [quantidadePaginas, setQuantidadePaginas] = useState(0);
  const [page, setPage] = useState(0);
  const [pagination, setPagination] = useState(false);
  const itemPorPagina = 4;

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

  async function getLivros() {
    setCarregando(true);
    try {
      const response = await fetch("/api/todosLivros");
      const data = await response.json();

      setLivros(data);

      const newQuantidadePaginas = Math.ceil(data.length / itemPorPagina);
      setQuantidadePaginas(newQuantidadePaginas);

      const newPagination = newQuantidadePaginas > 1;
      setPagination(newPagination);

      setCarregando(false);
    } catch (error) {
      console.log(error);
      setCarregando(false);
    }
  }

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
    <div className="mt-40 mb-40 max-w-[1200px] mx-40">
      <div className="flex flex-col gap-8 bg-red-10 xl:flex-row px-8 xl:p-0 max-w-[1200px] m-auto justify-between">
        <FilterBooks
          onChange={(e) => setTituloBusca(e.target.value)}
          value={tituloBusca}
          onSearch={handleSearch}
        />
        {carregando ? (
          <div className="w-full flex items-center justify-center">
            <span className="h-12 w-12 block rounded-full border-4 border-t-blue-500 animate-spin"></span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-start w-full ">
            {filteredData.length === 0 ? (
              <div className="w-full h-60 flex flex-col items-center justify-center ">
                <VscSearchStop color="#8a9099" size={35} />
                <p className="text-gray-400 text-lg">
                  O livro buscado não foi encontrado
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-8 items-center">
                  {filteredData
                    .slice(page * itemPorPagina, (page + 1) * itemPorPagina)
                    .map(
                      (
                        { id, titulo, autor, categoria, sinopse, capaUrl },
                        index
                      ) => (
                        <div key={index}>
                          <CardBookDetailed
                            id={id}
                            titulo={titulo}
                            autor={autor}
                            categoria={categoria}
                            sinopse={sinopse}
                            capaUrl={capaUrl}
                          />
                          <div className="border-b-[1px]"></div>
                        </div>
                      )
                    )}
                </div>
              </>
            )}
            <div className="flex justify-between mt-4">
              {pagination ? (
                <Pagination
                  quantidadePaginas={quantidadePaginas}
                  setPage={setPage}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
