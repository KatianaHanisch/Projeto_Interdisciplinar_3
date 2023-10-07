import TituloPagina from "../../components/TituloPagina";
import ListaDashboard from "../../components/ListaDashboard";

import { IoClose } from "react-icons/io5";
import { BsFiletypePdf } from "react-icons/bs";

const dados = [
  {
    nome: "Katiana H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Nevernight",
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
  {
    nome: "Katiana H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Nevernight",
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
  {
    nome: "Katiana H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Nevernight",
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
    <div className="w-full h-full flex flex-col p-10">
      <TituloPagina
        tituloPagina="Livros não retirados"
        tituloButton="Gerar relatório"
        Icone={BsFiletypePdf}
      />

      <ListaDashboard
        dados={dados}
        tituloButton="Retirado"
        corButton="vermelha"
        tipo="retirado"
        Icone={<IoClose size={20} color={"#ffffff"} />}
      />
    </div>
  );
}
