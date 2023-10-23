"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../../../../context/ThemeContext";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { LivroProps } from "@/app/types/Types";
import SnackBar from "@/app/components/SnackBar";

export default function Detalhes({ params }: { params: { id: string } }) {
  const [carregando, setCarregando] = useState(true);
  const [carregandoEmprestimo, setCarregandoEmprestimo] = useState(false);
  const [carregandoReserva, setCarregandoReserva] = useState(false);
  const [mensagemSnackBar, setMensagemSnackBar] = useState("");
  const [abrirSnackBar, setAbrirSnackBar] = useState(false);
  const [tipoSnackBar, setTipoSnackBar] = useState("");
  const [livro, setLivro] = useState<LivroProps>({
    titulo: "",
    autor: "",
    capaUrl: "",
    sinopse: "",
    categoria: "",
  });

  const { themeValue } = useTheme();

  const router = useRouter();

  const idLivro = parseInt(params.id);

  function fecharSnackBar() {
    setAbrirSnackBar(false);
  }

  async function cadastroReserva() {
    setCarregandoReserva(true);
    const token = await sessionStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }

    try {
      const response = await fetch(`/api/web/reserva?id=${idLivro}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 400) {
        setTipoSnackBar("erro");
        setMensagemSnackBar("Você já realizou a reserva desse livro");
        setAbrirSnackBar(true);

        setTimeout(() => {
          setAbrirSnackBar(false);
        }, 4000);
      }

      if (response.status === 201) {
        setTipoSnackBar("sucesso");
        setMensagemSnackBar(
          "Reserva cadastrada com sucesso. Quando o livro estiver disponível entraremos em contato."
        );
        setAbrirSnackBar(true);

        setTimeout(() => {
          setAbrirSnackBar(false);
        }, 3000);
      }
      setCarregandoReserva(false);
    } catch (error) {
      setCarregandoReserva(false);
      console.log(error);
    }
  }

  async function cadastroEmprestimo() {
    setCarregandoEmprestimo(true);
    const token = await sessionStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }

    try {
      const response = await fetch(`/api/web/emprestimo?id=${idLivro}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 404) {
        setTipoSnackBar("erro");
        setMensagemSnackBar(
          "Você atigiu a quantidade limite de empréstimos simultâneos"
        );
        setAbrirSnackBar(true);

        setTimeout(() => {
          setAbrirSnackBar(false);
        }, 4000);

        setCarregandoEmprestimo(false);
      }

      if (response.status === 400) {
        setTipoSnackBar("erro");
        setMensagemSnackBar(
          "Você já realizou o empréstimo desse livro e ainda não fez a devolução. Faça a devolução de alguma livro para proseguir"
        );
        setAbrirSnackBar(true);

        setTimeout(() => {
          setAbrirSnackBar(false);
        }, 4000);

        setCarregandoEmprestimo(false);
      }

      if (response.status === 201) {
        await atualizarQuantidadeDisponivel();
        setCarregandoEmprestimo(false);
      }
      setCarregandoEmprestimo(false);
    } catch (error) {
      setCarregandoEmprestimo(false);
      console.log(error);
    }
  }

  async function atualizarQuantidadeDisponivel() {
    try {
      const response = await fetch(
        `/api/web/atualizarQuantidade?id=${idLivro}`,
        {
          method: "POST",
        }
      );

      if (response.status === 200) {
        setTipoSnackBar("sucesso");
        setMensagemSnackBar(
          "Empréstimo realizado com sucesso. Agora você precisa ir retirar-lo"
        );
        setAbrirSnackBar(true);

        setTimeout(() => {
          setAbrirSnackBar(false);
          getLivro();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    getLivro();
  }, []);

  return (
    <div
      className={`m-auto xl:p-0 w-full ${
        themeValue === "dark"
          ? "text-dark-text bg-dark-back"
          : "text-light-text bg-light-back"
      }`}
    >
      <div className="flex md:flex-row flex-col justify-center max-w-[1200px] m-auto pt-32 pb-32 px-3">
        {carregando ? (
          <span className="h-12 w-12 block rounded-full border-4 border-t-blue-500 animate-spin"></span>
        ) : (
          <>
            {abrirSnackBar && (
              <SnackBar
                fecharSnackBar={fecharSnackBar}
                mensagem={mensagemSnackBar}
                tipo={tipoSnackBar}
              />
            )}
            <div className="w-full flex flex-col justify-center items-center ">
              <Image
                src={livro.capaUrl!}
                width={300}
                height={440}
                alt="Capa do livro"
                className="shadow-lg"
              />
              {livro.quantidadeDisponivel !== undefined &&
              livro.quantidadeDisponivel < 1 ? null : (
                <>
                  <button
                    onClick={cadastroEmprestimo}
                    className={`flex items-center justify-center bg-green-400 w-[300px] mt-1 rounded p-2 hover:bg-green-500  ${
                      themeValue === "dark"
                        ? "text-dark-text"
                        : "text-light-text"
                    }`}
                  >
                    {carregandoEmprestimo ? (
                      <span
                        className={`h-6 w-6 block rounded-full border-4 border-t-blue-500 animate-spin`}
                      ></span>
                    ) : (
                      "Pegar Livro emprestado"
                    )}
                  </button>
                  <p>ou</p>
                </>
              )}
              <button
                onClick={cadastroReserva}
                className={`flex items-center justify-center text-slate-900 bg-green-400 w-[300px] mt-1 rounded p-2 hover:bg-green-500 `}
              >
                {carregandoReserva ? (
                  <span className="h-6 w-6 block rounded-full border-4 border-t-blue-500 animate-spin"></span>
                ) : (
                  "Reservar livro"
                )}
              </button>
            </div>
            <div
              className={`flex flex-col pl-3 mt-3 xl:ml-0  ${
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
                  Empréstimo
                </h3>
                <p>
                  Ao realizar o empréstimo você tem o prazo de 30 dias para
                  realizar a devolução.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
