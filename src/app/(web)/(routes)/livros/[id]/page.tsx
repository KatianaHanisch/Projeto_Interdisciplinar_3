import Image from "next/image";

export default function Detalhes() {
  return (
    <div className="m-auto mt-32 mb-32 px-3 xl:p-0 max-w-[1200px]">
      <div className="flex md:flex-row flex-col justify-center">
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            src="/capa-livro-440.jpg"
            width={300}
            height={440}
            alt="Capa do livro"
            className="shadow-lg"
          />
          <button className="text-slate-900 bg-green-400 w-[300px] mt-1 rounded p-2 hover:bg-green-500">
            Pegar Livro emprestado
          </button>
          ou
          <button className="text-slate-900 bg-green-400 w-[300px] mt-1 rounded p-2 hover:bg-green-500">
            Reservar Livro
          </button>
        </div>
        <div className="flex flex-col ml-3 mt-3 xl:ml-0 text-slate-900">
          <div className="">
            <h1 className="text-xl text-center md:text-start mb-1">
              Título do livro
            </h1>
            <h3 className="text-center md:text-start">Autor do livro</h3>
            <h3 className="mb-2 text-center md:text-start">Categorias</h3>
            <p className="mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              cumque, adipisci quidem sapiente expedita incidunt culpa ut rerum
              similique nesciunt doloribus temporibus, perspiciatis odio
              laboriosam ab quos labore unde eum. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Inventore cumque, adipisci quidem
              sapiente expedita incidunt culpa ut rerum similique nesciunt
              doloribus temporibus, perspiciatis odio laboriosam ab quos labore
              unde eum.
            </p>
          </div>
          <div className="mt-3">
            <h3 className="text-xl text-center md:text-start">
              Disponibilidade
            </h3>
            <p>
              Livro indisponível para empréstimo, faltam 2 dias para que o livro
              seja devolvido. Ao solicitar empréstimo, retire o livro em nossa
              biblioteca em até 2h.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
