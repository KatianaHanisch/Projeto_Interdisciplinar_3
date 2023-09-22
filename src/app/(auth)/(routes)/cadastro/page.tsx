"use client";

import { User } from "@/app/types";
import { useState, FormEvent } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Input from "../../../components/Input";
import Toast from "@/app/components/Toast";
import imageBackground from "../../../../../public/banner-login.jpg";

export default function Cadastro() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<User>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (userData.confirmPassword !== userData.password) {
      setError("Senhas não coincidem!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth", {
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
        router.push("/confirmacao");
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
    <div className="flex h-screen w-full justify-center items-center ">
      <div className="w-1/2 h-full hidden lg:block ">
        <Image src={imageBackground} alt="imagem de fundo" className="h-full" />
      </div>
      <div className="md:w-1/2 h-full w-full  flex justify-center ">
        <div className="w-[340px]  flex flex-col gap-7 px-2 md:px-0 my-auto">
          <Image
            className="m-auto"
            alt="logo"
            width={130}
            height={120}
            src="/../../logo.svg"
          />
          <h1 className="text-[#3B4251] text-3xl font-medium">Cadastro</h1>
          <div>
            <form
              className="flex flex-col gap-3 text-[#3B4251]"
              onSubmit={onSubmit}
            >
              <Input
                type="text"
                title="Nome"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
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
              <Input
                type="password"
                title="Confirme sua senha"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
              />
              {error && <Toast text={error} />}

              {/* {sucesso && (
                <div
                  className={`flex items-center bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md mb-2 `}
                >
                  <div className={`text-green-500 rounded-full bg-white mr-3`}>
                    <svg
                      width="1.8em"
                      height="1.8em"
                      viewBox="0 0 16 16"
                      className="bi bi-info"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                      <circle cx="8" cy="4.5" r="1" />
                    </svg>
                  </div>

                  <div className="text-white max-w-xs ">{sucesso}</div>
                </div>
              )} */}

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
                  "Cadastrar-se"
                )}
              </button>
            </form>
            <div className="text-sm flex justify-between mt-2 text-[#3B4251]">
              <Link href="/login" className="hover:text-black underline ">
                Já possuo conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
