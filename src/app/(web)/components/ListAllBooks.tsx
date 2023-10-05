"use client";

import React, { useState, useEffect } from "react";
import CardBookDetailed from "./CardBookDetailed";
import FilterBooks from "./FilterBooks";

import Pagination from "@/app/components/Pagination";

import { LivroProps } from "@/app/types/WebTypes";

export default function TodosLivros() {
  const [livros, setLivros] = useState<LivroProps[]>([]);
  const [filterData, setFilterData] = useState<LivroProps[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [quantidadePaginas, setQuantidadePaginas] = useState(0);
  const [page, setPage] = useState(0);
  const itemPorPagina = 5;

  useEffect(() => {
    setFilterData(
      livros.filter((item: LivroProps, index: number) => {
        return (
          index >= page * itemPorPagina && index < (page + 1) * itemPorPagina
        );
      })
    );
  }, [page, livros]);

  const pagination = quantidadePaginas > 1;

  async function getLivros() {
    setCarregando(true);
    try {
      const response = await fetch("/api/dashboard/livros");
      const data = await response.json();
      setLivros(data);
      setQuantidadePaginas(Math.ceil(data.length / itemPorPagina));
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
    <div className="mt-40 mb-40 max-w-[1200px] m-auto">
      <div className="flex flex-col gap-8 xl:flex-row px-8 xl:p-0  max-w-[1200px] m-auto justify-between">
        <FilterBooks />
        {carregando ? (
          <div className="w-full  flex items-center justify-center">
            <span className="h-12 w-12 block rounded-full border-4 border-t-blue-500 animate-spin"></span>
          </div>
        ) : (
          <div className="flex flex-col gap-8  items-center">
            {filterData.map(
              ({ id, titulo, autor, categoria, sinopse, capaUrl }, index) => (
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
