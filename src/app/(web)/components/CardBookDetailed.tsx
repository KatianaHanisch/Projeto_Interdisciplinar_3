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
}: LivroProps) {
  return (
    <Link
      href={`/livros/${id}/`}
      className="flex m-auto justify- items-center sm:flex-row flex-col relative gap-3 hover:shadow-md transition-transform hover:scale-[1.01] cursor-pointer"
    >
      <div className="relative w-[170px]">
        <Image src={capaUrl} width={170} height={240} alt="Capa do livro" />
      </div>

      <div className="flex flex-col text-slate-800 w-full">
        <h1 className="font-semibold text-2xl mb-2">{titulo}</h1>
        <p className="mb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          cumque, adipisci quidem sapiente expedita incidunt culpa ut rerum
          similique nesciunt doloribus temporibus, perspiciatis odio laboriosam
          ab quos labore unde eum.
        </p>
        <h3 className="mt-[-5px]  font-semibold">{autor}</h3>
        <h3 className="mt-[-5px] font-light">{categoria}</h3>
      </div>
    </Link>
  );
}
