import { LinhaTabelaUsuariosProps } from "../types/LinhaTabelaUsuariosProps";

import { MdModeEditOutline } from "react-icons/md";
import { BiSolidTrash } from "react-icons/bi";

export default function LinhaTabelaUsuarios({
  nome,
  email,
  abrirModalEditar,
  abrirModalRemover,
}: LinhaTabelaUsuariosProps) {
  return (
    <tr className="text-sm font-medium text-gray-700">
      <td className="px-6 py-3">{nome}</td>
      <td className="px-6 py-3">{email}</td>
      <td className="px-6 py-3">
        <button onClick={abrirModalEditar} className="p-1">
          <MdModeEditOutline size={21} color={"#374151"} />
        </button>
      </td>
      <td className="px-6 py-3">
        <button onClick={abrirModalRemover} className="p-1">
          <BiSolidTrash size={21} color={"#374151"} />
        </button>
      </td>
    </tr>
  );
}
