"use client";
import { useEffect, useState } from "react";

import InputBusca from "../../components/InputBusca";
import Pagination from "@/app/components/Pagination";
import Livro from "./components/Livro";

type Props = {
  id: number;
  nome: string;
  autor: string;
  categoria: string;
};

const data = [
  {
    id: 1,
    nome: "Corte de espinhos e rosas",
    autor: "Sarah J. Mass",
    categoria: "ficção",
  },
  {
    id: 2,
    nome: "Renegados",
    autor: "Marissa Meyer",
    categoria: "Ação e Aventura",
  },
  {
    id: 3,
    nome: "A rainha vermelha",
    autor: "Victoria Aveyard",
    categoria: "ficção",
  },
  {
    id: 4,
    nome: "O prícipe cruel",
    autor: "Holly Black",
    categoria: "Fantasia Épica",
  },
  {
    id: 5,
    nome: "Os miseráveis",
    autor: "Victor Hugo",
    categoria: "Literatura e Ficção",
  },
  {
    id: 6,
    nome: "Renegados",
    autor: "Marissa Meyer",
    categoria: "Ação e Aventura",
  },
  {
    id: 7,
    nome: "A rainha vermelha",
    autor: "Victoria Aveyard",
    categoria: "ficção",
  },
  {
    id: 8,
    nome: "O prícipe cruel",
    autor: "Holly Black",
    categoria: "Fantasia Épica",
  },
  {
    id: 9,
    nome: "Os miseráveis",
    autor: "Victor Hugo",
    categoria: "Literatura e Ficção",
  },
  {
    id: 10,
    nome: "A rainha vermelha",
    autor: "Victoria Aveyard",
    categoria: "ficção",
  },
  {
    id: 11,
    nome: "O prícipe cruel",
    autor: "Holly Black",
    categoria: "Fantasia Épica",
  },
  {
    id: 12,
    nome: "Os miseráveis",
    autor: "Victor Hugo",
    categoria: "Literatura e Ficção",
  },
];

export default function Remover() {
  const [page, setPage] = useState(0);
  const [livros, setLivros] = useState<Props[]>([]);
  const [filterData, setFilterData] = useState<Props[]>([]);
  const n = 6;

  // async function getLivros() {
  //   const data = await fetch("/api/livro");
  //   // console.log(data);
  // }

  useEffect(() => {
    setFilterData(
      data.filter((item: Props, index: number) => {
        return index >= page * n && index < (page + 1) * n;
      })
    );
  }, [page]);

  useEffect(() => {
    // getLivros();
  }, []);

  const quantidadePaginas = Math.ceil(data.length / n);

  return (
    <div className="w-full p-10 items-center flex flex-col ">
      <div className="flex flex-col items-center justify-center py-8 px-8 h-[380px]  ">
        <InputBusca placeholderInput="Digite o nome do livro que procura" />
        <div className=" flex flex-row items-center gap-10 justify-center py-8">
          {filterData &&
            filterData.map((item: Props, index: number) => (
              <Livro key={index} {...item} />
            ))}
        </div>
      </div>
      <Pagination quantidadePaginas={quantidadePaginas} setPage={setPage} />
    </div>
  );
}
