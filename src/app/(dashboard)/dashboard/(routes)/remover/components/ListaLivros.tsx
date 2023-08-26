"use client";

import React, { useState } from "react";
import Livro from "./Livro";

export default function ListAllBooks() {
  const itemsPerPage = 6; // Define quantos itens você deseja mostrar por página.
  const [currentPage, setCurrentPage] = useState(1); // Página atual, começa em 1.

  // Sua lista de livros (substitua isso por sua própria lista).
  const allBooks = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

  return (
    <div className="mt-8 flex items-center justify-center">
      <div className="flex">
        <div className="flex flex-col">
          <div className="flex gap-8">
            {booksToDisplay.map((book, index) => (
              <div key={index}>
                <Livro />
                <div className="border-b-[1px]"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
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
                endIndex >= allBooks.length
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}