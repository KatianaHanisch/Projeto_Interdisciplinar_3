"use client";

import { useState, useEffect } from "react";

import CardBook from "./CardBook";

import { LivroProps } from "@/app/types/Types";

type Props = {
  livros: LivroProps[];
  carregando: boolean;
};

export default function ListRecentBooks({ livros, carregando }: Props) {
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState<LivroProps[]>([]);
  const [quantidadePaginas, setQuantidadePaginas] = useState(0);

  const itemPorPagina = 12;

  useEffect(() => {
    setFilterData(
      livros.filter((item: LivroProps, index: number) => {
        return (
          index >= page * itemPorPagina && index < (page + 1) * itemPorPagina
        );
      })
    );
  }, [page, livros]);

  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="md:text-3xl text-2xl mb-16 m-auto text-slate-800 font-medium">
        Livros Recém Adicionados
      </h1>
      <div className="flex m-auto md:gap-[45px] gap-[30px] flex-wrap px-4 max-w-[1200px] justify-center">
        {carregando ? (
          <span className="h-11 w-11 block rounded-full border-4 border-t-blue-600 animate-spin"></span>
        ) : (
          <>
            {filterData &&
              filterData.map(
                ({ id, titulo, autor, categoria, sinopse, capaUrl }, index) => (
                  <CardBook
                    key={index}
                    id={id}
                    autor={autor}
                    titulo={titulo}
                    categoria={categoria}
                    capaUrl={capaUrl}
                    sinopse={sinopse}
                  />
                )
              )}
          </>
        )}
      </div>
    </section>
  );
}
