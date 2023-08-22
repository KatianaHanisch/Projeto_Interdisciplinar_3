import Image from "next/image";
import Link from "next/link";

export default function CardBook() {
  return (
    <Link
      href="/livros/detalhes"
      className="flex flex-col relative w-[150px] transition-transform hover:scale-105 cursor-pointer"
    >
      <span className="absolute right-0 bg-slate-50 px-1">Status</span>
      <Image
        src="/capa-livro.jpg"
        width={150}
        height={220}
        alt="Capa do livro"
      />
      <div className="flex flex-col text-slate-800">
        <h1 className="font-semibold">Título do livro</h1>
        <h3 className="mt-[-5px] font-normal">Autor</h3>
        <h3 className="mt-[-5px] font-light">Categorias</h3>
      </div>
    </Link>
  );
}
