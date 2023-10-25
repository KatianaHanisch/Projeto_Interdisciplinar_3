"use client";

import React, { useState, useEffect } from "react";
import type { Metadata } from "next";

import { LivroProps } from "@/app/types/Types";
import { useTheme } from "../../../context/ThemeContext";

import ListBorrowed from "../../components/ListBorrowed";
import SnackBar from "@/app/components/SnackBar";

import { VscSearchStop } from "react-icons/vsc";

export const metadata: Metadata = {
  title: "Biblioteca - Empréstimos",
};

export default function Emprestimos() {
  const { themeValue } = useTheme();

  const [livros, setLivros] = useState<LivroProps[]>([]);
  const [carregando, setCarregando] = useState(false);

  const [abrirSnackBar, setAbrirSnackBar] = useState(false);
  const [mensagemSnackBar, setMensagemSnackBar] = useState("");
  const [tipoSnackBar, setTipoSnackBar] = useState("");

  function fecharSnackBar() {
    setAbrirSnackBar(false);
  }

  async function getLivrosUsuario() {
    setCarregando(true);
    const token = await sessionStorage.getItem("token");

    try {
      const response = await fetch(`/api/web/usuarioEmprestimos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setLivros(data);

      setCarregando(false);
    } catch (error) {
      setCarregando(false);
      setTipoSnackBar("erro");
      setMensagemSnackBar(
        "Ocorreu um erro ao carregar seus livros. Tente novamente"
      );
      setAbrirSnackBar(true);

      setTimeout(() => {
        setAbrirSnackBar(false);
      }, 3000);
      console.log(error);
    }
  }

  useEffect(() => {
    getLivrosUsuario();
  }, []);

  return (
    <div
      className={`${themeValue === "dark" ? "bg-dark-back" : "bg-light-back"}`}
    >
      {carregando ? (
        <div className="w-full pt-60 pb-60 flex items-center justify-center">
          <span className="h-12 w-12 block rounded-full border-4 border-t-blue-500 animate-spin"></span>
        </div>
      ) : (
        <div className="pb-14">
          {livros.length === 0 ? (
            <div className="w-full pt-60 pb-60 flex items-center justify-center flex-col  ">
              <VscSearchStop size={40} color="#8a9099" />
              <p className="text-gray-600 text-lg">
                Não há nenhum empréstimo pendente
              </p>
            </div>
          ) : (
            <ListBorrowed livros={livros} />
          )}
        </div>
      )}

      {abrirSnackBar && (
        <SnackBar
          tipo={tipoSnackBar}
          mensagem={mensagemSnackBar}
          fecharSnackBar={fecharSnackBar}
        />
      )}
    </div>
  );
}
