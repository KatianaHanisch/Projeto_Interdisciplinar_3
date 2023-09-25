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
  return (
    <button
      type={typeButton}
      onClick={abrirModal}
      className="text-xl flex items-center justify-center text-gray-200 font-semibold rounded-md px-6 w-48 py-2 bg-gray-700 hover:bg-gray-800 transition"
    >
      {carregando ? (
        <span className="h-6 w-6 block rounded-full border-4 border-t-blue-500 animate-spin"></span>
      ) : (
        <> {tituloButton} </>
      )}
    </button>
  );
}
