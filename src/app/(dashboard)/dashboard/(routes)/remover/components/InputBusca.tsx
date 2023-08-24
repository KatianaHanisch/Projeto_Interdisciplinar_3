import { BsSearch } from "react-icons/bs";

export default function InputBusca() {
  return (
    <div className="w-full flex items-center justify-center bg-gray-50 p-3 border border-gray-400 rounded-md">
      <BsSearch color="#89909b" size={20} />
      <input
        type="text"
        placeholder="Digite o titulo do livro que busca"
        className="w-full ml-2 bg-transparent text-lg focus:outline-none  text-gray-600"
      />
    </div>
  );
}
