"use client";

import { useState, useEffect } from "react";

import { DadosListaProps } from "@/app/types/DashboardTypes";

import TituloPagina from "../../components/TituloPagina";
import ListaDashboard from "../../components/ListaDashboard";

import { MdDone } from "react-icons/md";
import { BsFiletypePdf } from "react-icons/bs";
import { VscSearchStop } from "react-icons/vsc";

export default function Reservas() {
  const [dados, setDados] = useState<DadosListaProps[]>([]);
  const [carregando, setCarregando] = useState(false);

  async function getReservas() {
    setCarregando(true);

    try {
      const res = await fetch("/api/dashboard/reservasLivros");
      const data = await res.json();

      setDados(data);
      setCarregando(false);
    } catch (error) {
      setCarregando(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getReservas();
  }, []);

  return (
    <div className="w-full h-full flex flex-col p-10">
      <TituloPagina
        tituloPagina="Reservas de livros"
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
                Não há nenhuma reserva pendente
              </p>
            </div>
          ) : (
            <ListaDashboard
              recarregarDados={getReservas}
              dados={dados}
              tituloButton="Reservado"
              corButton="verde"
              tipo="reserva"
              Icone={<MdDone size={22} color={"#ffffff"} />}
            />
          )}
        </>
      )}
    </div>
  );
}
