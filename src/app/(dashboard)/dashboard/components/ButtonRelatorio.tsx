import { BsFiletypePdf } from "react-icons/bs";

export default function ButtonRelatorio() {
  return (
    <button className="px-4 py-2 bg-gray-300  flex items-center rounded-md font-semibold text-lg text-gray-800 hover:bg-gray-400 transition">
      <div className="mr-1">
        <BsFiletypePdf size={22} color="#222931" />
      </div>
      Gerar relatório
    </button>
  );
}
