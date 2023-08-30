"use client";

import { useState, useEffect } from "react";
import { ListaProps } from "../types/ListaProps";
import { DadosListaProps } from "../types/DadosListaProps";

import InputBusca from "./InputBusca";
import LinhasTabela from "./LinhasTabela";
import Pagination from "@/app/components/Pagination";

export default function ListaDashboard({
  dados,
  tituloButton,
  corButton,
  Icone,
  abrirModal,
}: ListaProps) {
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState<DadosListaProps[]>([]);
  const itemPorPagina = 5;

  useEffect(() => {
    setFilterData(
      dados.filter((item: DadosListaProps, index: number) => {
        return (
          index >= page * itemPorPagina && index < (page + 1) * itemPorPagina
        );
      })
    );
  }, [page]);

  const quantidadePaginas = Math.ceil(dados.length / itemPorPagina);

  const pagination = quantidadePaginas > 1;

  return (
    <div className="w-full h-full py-6 px-4">
      <div className="w-full   flex items-center justify-end">
        <div className="w-1/2 py-4 ">
          <InputBusca placeholderInput="Digite o nome que procura" />
        </div>
      </div>
      <div className="w-full mt-1 shadow-md">
        <table className="w-full divide-y bg-gray-200  divide-gray-200 text-left">
          <thead className="text-base font-medium text-gray-700  ">
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Telefone</th>
              <th className="px-6 py-3">Livro</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filterData &&
              filterData.map(({ nome, livro, telefone }, index) => (
                <LinhasTabela
                  key={index}
                  nome={nome}
                  livro={livro}
                  telefone={telefone}
                  tituloButton={tituloButton}
                  corButton={corButton}
                  Icone={Icone}
                  abrirModal={abrirModal}
                />
              ))}
          </tbody>
        </table>
      </div>
      {pagination ? (
        <Pagination quantidadePaginas={quantidadePaginas} setPage={setPage} />
      ) : null}
    </div>
  );
}
