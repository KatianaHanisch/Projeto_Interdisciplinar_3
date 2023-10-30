"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useTheme } from "@/app/context/ThemeContext";

import TituloPagina from "../../components/TituloPagina";
import ListaDashboard from "../../components/ListaDashboard";

import { DadosListaProps } from "@/app/types/DashboardTypes";

import { IoClose } from "react-icons/io5";
import { BsFiletypePdf } from "react-icons/bs";
import { VscSearchStop } from "react-icons/vsc";

import ExportarPDF from "@/app/reports/ExportarPDF";

export default function Retiradas() {
  const { validateTokenRoleFunction, isAuthenticated, token } = useAuth();
  const { themeValue } = useTheme();

  const [dados, setDados] = useState<DadosListaProps[]>([]);
  const [carregando, setCarregando] = useState(true);

  function formatarTelefone(telefone: string) {
    const numeroLimpo = telefone.replace(/\D/g, "");

    const formato = /(\d{2})(\d{4,})(\d{4})/;
    const numeroFormatado = numeroLimpo.replace(formato, "($1) $2-$3");

    return numeroFormatado;
  }

  function formatarData(data: string): string {
    const date = new Date(data);
    const dia = date.getDate().toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const ano = date.getFullYear().toString();
    return `${dia}/${mes}/${ano}`;
  }

  function exportarPdf() {
    if (dados.length > 0) {
      ExportarPDF(dados, "pendentes");
    }
  }

  async function getEmprestimosPendentes() {
    setCarregando(true);
    try {
      const res = await fetch("/api/dashboard/emprestimosPendentes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      const dadosFormatados = data.map((item: DadosListaProps) => ({
        ...item,
        telefone: formatarTelefone(item.telefone!),
        dataRetirada: formatarData(item.dataRetirada!),
        dataVencimento: formatarData(item.dataVencimento!),
      }));

      setDados(dadosFormatados);

      console.log(dadosFormatados);

      setCarregando(false);
    } catch (error) {
      setCarregando(false);
      console.log(error);
    }
  }

  useEffect(() => {
    validateTokenRoleFunction();
    getEmprestimosPendentes();
  }, [validateTokenRoleFunction]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      className={`w-full h-screen  ${
        themeValue === "light"
          ? "bg-light-dashboardLight"
          : "bg-dark-dashboardDark"
      }`}
    >
      <div className="w-full h-5/6 pt-4  pr-10 pl-2">
        <div
          className={`${
            themeValue === "light"
              ? "bg-light-dashbardWhite"
              : "bg-dark-dashboardSecundaryColor"
          } h-full w-full rounded-lg shadow-md`}
        >
          <div className="w-full h-full p-10">
            <TituloPagina
              tituloPagina="Empréstimos pedentes"
              tituloButton="Gerar relatório"
              Icone={BsFiletypePdf}
              gerarRelatorio={exportarPdf}
              tipoButton="relatorio"
            />
            {carregando ? (
              <div className="flex items-center justify-center w-full h-full">
                <span className="h-11 w-11 block rounded-full border-4 border-t-blue-600 animate-spin"></span>
              </div>
            ) : (
              <>
                {dados.length < 1 ? (
                  <div className="w-full  h-80 flex items-center justify-center flex-col  ">
                    <VscSearchStop
                      size={40}
                      color={`${
                        themeValue === "light" ? "#8a9099" : "#f1f5f9"
                      }`}
                    />
                    <p
                      className={`${
                        themeValue === "light"
                          ? "text-light-dashboardTextSecundary"
                          : "text-dark-dashboardTextSecundary"
                      } text-lg`}
                    >
                      Não há nenhum empréstimo pendente
                    </p>
                  </div>
                ) : (
                  <ListaDashboard
                    token={token}
                    dados={dados}
                    recarregarDados={getEmprestimosPendentes}
                    tituloButton="Devolvido"
                    corButton="vermelha"
                    tipo="pedente"
                    Icone={<IoClose size={20} color={"#ffffff"} />}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
