"use client";

import { useState, useEffect } from "react";

import CardTotalizadorDashboard from "./components/CardTotalizadorDashboard";
import CardFraseDashboard from "./components/CardFraseDashboard";
import CardImagemDashboard from "./components/CardImagemDashboard";

import { TotalizadoresProps } from "@/app/types/DashboardTypes";

import { BiSolidBookOpen } from "react-icons/bi";

import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { validateTokenRoleFunction, isAuthenticated } = useAuth();
  const [dados, setDados] = useState<TotalizadoresProps | null>(null);

  async function getTotatizadores() {
    const response = await fetch("/api/dashboard/totalizadores", {
      method: "GET",
    });

    const data = await response.json();
    console.log(data);

    setDados(data);
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
    <main className="grid grid-cols-3 grid-rows-3 gap-7 h-full p-11">
      <CardTotalizadorDashboard
        IconeCard={BiSolidBookOpen}
        tituloCard="Empréstimos Pedentes"
        informacaoCard={
          dados?.emprestimosPendentes
            ? dados.emprestimosPendentes < 1
              ? "nenhum empréstmo pedente"
              : dados.emprestimosPendentes
            : "carregando"
        }
      />
      <CardTotalizadorDashboard
        IconeCard={BiSolidBookOpen}
        tituloCard="Empréstimos Finalizados"
        informacaoCard={
          dados?.emprestimosFinalizados
            ? dados.emprestimosFinalizados < 1
              ? "nenhum empréstmo finalizado"
              : dados.emprestimosFinalizados
            : "carregando"
        }
      />
      <CardTotalizadorDashboard
        IconeCard={BiSolidBookOpen}
        tituloCard="Livros Cadastrados"
        informacaoCard={
          dados?.totalLivrosCadastrados
            ? dados.totalLivrosCadastrados < 1
              ? "nenhum livro cadastrado"
              : dados.totalLivrosCadastrados
            : "carregando"
        }
      />
      <CardFraseDashboard />
      <CardImagemDashboard />
    </main>
  );
}
