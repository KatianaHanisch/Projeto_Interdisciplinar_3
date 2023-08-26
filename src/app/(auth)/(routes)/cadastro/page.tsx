import Image from "next/image";
import Link from "next/link";

import Input from "../../../components/Input";

import imageBackground from "../../../../../public/banner-login.jpg";

export default function Cadastro() {
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
            <form className="flex flex-col gap-3 text-[#3B4251]">
              <Input type="text" title="Nome" />
              <Input type="text" title="CPF" />
              <Input type="email" title="E-mail" />
              <Input type="password" title="Senha" />
              <button className="mt-6 h-10 rounded text-center bg-[#D9D9D9] hover:bg-[#d4d4d4] hover:text-black">
                Cadastrar-se
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
