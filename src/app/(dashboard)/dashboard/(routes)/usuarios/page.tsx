"use client";

import { FormEvent, useEffect, useState } from "react";

import TituloPagina from "../../components/TituloPagina";
import ListaUsuarios from "../../components/ListaUsuarios";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/Input";
import Toast from "@/app/components/Toast";
import ToastSuccess from "@/app/components/ToastSuccess";

import { MdPersonAddAlt1 } from "react-icons/md";
import { Roles } from "@/app/types/Types";

export default function Usuarios() {
  const [abrirModalAdicionar, setAbrirModalAdicionar] = useState(false);

  const [dados, setDados] = useState([]);
  const [roles, setRoles] = useState<Roles[]>([]);
  const [role, setRole] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const abrirModalAdicionarUsuario = () => {
    setAbrirModalAdicionar(!abrirModalAdicionar);
  };
  const closeModal = () => {
    setEmail("");
    setRole("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setError("");
    abrirModalAdicionarUsuario();
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
  const fetchDataRoles = async () => {
    const response = await fetch("/api/dashboard/roles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    setRoles(data);
  };

  useEffect(() => {
    fetchDataUsers();
    fetchDataRoles();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!email && !confirmPassword && !name && !password && !role) {
      setError("Preencha todos os dados!");
      setLoading(false);

      return;
    }

    if (!role) {
      setError("Preencha todos os dados!");
      setLoading(false);
      return;
    }

    if (confirmPassword !== password) {
      setError("Senhas não coincidem!");
      setLoading(false);
      return;
    }

    const userData = {
      email: email,
      password: password,
      role_id: role,
      name: name,
    };

    try {
      const response = await fetch("/api/dashboard/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 409) {
        setError("E-mail já cadastrado!");
        setLoading(false);
        return;
      } else if (response.status === 201) {
        setEmail("");
        setRole("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        setLoading(false);
        setSuccess("Usuário cadastrado com sucesso!");
        fetchDataUsers();
        setTimeout(() => {
          setSuccess("");
        }, 5000);
      } else {
        setError("Erro ao cadastrar!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro ao analisar JSON:", error);
      setLoading(false);
    }
  }

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
        roles={roles}
        fetchDataUsers={fetchDataUsers}
      />

      {abrirModalAdicionar && (
        <Modal
          loading={loading}
          cancelarModal={closeModal}
          confirmarModal={onSubmit}
          fecharModal={closeModal}
          title="Adicionar usuário"
          textButton="Adicionar"
        >
          <div className="relative py-3 px-6  flex flex-col gap-3 mb-2">
            <p className="text-gray-700 text-lg font-medium leading-relaxed">
              Adicione o novo usuário:
            </p>
            <Input
              title="Nome"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />

            <Input
              title="Email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <Input
              title="Senha "
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <Input
              title="Confirme a senha"
              type="password"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
            <select
              onChange={(e) => setRole(e.target.value)}
              className="block px-2.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-400 dark:text-gray-900  dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
            >
              <option defaultValue="" disabled selected>
                Tipo de usuário
              </option>

              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>

            {error && <Toast text={error} />}
            {success && <ToastSuccess text={success} />}
          </div>
        </Modal>
      )}
    </div>
  );
}
