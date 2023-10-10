"use client";

import { User } from "@/app/types/Types";
import { useState, FormEvent, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Input from "../../../components/Input";
import Toast from "@/app/components/Toast";
import imageBackground from "../../../../../public/banner-login.jpg";
import { useAuth } from "@/app/context/AuthContext";

export default function Cadastro() {
  const router = useRouter();
  const { validateToken, isAuthenticated } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<User>({
    name: "",
    email: "",
    phone: "",
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

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  if (isAuthenticated) {
    router.push("/");
    return null;
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
                type="text"
                title="Telefone"
                name="phone"
                value={userData.phone}
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
