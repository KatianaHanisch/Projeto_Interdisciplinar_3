import ReactPaginate from "react-paginate";

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

type Props = {
  setPage: (selected: number) => void;
  quantidadePaginas: number;
};

export default function Pagination({ setPage, quantidadePaginas }: Props) {
  const handlePageClick = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected;
    setPage(selectedPage);
  };

  return (
    <ReactPaginate
      containerClassName="flex items-center justify-center mt-4 mb-4"
      pageClassName="block hover:bg-gray-200 w-10 h-10 flex items-center justify-center  rounded-full mr-4"
      activeClassName="bg-gray-700 text-white hover:bg-gray-700"
      onPageChange={handlePageClick}
      pageCount={quantidadePaginas}
      breakLabel={<span className="mr-4">...</span>}
      previousLabel={
        <span className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full mr-4">
          <BsChevronLeft />
        </span>
      }
      nextLabel={
        <span className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
          <BsChevronRight />
        </span>
      }
    />
  );
}
