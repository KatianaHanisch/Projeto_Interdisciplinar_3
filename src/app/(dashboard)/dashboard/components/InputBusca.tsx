type InputBuscaProps = {
  placeholderInput: string;
};

import { BsSearch } from "react-icons/bs";

export default function InputBusca({ placeholderInput }: InputBuscaProps) {
  return (
    <div className="w-11/12 flex items-center justify-center bg-gray-50 py-2 px-3 border border-gray-400 rounded-md">
      <BsSearch color="#89909b" size={20} />
      <input
        type="text"
        placeholder={placeholderInput}
        className="w-full ml-2 bg-transparent text-base focus:outline-none  text-gray-600 border-l border-gray-300 px-2"
      />
    </div>
  );
}
