"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import Modal from "@/app/components/Modal";
import Button from "../../../components/Button";

import { FaArrowLeft } from "react-icons/fa";

import capaLivro from "../../../../../../../public/capaLivro.jpg";

export default function Page({ params }: { params: { slug: string } }) {
  const [abrirModal, setAbrirModal] = useState(false);

  const abrirModalConfirmacao = () => {
    setAbrirModal(!abrirModal);
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="bg-gray-300 w-11/12 h-5/6 rounded-lg flex items-center justify-center shadow-md">
        <div className=" h-full w-10 py-5">
          <Link className="cursor-pointer" href="/dashboard/remover">
            <FaArrowLeft size={25} color={"#374151"} />
          </Link>
        </div>
        <div className="h-4/5 w-3/12 ">
          <Image src={capaLivro} alt="capa livro" className="rounded-md" />
        </div>
        <div className="flex flex-col items-start justify-start w-8/12 h-4/5  px-10 ">
          <h1 className="text-3xl font-semibold  text-gray-700 mb-5">
            A rebelde do deserto
          </h1>
          <p className="text-gray-600 text-left text-base">
            O destino do deserto está nas mãos de Amani Al’Hiza ― uma garota
            feita de fogo e pólvora, com o dedo sempre no gatilho. O deserto de
            Miraji é governado por mortais, mas criaturas míticas rondam as
            áreas mais selvagens e remotas, e há boatos de que, em algum lugar,
            os djinnis ainda praticam magia. De toda maneira, para os humanos o
            deserto é um lugar impiedoso, principalmente se você é pobre, órfão
            ou mulher. Amani Al’Hiza é as três coisas. Apesar de ser uma
            atiradora talentosa, dona de uma mira perfeita, ela não consegue
            escapar da Vila da Poeira, uma cidadezinha isolada que lhe oferece
            como futuro um casamento forçado e a vida submissa que virá depois
            dele. Para Amani, ir embora dali é mais do que um desejo ― é uma
            necessidade. Mas ela nunca imaginou que fugiria galopando num cavalo
            mágico com o exército do sultão na sua cola, nem que um forasteiro
            misterioso seria responsável por lhe revelar o deserto que ela
            achava que conhecia e uma força que ela nem imaginava possuir.
          </p>
          <div className="w-full py-7 flex items-center justify-start">
            <Button
              tituloButton="Remover livro"
              abrirModal={abrirModalConfirmacao}
            />
          </div>

          {abrirModal && (
            <Modal
              abrirModal={abrirModalConfirmacao}
              title="Deseja confirmar?"
              textButton="Remover"
            >
              <div className="relative py-3 px-6  flex flex-col gap-3 mb-2">
                <p className="text-gray-600 text-lg font-normal leading-relaxed">
                  Você realmente deseja remover o livro
                  <span className="font-medium text-gray-700">
                    {" "}
                    (nome do livro){" "}
                  </span>
                  da biblioteca?
                </p>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
