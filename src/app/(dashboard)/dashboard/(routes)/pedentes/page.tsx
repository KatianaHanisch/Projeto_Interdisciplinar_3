import TituloPagina from "../../components/TituloPagina";
import ListaDashboard from "../../components/ListaDashboard";

import { IoClose } from "react-icons/io5";
import { BsFiletypePdf } from "react-icons/bs";

const dados = [
  {
    nome: "Katiana H. Hanisch",
    telefone: "(66) 996668855",
    livro: "O rei cruel",
  },
  {
    nome: "Jakelie H. Hanisch",
    telefone: "(66) 996668855",
    livro: "Corte de asas e ruínas",
  },
  {
    nome: "Iago F. Aparecido",
    telefone: "(66) 996668855",
    livro: "A traidora do trono",
  },
];

export default function Retiradas() {
  return (
    <div className="w-full h-full p-10">
      <TituloPagina
        tituloPagina="Empréstimos pedentes"
        tituloButton="Gerar relatório"
        Icone={BsFiletypePdf}
      />
      <ListaDashboard
        dados={dados}
        tituloButton="Devolvido"
        corButton="vermelha"
        icone={IoClose}
      />
    </div>
  );
}
