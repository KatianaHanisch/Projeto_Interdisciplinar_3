import InputBusca from "../../components/InputBusca";
import ListaLivros from "./components/ListaLivros";

export default function Remover() {
  return (
    <div className="w-full p-10 ">
      <div className="w-full px-8">
        <InputBusca placeholderInput="Digite o nome do livro que procura" />
      </div>
      <ListaLivros />
    </div>
  );
}
