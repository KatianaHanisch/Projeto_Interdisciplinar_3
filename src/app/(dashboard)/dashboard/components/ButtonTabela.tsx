import { ButtonTabelaProps } from "../types/ButtonTabelaProps";

export default function ButtonTabela({
  tituloButton,
  corButton,
  icone,
}: ButtonTabelaProps) {
  return (
    <button
      className={`w-4/6 flex items-center text-white justify-center px-2 py-1  text-right text-base font-medium rounded-md ${
        corButton === "verde" ? "bg-green-900" : "bg-red-900"
      }`}
    >
      {icone}
      {tituloButton}
    </button>
  );
}
