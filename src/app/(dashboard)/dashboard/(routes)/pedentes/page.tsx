"use client";

import { useState } from "react";

import TituloPagina from "../../components/TituloPagina";
import ListaDashboard from "../../components/ListaDashboard";
import Modal from "@/app/components/Modal";

import { IoClose } from "react-icons/io5";
import { BsFiletypePdf } from "react-icons/bs";

const dados = [
  {
    nome: "Katiana H. Hanisch",
    telefone: "(66) 996668855",
    livro: "O rei cruel",
  },
  {
    nome: "Jakelie H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Corte de asas e ruínas",
  },
  {
    nome: "Iago F. Aparecido",
    telefone: "(66) 996668855",
    livro: "A traidora do trono",
  },
];

export default function Retiradas() {
  const [abrirModal, setAbrirModal] = useState(false);

  const abrirModalConfirmacao = () => {
    setAbrirModal(!abrirModal);
  };

  return (
    <div className="w-full h-full p-10">
      <TituloPagina
        tituloPagina="Empréstimos pedentes"
        tituloButton="Gerar relatório"
        Icone={BsFiletypePdf}
      />
      <ListaDashboard
        dados={dados}
        tituloButton="Devolvido"
        corButton="vermelha"
        Icone={IoClose}
        abrirModal={abrirModalConfirmacao}
      />

      {abrirModal && (
        <Modal
          abrirModal={abrirModalConfirmacao}
          title="Deseja confirmar?"
          textButton="Confirmar"
        >
          <div className="relative py-3 px-6  flex flex-col gap-3 mb-2">
            <p className="text-gray-600 text-lg font-normal leading-relaxed">
              Você realmente deseja confirmar que o livro
              <span className="font-medium text-gray-700">
                {" "}
                (nome do livro){" "}
              </span>
              foi devolvido?
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
