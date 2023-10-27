import { ReactNode } from "react";

import { IconType } from "react-icons/lib";

export type TotalizadorProps = {
  tituloCard: string;
  IconeCard: IconType;
  informacaoCard: ReactNode;
};

export type DadosListaProps = {
  id?: number;
  livro: string;
  nome: string;
  telefone?: string | undefined; // Modificada para aceitar "undefined"
  status?: string | number | undefined; // Modificada para aceitar "undefined"
  dataEmprestimo: Date;
};

export type LinhasTabelaProps = {
  id?: number;
  token?: any;
  nome: string;
  telefone?: string;
  livro: string;
  tituloButton: string;
  status?: string;
  corButton: string;
  Icone: ReactNode;
  tipo?: string;
  recarregarDados?: () => void;
};

export type LinhaTabelaUsuariosProps = {
  id?: number;
  name: string;
  email: string;
  role_id?: string;
  roles?: any;
  fetchDataUsers?: () => void;
  abrirModalEditar?: () => void;
  abrirModalRemover?: () => void;
};

export type TituloPaginaProps = {
  tituloPagina: string;
  tituloButton: string;
  Icone: IconType;
  abrirModal?: () => void;
  gerarRelatorio?: (dados: LinhasTabelaProps[]) => void;
  tipoButton: string;
};

export type ButtonTituloPaginaProps = {
  tituloButton: string;
  Icone: IconType;
  abrirModal?: () => void;
  gerarRelatorio?: (dados: LinhasTabelaProps[]) => void | undefined;
  tipoButton: string;
};

export type DadosTabelaUsuariosProps = {
  dados: LinhaTabelaUsuariosProps[];
  roles?: any;
  fetchDataUsers?: () => void;
};

export type ListaProps = {
  dados: DadosListaProps[];
  tituloButton: string;
  corButton: string;
  Icone: ReactNode;
  tipo?: string;
  token?: any;
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
