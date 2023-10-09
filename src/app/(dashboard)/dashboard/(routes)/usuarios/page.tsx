"use client";

import { useEffect, useState } from "react";

import TituloPagina from "../../components/TituloPagina";
import ListaUsuarios from "../../components/ListaUsuarios";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/Input";

import { MdPersonAddAlt1 } from "react-icons/md";

export default function Usuarios() {
  const [abrirModalAdicionar, setAbrirModalAdicionar] = useState(false);
  const [abrirModalEditar, setAbrirModalEditar] = useState(false);

  const [dados, setDados] = useState([]);

  const abrirModalAdicionarUsuario = () => {
    setAbrirModalAdicionar(!abrirModalAdicionar);
  };

  const abrirModalEditarUsuario = () => {
    setAbrirModalEditar(!abrirModalEditar);
  };

  const fetchDataUsers = async () => {
    const response = await fetch("/api/dashboard/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setDados(data);
  };

  useEffect(() => {
    fetchDataUsers();
  }, []);

  console.log(dados);

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
          fecharModal={abrirModalAdicionarUsuario}
          cancelarModal={abrirModalAdicionarUsuario}
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
          fecharModal={abrirModalEditarUsuario}
          cancelarModal={abrirModalEditarUsuario}
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
    </div>
  );
}
