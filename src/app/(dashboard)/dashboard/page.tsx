"use client";

import { useState, useEffect } from "react";

import CardTotalizadorDashboard from "./components/CardTotalizadorDashboard";
import CardFraseDashboard from "./components/CardFraseDashboard";
import CardImagemDashboard from "./components/CardImagemDashboard";
import SnackBar from "@/app/components/SnackBar";

import { TotalizadoresProps } from "@/app/types/DashboardTypes";

import { BiSolidBookOpen } from "react-icons/bi";

import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { validateTokenRoleFunction, isAuthenticated } = useAuth();
  const [dados, setDados] = useState<TotalizadoresProps | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [messagemSnackBar, setMessagemSnackBar] = useState("");
  const [tipoSnackBar, setTipoSnackBar] = useState("");
  const [abrirSnackBar, setAbrirSnackBar] = useState(false);

  function fecharSnackBar() {
    setAbrirSnackBar(false);
  }

  async function getTotatizadores() {
    setCarregando(true);
    try {
      const response = await fetch("/api/dashboard/totalizadores", {
        method: "GET",
      });

      const data = await response.json();
      setDados(data);

      setCarregando(false);
    } catch (error) {
      setMessagemSnackBar("Não foi possível carrgar os dados");
      setTipoSnackBar("erro");
      setAbrirSnackBar(true);

      setTimeout(() => {
        setAbrirSnackBar(false);
      }, 3000);

      setCarregando(false);
      console.log(error);
    }
  }

  useEffect(() => {
    validateTokenRoleFunction();
  }, [validateTokenRoleFunction]);

  useEffect(() => {
    if (isAuthenticated) {
      getTotatizadores();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-gray-100 h-full w-full rounded-lg shadow-md">
      <main className="grid grid-cols-3 grid-rows-3 gap-7 h-full p-11">
        <CardTotalizadorDashboard
          IconeCard={BiSolidBookOpen}
          tituloCard="Empréstimos Pedentes"
          informacaoCard={
            carregando ? (
              <span className="h-6 w-6 block rounded-full border-4 border-t-blue-600 animate-spin"></span>
            ) : (
              dados?.emprestimosPendentes
            )
          }
        />
        <CardTotalizadorDashboard
          IconeCard={BiSolidBookOpen}
          tituloCard="Empréstimos Finalizados"
          informacaoCard={
            carregando ? (
              <span className="h-6 w-6 block rounded-full border-4 border-t-blue-600 animate-spin"></span>
            ) : (
              dados?.emprestimosFinalizados
            )
          }
        />
        <CardTotalizadorDashboard
          IconeCard={BiSolidBookOpen}
          tituloCard="Livros Cadastrados"
          informacaoCard={
            carregando ? (
              <span className="h-6 w-6 block rounded-full border-4 border-t-blue-600 animate-spin"></span>
            ) : (
              dados?.totalLivrosCadastrados
            )
          }
        />
        <CardFraseDashboard />
        <CardImagemDashboard />

        {abrirSnackBar && (
          <SnackBar
            mensagem={messagemSnackBar}
            tipo={tipoSnackBar}
            fecharSnackBar={fecharSnackBar}
          />
        )}
      </main>
    </div>
  );
}
