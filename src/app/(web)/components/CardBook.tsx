import Image from "next/image";
import Link from "next/link";

import { LivroProps } from "@/app/types/Types";

export default function CardBook({
  id,
  titulo,
  autor,
  categoria,
  capaUrl,
}: LivroProps) {
  return (
    <Link
      href={`/livros/${id}`}
      className="flex flex-col relative w-[150px] transition-transform hover:scale-105 cursor-pointer"
    >
      <div>
        <Image src={capaUrl} width={150} height={210} alt="Capa do livro" />
      </div>
      <div className="flex flex-col text-slate-80 ">
        <h1 className="font-semibold mb-1 capitalize">{titulo}</h1>
        <h3 className="mt-[-5px] mb-2 font-normal">{autor}</h3>
        <h3 className="mt-[-5px] font-light capitalize text-gray-600">
          {categoria}
        </h3>
      </div>
    </Link>
  );
}
