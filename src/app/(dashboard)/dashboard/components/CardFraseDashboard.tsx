import Image from "next/image";

import { useTheme } from "@/app/context/ThemeContext";

import imagemLivro from "../../../../../public/book.png";

export default function CardFraseDashboard() {
  const { themeValue } = useTheme();

  return (
    <div
      className={`${
        themeValue === "light"
          ? "bg-light-dashboardLight"
          : "bg-dark-dashboardDark"
      } col-span-2 row-span-2 rounded-lg p-3 shadow-md`}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className="h-3/5 w-7/12 ">
          <Image src={imagemLivro} alt="imagemLivro" className="h-full pb-4" />
        </div>
        <p
          className={` ${
            themeValue === "light"
              ? "text-light-dashboardTextSecundary"
              : "text-dark-dashboardTextSecundary"
          } italic text-lg  text-cente`}
        >
          &quot;Os livros nos devolvem as asas da imaginação que o mundo
          tira.&quot;
        </p>
        <h4
          className={`${
            themeValue === "light"
              ? "text-light-dashboardText"
              : "text-dark-dashboardText"
          } font-semibold text-xl`}
        >
          Mayara Benatti
        </h4>
      </div>
    </div>
  );
}
