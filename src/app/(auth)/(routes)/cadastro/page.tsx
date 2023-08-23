import Image from "next/image";
import Input from "../../../(web)/components/Input";
import Link from "next/link";

export default function Cadastro() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div
        className="w-1/2 hidden lg:block "
        style={{
          backgroundImage: 'url("/../../banner-login.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "100%",
        }}
      ></div>
      <div className="md:w-1/2 w-full flex justify-center -mt-12">
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
              <Link href="/login" className="hover:text-black">
                Já possuo conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
