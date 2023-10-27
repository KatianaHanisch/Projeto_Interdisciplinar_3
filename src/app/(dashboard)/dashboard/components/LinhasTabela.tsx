"use client";

import { useState } from "react";

import { useTheme } from "@/app/context/ThemeContext";

import { LinhasTabelaProps } from "@/app/types/DashboardTypes";

import ButtonTabela from "./ButtonTabela";
import Modal from "@/app/components/Modal";
import SnackBar from "@/app/components/SnackBar";

export default function LinhasTabela({
  id,
  nome,
  telefone,
  livro,
  tituloButton,
  corButton,
  Icone,
  tipo,
  recarregarDados,
}: LinhasTabelaProps) {
  const [abrirModal, setAbrirModal] = useState(false);
  const [tipoSnackBar, setTipoSnackBar] = useState("");
  const [mensagemSnackBar, setMensagemSnackBar] = useState("");
  const [abrirSnackBar, setAbrirSnackBar] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const { themeValue } = useTheme();

  function abrirModalConfirmacao() {
    if (tipo === "finalizado" || tipo === "reserva") {
      setAbrirModal(false);
    } else {
      setAbrirModal(!abrirModal);
    }
  }

  function fecharSnack() {
    setAbrirSnackBar(false);
  }

  async function devolverLivro() {
    try {
      const response = await fetch(`/api/dashboard/emprestimosFinalizados`, {
        method: "PUT",
      });

      recarregarDados?.();
    } catch (error) {
      console.log("Erro ao devolver livro: ", error);
    }
  }

  async function atualizarStatusLivro() {
    setAbrirModal(false);
    setCarregando(true);

    try {
      const response = await fetch(
        `/api/dashboard/retiradasPendentes?id=${id}`,
        {
          method: "PUT",
        }
      );

      if (response.status === 200) {
        devolverLivro();
      }
    } catch (error) {
      setTipoSnackBar("erro");
      setMensagemSnackBar("Não foi possíevl atualizar o status do livro");
      setAbrirSnackBar(true);

      setCarregando(false);

      setTimeout(() => {
        setAbrirSnackBar(false);
      }, 3000);
      console.error("Erro ao atualizar o status do livro:", error);
    }
  }

  return (
    <>
      <tr
        className={`${
          themeValue === "light"
            ? "text-light-dashboardText"
            : "text-dark-dashboardText"
        } text-sm font-medium`}
      >
        <td className="px-6 py-3">{nome}</td>
        <td className="px-6 py-3">{telefone}</td>
        <td className="px-6 py-3">{livro}</td>
        <td className="px-6 py-3">
          <ButtonTabela
            tituloButton={tituloButton}
            corButton={corButton}
            Icone={Icone}
            abrirModal={abrirModalConfirmacao}
            tipo={tipo}
          />
        </td>
      </tr>

      {abrirSnackBar && (
        <div className="w-full ml-52">
          <SnackBar
            mensagem={mensagemSnackBar}
            tipo={tipoSnackBar}
            fecharSnackBar={fecharSnack}
          />
        </div>
      )}

      {abrirModal && (
        <Modal
          fecharModal={abrirModalConfirmacao}
          cancelarModal={abrirModalConfirmacao}
          confirmarModal={atualizarStatusLivro}
          title="Deseja confirmar?"
          textButton="Confirmar"
        >
          <div className="relative py-3 px-6  flex flex-col gap-3 mb-2">
            <p className="text-gray-600 text-lg font-normal leading-relaxed">
              Você realmente deseja confirmar que o livro
              <span className="font-semibold text-gray-700"> {livro} </span>
              foi {tipo === "retirado" ? "retirado" : "devolvido"}?
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
