"use client";

import { useState } from "react";

import ReactPaginate from "react-paginate";

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

type Props = {
  setPage: (selected: number) => void;
  quantidadePaginas: number;
  themeValue?: any;
};

export default function Pagination({
  setPage,
  quantidadePaginas,
  themeValue,
}: Props) {
  const [pagina, setPagina] = useState(0);
  const handlePageClick = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected;
    setPage(selectedPage);
    setPagina(selectedPage);
  };

  return (
    <ReactPaginate
      containerClassName="flex items-center justify-center mt-4 mb-4"
      pageClassName={`block  w-10 ${
        themeValue === "dark"
          ? "text-dark-text hover:bg-gray-700"
          : "text-light-text hover:bg-gray-200"
      } h-10 flex items-center justify-center rounded-full mr-4`}
      activeClassName={`bg-gray-700 text-white hover:bg-gray-700`}
      onPageChange={handlePageClick}
      pageCount={quantidadePaginas}
      breakLabel={<span className="mr-4">...</span>}
      previousLabel={
        pagina === 0 ? null : (
          <span className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full mr-4">
            <BsChevronLeft />
          </span>
        )
      }
      nextLabel={
        pagina + 1 === quantidadePaginas ? null : (
          <span className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300">
            <BsChevronRight />
          </span>
        )
      }
    />
  );
}
