import { TituloPaginaProps } from "@/app/types/DashboardTypes";

import { useTheme } from "@/app/context/ThemeContext";

import ButtonRelatorio from "./ButtonTituloPagina";

export default function TituloPagina({
  tituloPagina,
  tituloButton,
  tipoButton,
  Icone,
  abrirModal,
  gerarRelatorio,
}: TituloPaginaProps) {
  const { themeValue } = useTheme();

  return (
    <div className="flex items-center justify-between px-5 w-full">
      <h1
        className={`${
          themeValue === "light"
            ? "text-light-dashboardText"
            : "text-dark-dashboardText"
        } text-4xl font-semibold`}
      >
        {tituloPagina}
      </h1>
      <ButtonRelatorio
        tipoButton={tipoButton}
        tituloButton={tituloButton}
        Icone={Icone}
        abrirModal={abrirModal}
        gerarRelatorio={gerarRelatorio}
      />
    </div>
  );
}
