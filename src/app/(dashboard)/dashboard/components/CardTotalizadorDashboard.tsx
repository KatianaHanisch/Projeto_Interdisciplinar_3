import { TotalizadorProps } from "@/app/types/DashboardTypes";

import { useTheme } from "@/app/context/ThemeContext";

export default function CardDashboard({
  tituloCard,
  IconeCard,
  informacaoCard,
}: TotalizadorProps) {
  const { themeValue } = useTheme();

  return (
    <div
      className={`${
        themeValue === "light"
          ? "bg-light-dashboardLight"
          : "bg-dark-dashboardDark"
      } col-span-1 row-span-1 p-7 rounded-lg shadow-sm h-[140px] 2xl:h-[190px] 2xl:flex 3xl:justify-center 2xl:items-center`}
    >
      <div className="flex items-center justify-center">
        <div
          className={`${
            themeValue === "light"
              ? "bg-light-dashboardSecundaryColor"
              : "bg-dark-dashboardSecundaryColor"
          } shadow-2xl rounded-full w-16 h-16 flex items-center justify-center`}
        >
          {
            <IconeCard
              size={40}
              color={`${themeValue === "light" ? "#1f2937" : "#f1f5f9"}`}
            />
          }
        </div>
        <div className="ml-3 pl-4 border-l-2  border-gray-400 ">
          <h3
            className={`${
              themeValue === "light"
                ? "text-light-dashboardText"
                : "text-dark-dashboardText"
            } font-medium uppercase  text-xl`}
          >
            {tituloCard}
          </h3>
          <h2
            className={`${
              themeValue === "light"
                ? "text-light-dashboardText"
                : "text-dark-dashboardText"
            } font-bold text-2xl`}
          >
            {informacaoCard}
          </h2>
        </div>
      </div>
    </div>
  );
}
