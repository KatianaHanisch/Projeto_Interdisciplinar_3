import { IconType } from "react-icons/lib";

import { ReactNode } from "react";

import { TbAlertCircle } from "react-icons/tb";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

type SnackBarProps = {
  mensagem: string;
  fecharSnackBar: () => void;
  // Icone: ReactNode;
  tipo: string;
};

export default function SnackBar({
  mensagem,
  fecharSnackBar,
  tipo,
}: SnackBarProps) {
  return (
    <div
      className={` fixed flex flex-row items-center justify-between top-0 w-2/5 mt-4 p-2  text-white rounded-lg shadow-xl ${
        tipo === "sucesso" ? "bg-green-800" : "bg-red-800"
      }`}
    >
      <div className="flex items-center">
        {tipo === "sucesso" ? (
          <IoCheckmarkDoneCircleOutline size={28} color={"#ffffff"} />
        ) : (
          <TbAlertCircle size={28} color={"#ffffff"} />
        )}
        <div className="ml-1">{mensagem}</div>
      </div>
      <button onClick={fecharSnackBar} className=" px-4 py-1  text-white">
        Fechar
      </button>
    </div>
  );
}
