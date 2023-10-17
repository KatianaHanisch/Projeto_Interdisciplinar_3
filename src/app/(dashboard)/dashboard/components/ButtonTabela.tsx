import { ButtonTabelaProps } from "@/app/types/DashboardTypes";

export default function ButtonTabela({
  tituloButton,
  corButton,
  Icone,
  abrirModal,
  tipo,
}: ButtonTabelaProps) {
  return (
    <button
      onClick={abrirModal}
      className={`w-4/6 flex items-center text-white justify-center px-2 py-1  text-right text-base font-medium rounded-md ${
        corButton === "verde" ? "bg-green-900" : "bg-red-900"
      } ${
        tipo === "finalizado" || tipo === "reserva"
          ? "cursor-default"
          : "cursor-pointer"
      }`}
    >
      {Icone}
      {tituloButton}
    </button>
  );
}
