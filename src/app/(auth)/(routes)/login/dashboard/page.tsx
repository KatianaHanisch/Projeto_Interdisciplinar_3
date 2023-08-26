import Image from "next/image";

import Input from "../../../../components/Input";
import Modal from "../../../../components/ModalForgotPassword";

import imagemBackground from "../../../../../../public/banner-login.jpg";

export default function Login() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-1/2 h-full hidden lg:block ">
        <Image
          src={imagemBackground}
          alt="imagem de fundo"
          className="h-full"
        />
      </div>
      <div className="md:w-1/2 w-full h-full flex justify-center -mt-12 ">
        <div className="w-[340px] flex flex-col gap-7 px-2 md:px-0 my-auto ">
          <Image
            className="m-auto"
            alt="logo"
            width={130}
            height={120}
            src="/../../logo.svg"
          />
          <h1 className="text-[#3B4251] text-3xl font-medium">
            Dashboard login
          </h1>
          <div>
            <form className="flex flex-col gap-3 text-[#3B4251]">
              <Input type="email" title="E-mail" />
              <Input type="password" title="Senha" />
              <button className="mt-6 h-10 rounded text-center bg-[#D9D9D9] hover:bg-[#d4d4d4] hover:text-black">
                Entrar
              </button>
            </form>
            <div className="text-sm flex justify-between mt-2 text-[#3B4251]">
              <Modal buttonContent="Esqueci a senha" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
