import Image from "next/image";

import imagemLivro from "../../../../../public/book.png";

export default function CardFraseDashboard() {
  return (
    <div className="col-span-2 row-span-2 bg-gray-300 rounded-lg p-3 shadow-md">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="h-3/5 w-7/12 ">
          <Image src={imagemLivro} alt="imagemLivro" className="h-full pb-4" />
        </div>
        <p className="italic text-lg  text-center text-gray-700">
          &quot;Os livros nos devolvem as asas da imaginação que o mundo
          tira.&quot;
        </p>
        <h4 className="font-semibold text-xl">Mayara Benatti</h4>
      </div>
    </div>
  );
}
