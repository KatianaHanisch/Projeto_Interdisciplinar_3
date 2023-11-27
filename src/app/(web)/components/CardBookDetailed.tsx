import Image from "next/image";
import Link from "next/link";

import { LivroProps } from "@/app/types/Types";

export default function CardBookDetailed({
  id,
  titulo,
  autor,
  categoria,
  sinopse,
  capaUrl,
  themeValue,
}: LivroProps) {
  const maxCaracteresSinopse = 220;

  return (
    <Link
      href={`/livros/${id}`}
      className="flex m-auto z-0 justify- items-center sm:flex-row flex-col relative gap-3 hover:shadow-md transition-transform hover:scale-[1.01] cursor-pointer"
    >
      <div className="relative w-[170px]">
        <Image src={capaUrl} width={170} height={240} alt="Capa do livro" />
      </div>

      <div
        className={`flex flex-col ${
          themeValue === "dark" ? "text-dark-text" : "text-light-text"
        } w-full`}
      >
        <h1 className="font-semibold text-2xl mb-2 capitalize">{titulo}</h1>
        <p className="mb-3">
          {sinopse && sinopse.length > maxCaracteresSinopse
            ? `${sinopse.slice(0, maxCaracteresSinopse)}...`
            : sinopse}
        </p>
        <h3 className="mt-[-5px]  font-semibold capitalize">{autor}</h3>
        <h3
          className={`mt-[-5px] font-light capitalize  ${
            themeValue === "light"
              ? "text-light-textBooks2"
              : "text-dark-textBooks2"
          }`}
        >
          {categoria}
        </h3>
      </div>
    </Link>
  );
}
