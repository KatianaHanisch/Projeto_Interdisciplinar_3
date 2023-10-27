import { ButtonTituloPaginaProps } from "@/app/types/DashboardTypes";

import { useTheme } from "@/app/context/ThemeContext";

export default function ButtonRelatorio({
  tituloButton,
  Icone,
  abrirModal,
  tipoButton,
  gerarRelatorio,
}: ButtonTituloPaginaProps) {
  const { themeValue } = useTheme();

  return (
    <button
      onClick={
        tipoButton === "relatorio"
          ? () => gerarRelatorio && gerarRelatorio([])
          : abrirModal
      }
      className={`${
        themeValue === "light"
          ? "bg-light-dashboardLight text-light-dashboardText hover:bg-gray-400"
          : "bg-dark-dashboardDark text-dark-dashboardText hover:bg-gray-900"
      } px-4 py-2 flex items-center rounded-md font-semibold text-lg  transition`}
    >
      <div className="mr-1">
        <Icone
          size={22}
          color={`${themeValue === "light" ? "#1f2937" : "#f1f5f9"}`}
        />
      </div>
      {tituloButton}
    </button>
  );
}
