import { LinhasTabelaProps } from "../types/LinhasTabelaProps";

import ButtonTabela from "./ButtonTabela";

export default function LinhasTabela({
  nome,
  telefone,
  livro,
  tituloButton,
  corButton,
  Icone,
}: LinhasTabelaProps) {
  return (
    <tr className="text-sm font-medium text-gray-700">
      <td className="px-6 py-3">{nome}</td>
      <td className="px-6 py-3">{telefone}</td>
      <td className="px-6 py-3">{livro}</td>
      <td className="px-6 py-3">
        <ButtonTabela
          tituloButton={tituloButton}
          corButton={corButton}
          icone={<Icone size={20} color={"#f1f1f1"} />}
        />
      </td>
    </tr>
  );
}
