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
      <span className="absolute right-0 bg-slate-50 px-1">Status</span>
      <Image src={capaUrl} width={150} height={220} alt="Capa do livro" />
      <div className="flex flex-col text-slate-800">
        <h1 className="font-semibold">{titulo}</h1>
        <h3 className="mt-[-5px] font-normal">{autor}</h3>
        <h3 className="mt-[-5px] font-light">{categoria}</h3>
      </div>
    </Link>
  );
}
