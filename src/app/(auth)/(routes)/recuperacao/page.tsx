"use client";

import React, { useState, FormEvent, useEffect } from "react";

import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import Input from "@/app/components/Input";

import { useRouter, useSearchParams } from "next/navigation";
import Toast from "@/app/components/Toast";

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
            {correct && (
              <div
                className={`flex items-center bg-green-500 rounded border-l-4 border-green-700 py-2 px-3 shadow-md mb-2 `}
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

                <div className="text-white max-w-xs ">{correct}</div>
              </div>
            )}
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
