import TituloPagina from "../../components/TituloPagina";
import ListaDashboard from "../../components/ListaDashboard";

import { MdDone } from "react-icons/md";

const dados = [
  {
    nome: "Katiana H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Darkdawn",
  },
  {
    nome: "Jakelie H. Hanisch",
    telefone: "(66) 996668855",
    livro: "A rainha do nada",
  },
  {
    nome: "Iago F. Aparecido",
    telefone: "(66) 996668855",
    livro: "A rebelde do deserto",
  },
];

export default function Retiradas() {
  return (
    <div className="w-full h-full p-10">
      <TituloPagina tituloPagina="Empréstimos finalizados" />
      <ListaDashboard
        dados={dados}
        tituloButton="Finalizado"
        corButton="verde"
        icone={MdDone}
      />
    </div>
  );
}
