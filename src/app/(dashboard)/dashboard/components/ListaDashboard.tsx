"use client";

import { useState, useEffect } from "react";

import { ListaProps, DadosListaProps } from "@/app/types/DashboardTypes";

import InputBusca from "./InputBusca";
import LinhasTabela from "./LinhasTabela";
import Pagination from "@/app/components/Pagination";

export default function ListaDashboard({
  dados,
  tituloButton,
  corButton,
  Icone,
  tipo,
  recarregarDados,
}: ListaProps) {
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState<DadosListaProps[]>([]);
  const [textoBusca, setTextoBusca] = useState("");
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

  const filteredData = filterData.filter((item: DadosListaProps) =>
    item.livro.toLowerCase().includes(textoBusca.toLowerCase())
  );

  return (
    <div className="w-full h-full py-6 px-4 ">
      <div className="w-full flex items-center justify-end">
        <div className="w-1/2 py-4 ">
          <InputBusca
            placeholderInput="Digite o livro que procura"
            value={textoBusca}
            onChange={(e) => setTextoBusca(e.target.value)}
          />
        </div>
      </div>

      <div className=" flex items-start justify-center w-full  mt-1 shadow-md">
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
            {filteredData &&
              filteredData.map(({ usuario, livro, id }, index) => (
                <LinhasTabela
                  key={index}
                  nome={usuario}
                  livro={livro}
                  id={id}
                  recarregarDados={recarregarDados}
                  // telefone={telefone}
                  tituloButton={tituloButton}
                  corButton={corButton}
                  Icone={Icone}
                  tipo={tipo}
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
