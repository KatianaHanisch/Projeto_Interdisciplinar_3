"use client";

import { useState, useEffect } from "react";

import { LivroProps } from "@/app/types/Types";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Modal from "@/app/components/Modal";
import Button from "../../../components/Button";
import SnackBar from "@/app/components/SnackBar";

import { FaArrowLeft } from "react-icons/fa";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [abrirModal, setAbrirModal] = useState(false);
  const [sinopseCompleta, setSinopseCompleta] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [loandingDelete, setLoadingDelete] = useState(false);
  const [abrirSnackBar, setAbrirSnackBar] = useState(false);
  const [mensagemSnackBar, setMensagemSnackBar] = useState("");
  const [livroEscolhido, setLivroEscolhido] = useState<LivroProps>({
    titulo: "",
    autor: "",
    capaUrl: "",
    sinopse: "",
    categoria: "",
  });

  async function getLivro() {
    setCarregando(true);
    try {
      const res = await fetch(`/api/filtroLivro?id=${idLivro}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setLivroEscolhido(data);
      setCarregando(false);
    } catch (error) {
      console.log(error);
      setCarregando(false);
    }
  }
  async function deleteLivro() {
    setAbrirModal(false);
    setLoadingDelete(true);
    try {
      const response = await fetch(`/api/filtroLivro?id=${idLivro}`, {
        method: "DELETE",
      });
      setMensagemSnackBar("O livro foi removido com sucesso");
      setAbrirSnackBar(true);
      setLivroEscolhido({
        titulo: "",
        autor: "",
        capaUrl: "",
        sinopse: "",
        categoria: "",
      });

      setTimeout(() => {
        router.push("/dashboard/remover");
        setAbrirSnackBar(false);
      }, 2000);

      setLoadingDelete(false);
    } catch (error) {
      console.log(error);
      setLoadingDelete(false);
    }
  }

  const maxCaracteresSinopse = 800;

  const idLivro = parseInt(params.id);

  const { titulo, autor, categoria, capaUrl, sinopse } = livroEscolhido;

  const abrirModalConfirmacao = () => {
    setAbrirModal(true);
  };

  function fecharModalConfirmacao() {
    setAbrirModal(false);
  }
  function fecharSnackBar() {
    setAbrirSnackBar(false);
  }

  useEffect(() => {
    getLivro();
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="bg-gray-300 w-11/12 h-5/6 rounded-lg flex items-center justify-center shadow-md">
        {carregando ? (
          <span className="h-11 w-11 block rounded-full border-4 border-t-blue-600 animate-spin"></span>
        ) : (
          <>
            {livroEscolhido.titulo === "" ? null : (
              <>
                <div className=" h-full w-10 py-5">
                  <Link className="cursor-pointer" href="/dashboard/remover">
                    <FaArrowLeft size={25} color={"#374151"} />
                  </Link>
                </div>
                <div className="h-4/5 w-3/12 ">
                  <Image
                    src={capaUrl!}
                    alt="capa livro"
                    className="rounded-md"
                    width={500}
                    height={700}
                  />
                </div>
                <div className="flex flex-col items-start justify-start w-8/12 h-4/5  px-10 ">
                  <h1 className="text-3xl font-semibold  text-gray-700 mb-5">
                    {livroEscolhido.titulo}
                  </h1>
                  <p
                    className={`text-gray-600 text-left text-base max-h-56${
                      sinopseCompleta ? "max-h-56 overflow-y-auto" : ""
                    }`}
                  >
                    {sinopseCompleta
                      ? sinopse
                      : sinopse
                      ? `${sinopse.substring(0, maxCaracteresSinopse)}...`
                      : "Sinopse não disponível"}
                  </p>
                  {sinopse && sinopse.length > maxCaracteresSinopse && (
                    <button
                      className="text-indigo-700 mt-2 underline cursor-pointer"
                      onClick={() => setSinopseCompleta(!sinopseCompleta)}
                    >
                      {sinopseCompleta ? "Mostrar Menos" : "Leia Mais"}
                    </button>
                  )}
                  <div className="w-full py-7 flex items-center justify-start">
                    <Button
                      carregando={loandingDelete}
                      tituloButton="Remover livro"
                      abrirModal={abrirModalConfirmacao}
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      {abrirModal && (
        <Modal
          fecharModal={fecharModalConfirmacao}
          cancelarModal={fecharModalConfirmacao}
          confirmarModal={deleteLivro}
          title="Deseja confirmar?"
          textButton="Remover"
        >
          <div className="relative py-3 px-6  flex flex-col gap-3 mb-2">
            <p className="text-gray-600 text-lg font-normal leading-relaxed">
              Você realmente deseja remover o livro
              <span className="font-semibold text-gray-700"> {titulo} </span>
              da biblioteca?
            </p>
          </div>
        </Modal>
      )}

      {abrirSnackBar && (
        <SnackBar
          fecharSnackBar={fecharSnackBar}
          mensagem={mensagemSnackBar}
          tipo="sucesso"
        />
      )}
    </div>
  );
}
