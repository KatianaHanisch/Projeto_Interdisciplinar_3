type ButtonProps = {
  tituloButton: string;
  abrirModal: () => void;
};

export default function Button({ tituloButton, abrirModal }: ButtonProps) {
  return (
    <button
      onClick={abrirModal}
      className="text-xl text-gray-200 font-semibold rounded-md px-6 py-2 bg-gray-700 hover:bg-gray-800 transition"
    >
      {tituloButton}
    </button>
  );
}
