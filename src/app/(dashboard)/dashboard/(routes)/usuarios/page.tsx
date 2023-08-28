"use client";

import { useState } from "react";

import TituloPagina from "../../components/TituloPagina";
import ListaUsuarios from "../../components/ListaUsuarios";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/Input";

import { MdPersonAddAlt1 } from "react-icons/md";

const dados = [
  { nome: "Katiana H. Hanisch", email: "katiana.teste@gmail.com" },
  { nome: "Jakeline H. Hanisch", email: "jakeline.teste@gmail.com" },
  { nome: "Iago F. Aparecido", email: "iago.teste@gmail.com" },
];

export default function Usuarios() {
  const [abrirModalAdicionar, setAbrirModalAdicionar] = useState(false);
  const [abrirModalEditar, setAbrirModalEditar] = useState(false);
  const [abrirModalRemover, setAbrirModalRemover] = useState(false);

  const abrirModalAdicionarUsuario = () => {
    setAbrirModalAdicionar(!abrirModalAdicionar);
  };

  const abrirModalEditarUsuario = () => {
    setAbrirModalEditar(!abrirModalEditar);
  };

  const abrirModalRemoverUsuario = () => {
    setAbrirModalRemover(!abrirModalRemover);
  };

  return (
    <div className="w-full h-full p-10">
      <TituloPagina
        tituloPagina="Usuários"
        tituloButton="Adicionar usuário"
        Icone={MdPersonAddAlt1}
        abrirModal={abrirModalAdicionarUsuario}
      />

      <ListaUsuarios
        dados={dados}
        abrirModalEditar={abrirModalEditarUsuario}
        abrirModalRemover={abrirModalRemoverUsuario}
      />

      {abrirModalAdicionar && (
        <Modal
          abrirModal={abrirModalAdicionarUsuario}
          title="Adicionar usuário"
          textButton="Adicionar"
        >
          <div className="relative py-3 px-6  flex flex-col gap-3 mb-2">
            <p className="text-gray-700 text-lg font-medium leading-relaxed">
              Adicione o novo usuário:
            </p>
            <Input title="Nome do usuário" type="text" />
            <Input title="Email do usuário" type="email" />
            <Input title="Senha do usuário" type="password" />
          </div>
        </Modal>
      )}

      {abrirModalEditar && (
        <Modal
          abrirModal={abrirModalEditarUsuario}
          title="Editar usuário"
          textButton="Editar"
        >
          <div className="relative py-3 px-6  flex flex-col gap-3 mb-2">
            <p className="text-gray-700 text-lg font-medium leading-relaxed">
              Editar usuário:
            </p>
            <Input title="Nome do usuário" type="text" />
            <Input title="Email do usuário" type="email" />
          </div>
        </Modal>
      )}

      {abrirModalRemover && (
        <Modal
          abrirModal={abrirModalRemoverUsuario}
          title="Remover usuário"
          textButton="Remover"
        >
          <div className="relative py-3 px-6  flex flex-col gap-3 mb-2">
            <p className="text-gray-600 text-lg font-normal leading-relaxed">
              Você realmente deseja remover o usuário{" "}
              <span className="font-medium text-gray-700">
                {" "}
                (nome usuário){" "}
              </span>
              do sistema?
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
