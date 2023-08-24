import InputBusca from "./components/InputBusca";
import Livro from "./components/Livro";
import ListaLivros from "./components/ListaLivros";

export default function Remover() {
  return (
    <div className="w-full p-10 ">
      <InputBusca />
      <ListaLivros />
    </div>
  );
}
