type ButtonProps = {
  tituloButton: string;
};

export default function Button({ tituloButton }: ButtonProps) {
  return (
    <button className="text-xl text-gray-200 font-semibold rounded-md px-6 py-2 bg-gray-700 hover:bg-gray-800 transition">
      {tituloButton}
    </button>
  );
}
