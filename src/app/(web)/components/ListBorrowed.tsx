"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CardBook from "./CardBook";
import { useAuth } from "@/app/context/AuthContext";

export default function ListBorrowed() {
  const router = useRouter();
  const itemsPerPage = 12; // Define quantos itens você deseja mostrar por página.
  const [currentPage, setCurrentPage] = useState(1); // Página atual, começa em 1.
  const { isAuthenticated, validateTokenForPageEmprestimos } = useAuth();

  // Sua lista de livros (substitua isso por sua própria lista).
  const allBooks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  // Calcula o índice de início e fim com base na página atual.
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtra os livros com base na página atual e na quantidade de itens por página.
  const booksToDisplay = allBooks.slice(startIndex, endIndex);

  // Função para avançar para a próxima página.
  const nextPage = () => {
    if (endIndex < allBooks.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Função para retroceder para a página anterior.
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
        {booksToDisplay.map((book, index) => (
          <CardBook key={index} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-14 mx-16">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Anterior
        </button>
        <button
          onClick={nextPage}
          disabled={endIndex >= allBooks.length}
          className={`${
            endIndex >= allBooks.length ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
