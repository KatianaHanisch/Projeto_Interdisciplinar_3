"use client";

import { useState, FormEvent, useEffect } from "react";
import { User } from "@/app/types/Types";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import Toast from "@/app/components/Toast";
import ToastSuccess from "@/app/components/ToastSuccess";
import imageBackground from "../../../../../public/banner-login.jpg";

export default function Login() {
  const { validateToken, isAuthenticated } = useAuth();

  const [abrirModal, setAbrirModal] = useState(false);
  const [modalEmail, setModalEmail] = useState(String);
  const router = useRouter();

  const [error, setError] = useState(String);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(String);
  const [recuperacao, setRecuperacao] = useState(String);
  const [userData, setUserData] = useState<User>({
    email: "",
    password: "",
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("teste");

    if (token === "1") {
      setConfirm("E-mail confirmado com sucesso!");
      setTimeout(() => {
        setConfirm("");
      }, 5000);
    }

    validateToken();
  }, [validateToken, searchParams]);

  if (isAuthenticated) {
    router.push("/");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  function abrirModalEsqueceuSenha() {
    setAbrirModal(!abrirModal);
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      const token = data.token;

      if (response.status === 404) {
        setError("Credenciais inválidas!");
        setLoading(false);
      } else if (response.status === 201) {
        sessionStorage.setItem("token", token);
        sessionStorage.removeItem("mode");
        router.push("/");
        setLoading(false);
      } else {
        setError("Erro ao logar! Tente novamente mais tarde.");
        console.log(response.status);
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro: ", error);
      setLoading(false);
    }
  }
  async function handleRecuperacaoPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!modalEmail) {
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/recuperacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modalEmail),
      });

      if (response.status === 201) {
        setRecuperacao("E-mail enviado com sucesso!");

        setTimeout(() => {
          setRecuperacao("");
        }, 5000);
        setLoading(false);
      } else if (response.status === 404) {
        setRecuperacao("E-mail não cadastrado!");
        setLoading(false);
      } else {
        setRecuperacao("Erro");
        setLoading(false);

        setTimeout(() => {
          setRecuperacao("");
        }, 5000);
      }
    } catch (error) {
      console.error("Erro: ", error);
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-1/2 h-full hidden lg:block ">
        <Image src={imageBackground} alt="imagem de fundo" className="h-full" />
      </div>
      <div className="md:w-1/2 w-full flex justify-center -mt-12 ">
        <div className="w-[340px]  flex flex-col gap-7 px-2 md:px-0 my-auto">
          <Image
            className="m-auto"
            alt="logo"
            width={130}
            height={120}
            src="/../../logo.svg"
          />
          <h1 className="text-[#3B4251] text-3xl font-medium">Login</h1>
          <div>
            <form
              className="flex flex-col gap-3 text-[#3B4251]"
              onSubmit={handleLogin}
            >
              <Input
                type="email"
                title="E-mail"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
              <Input
                type="password"
                title="Senha"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />

              {error && <Toast text={error} />}

              {confirm && <ToastSuccess text={confirm} />}

              <button
                type="submit"
                className="mt-6 h-10 rounded text-center bg-[#D9D9D9] hover:bg-[#d4d4d4] hover:text-black"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 rounded-full animate-pulse dark:bg-[#3B4251]"></div>
                    <div className="w-2 h-2 rounded-full animate-pulse dark:bg-[#3B4251]"></div>
                    <div className="w-2 h-2 rounded-full animate-pulse dark:bg-[#3B4251]"></div>
                  </div>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>
            <div className="text-sm flex justify-between mt-2 text-[#3B4251]">
              <Link href="/cadastro" className="hover:text-black underline ">
                Cadastrar-se
              </Link>
              <button
                onClick={abrirModalEsqueceuSenha}
                className="hover:text-black underline"
              >
                Esqueceu a senha?
              </button>

              {abrirModal && (
                <Modal
                  title="Esqueceu a senha?"
                  textButton="Enviar"
                  confirmarModal={handleRecuperacaoPassword}
                  loading={loading}
                  fecharModal={abrirModalEsqueceuSenha}
                  cancelarModal={abrirModalEsqueceuSenha}
                >
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      Informe seu e-mail para recuperação:
                    </p>

                    <Input
                      type="email"
                      title="E-mail"
                      value={modalEmail}
                      onChange={(e: any) => setModalEmail(e.target.value)}
                    />
                  </div>
                  {recuperacao === "E-mail enviado com sucesso!" && (
                    <ToastSuccess text={recuperacao} />
                  )}

                  {recuperacao === "E-mail não cadastrado!" && (
                    <div className="mx-6 mt-[-10px] mb-1">
                      <Toast text="E-mail não cadastrado!" />
                    </div>
                  )}
                  {recuperacao === "Erro" && (
                    <div className="mx-6 mt-[-10px] mb-1">
                      <Toast text="Erro ao enviar e-mail!" />
                    </div>
                  )}
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
