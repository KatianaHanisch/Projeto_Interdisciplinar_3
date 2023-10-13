"use client";

import { useState, useEffect } from "react";

import { DadosListaProps } from "@/app/types/DashboardTypes";

import TituloPagina from "../../components/TituloPagina";
import ListaDashboard from "../../components/ListaDashboard";

import { IoClose } from "react-icons/io5";
import { BsFiletypePdf } from "react-icons/bs";
import { VscSearchStop } from "react-icons/vsc";

export default function Retiradas() {
  const [dados, setDados] = useState<DadosListaProps[]>([]);
  const [carregando, setCarregando] = useState(false);

  async function getRetiradasPendentes() {
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
    getRetiradasPendentes();
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
        <>
          {dados.length < 1 ? (
            <div className="w-full h-80 flex items-center justify-center flex-col">
              <VscSearchStop size={40} color="#8a9099" />
              <p className="text-gray-600 text-lg">
                Não há nenhuma retirada pendente
              </p>
            </div>
          ) : (
            <ListaDashboard
              recarregarDados={getRetiradasPendentes}
              dados={dados}
              tituloButton="Retirado"
              corButton="vermelha"
              tipo="retirado"
              Icone={<IoClose size={20} color={"#ffffff"} />}
            />
          )}
        </>
      )}
    </div>
  );
}
