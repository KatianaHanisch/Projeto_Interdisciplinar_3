"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useTheme } from "@/app/context/ThemeContext";

import { LinhaTabelaUsuariosProps } from "@/app/types/DashboardTypes";

import Modal from "@/app/components/Modal";
import Toast from "@/app/components/Toast";
import ToastSuccess from "@/app/components/ToastSuccess";
import Input from "@/app/components/Input";

import { MdModeEditOutline } from "react-icons/md";
import { BiSolidTrash } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import SnackBar from "@/app/components/SnackBar";

export default function LinhaTabelaUsuarios({
  id,
  name,
  email,
  role_id,
  roles,
  fetchDataUsers,
}: LinhaTabelaUsuariosProps) {
  const [abrirModalRemover, setAbrirModalRemover] = useState(false);
  const [abrirModalEditar, setAbrirModalEditar] = useState(false);
  const { userId, token } = useAuth();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingRole, setIsEditingRole] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [newEmail, setNewEmail] = useState(String);
  const [newName, setNewName] = useState(String);
  const [newRole, setNewRole] = useState(String);
  const [newPassword, setNewPassword] = useState(String);

  const { themeValue } = useTheme();

  function abrirModal() {
    setAbrirModalRemover(!abrirModalRemover);
  }
  function fecharSnack() {
    setSuccess("");
  }

  const abrirModalEditarUsuario = () => {
    setError("");
    setNewName("");
    setNewRole("");
    setNewEmail("");
    setNewPassword("");
    setAbrirModalEditar(!abrirModalEditar);
  };

  async function handleChangeInfo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newName && !newPassword && !newEmail && !newRole) {
      return;
    }

    const userData = {
      id: id,
      email: newEmail || email,
      name: newName || name,
      password: newPassword || "",
      role: newRole || role_id,
    };

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/dashboard/user", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 201) {
        setSuccess("Informações alteradas com sucesso!");

        setTimeout(() => {
          setSuccess("");
        }, 5000);

        fetchDataUsers!();

        setLoading(false);
      } else if (response.status === 409) {
        setError("E-mail já está em uso!");
        setLoading(false);
      } else {
        setError("Erro ao alterar as informações!");
        setLoading(false);

        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } catch (error) {
      console.error("Erro: ", error);
      setLoading(false);
    }
  }

  async function handleDeleteUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (id === Number(userId)) {
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/dashboard/user", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });

      if (response.status === 200) {
        abrirModal();
        setSuccess("Usuário excluído com sucesso!");

        fetchDataUsers!();

        setTimeout(() => {
          setSuccess("");
        }, 5000);

        setLoading(false);
      } else if (response.status === 404) {
        setError("Usuário não encontrado!");
        setLoading(false);

        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        setError("Erro ao excluir usuário!");
        setLoading(false);

        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } catch (error) {
      console.error("Erro: ", error);
      setLoading(false);
    }
  }

  return (
    <>
      {success && (
        <SnackBar
          mensagem={success}
          tipo="sucesso"
          fecharSnackBar={fecharSnack}
        />
      )}
      <tr
        className={`${
          themeValue === "light"
            ? "text-light-dashboardText"
            : "text-dark-dashboardText"
        } text-sm font-medium `}
      >
        <td className="px-6 py-3">{id}</td>
        <td className="px-6 py-3">{name}</td>
        <td className="px-6 py-3">{email}</td>
        <td className="px-6 py-3">
          <button onClick={abrirModalEditarUsuario} className="p-1">
            <MdModeEditOutline
              size={21}
              color={`${themeValue === "light" ? "#374151" : "#f1f5f9"}`}
            />
          </button>
        </td>
        <td className="px-6 py-3">
          <button
            onClick={abrirModal}
            disabled={id === Number(userId)}
            className="p-1"
          >
            <BiSolidTrash
              size={21}
              color={`${themeValue === "light" ? "#374151" : "#f1f5f9"}`}
            />
          </button>
        </td>
      </tr>
      {abrirModalRemover && (
        <Modal
          disabled={loading}
          loading={loading}
          cancelarModal={abrirModal}
          confirmarModal={handleDeleteUser}
          fecharModal={abrirModal}
          title="Remover usuário"
          textButton="Remover"
        >
          <div className="relative py-3 px-6  flex flex-col gap-3 mb-2">
            <p className="text-gray-600 text-lg font-normal leading-relaxed">
              Você realmente deseja remover o usuário
              <span className="font-medium text-gray-700"> {name} </span>
              do sistema?
            </p>
            {error && <Toast text={error} />}
          </div>
        </Modal>
      )}

      {abrirModalEditar && (
        <Modal
          title="Editar usuário"
          loading={loading}
          textButton="Editar"
          cancelarModal={abrirModalEditarUsuario}
          confirmarModal={handleChangeInfo}
          fecharModal={abrirModalEditarUsuario}
        >
          <div className="relative p-6 flex-auto">
            {error && <Toast text={error} />}
            {success && <ToastSuccess text={success} />}
            <p className="my-4 text-slate-500 text-lg leading-relaxed">
              Informações do usuário:
            </p>

            <div className="flex flex-col gap-5">
              <div>
                <span>Nome:</span>
                <div className="flex items-center gap-3">
                  {isEditingName ? (
                    <div className="flex w-full items-center gap-3">
                      <Input
                        type="text"
                        value={newName}
                        onChange={(e: any) => setNewName(e.target.value)}
                      />
                      <span
                        className="cursor-pointer"
                        onClick={() => setIsEditingName(false)}
                      >
                        <IoClose color="red" size={28} />
                      </span>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-gray-800">{name}</h1>
                      <span
                        className="cursor-pointer"
                        onClick={() => setIsEditingName(true)}
                      >
                        <FaEdit color="#1f2937" size={20} />
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <span>E-mail:</span>
                <div className="flex items-center gap-3">
                  {isEditingEmail ? (
                    <div className="flex w-full items-center gap-3">
                      <Input
                        type="email"
                        value={newEmail}
                        onChange={(e: any) => setNewEmail(e.target.value)}
                      />
                      <span
                        className="cursor-pointer"
                        onClick={() => setIsEditingEmail(false)}
                      >
                        <IoClose color="red" size={28} />
                      </span>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-gray-800">{email}</h1>
                      <span
                        className="cursor-pointer"
                        onClick={() => setIsEditingEmail(true)}
                      >
                        <FaEdit color="#1f2937" size={20} />
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <span>Senha:</span>
                <div className="flex items-center gap-3">
                  {isEditingPassword ? (
                    <div className="flex w-full items-center gap-3">
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e: any) => setNewPassword(e.target.value)}
                      />
                      <span
                        className="cursor-pointer"
                        onClick={() => setIsEditingPassword(false)}
                      >
                        <IoClose color="red" size={28} />
                      </span>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-gray-800">********</h1>
                      <span
                        className="cursor-pointer"
                        onClick={() => setIsEditingPassword(true)}
                      >
                        <FaEdit color="#1f2937" size={20} />
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <span>Tipo de usuário:</span>
                <div className="flex items-center gap-3">
                  {isEditingRole ? (
                    <div className="flex w-full items-center gap-3">
                      <select
                        onChange={(e) => setNewRole(e.target.value)}
                        className="block px-2.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-400 dark:text-gray-900  dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      >
                        <option defaultValue="" disabled selected>
                          Tipo de usuário
                        </option>

                        {roles.map((role: any) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                      <span
                        className="cursor-pointer"
                        onClick={() => setIsEditingRole(false)}
                      >
                        <IoClose color="red" size={28} />
                      </span>
                    </div>
                  ) : (
                    <>
                      {roles.map((role: any) => {
                        if (role.id === role_id) {
                          return (
                            <h1 key={role.id} className="text-gray-800">
                              {role.name}
                            </h1>
                          );
                        }
                      })}

                      <span
                        className="cursor-pointer"
                        onClick={() => setIsEditingRole(true)}
                      >
                        <FaEdit color="#1f2937" size={20} />
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
