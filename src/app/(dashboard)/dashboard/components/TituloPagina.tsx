import ButtonRelatorio from "./ButtonRelatorio";

type TituloPaginaProps = {
  tituloPagina: string;
};

export default function TituloPagina({ tituloPagina }: TituloPaginaProps) {
  return (
    <div className="flex items-center justify-between px-5 w-full">
      <h1 className="text-4xl font-semibold  text-gray-700">{tituloPagina}</h1>
      <ButtonRelatorio />
    </div>
  );
}
