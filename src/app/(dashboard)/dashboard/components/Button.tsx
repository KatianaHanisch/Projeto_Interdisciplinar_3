import { useTheme } from "@/app/context/ThemeContext";

type ButtonProps = {
  tituloButton: string;
  abrirModal?: () => void;
  typeButton?: "button" | "submit" | "reset" | undefined;
  carregando?: boolean | (() => void) | undefined;
};

export default function Button({
  tituloButton,
  typeButton,
  abrirModal,
  carregando,
}: ButtonProps) {
  const { themeValue } = useTheme();

  return (
    <button
      type={typeButton}
      onClick={abrirModal}
      className={`${
        themeValue === "light"
          ? "bg-gray-800 hover:bg-gray-900"
          : "bg-gray-900 hover:bg-gray-950"
      } text-xl flex items-center justify-center text-light-dashbardWhite font-semibold rounded-md px-6 w-48 py-2  transition`}
    >
      {carregando ? (
        <span className="h-6 w-6 block rounded-full border-4 border-t-blue-500 animate-spin"></span>
      ) : (
        <> {tituloButton} </>
      )}
    </button>
  );
}
