"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/context/AuthContext";

import CardBook from "./CardBook";
import Pagination from "@/app/components/Pagination";

import { LivroProps } from "@/app/types/Types";

type Props = {
  livros: LivroProps[];
};

export default function ListBorrowed({ livros }: Props) {
  const { isAuthenticated, validateTokenForPageEmprestimos } = useAuth();
  const router = useRouter();

  const [filteredData, setFilteredData] = useState<LivroProps[]>([]);
  const [quantidadePaginas, setQuantidadePaginas] = useState(0);
  const [page, setPage] = useState(0);
  const [pagination, setPagination] = useState(false);
  const itemPorPagina = 12;

  function quantidadeInicial() {
    setFilteredData(livros);

    const newQuantidadePaginas = Math.ceil(livros.length / itemPorPagina);
    setQuantidadePaginas(newQuantidadePaginas);

    const newPagination = newQuantidadePaginas > 1;
    setPagination(newPagination);
  }

  useEffect(() => {
    quantidadeInicial();
  }, []);

  useEffect(() => {
    validateTokenForPageEmprestimos();
  }, [validateTokenForPageEmprestimos]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-[1200px] m-auto mt-32 mb-32 px-2">
      <h1 className="text-center mb-8 text-3xl">Meus Empréstimos</h1>

      <div className="flex flex-wrap justify-center gap-7">
        {filteredData
          .slice(page * itemPorPagina, (page + 1) * itemPorPagina)
          .map(({ id, titulo, autor, categoria, capaUrl }, index) => (
            <div key={index}>
              <CardBook
                id={id}
                titulo={titulo}
                autor={autor}
                categoria={categoria}
                capaUrl={capaUrl}
              />
              {/* <div className="border-b-[1px]"></div> */}
            </div>
          ))}
      </div>
      <div className="flex justify-between items-center mt-14 mx-16">
        {pagination ? (
          <Pagination quantidadePaginas={quantidadePaginas} setPage={setPage} />
        ) : null}
      </div>
    </div>
  );
}
