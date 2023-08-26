import TituloPagina from "../../components/TituloPagina";
import ListaUsuarios from "../../components/ListaUsuarios";

import { MdPersonAddAlt1 } from "react-icons/md";

const dados = [
  { nome: "Katiana H. Hanisch", email: "katiana.teste@gmail.com" },
  { nome: "Jakeline H. Hanisch", email: "jakeline.teste@gmail.com" },
  { nome: "Iago F. Aparecido", email: "iago.teste@gmail.com" },
];

export default function Usuarios() {
  return (
    <div className="w-full h-full p-10">
      <TituloPagina
        tituloPagina="Usuários"
        tituloButton="Adicionar usuário"
        Icone={MdPersonAddAlt1}
      />
      <ListaUsuarios dados={dados} />
    </div>
  );
}
