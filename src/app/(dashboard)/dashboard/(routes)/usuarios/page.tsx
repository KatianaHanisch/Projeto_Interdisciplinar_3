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

  const abrirModalAdicionarUsuario = () => {
    setAbrirModalAdicionar(!abrirModalAdicionar);
  };

  const abrirModalEditarUsuario = () => {
    setAbrirModalEditar(!abrirModalEditar);
  };

  return (
    <div className="w-full h-full p-10">
      <TituloPagina
        tituloPagina="Usuários"
        tituloButton="Adicionar usuário"
        Icone={MdPersonAddAlt1}
        abrirModal={abrirModalAdicionarUsuario}
      />

      <ListaUsuarios dados={dados} abrirModalEditar={abrirModalEditarUsuario} />

      {abrirModalAdicionar && (
        <Modal
        cancelarModal={abrirModalAdicionarUsuario}
        confirmarModal={abrirModalAdicionarUsuario}
        fecharModal={abrirModalAdicionarUsuario}
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
          title="Editar usuário"
          textButton="Editar"
          cancelarModal={abrirModalEditarUsuario}
          confirmarModal={abrirModalEditarUsuario}
          fecharModal={abrirModalEditarUsuario}
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
    </div>
  );
}
