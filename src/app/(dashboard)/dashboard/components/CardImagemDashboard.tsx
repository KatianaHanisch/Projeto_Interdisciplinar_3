import { useTheme } from "@/app/context/ThemeContext";

export default function CardImagemDashboard() {
  const { themeValue } = useTheme();

  return (
    <div
      className={`${
        themeValue === "light"
          ? "bg-light-dashboardLight"
          : "bg-dark-dashboardDark"
      } flex justify-center items-center row-span-2 col-span-1 rounded-lg shadow-md`}
    >
      <h1
        className={`${
          themeValue === "light"
            ? "text-light-dashboardText"
            : "text-dark-dashboardText"
        } font-medium text-xl`}
      >
        Alguma coisa aqui
      </h1>
    </div>
  );
}
