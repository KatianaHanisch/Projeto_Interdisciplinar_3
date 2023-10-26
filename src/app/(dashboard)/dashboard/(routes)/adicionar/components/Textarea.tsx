import { ChangeEvent } from "react";

import { useTheme } from "@/app/context/ThemeContext";

type TextareaProps = {
  name: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
};

export default function Textarea({ name, value, onChange }: TextareaProps) {
  const { themeValue } = useTheme();

  return (
    <div className="relative w-full ">
      <textarea
        id="floating_outlined"
        placeholder=""
        name={name}
        onChange={onChange}
        value={value}
        required
        className={`${
          themeValue === "light"
            ? "bg-light-dashbardWhite text-light-dashboardText"
            : "bg-dark-dashboardSecundaryColor text-dark-dashboardText"
        } block px-2.5 pb-2.5 pt-2 w-full text-sm rounded border border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer`}
      />
      <label
        htmlFor="floating_outlined"
        className={`${
          themeValue === "light"
            ? "bg-light-dashbardWhite text-light-dashboardText"
            : "bg-dark-dashboardSecundaryColor text-dark-dashboardText"
        } absolute text-sm text-gray-4 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-gary-600 peer-focus:dark:text-gary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
      >
        Sinopse livro
      </label>
    </div>
  );
}
