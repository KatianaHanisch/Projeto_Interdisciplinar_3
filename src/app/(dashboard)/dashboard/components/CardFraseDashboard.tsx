import Image from "next/image";

export default function CardFraseDashboard() {
  return (
    <div className="col-span-2 row-span-2 bg-gray-300 rounded-lg p-3 shadow-md">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/book.png"
          alt="imagemLivro"
          width={300}
          height={300}
          className="pb-5"
        />
        <p className="italic text-lg  text-center text-gray-700">
          Os livros nos devolvem as asas da imaginação que o mundo tira.
        </p>
        <h4 className="font-semibold text-xl">Mayara Benatti</h4>
      </div>
    </div>
  );
}
