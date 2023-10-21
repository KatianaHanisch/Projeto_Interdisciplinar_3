"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

import CardBookDetailed from "./CardBookDetailed";
import FilterBooks from "./FilterBooks";
import Pagination from "@/app/components/Pagination";

import { LivroProps } from "@/app/types/Types";
import { CategoriaProps } from "@/app/types/WebTypes";

import { VscSearchStop } from "react-icons/vsc";

export default function TodosLivros() {
  const [livros, setLivros] = useState<LivroProps[]>([]);
  const [filteredData, setFilteredData] = useState<LivroProps[]>([]);
  const [categorias, setCategorias] = useState<CategoriaProps[]>([]);
  const [tituloBusca, setTituloBusca] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [carregandoFiltro, setCarregandoFiltro] = useState(false);
  const [quantidadePaginas, setQuantidadePaginas] = useState(0);
  const [page, setPage] = useState(0);
  const [pagination, setPagination] = useState(false);
  const itemPorPagina = 4;

  const { themeValue } = useTheme();

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

  async function filtroCategoria(categoria: string) {
    setCarregando(true);

    try {
      const response = await fetch(
        `/api/web/filtroCategoria?categoria=${categoria}`,
        { method: "GET" }
      );

      const data = await response.json();
      setLivros(data);

      setCarregando(false);
    } catch (error) {
      setCarregando(false);
      console.log(error);
    }
  }
  async function getCategorias() {
    try {
      const response = await fetch("/api/web/categoriasLivros", {
        method: "GET",
      });

      const data = await response.json();

      setCategorias(data);
    } catch (error) {
      console.log("Ocorreu um erro: ", error);
    }
  }

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
    getCategorias();
  }, []);

  return (
    <div
      className={`pt-40 w-full pb-40 ${
        themeValue === "light" ? "bg-light-back" : "bg-dark-back"
      }`}
    >
      <div className="flex z-0 flex-col gap-8 bg-red-10 xl:flex-row px-8 xl:p-0 max-w-[1200px] m-auto justify-between">
        <FilterBooks
          themeValue={themeValue}
          onChange={(e) => setTituloBusca(e.target.value)}
          value={tituloBusca}
          onSearch={handleSearch}
          categorias={categorias}
          buscaCategoria={(categoria) => filtroCategoria(categoria)}
          todosLivros={getLivros}
        />
        {carregando ? (
          <div className="w-full flex items-center justify-center">
            <span className="h-12 w-12 block rounded-full border-4 border-t-blue-500 animate-spin"></span>
          </div>
        ) : (
          <div className="z-10">
            <div className="flex flex-col items-center justify-start w-full ">
              {filteredData.length === 0 ? (
                <div className="w-full h-60 flex flex-col items-center justify-center ">
                  <VscSearchStop color="#8a9099" size={35} />
                  <p className="text-gray-400 text-lg">
                    O livro buscado não foi encontrado
                  </p>
                </div>
              ) : (
                <div className="z-10">
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
                              themeValue={themeValue}
                              titulo={titulo}
                              autor={autor}
                              categoria={categoria}
                              sinopse={sinopse}
                              capaUrl={capaUrl}
                            />
                            <div
                              className={`border-b-[1px] ${
                                themeValue === "dark"
                                  ? "border-dark-border"
                                  : "border-light-border"
                              }`}
                            ></div>
                          </div>
                        )
                      )}
                  </div>
                </div>
              )}
              <div className="flex justify-between mt-4">
                {pagination ? (
                  <Pagination
                    themeValue={themeValue}
                    quantidadePaginas={quantidadePaginas}
                    setPage={setPage}
                  />
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
