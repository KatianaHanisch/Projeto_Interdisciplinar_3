import CardTotalizadorDashboard from "./components/CardTotalizadorDashboard";
import CardFraseDashboard from "./components/CardFraseDashboard";
import CardImagemDashboard from "./components/CardImagemDashboard";

import { BiSolidBookOpen } from "react-icons/bi";

export default function Dashboard() {
  return (
    <main className="grid grid-cols-3 grid-rows-3 gap-7 h-full p-11">
      <CardTotalizadorDashboard
        iconeCard={<BiSolidBookOpen size={40} />}
        tituloCard="Empréstimos Pedentes"
        informacaoCard={5}
      />
      <CardTotalizadorDashboard
        iconeCard={<BiSolidBookOpen size={40} />}
        tituloCard="Empréstimos Finalizados"
        informacaoCard={22}
      />
      <CardTotalizadorDashboard
        iconeCard={<BiSolidBookOpen size={40} />}
        tituloCard="Livros Cadastrados"
        informacaoCard={222}
      />
      <CardFraseDashboard />
      <CardImagemDashboard />
    </main>
  );
}
