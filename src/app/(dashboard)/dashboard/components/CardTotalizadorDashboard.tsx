import { TotalizadorProps } from "../types/TotalizadorProps";

export default function CardDashboard({
  tituloCard,
  iconeCard,
  informacaoCard,
}: TotalizadorProps) {
  return (
    <div className="bg-gray-300 col-span-1 row-span-1 p-7 rounded-lg shadow-sm h-[140px] 2xl:h-[190px] 2xl:flex 3xl:justify-center 2xl:items-center">
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 shadow-2xl rounded-full w-16 h-16 flex items-center justify-center">
          {iconeCard}
        </div>
        <div className="ml-3 pl-4 border-l-2  border-gray-400 ">
          <h3 className="font-medium uppercase text-gray-700 text-xl">
            {tituloCard}
          </h3>
          <h2 className="font-bold text-2xl text-gray-800 ">
            {informacaoCard}
          </h2>
        </div>
      </div>
    </div>
  );
}
