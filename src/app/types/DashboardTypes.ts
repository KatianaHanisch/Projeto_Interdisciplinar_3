import { ReactNode } from "react";

import { IconType } from "react-icons/lib";

export type TotalizadorProps = {
  tituloCard: string;
  IconeCard: IconType;
  informacaoCard: number | string;
};

export type DadosListaProps = {
  id?: number;
  livro: string;
  usuario: string;
  telefone?: string;
  status?: number;
  dataEmprestimo: Date;
};

export type LinhasTabelaProps = {
  id?: number;
  nome: string;
  telefone?: string;
  livro: string;
  tituloButton: string;
  corButton: string;
  Icone: ReactNode;
  tipo?: string;
  recarregarDados?: () => void;
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
  recarregarDados?: () => void;
};

export type ButtonTabelaProps = {
  tituloButton: string;
  corButton: string;
  Icone: ReactNode;
  abrirModal?: () => void;
  tipo?: string;
};

export type TotalizadoresProps = {
  emprestimosPendentes: number;
  emprestimosFinalizados: number;
  totalLivrosCadastrados: number;
};
