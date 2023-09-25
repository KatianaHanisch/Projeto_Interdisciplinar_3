import { ButtonTituloPaginaProps } from "@/app/types/DashboardTypes";

export default function ButtonRelatorio({
  tituloButton,
  Icone,
  abrirModal,
}: ButtonTituloPaginaProps) {
  return (
    <button
      onClick={abrirModal}
      className="px-4 py-2 bg-gray-300  flex items-center rounded-md font-semibold text-lg text-gray-800 hover:bg-gray-400 transition"
    >
      <div className="mr-1">
        <Icone size={22} color="#222931" />
      </div>
      {tituloButton}
    </button>
  );
}
