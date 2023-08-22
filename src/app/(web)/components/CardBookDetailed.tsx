import Image from "next/image";
import Link from "next/link";

export default function CardBookDetailed() {
  return (
    <Link
      href="/livros/detalhes"
      className="flex m-auto justify- items-center sm:flex-row flex-col relative gap-3 hover:shadow-md transition-transform hover:scale-[1.01] cursor-pointer"
    >
      <div className="relative w-[170px]">
        <span className="absolute left-0 bg-slate-50 px-1 ">Status</span>
        <Image
          src="/capa-livro.jpg"
          width={170}
          height={240}
          alt="Capa do livro"
        />
      </div>

      <div className="flex flex-col text-slate-800 w-full">
        <h1 className="font-semibold text-2xl mb-2">Título do livro</h1>
        <p className="mb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          cumque, adipisci quidem sapiente expedita incidunt culpa ut rerum
          similique nesciunt doloribus temporibus, perspiciatis odio laboriosam
          ab quos labore unde eum.
        </p>
        <h3 className="mt-[-5px] mb-2 font-semibold">Autor do livro</h3>
        <h3 className="mt-[-5px] font-light">Categorias</h3>
      </div>
    </Link>
  );
}
