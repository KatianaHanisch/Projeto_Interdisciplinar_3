import Image from "next/image";

import Input from "../../../../components/Input";
import Textarea from "./components/Textarea";
import InputFile from "./components/InputFile";
import Button from "../../components/Button";

import book from "../../../../../../public/banner-login.jpg";

export default function Adicionar() {
  return (
    <div className="flex items-center justify-center h-full p-10 ">
      <div className="flex items-center justify-start rounded-lg  h-full w-full">
        <div className="w-2/4 h-full">
          <Image
            src={book}
            className="h-full rounded-l-lg"
            alt="imagem biblioteca"
          />
        </div>
        <div className="h-full w-full p-6 flex flex-col items-center bg-gray-300">
          <form className="w-11/12 h-full p-5 bg-white flex items-center flex-col rounded-lg gap-3 shadow-md">
            <h1 className="text-3xl font-semibold mb-4 text-gray-700">
              Adicionar livro
            </h1>
            <Input type="text" title="Título do livro" />
            <Input type="text" title="Autor do livro" />
            <Input type="text" title="Categoria do livro" />
            <Textarea />
            <InputFile />
            <div className="w-full py-1 flex items-center justify-end">
              <Button tituloButton="Adicionar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
