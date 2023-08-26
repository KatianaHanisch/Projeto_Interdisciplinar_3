import ButtonRelatorio from "./ButtonTituloPagina";

type TituloPaginaProps = {
  tituloPagina: string;
  tituloButton: string;
  Icone: any;
};

export default function TituloPagina({
  tituloPagina,
  tituloButton,
  Icone,
}: TituloPaginaProps) {
  return (
    <div className="flex items-center justify-between px-5 w-full">
      <h1 className="text-4xl font-semibold  text-gray-700">{tituloPagina}</h1>
      <ButtonRelatorio tituloButton={tituloButton} Icone={Icone} />
    </div>
  );
}
