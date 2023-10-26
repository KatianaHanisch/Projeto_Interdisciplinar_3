"use client";

import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

import { HiMenu } from "react-icons/hi";
import { HiMenuAlt3 } from "react-icons/hi";
import { BsFillBookFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { BiExit, BiSolidLogIn, BiSolidUser } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { BsMoonFill } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";

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
  const [newEmail, setNewEmail] = useState(String);

  const [theme, setTheme] = useState(String);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  // const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [open, setOpen] = useState(false);

  const { logout, isAuthenticated, validateToken, name, email, phone, userId } =
    useAuth();
  const { toggleTheme, themeValue } = useTheme();

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setNewPhone(formattedValue);
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, "");

    const match = cleaned.match(/^(\d{2})(\d{0,5})(\d{0,4})$/);
    if (match) {
      const formatted = `(${match[1]}) ${match[2]}${
        match[3] ? `-${match[3]}` : ""
      }`;
      return formatted;
    }

    return phoneNumber;
  };

  async function handleChangeInfo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newName && !newPassword && !newPhone && !newEmail) {
      return;
    }

    const cleanedPhoneNumber = newPhone!.replace(/\D/g, "");

    const userData = {
      id: userId,
      email: newEmail || email,
      name: newName || name,
      password: newPassword || "",
      phone: cleanedPhoneNumber || phone,
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

      if (response.status === 409) {
        setError("E-mail já cadastrado!");
        setLoading(false);

        setTimeout(() => {
          setError("");
        }, 5000);
      } else if (response.status === 201) {
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
    <nav
      className={`${themeValue === "dark" ? "bg-dark-back" : "bg-light-back"}`}
    >
      <div className="hidden md:flex max-w-[1200px] px-8 items-center h-[50px] m-auto justify-between xl:px-0">
        <h2
          className={`${
            themeValue === "dark" ? "text-dark-text2" : "text-light-text2"
          } text-[14px]`}
        >
          BEM VINDO(A) A BIBLIOTECA
        </h2>

        {isAuthenticated ? (
          <div className="flex items-center z-50 justify-end ">
            <button onClick={toggleTheme} className="mr-4">
              {themeValue === "light" ? (
                <BsMoonFill color="#111827" />
              ) : (
                <BsSunFill color="#f1f5f9" />
              )}
            </button>
            <h4
              className={` ${
                themeValue === "light" ? "text-light-text" : "text-dark-text"
              } text-[16px] font-medium mr-2 `}
            >
              {name}
            </h4>
            <div className="w-10 h-10 bg-transparent flex items-center justify-center rounded-full">
              <button className="" onClick={abrirDropdown}>
                <BiSolidUser
                  className="w-7 h-7"
                  color={`${themeValue === "dark" ? "#f1f5f9" : "#111827"}`}
                />
              </button>
              {open && (
                <div
                  className={`z-[100] mt-36 ml-[-150px] w-48 rounded ${
                    themeValue === "dark" ? "bg-light-back" : "bg-dark-back"
                  } py-2 shadow-xl`}
                >
                  <div
                    className={`flex relative z-50 mt-1 mb-4 items-center text-base gap-2 font-medium px-3 py-1 ${
                      themeValue === "dark"
                        ? "bg-light-back text-light-text hover:bg-gray-200"
                        : "bg-dark-back text-dark-text hover:bg-gray-900"
                    }`}
                  >
                    <BsFillGearFill
                      size={20}
                      color={`${themeValue === "dark" ? "#111827" : "#f1f5f9"}`}
                    />
                    <button onClick={() => abrirModalConfig()}>
                      Configurações
                    </button>
                  </div>
                  <div
                    className={`flex mt-1  items-center text-base gap-2 font-medium px-3 py-1 ${
                      themeValue === "dark"
                        ? "bg-light-back text-light-text hover:bg-gray-200"
                        : "bg-dark-back text-dark-text hover:bg-gray-900"
                    }`}
                  >
                    <BiExit
                      size={20}
                      color={`${themeValue === "dark" ? "#111827" : "#f1f5f9"}`}
                    />
                    <button onClick={() => logout()}>Sair</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="group flex">
            <button onClick={toggleTheme} className="mr-4">
              {themeValue === "light" ? (
                <BsMoonFill color="#111827" />
              ) : (
                <BsSunFill color="#f1f5f9" />
              )}
            </button>

            <Link
              className={`mr-[25px]  ${
                themeValue === "dark"
                  ? "text-dark-text2 hover:text-dark-hover"
                  : "text-light-text2 hover:text-light-hover"
              } text-[14px]`}
              href="/cadastro"
            >
              CADASTRAR
            </Link>
            <Link
              className={`mr-[25px]  ${
                themeValue === "dark"
                  ? "text-dark-text2 hover:text-dark-hover"
                  : "text-light-text2 hover:text-light-hover"
              } text-[14px]`}
              href="/login"
            >
              ENTRAR
            </Link>
          </div>
        )}
      </div>
      <div
        className={`mr-[25px] w-full border-b ${
          themeValue === "dark" && "border-dark-border"
        } text-[14px]`}
      ></div>
      <div
        className={`fixed md:z-0 z-50 ${
          themeValue === "dark" ? "bg-dark-back" : "bg-light-back"
        } md:relative top-0 max-w-[1200px] m-auto w-full flex justify-around md:justify-between items-center h-[70px] px-8 xl:px-0`}
      >
        <h1
          className={`font-semibold text-3xl md:text-5xl  ${
            themeValue === "dark" ? "text-dark-text" : "text-light-text"
          }`}
        >
          BIBLIOTECA
        </h1>
        <div
          className={`md:hidden text-3xl ${
            themeValue === "dark" && "text-dark-text"
          }`}
          onClick={toggleMenu}
        >
          <HiMenu />
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div
            className={`md:hidden z-20 fixed ${
              themeValue === "dark" ? "bg-light-back" : "bg-dark-back"
            } w-48 right-0 top-0 h-full backdrop-blur-md`}
          >
            <div className="flex justify-between">
              <HiMenuAlt3
                className={`block my-2 ${
                  themeValue === "dark"
                    ? "bg-light-back text-light-text"
                    : "bg-dark-back text-dark-text"
                } text-2xl ml-2`}
                onClick={toggleMenu}
              />
              <button onClick={toggleTheme} className="mr-4">
                {themeValue === "light" ? (
                  <BsMoonFill color="#f1f5f9" />
                ) : (
                  <BsSunFill color="#111827" />
                )}
              </button>
            </div>
            <div className="flex flex-col h-5/6 justify-between">
              <div className="flex flex-col items-center gap-4">
                <Link
                  className={`my-2 ${
                    themeValue === "dark" ? "text-light-text" : "text-dark-text"
                  } text-1xl flex justify-start items-center gap-2`}
                  href="/"
                >
                  <span>
                    <AiFillHome
                      className={`${
                        themeValue === "dark"
                          ? "text-dark-back"
                          : "text-light-back"
                      }`}
                    />
                  </span>{" "}
                  HOME
                </Link>

                <Link
                  className={`my-2 ${
                    themeValue === "dark" ? "text-light-text" : "text-dark-text"
                  } text-1xl flex justify-start items-center gap-2`}
                  href="/livros"
                >
                  <span>
                    <BsFillBookFill
                      className={`${
                        themeValue === "dark"
                          ? "text-dark-back"
                          : "text-light-back"
                      }`}
                    />
                  </span>{" "}
                  TODOS OS LIVROS
                </Link>
                <Link
                  className={`my-2 ${
                    themeValue === "dark" ? "text-light-text" : "text-dark-text"
                  } text-1xl flex justify-start items-center gap-2`}
                  href="/sobre"
                >
                  <span>
                    <HiDotsCircleHorizontal
                      className={`${
                        themeValue === "dark"
                          ? "text-dark-back"
                          : "text-light-back"
                      }`}
                    />
                  </span>{" "}
                  SOBRE
                </Link>
                {isAuthenticated && (
                  <Link
                    className={`my-2 ${
                      themeValue === "dark"
                        ? "text-light-text"
                        : "text-dark-text"
                    } text-1xl flex justify-start items-center gap-2`}
                    href="/emprestimos"
                  >
                    <span>
                      <BsFillBookFill
                        className={`${
                          themeValue === "dark"
                            ? "text-dark-back"
                            : "text-light-back"
                        }`}
                      />
                    </span>{" "}
                    MEUS LIVROS
                  </Link>
                )}
              </div>

              {isAuthenticated ? (
                <div className="flex  flex-col items-center justify-end ">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
                    <button
                      className={`my-2 ${
                        themeValue === "dark"
                          ? "text-light-text"
                          : "text-dark-text"
                      } text-1xl flex justify-start items-center gap-2`}
                      onClick={() => abrirModalConfig()}
                    >
                      <span>
                        <BsFillGearFill
                          className={`${
                            themeValue === "dark"
                              ? "text-dark-back"
                              : "text-light-back"
                          }`}
                        />
                      </span>{" "}
                      Configurações
                    </button>
                  </div>
                  <div className="w-10  mt-6 h-10 flex items-center justify-center rounded-full cursor-pointer">
                    <button
                      className={`my-2 ${
                        themeValue === "dark"
                          ? "text-light-text"
                          : "text-dark-text"
                      } text-1xl flex justify-start items-center gap-2`}
                      onClick={() => logout()}
                    >
                      <span>
                        <BiExit
                          size={20}
                          className={`${
                            themeValue === "dark"
                              ? "text-dark-back"
                              : "text-light-back"
                          }`}
                        />
                      </span>{" "}
                      Sair
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Link
                    className={`my-2 ${
                      themeValue === "dark"
                        ? "text-light-text"
                        : "text-dark-text"
                    } text-1xl flex justify-start items-center gap-2`}
                    href="/login"
                  >
                    <span>
                      {" "}
                      <BiSolidLogIn
                        className={`${
                          themeValue === "dark"
                            ? "text-dark-back"
                            : "text-light-back"
                        }`}
                      />
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
            className={`mr-[35px] ${
              themeValue === "dark"
                ? "text-dark-text hover:text-dark-hover"
                : "text-light-text hover:text-light-hover"
            }`}
            href="/"
          >
            HOME
          </Link>
          <Link
            className={`mr-[35px] ${
              themeValue === "dark"
                ? "text-dark-text hover:text-dark-hover"
                : "text-light-text hover:text-light-hover"
            }`}
            href="/livros"
          >
            LIVROS
          </Link>
          <Link
            className={`mr-[35px] ${
              themeValue === "dark"
                ? "text-dark-text hover:text-dark-hover"
                : "text-light-text hover:text-light-hover"
            }`}
            href="/sobre"
          >
            SOBRE
          </Link>

          {isAuthenticated && (
            <Link
              className={`${
                themeValue === "dark"
                  ? "text-dark-text hover:text-dark-hover"
                  : "text-light-text hover:text-light-hover"
              }`}
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
                      <div className="relative flex w-full gap-3">
                        <input
                          minLength={15}
                          maxLength={15}
                          required
                          name="phone"
                          type="text"
                          value={newPhone}
                          onChange={handlePhoneChange}
                          id="floating_outlined"
                          className="block px-2.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-400 appearance-none dark:text-gray-900  dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                          placeholder=" "
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
                        <h1 className="text-gray-800">
                          {formatPhoneNumber(phone)}
                        </h1>
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
                  <span>E-mail</span>
                  <div className="flex items-center gap-3">
                    {/* {isEditingEmail ? (
                      <div className="flex w-full items-center gap-3">
                        <Input
                          type="e-mail"
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
                    ) : ( */}
                    <>
                      <h1 className="text-gray-800">{email}</h1>
                      {/* <span
                        className="cursor-pointer"
                        onClick={() => setIsEditingEmail(true)}
                      >
                        <FaEdit color="#1f2937" size={20} />
                      </span> */}
                    </>
                    {/* )} */}
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
