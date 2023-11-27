"use client";

import { useState, useEffect } from "react";

import { useTheme } from "@/app/context/ThemeContext";

import { ListaProps, DadosListaProps } from "@/app/types/DashboardTypes";

import InputBusca from "./InputBusca";
import LinhasTabela from "./LinhasTabela";
import Pagination from "@/app/components/Pagination";

import { VscSearchStop } from "react-icons/vsc";

export default function ListaDashboard({
  dados,
  tituloButton,
  corButton,
  Icone,
  tipo,
  token,
  recarregarDados,
}: ListaProps) {
  const [page, setPage] = useState(0);
  const [filteredData, setFilteredData] = useState<DadosListaProps[]>([]);
  const [pagination, setPagination] = useState(false);
  const [tituloBusca, setTituloBusca] = useState("");
  const [quantidadePaginas, setQuantidadePaginas] = useState(0);

  const { themeValue } = useTheme();

  const itemPorPagina = 5;

  function quatidadePaginasInicial() {
    const newQuantidadePaginas = Math.ceil(dados.length / itemPorPagina);
    setQuantidadePaginas(newQuantidadePaginas);

    const newPagination = newQuantidadePaginas > 1;
    setPagination(newPagination);
  }

  const applyFilter = (data: DadosListaProps[]) => {
    const filteredData = data.filter(
      (item: DadosListaProps) =>
        typeof item.livro === "string" &&
        item.livro.toLowerCase().includes(tituloBusca.toLowerCase())
    );

    setFilteredData(filteredData);

    const newQuantidadePaginas = Math.ceil(filteredData.length / itemPorPagina);
    setQuantidadePaginas(newQuantidadePaginas);

    const newPagination = newQuantidadePaginas > 1;
    setPagination(newPagination);
  };

  useEffect(() => {
    applyFilter(dados);
  }, [dados]);

  const handleSearch = () => {
    applyFilter(dados);

    setPage(0);
  };

  const handleSearchClear = () => {
    setTituloBusca("");
    applyFilter(dados);
    setPage(0);
  };

  useEffect(() => {
    if (tituloBusca === "") {
      handleSearchClear();
    }
  }, [tituloBusca]);

  useEffect(() => {
    quatidadePaginasInicial();
  }, []);

  return (
    <div className="w-full h-full py-6 px-4 ">
      <div className="w-full flex items-center justify-end">
        <div className="w-1/2 py-4 flex items-center justify-end">
          <InputBusca
            placeholderInput="Digite o livro que procura"
            value={tituloBusca}
            onChange={(e) => setTituloBusca(e.target.value)}
            onSearch={handleSearch}
          />
        </div>
      </div>

      {filteredData.length < 1 ? (
        <div className="w-full h-52 flex items-center justify-center flex-col  ">
          <VscSearchStop
            size={40}
            color={`${themeValue === "light" ? "#1f2937" : "#f1f5f9"}`}
          />
          <p
            className={`${
              themeValue === "light"
                ? "text-light-dashboardTextSecundary"
                : "text-dark-dashboardTextSecundary"
            } text-lg`}
          >
            Nenhum item encontrado
          </p>
        </div>
      ) : (
        <div className=" flex items-start justify-center w-full  mt-1 shadow-md">
          <table
            className={`${
              themeValue === "light"
                ? "bg-gray-200  divide-gray-200"
                : "bg-gray-800 divide-gray-400"
            } w-full divide-y text-left rounded-md`}
          >
            <thead
              className={`${
                themeValue === "light"
                  ? "text-light-dashboardText"
                  : "text-dark-dashboardText"
              } text-base font-medium`}
            >
              <tr>
                <th className="px-6 py-3">Nome</th>
                <th className="px-6 py-3">Telefone</th>
                <th className="px-6 py-3">Livro</th>
                <th className="px-6 py-3">
                  {tipo === "retirado" || tipo === "finalizado"
                    ? "Emprestimo"
                    : "Retirada"}
                </th>
                <th className="px-6 py-3">
                  {tipo === "finalizado" ? "Devolução" : "Vencimento"}
                </th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody
              className={`${
                themeValue === "light"
                  ? "bg-light-dashbardWhite divide-gray-200"
                  : "bg-gray-700 divide-gray-400"
              } divide-y`}
            >
              {filteredData
                .slice(page * itemPorPagina, (page + 1) * itemPorPagina)
                .map((item, index) => (
                  <LinhasTabela
                    key={index}
                    token={token}
                    item={item}
                    recarregarDados={recarregarDados}
                    tituloButton={tituloButton}
                    corButton={corButton}
                    Icone={Icone}
                    tipo={tipo}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
      {pagination ? (
        <Pagination quantidadePaginas={quantidadePaginas} setPage={setPage} />
      ) : null}
    </div>
  );
}
