"use client";

import { useState, FormEvent, useEffect } from "react";
import { User } from "@/app/types";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

import Input from "@/app/components/Input";
import Toast from "@/app/components/Toast";
import imageBackground from "../../../../../../public/banner-login.jpg";

export default function Login(request: Request) {
  const { validateIfExists } = useAuth();
  const [abrirModal, setAbrirModal] = useState(false);
  const router = useRouter();

  const [error, setError] = useState(String);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<User>({
    email: "",
    password: "",
  });

  useEffect(() => {
    validateIfExists();
  }, [validateIfExists]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/dashLogin", {
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
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        sessionStorage.setItem("d_token", token);
        router.push("/dashboard");
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
          <h1 className="text-[#3B4251] text-3xl font-medium">
            Dashboard Login
          </h1>
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
            <div className="text-sm flex justify-between mt-2 text-[#3B4251]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
