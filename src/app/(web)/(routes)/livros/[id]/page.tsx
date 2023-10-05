"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

import { LivroProps } from "@/app/types/DashboardTypes";

type DataPostProps = {
  userId: number;
  livroId: number;
  status: number;
};

export default function Detalhes({ params }: { params: { id: string } }) {
  const [carregando, setCarregando] = useState(false);
  const [carregandoEmprestimo, setCaregandoEmprestimo] = useState(false);
  const [livro, setLivro] = useState<LivroProps>({
    titulo: "",
    autor: "",
    capaUrl: "",
    sinopse: "",
    categoria: "",
  });

  const [dataPost, setDataPost] = useState<DataPostProps>({
    userId: 0,
    livroId: 0,
    status: 0,
  });

  const idLivro = parseInt(params.id);

  async function cadastroEmprestimo() {
    setCaregandoEmprestimo(true)
    const token = await sessionStorage.getItem("token");

    if (!token) {
      console.log("Erro");
      setCaregandoEmprestimo(false)
      return;
    }

    setDataPost({
      userId: dataPost.userId,
      livroId: idLivro,
      status: 1,
    });

    try {
      const response = await fetch("/api/web/emprestimo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(dataPost),
      });
      setCaregandoEmprestimo(false)
    } catch (error) {
      setCaregandoEmprestimo(false)
      console.log(error);
    }
  }

  async function getLivro() {
    setCarregando(true);
    try {
      const response = await fetch(`/api/dashboard/filtroLivro?id=${idLivro}`, {
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
    <div className="m-auto mt-32 mb-32 px-3 xl:p-0 max-w-[1200px]">
      <div className="flex md:flex-row flex-col justify-center">
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
              <button
                onClick={cadastroEmprestimo}
                className="flex items-center justify-center text-slate-900 bg-green-400 w-[300px] mt-1 rounded p-2 hover:bg-green-500"
              >
               {carregandoEmprestimo ? (
                <span className="h-6 w-6 block rounded-full border-4 border-t-blue-500 animate-spin"></span>
               ):  "Pegar Livro emprestado"}
              </button>
              ou
              <button className="text-slate-900 bg-green-400 w-[300px] mt-1 rounded p-2 hover:bg-green-500">
                Reservar Livro
              </button>
            </div>
            <div className="flex flex-col pl-3 mt-3 xl:ml-0 text-slate-900">
              <div>
                <h1 className="text-2xl font-semibold text-center md:text-start mb-1">
                  {livro.titulo}
                </h1>
                <h3 className="text-center md:text-start font-semibold">
                  {livro.autor}
                </h3>
                <h3 className="mb-2 text-center md:text-start">
                  {livro.categoria}
                </h3>
                <p className="mb-2">{livro.sinopse}</p>
              </div>
              <div className="mt-3">
                <h3 className="text-xl text-center md:text-start font-semibold">
                  Disponibilidade
                </h3>
                <p>
                  Livro indisponível para empréstimo, faltam 2 dias para que o
                  livro seja devolvido. Ao solicitar empréstimo, retire o livro
                  em nossa biblioteca em até 2h.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
