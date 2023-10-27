"use client";

import { useState, useEffect } from "react";

import { useAuth } from "../../../../context/AuthContext";
import { useTheme } from "@/app/context/ThemeContext";

import { DadosListaProps } from "@/app/types/DashboardTypes";

import TituloPagina from "../../components/TituloPagina";
import ListaDashboard from "../../components/ListaDashboard";

import ExportarPDF from "@/app/reports/ExportarPDF";

import { MdDone } from "react-icons/md";
import { BsFiletypePdf } from "react-icons/bs";
import { VscSearchStop } from "react-icons/vsc";

export default function Reservas() {
  const { validateTokenRoleFunction, isAuthenticated } = useAuth();
  const { themeValue } = useTheme();

  const [dados, setDados] = useState<DadosListaProps[]>([]);
  const [carregando, setCarregando] = useState(false);

  function formatarTelefone(telefone: string) {
    const numeroLimpo = telefone.replace(/\D/g, "");

    const formato = /(\d{2})(\d{4,})(\d{4})/;
    const numeroFormatado = numeroLimpo.replace(formato, "($1) $2-$3");

    return numeroFormatado;
  }

  async function getReservas() {
    setCarregando(true);

    try {
      const res = await fetch("/api/dashboard/reservasLivros");
      const data = await res.json();

      const dadosFormatados = data.map((item: DadosListaProps) => ({
        ...item,
        telefone: formatarTelefone(item.telefone!),
      }));

      setDados(dadosFormatados);

      setCarregando(false);
      console.log(data);
    } catch (error) {
      setCarregando(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getReservas();
  }, []);

  useEffect(() => {
    validateTokenRoleFunction();
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
          <div className="w-full h-full flex flex-col p-10">
            <TituloPagina
              gerarRelatorio={() => ExportarPDF(dados)}
              tipoButton="relatorio"
              tituloPagina="Reservas de livros"
              tituloButton="Gerar relatório"
              Icone={BsFiletypePdf}
            />
            {carregando ? (
              <div className="flex items-center justify-center w-full h-full">
                <span className="h-11 w-11 block rounded-full border-4 border-t-blue-600 animate-spin"></span>
              </div>
            ) : (
              <>
                {dados.length < 1 ? (
                  <div className="w-full h-80 flex items-center justify-center flex-col">
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
                      Não há nenhuma reserva pendente
                    </p>
                  </div>
                ) : (
                  <ListaDashboard
                    recarregarDados={getReservas}
                    dados={dados}
                    tituloButton="Reservado"
                    corButton="verde"
                    tipo="reserva"
                    Icone={<MdDone size={22} color={"#ffffff"} />}
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
