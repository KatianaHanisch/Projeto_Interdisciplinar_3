"use client";

import { useState, useEffect } from "react";

import TituloPagina from "../../components/TituloPagina";
import ListaDashboard from "../../components/ListaDashboard";

import { DadosListaProps } from "@/app/types/DashboardTypes";

import { IoClose } from "react-icons/io5";
import { BsFiletypePdf } from "react-icons/bs";
import { VscSearchStop } from "react-icons/vsc";

export default function Retiradas() {
  const [dados, setDados] = useState<DadosListaProps[]>([]);
  const [carregando, setCarregando] = useState(false);

  async function getEmprestimosPendentes() {
    setCarregando(true);
    try {
      const res = await fetch("/api/dashboard/emprestimosPendentes");
      const data = await res.json();

      setDados(data);
      setCarregando(false);
    } catch (error) {
      setCarregando(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getEmprestimosPendentes();
  }, []);

  console.log(dados.length);

  return (
    <div className="w-full h-full p-10">
      <TituloPagina
        tituloPagina="Empréstimos pedentes"
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
            <div className="w-full h-full flex items-center justify-center flex-col  ">
              <VscSearchStop size={40} color="#8a9099" />
              <p className="text-gray-600 ">
                Não há nenhum empréstimo pendente
              </p>
            </div>
          ) : (
            <ListaDashboard
              dados={dados}
              recarregarDados={getEmprestimosPendentes}
              tituloButton="Devolvido"
              corButton="vermelha"
              tipo="pedente"
              Icone={<IoClose size={20} color={"#ffffff"} />}
            />
          )}
        </>
      )}
    </div>
  );
}
