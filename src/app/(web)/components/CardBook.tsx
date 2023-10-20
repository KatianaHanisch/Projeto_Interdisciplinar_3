import Image from "next/image";
import Link from "next/link";

import { LivroProps } from "@/app/types/Types";

export default function CardBook({
  id,
  titulo,
  autor,
  categoria,
  capaUrl,
  themeValue,
}: LivroProps) {
  return (
    <Link
      href={`/livros/${id}`}
      className="flex flex-col relative w-[150px] transition-transform hover:scale-105 cursor-pointer"
    >
      <div>
        <Image src={capaUrl} width={150} height={210} alt="Capa do livro" />
      </div>
      <div
        className={`flex flex-col ${
          themeValue === "light"
            ? "text-light-textBooks"
            : "text-dark-textBooks"
        }`}
      >
        <h1 className="font-semibold mb-1 capitalize">{titulo}</h1>
        <h3 className="mt-[-5px] mb-2 font-normal">{autor}</h3>
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
