"use client";

import React, { useState, FormEvent, useEffect } from "react";

import Link from "next/link";
import Input from "@/app/components/Input";
import Toast from "@/app/components/Toast";
import ToastSuccess from "@/app/components/ToastSuccess";

import { useRouter, useSearchParams } from "next/navigation";

export default function Recuperacao() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(String);
  const [correct, setCorrect] = useState(String);
  const [password, setPassword] = useState(String);

  const [confirmPassword, setConfirmPassword] = useState(String);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (confirmPassword !== password) {
      setError("Senhas não coincidem!");
      setLoading(false);
      return;
    }

    const data = {
      password: password,
      token: token,
    };

    try {
      const response = await fetch("/api/auth/recuperacao", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        setCorrect("Senha alterada com sucesso!");
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } else {
        setError("Erro ao mudar sua senha!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro ao analisar JSON:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
  }, []);

  return (
    <div className="bg-gray-200 h-[100vh] flex items-center justify-center">
      <div className="flex rounded bg-white w-[450px] h-[400px] flex-col justify-center items-center  gap-5 p-5">
        <form
          className="flex w-[300px] flex-col text-center gap-3 justify-center items-center"
          onSubmit={onSubmit}
        >
          <h1 className="text-[#3B4251] text-3xl mb-5">Recuperação de Senha</h1>

          <Input
            title="Nova senha"
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <Input
            title="Confirme sua nova senha"
            type="password"
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
          />
          <div className="w-full">{error && <Toast text={error} />}</div>
          <div className="w-full">
            {correct && <ToastSuccess text={correct} />}
          </div>
          <button
            type="submit"
            className="h-10 rounded text-center mt-[-10px] w-full bg-[#D9D9D9] hover:bg-[#d4d4d4] hover:text-black"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 rounded-full animate-pulse dark:bg-[#3B4251]"></div>
                <div className="w-2 h-2 rounded-full animate-pulse dark:bg-[#3B4251]"></div>
                <div className="w-2 h-2 rounded-full animate-pulse dark:bg-[#3B4251]"></div>
              </div>
            ) : (
              "Alterar senha"
            )}
          </button>
          <div>
            <Link
              href="/login"
              className="text-left text-[#3B4251] rounded-full"
            >
              Voltar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
