import { IconType } from "react-icons/lib";

import { ReactNode } from "react";

export type LinhasTabelaProps = {
  nome: string;
  telefone: string;
  livro: string;
  tituloButton: string;
  corButton: string;
  Icone: ReactNode;
  tipo?: string;
};
