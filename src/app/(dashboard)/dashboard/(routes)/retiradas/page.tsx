import TituloPagina from "../../components/TituloPagina";
import ListaDashboard from "../../components/ListaDashboard";
import { IoClose } from "react-icons/io5";

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
];

export default function Retiradas() {
  return (
    <div className="w-full h-full p-10">
      <TituloPagina tituloPagina="Livros não retirados" />
      <ListaDashboard
        dados={dados}
        tituloButton="Retirado"
        corButton="vermelha"
        icone={IoClose}
      />
    </div>
  );
}
