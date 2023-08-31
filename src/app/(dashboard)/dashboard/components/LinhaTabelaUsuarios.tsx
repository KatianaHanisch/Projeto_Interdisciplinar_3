"use client";

import { useState } from "react";

import { LinhaTabelaUsuariosProps } from "../types/LinhaTabelaUsuariosProps";

import Modal from "@/app/components/Modal";

import { MdModeEditOutline } from "react-icons/md";
import { BiSolidTrash } from "react-icons/bi";

export default function LinhaTabelaUsuarios({
  nome,
  email,
  abrirModalEditar,
}: LinhaTabelaUsuariosProps) {
  const [abrirModalRemover, setAbrirModalRemover] = useState(false);

  function abrirModal() {
    setAbrirModalRemover(!abrirModalRemover);
  }

  return (
    <>
      <tr className="text-sm font-medium text-gray-700">
        <td className="px-6 py-3">{nome}</td>
        <td className="px-6 py-3">{email}</td>
        <td className="px-6 py-3">
          <button onClick={abrirModalEditar} className="p-1">
            <MdModeEditOutline size={21} color={"#374151"} />
          </button>
        </td>
        <td className="px-6 py-3">
          <button onClick={abrirModal} className="p-1">
            <BiSolidTrash size={21} color={"#374151"} />
          </button>
        </td>
      </tr>
      {abrirModalRemover && (
        <Modal
          abrirModal={abrirModal}
          title="Remover usuário"
          textButton="Remover"
        >
          <div className="relative py-3 px-6  flex flex-col gap-3 mb-2">
            <p className="text-gray-600 text-lg font-normal leading-relaxed">
              Você realmente deseja remover o usuário
              <span className="font-medium text-gray-700"> {nome} </span>
              do sistema?
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
