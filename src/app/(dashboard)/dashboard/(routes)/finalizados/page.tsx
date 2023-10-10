"use client";

import { useState, useEffect } from "react";

import { DadosListaProps } from "@/app/types/DashboardTypes";

import TituloPagina from "../../components/TituloPagina";
import ListaDashboard from "../../components/ListaDashboard";

import { MdDone } from "react-icons/md";
import { BsFiletypePdf } from "react-icons/bs";

export default function Retiradas() {
  const [dados, setDados] = useState<DadosListaProps[]>([]);
  const [carregando, setCarregando] = useState(false);

  async function getEmprestimosFinalizados() {
    setCarregando(true);
    try {
      const res = await fetch("/api/dashboard/emprestimosFinalizados");
      const data = await res.json();

      setDados(data);
      setCarregando(false);
    } catch (error) {
      setCarregando(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getEmprestimosFinalizados();
  }, []);
  return (
    <div className="w-full h-full p-10">
      <TituloPagina
        tituloPagina="Empréstimos finalizados"
        tituloButton="Gerar relatório"
        Icone={BsFiletypePdf}
      />
      <ListaDashboard
        dados={dados}
        recarregarDados={getEmprestimosFinalizados}
        tituloButton="Finalizado"
        corButton="verde"
        tipo="finalizado"
        Icone={<MdDone size={20} color={"#ffffff"} />}
      />
    </div>
  );
}
