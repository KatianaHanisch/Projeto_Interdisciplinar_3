import React, { useState } from "react";
import { LivroBuscaProps } from "@/app/types/WebTypes";
import { BiSearch } from "react-icons/bi";

export default function FilterBooks({
  value,
  onChange,
  onSearch,
  categorias,
  buscaCategoria,
  todosLivros,
  themeValue,
}: LivroBuscaProps) {
  const [filtroAtivo, setFiltroAtivo] = useState<string | null>("TODOS LIVROS");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    onChange(event);
    onSearch(searchText);
  };

  const handleCategoriaClick = (categoria: string) => {
    if (filtroAtivo === categoria) {
      return;
    }

    setFiltroAtivo(categoria);

    if (categoria === "TODOS LIVROS") {
      todosLivros();
    } else {
      buscaCategoria && buscaCategoria(categoria);
    }
  };

  return (
    <div className="xl:mb-40">
      <div
        className={`flex items-center justify-center w-[300px] ${
          themeValue === "light" ? "bg-light-searchBg" : "bg-dark-searchBg"
        } px-3 py-1 border border-gray-400 rounded-md`}
      >
        <BiSearch
          className={`${
            themeValue === "light"
              ? "text-light-searchText"
              : "text-dark-searchText"
          }`}
          size={22}
        />
        <input
          type="text"
          placeholder="Pesquisar..."
          onChange={handleInputChange}
          value={value}
          className={`w-full h-6 ml-2 ${
            themeValue === "light"
              ? "text-light-searchText border-light-border"
              : "text-dark-searchText border-dark-border"
          } bg-transparent focus:outline-none border-l px-2`}
        />
      </div>
      <div
        className={`mt-8 hidden xl:block ${
          themeValue === "light" ? "text-light-tex" : "text-dark-text"
        }`}
      >
        <h3 className="font-semibold">CATEGORIAS</h3>
        <ul className="mt-4 cursor-pointer">
          <div
            className={` rounded-sm ${
              themeValue === "dark"
                ? "hover:bg-dark-sectionHome"
                : "hover:bg-light-sectionHome"
            }`}
          >
            <li
              className={`uppercase ml-2 font-normal ${
                filtroAtivo === "TODOS LIVROS"
                  ? "text-blue-500 font-semibold"
                  : ""
              }`}
              onClick={() => handleCategoriaClick("TODOS LIVROS")}
            >
              TODOS LIVROS
            </li>
            <div className="border-b-[1px]"></div>
          </div>
          {categorias.map((categoria, index) => (
            <div
              key={index}
              className={`rounded-sm ${
                filtroAtivo === categoria.categoria ? "" : ""
              } ${
                themeValue === "dark"
                  ? "hover:bg-dark-sectionHome"
                  : "hover:bg-light-sectionHome"
              }`}
            >
              <li
                className={`uppercase ml-2 font-normal ${
                  filtroAtivo === categoria.categoria
                    ? "text-blue-500 font-semibold"
                    : ""
                }`}
                onClick={() => handleCategoriaClick(categoria.categoria)}
              >
                {categoria.categoria}
              </li>
              {index < categorias.length - 1 && (
                <div className="border-b-[1px]"></div>
              )}
            </div>
          ))}
        </ul>
      </div>
      <div
        className={`mt-8 xl:hidden mb-8 ${
          themeValue === "light" ? "text-light-tex" : "text-dark-text"
        }`}
      >
        <details className="">
          <summary>CATEGORIAS</summary>
          {categorias.map((categoria, index) => (
            <div
              key={index}
              className={`cursor-pointer rounded-sm ${
                filtroAtivo === categoria.categoria
                  ? "text-blue-500 font-semibold"
                  : ""
              } ${
                themeValue === "dark" ? "text-dark-text" : "text-light-text"
              }`}
            >
              <li
                className="uppercase ml-2 mt-2"
                onClick={() => handleCategoriaClick(categoria.categoria)}
              >
                {categoria.categoria}
              </li>
              {index < categorias.length - 1 && (
                <div className="border-b-[1px]"></div>
              )}
            </div>
          ))}
        </details>
      </div>
    </div>
  );
}
