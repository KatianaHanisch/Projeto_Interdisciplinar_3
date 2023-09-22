import React from "react";
import Image from "next/image";

import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] gap-5 p-5">
      <Link
        href="/login"
        className="mb-4 text-2xl hover:bg-gray-200 rounded-full p-2"
      >
        <BsArrowLeft />
      </Link>
      <div>
        <Image
          className="m-auto"
          alt="logo"
          width={130}
          height={120}
          src="/../../logo.svg"
        />
      </div>
      <div className="flex flex-col text-center gap-3 justify-center items-center">
        <h1 className="text-emerald-700 text-2xl">Cadastrado com sucesso!</h1>
        <h2 className="text-xl">
          Foi enviado ao seu e-mail a confirmação do cadastro, confirme pra
          acessar a Biblioteca.
        </h2>
        {/* <button className="p-2 hover:bg-emerald-600 bg-emerald-700 text-white rounded w-64">
          Enviar confirmação novamente
        </button> */}
      </div>
    </div>
  );
}
