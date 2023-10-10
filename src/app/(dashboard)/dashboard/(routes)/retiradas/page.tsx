"use client";

import { useState, useEffect } from "react";

import { DadosListaProps } from "@/app/types/DashboardTypes";

import TituloPagina from "../../components/TituloPagina";
import ListaDashboard from "../../components/ListaDashboard";

import { IoClose } from "react-icons/io5";
import { BsFiletypePdf } from "react-icons/bs";

export default function Retiradas() {
  const [dados, setDados] = useState<DadosListaProps[]>([]);
  const [carregando, setCarregando] = useState(false);

  async function getLivrosPendentes() {
    setCarregando(true);
    try {
      const res = await fetch("/api/dashboard/retiradasPendentes");
      const data = await res.json();

      setDados(data);
      setCarregando(false);
    } catch (error) {
      setCarregando(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getLivrosPendentes();
  }, []);
  return (
    <div className="w-full h-full flex flex-col p-10">
      <TituloPagina
        tituloPagina="Livros não retirados"
        tituloButton="Gerar relatório"
        Icone={BsFiletypePdf}
      />
      {carregando ? (
        <div className="flex items-center justify-center w-full h-full">
          <span className="h-11 w-11 block rounded-full border-4 border-t-blue-600 animate-spin"></span>
        </div>
      ) : (
        <ListaDashboard
          recarregarDados={getLivrosPendentes}
          dados={dados}
          tituloButton="Retirado"
          corButton="vermelha"
          tipo="retirado"
          Icone={<IoClose size={20} color={"#ffffff"} />}
        />
      )}
    </div>
  );
}
