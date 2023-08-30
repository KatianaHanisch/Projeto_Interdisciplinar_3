"use client";
import { useEffect, useState } from "react";

import InputBusca from "../../components/InputBusca";
import Pagination from "@/app/components/Pagination";
import Livro from "./components/Livro";

type Props = {
  nome: string;
  autor: string;
  categoria: string;
};

const data = [
  {
    nome: "Corte de espinhos e rosas",
    autor: "Sarah J. Mass",
    categoria: "ficção",
  },
  {
    nome: "Renegados",
    autor: "Marissa Meyer",
    categoria: "Ação e Aventura",
  },
  {
    nome: "A rainha vermelha",
    autor: "Victoria Aveyard",
    categoria: "ficção",
  },
  {
    nome: "O prícipe cruel",
    autor: "Holly Black",
    categoria: "Fantasia Épica",
  },
  {
    nome: "Os miseráveis",
    autor: "Victor Hugo",
    categoria: "Literatura e Ficção",
  },
  {
    nome: "Renegados",
    autor: "Marissa Meyer",
    categoria: "Ação e Aventura",
  },
  {
    nome: "A rainha vermelha",
    autor: "Victoria Aveyard",
    categoria: "ficção",
  },
  {
    nome: "O prícipe cruel",
    autor: "Holly Black",
    categoria: "Fantasia Épica",
  },
  {
    nome: "Os miseráveis",
    autor: "Victor Hugo",
    categoria: "Literatura e Ficção",
  },
  {
    nome: "A rainha vermelha",
    autor: "Victoria Aveyard",
    categoria: "ficção",
  },
  {
    nome: "O prícipe cruel",
    autor: "Holly Black",
    categoria: "Fantasia Épica",
  },
  {
    nome: "Os miseráveis",
    autor: "Victor Hugo",
    categoria: "Literatura e Ficção",
  },
];

export default function Remover() {
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState<Props[]>([]);
  const n = 6;

  useEffect(() => {
    setFilterData(
      data.filter((item: Props, index: number) => {
        return index >= page * n && index < (page + 1) * n;
      })
    );
  }, [page]);

  const quantidadePaginas = Math.ceil(data.length / n);

  return (
    <div className="w-full p-10 ">
      <div className="w-full px-8">
        <InputBusca placeholderInput="Digite o nome do livro que procura" />
      </div>
      <div className="flex  py-8 px-8 h-[330px]  gap-10 ">
        {filterData &&
          filterData.map((item: Props, index: number) => (
            <Livro key={index} {...item} />
          ))}
      </div>
      <Pagination quantidadePaginas={quantidadePaginas} setPage={setPage} />
    </div>
  );
}
