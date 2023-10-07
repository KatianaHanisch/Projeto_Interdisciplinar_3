import Image from "next/image";
import Link from "next/link";

import { LivroProps } from "@/app/types/Types";

export default function CardLivro({
  id,
  titulo,
  autor,
  categoria,
  capaUrl,
}: LivroProps) {
  return (
    <Link
      href={`/dashboard/remover/${id}`}
      className="flex flex-col relative w-[150px] transition-transform cursor-pointer h-[286px]"
    >
      <Image
        src={capaUrl || "/capa-livro.jpg"}
        width={150}
        height={220}
        alt="Capa do livro"
      />
      <div className="flex flex-col text-slate-800">
        <h1 className="font-semibold capitalize">{titulo}</h1>
        <h3 className="mt-[-5px] font-normal capitalize">{autor}</h3>
        <h3 className="mt-[-5px] font-light capitalize">{categoria}</h3>
      </div>
    </Link>
  );
}
