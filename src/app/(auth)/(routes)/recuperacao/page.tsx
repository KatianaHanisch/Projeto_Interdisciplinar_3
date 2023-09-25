"use client";

import React, { useState } from "react";
import Image from "next/image";

import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import Input from "@/app/components/Input";

export default function Recuperacao() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] gap-5 p-5">
      <Link
        href="/login"
        className=" text-2xl hover:bg-gray-200 rounded-full p-2"
      >
        <BsArrowLeft />
      </Link>

      <div className="flex w-[300px] flex-col text-center gap-3 justify-center items-center">
        <h1 className="text-[#3B4251] text-2xl">Recuperação de Senha</h1>

        <Input title="Nova senha" type="password" />
        <Input title="Confirme sua nova senha" type="password" />
        <button
          type="submit"
          className="h-10 rounded text-center w-full bg-[#D9D9D9] hover:bg-[#d4d4d4] hover:text-black"
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
      </div>
    </div>
  );
}
