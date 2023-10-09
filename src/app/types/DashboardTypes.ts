import { ReactNode } from "react";

import { IconType } from "react-icons/lib";

export type TotalizadorProps = {
  tituloCard: string;
  IconeCard: IconType;
  informacaoCard: number;
};

export type DadosListaProps = {
  nome: string;
  telefone: string;
  livro: string;
};

export type LinhasTabelaProps = {
  nome: string;
  telefone: string;
  livro: string;
  tituloButton: string;
  corButton: string;
  Icone: ReactNode;
  tipo?: string;
};

export type LinhaTabelaUsuariosProps = {
  id?: number;
  name: string;
  email: string;
  abrirModalEditar?: () => void;
  abrirModalRemover?: () => void;
};

export type TituloPaginaProps = {
  tituloPagina: string;
  tituloButton: string;
  Icone: IconType;
  abrirModal?: () => void;
};

export type ButtonTituloPaginaProps = {
  tituloButton: string;
  Icone: IconType;
  abrirModal?: () => void;
};

export type DadosTabelaUsuariosProps = {
  dados: LinhaTabelaUsuariosProps[];
  abrirModalEditar: () => void;
};

export type ListaProps = {
  dados: DadosListaProps[];
  tituloButton: string;
  corButton: string;
  Icone: ReactNode;
  tipo?: string;
};

export type ButtonTabelaProps = {
  tituloButton: string;
  corButton: string;
  Icone: ReactNode;
  abrirModal?: () => void;
  tipo?: string;
};
