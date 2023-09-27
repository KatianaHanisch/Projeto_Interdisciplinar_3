"use client";

import CardTotalizadorDashboard from "./components/CardTotalizadorDashboard";
import CardFraseDashboard from "./components/CardFraseDashboard";
import CardImagemDashboard from "./components/CardImagemDashboard";

import { BiSolidBookOpen } from "react-icons/bi";
import { useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { validateTokenRoleFunction, isAuthenticated } = useAuth();

  useEffect(() => {
    validateTokenRoleFunction();
  }, [validateTokenRoleFunction]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="grid grid-cols-3 grid-rows-3 gap-7 h-full p-11">
      <CardTotalizadorDashboard
        IconeCard={BiSolidBookOpen}
        tituloCard="Empréstimos Pedentes"
        informacaoCard={5}
      />
      <CardTotalizadorDashboard
        IconeCard={BiSolidBookOpen}
        tituloCard="Empréstimos Finalizados"
        informacaoCard={22}
      />
      <CardTotalizadorDashboard
        IconeCard={BiSolidBookOpen}
        tituloCard="Livros Cadastrados"
        informacaoCard={222}
      />
      <CardFraseDashboard />
      <CardImagemDashboard />
    </main>
  );
}
