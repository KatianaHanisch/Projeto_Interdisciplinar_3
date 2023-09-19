import React, { ReactNode } from "react";
import { IconType } from "react-icons/lib";

export type ButtonTabelaProps = {
  tituloButton: string;
  corButton: string;
  Icone: ReactNode;
  abrirModal?: () => void;
  tipo?: string;
};
