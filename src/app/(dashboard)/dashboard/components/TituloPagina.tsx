import { IconType } from "react-icons/lib";

import ButtonRelatorio from "./ButtonTituloPagina";

type TituloPaginaProps = {
  tituloPagina: string;
  tituloButton: string;
  Icone: IconType;
  abrirModal?: () => void;
};

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
