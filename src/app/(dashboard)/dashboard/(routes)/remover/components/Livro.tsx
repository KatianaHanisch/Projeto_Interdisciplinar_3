import Image from "next/image";
import Link from "next/link";

type Props = {
  nome: string;
  autor: string;
  categoria: string;
};

export default function CardLivro({ nome, autor, categoria }: Props) {
  return (
    <Link
      href={`/dashboard/remover/${nome}`}
      className="flex flex-col relative w-[150px] transition-transform hover:scale-105 cursor-pointer"
    >
      <Image
        src="/capa-livro.jpg"
        width={150}
        height={220}
        alt="Capa do livro"
      />
      <div className="flex flex-col text-slate-800">
        <h1 className="font-semibold capitalize">{nome}</h1>
        <h3 className="mt-[-5px] font-normal capitalize">{autor}</h3>
        <h3 className="mt-[-5px] font-light capitalize">{categoria}</h3>
      </div>
    </Link>
  );
}
