"use client";

import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { HiMenu } from "react-icons/hi";
import { HiMenuAlt3 } from "react-icons/hi";
import { BsFillBookFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { BiExit, BiSolidLogIn, BiSolidUser } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import Modal from "@/app/components/Modal";
import Input from "@/app/components/Input";
import Toast from "@/app/components/Toast";
import ToastSuccess from "@/app/components/ToastSuccess";

export default function HeaderHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(String);
  const [success, setSuccess] = useState(String);

  const [newName, setNewName] = useState(String);
  const [newPhone, setNewPhone] = useState(String);
  const [newPassword, setNewPassword] = useState(String);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const [open, setOpen] = useState(false);

  const { logout, isAuthenticated, validateToken, name, email, phone } =
    useAuth();

  useEffect(() => {
    if (!name) {
      sessionStorage.removeItem("d_token");
    }
    validateToken();
  }, [validateToken, name]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  function abrirDropdown() {
    setOpen(!open);
  }

  function abrirModalConfig() {
    setAbrirModal(!abrirModal);
  }

  async function handleChangeInfo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newName && !newPassword && !newPhone) {
      return;
    }

    const userData = {
      email: email,
      name: newName,
      password: newPassword,
      phone: newPhone,
    };

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      const token = data.token;

      if (response.status === 201) {
        setSuccess("Informações alteradas com sucesso!");

        sessionStorage.setItem("token", token);
        validateToken();

        setTimeout(() => {
          setSuccess("");
        }, 5000);

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

  return (
    <nav className="">
      <div className="hidden md:flex max-w-[1200px] px-8 items-center h-[50px] m-auto  justify-between xl:px-0">
        <h2 className="text-gray-700 text-[14px]">BEM VINDO(A) A BIBLIOTECA</h2>

        {isAuthenticated ? (
          <div className="flex  items-center justify-end ">
            <h4 className="text-[16px] font-medium mr-2 text-gray-800">
              {name}
            </h4>
            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full cursor-pointer">
              <button className="" onClick={abrirDropdown}>
                <BiSolidUser className="w-7 h-7" color="#1f2937" />
              </button>
              {open && (
                <div className="absolute z-[100] mt-32 ml-[-150px] w-48 rounded bg-gray-800 py-2 shadow-xl ">
                  <div className="flex mt-1 mb-4 items-center text-base gap-2 font-medium text-white px-3 py-1 bg-gray-800 hover:bg-gray-600">
                    <BsFillGearFill size={20} color="white" />
                    <button onClick={() => abrirModalConfig()}>
                      Configurações
                    </button>
                  </div>
                  <div
                    onClick={() => logout()}
                    className="flex mt-1 items-center text-base gap-2 font-medium text-white px-3 py-1 bg-gray-800 hover:bg-gray-600"
                  >
                    <BiExit size={20} color="white" />
                    Sair
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="group ">
            <Link
              className="mr-[25px] text-gray-700 text-[14px] hover:text-gray-950"
              href="/cadastro"
            >
              CADASTRAR
            </Link>
            <Link
              className="text-gray-700 text-[14px] hover:text-gray-950"
              href="/login"
            >
              ENTRAR
            </Link>
          </div>
        )}
      </div>
      <div className="w-full border-b"></div>
      <div className="fixed z-20 bg-[white] md:relative top-0 max-w-[1200px] m-auto w-full flex justify-around md:justify-between items-center h-[70px] px-8 xl:px-0 ">
        <h1 className="font-semibold text-3xl md:text-5xl text-gray-800">
          BIBLIOTECA
        </h1>
        <div className="md:hidden text-3xl text-gray-800" onClick={toggleMenu}>
          <HiMenu />
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden z-20 fixed bg-gray-500 w-48 right-0 top-0 h-full backdrop-blur-md">
            <HiMenuAlt3
              className="block my-2 text-gray-50 text-2xl ml-2"
              onClick={toggleMenu}
            />
            <div className="flex flex-col h-5/6 justify-between">
              <div className="flex flex-col items-center gap-4">
                <Link
                  className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                  href="/"
                >
                  <span>
                    <AiFillHome className="text-gray-50" />
                  </span>{" "}
                  HOME
                </Link>

                <Link
                  className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                  href="/livros"
                >
                  <span>
                    <BsFillBookFill className="text-gray-50" />
                  </span>{" "}
                  TODOS OS LIVROS
                </Link>
                <Link
                  className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                  href="/sobre"
                >
                  <span>
                    <HiDotsCircleHorizontal className="text-gray-50" />
                  </span>{" "}
                  SOBRE
                </Link>
                {isAuthenticated && (
                  <Link
                    className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                    href="/emprestimos"
                  >
                    <span>
                      <BsFillBookFill className="text-gray-50" />
                    </span>{" "}
                    MEUS LIVROS
                  </Link>
                )}
              </div>

              {isAuthenticated ? (
                <div className="flex flex-col items-center justify-end ">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
                    <button
                      className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                      onClick={() => abrirModalConfig()}
                    >
                      <span>
                        <BsFillGearFill className="text-gray-50" />
                      </span>{" "}
                      Configurações
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Link
                    className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                    href="/login"
                  >
                    <span>
                      {" "}
                      <BiSolidLogIn className="text-gray-50" />
                    </span>{" "}
                    ENTRAR
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="group hidden md:flex">
          <Link
            className="mr-[35px] text-gray-800 hover:text-gray-950 "
            href="/"
          >
            HOME
          </Link>
          <Link
            className="mr-[35px] text-gray-800 hover:text-gray-950"
            href="/livros"
          >
            LIVROS
          </Link>
          <Link className="text-gray-800  hover:text-gray-950" href="/sobre">
            SOBRE
          </Link>

          {isAuthenticated && (
            <Link
              className="text-gray-800 ml-[35px] hover:text-gray-950"
              href="/emprestimos"
            >
              MEUS LIVROS
            </Link>
          )}
        </div>

        {abrirModal && (
          <Modal
            // abrirModal={abrirModalConfig}
            title="Configurações"
            textButton="Atualizar"
            confirmarModal={handleChangeInfo}
            loading={loading}
            fecharModal={abrirModalConfig}
            cancelarModal={abrirModalConfig}
          >
            <div className="relative p-6 flex-auto">
              {error && <Toast text={error} />}

              {success && <ToastSuccess text={success} />}

              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                Suas informações:
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
                  <span>Telefone:</span>
                  <div className="flex items-center gap-3">
                    {isEditingPhone ? (
                      <div className="flex w-full items-center gap-3">
                        <Input
                          type="text"
                          value={newPhone}
                          onChange={(e: any) => setNewPhone(e.target.value)}
                        />
                        <span
                          className="cursor-pointer"
                          onClick={() => setIsEditingPhone(false)}
                        >
                          <IoClose color="red" size={28} />
                        </span>
                      </div>
                    ) : (
                      <>
                        <h1 className="text-gray-800">{phone}</h1>
                        <span
                          className="cursor-pointer"
                          onClick={() => setIsEditingPhone(true)}
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
                    <h1 className="text-gray-800">{email}</h1>
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
              </div>
            </div>
          </Modal>
        )}
      </div>
    </nav>
  );
}
