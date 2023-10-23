"use client";

import { useState, useEffect } from "react";

import { useTheme } from "../../../../context/ThemeContext";

import Image from "next/image";

import { LivroProps } from "@/app/types/Types";

import SnackBar from "@/app/components/SnackBar";

export default function Detalhes({ params }: { params: { id: string } }) {
  const [carregando, setCarregando] = useState(true);
  const [dadosEmprestimo, setDadosEmprestimo] = useState<LivroProps[]>([]);
  const [mensagemSnackBar, setMensagemSnackBar] = useState("");
  const [abrirSnackBar, setAbrirSnackBar] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [tipoSnackBar, setTipoSnackBar] = useState("");
  const [detalhesEmprestimo, setDetalhesEmprestimo] = useState<
    LivroProps | undefined
  >(undefined);
  const [livro, setLivro] = useState<LivroProps>({
    titulo: "",
    autor: "",
    capaUrl: "",
    sinopse: "",
    categoria: "",
  });

  const { themeValue } = useTheme();

  const idLivro = parseInt(params.id);

  function fecharSnackBar() {
    setAbrirSnackBar(false);
  }

  function calcularTempoRestante(dataVencimento: string): number {
    const dataVencimentoObj = new Date(dataVencimento);
    const dataAtual = new Date();

    const diferenca = dataVencimentoObj.getTime() - dataAtual.getTime();
    const diasRestantes = Math.floor(diferenca / (1000 * 60 * 60 * 24)); // Converter a diferença em dias

    return diasRestantes;
  }

  async function getLivro() {
    try {
      const response = await fetch(`/api/filtroLivro?id=${idLivro}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setLivro(data);

      setCarregando(false);
    } catch (error) {
      console.log(error);
      setCarregando(false);
    }
  }

  async function getLivrosUsuario() {
    const token = await sessionStorage.getItem("token");

    try {
      const response = await fetch(`/api/web/usuarioEmprestimos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setDadosEmprestimo(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLivro();
    getLivrosUsuario();
  }, [idLivro]);

  useEffect(() => {
    const detalhesEmprestimo = dadosEmprestimo.find(
      (item) => item.id === idLivro
    );

    console.log(detalhesEmprestimo);

    if (detalhesEmprestimo) {
      const diasRestantes = calcularTempoRestante(
        detalhesEmprestimo.dataVencimento || ""
      );
      setTempoRestante(diasRestantes);
      setDetalhesEmprestimo(detalhesEmprestimo);
    }
  }, [dadosEmprestimo, idLivro]);

  return (
    <div
      className={`m-auto xl:p-0 w-full ${
        themeValue === "dark" ? "bg-dark-back" : "bg-light-back"
      }`}
    >
      <div className="flex md:flex-row flex-col justify-center max-w-[1200px] pt-32 pb-32 px-3 m-auto">
        {carregando ? (
          <span className="h-12 w-12 block rounded-full border-4 border-t-blue-500 animate-spin"></span>
        ) : (
          <>
            <div className="w-full flex flex-col justify-center items-center ">
              <Image
                src={livro.capaUrl!}
                width={300}
                height={440}
                alt="Capa do livro"
                className="shadow-lg"
              />
              <button className="flex items-center justify-center text-slate-900 bg-green-400 w-[300px] mt-1 rounded p-2 hover:bg-green-500">
                Seu emprestimo desse livro ainda não foi finalizado
              </button>
            </div>
            <div
              className={`flex flex-col pl-3 mt-3 xl:ml-0 ${
                themeValue === "dark" ? "text-dark-text" : "text-light-text"
              }`}
            >
              <div>
                <h1 className="text-2xl font-semibold capitalize text-center md:text-start mb-1">
                  {livro.titulo}
                </h1>
                <h3 className="text-center capitalize md:text-start font-semibold">
                  {livro.autor}
                </h3>
                <h3 className="mb-2 text-center capitalize md:text-start">
                  {livro.categoria}
                </h3>
                <p className="mb-2">{livro.sinopse}</p>
              </div>
              <div className="mt-3">
                <h3 className="text-xl text-center md:text-start font-semibold">
                  Tempo do empréstimo restante
                </h3>
                <p>
                  {tempoRestante && (
                    <>
                      Restam{" "}
                      <span className="font-semibold">
                        {" "}
                        {tempoRestante} dias
                      </span>{" "}
                      para o prazo do seu empréstimo acabar.
                    </>
                  )}
                </p>
              </div>
            </div>
          </>
        )}
        {abrirSnackBar && (
          <SnackBar
            fecharSnackBar={fecharSnackBar}
            mensagem={mensagemSnackBar}
            tipo={tipoSnackBar}
          />
        )}
      </div>
    </div>
  );
}
