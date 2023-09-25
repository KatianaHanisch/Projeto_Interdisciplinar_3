import { TituloPaginaProps } from "@/app/types/DashboardTypes";

import ButtonRelatorio from "./ButtonTituloPagina";

export default function TituloPagina({
  tituloPagina,
  tituloButton,
  Icone,
  abrirModal,
}: TituloPaginaProps) {
  return (
    <div className="flex items-center justify-between px-5 w-full">
      <h1 className="text-4xl font-semibold  text-gray-700">{tituloPagina}</h1>
      <ButtonRelatorio
        tituloButton={tituloButton}
        Icone={Icone}
        abrirModal={abrirModal}
      />
    </div>
  );
}
