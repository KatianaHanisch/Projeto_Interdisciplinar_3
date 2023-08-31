import TituloPagina from "../../components/TituloPagina";
import ListaDashboard from "../../components/ListaDashboard";

import { MdDone } from "react-icons/md";
import { BsFiletypePdf } from "react-icons/bs";

const dados = [
  {
    nome: "Katiana H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Darkdawn",
  },
  {
    nome: "Jakelie H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Fourth wing",
  },
  {
    nome: "Iago F. Aparecido",
    telefone: "(66) 996668855",
    livro: "A rebelde do deserto",
  },
  {
    nome: "Katiana H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Darkdawn",
  },
  {
    nome: "Jakelie H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Fourth wing",
  },
  {
    nome: "Iago F. Aparecido",
    telefone: "(66) 996668855",
    livro: "A rebelde do deserto",
  },
  {
    nome: "Katiana H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Darkdawn",
  },
  {
    nome: "Jakelie H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Fourth wing",
  },
  {
    nome: "Iago F. Aparecido",
    telefone: "(66) 996668855",
    livro: "A rebelde do deserto",
  },
  {
    nome: "Katiana H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Darkdawn",
  },
  {
    nome: "Jakelie H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Fourth wing",
  },
  {
    nome: "Iago F. Aparecido",
    telefone: "(66) 996668855",
    livro: "A rebelde do deserto",
  },
  {
    nome: "Katiana H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Darkdawn",
  },
  {
    nome: "Jakelie H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Fourth wing",
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
      <TituloPagina
        tituloPagina="Empréstimos finalizados"
        tituloButton="Gerar relatório"
        Icone={BsFiletypePdf}
      />
      <ListaDashboard
        dados={dados}
        tituloButton="Finalizado"
        corButton="verde"
        tipo="finalizado"
        Icone={<MdDone size={20} color={"#ffffff"} />}
      />
    </div>
  );
}
