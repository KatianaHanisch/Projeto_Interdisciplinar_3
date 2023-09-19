"use client";

import { useState } from "react";

import { LinhasTabelaProps } from "../types/LinhasTabelaProps";

import ButtonTabela from "./ButtonTabela";
import Modal from "@/app/components/Modal";

export default function LinhasTabela({
  nome,
  telefone,
  livro,
  tituloButton,
  corButton,
  Icone,
  tipo,
}: LinhasTabelaProps) {
  const [open, setOpen] = useState(false);

  function abrirModalConfirmacao() {
    if (tipo === "finalizado") {
      setOpen(false);
    } else {
      setOpen(!open);
    }
  }

  return (
    <>
      <tr className="text-sm font-medium text-gray-700">
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

      {open && (
        <Modal
          abrirModal={abrirModalConfirmacao}
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
