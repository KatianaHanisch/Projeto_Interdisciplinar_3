export type User = {
  name?: string;
  password: string;
  confirmPassword?: string;
  email?: string;
};

export type LivroProps = {
  id?: number;
  titulo: string;
  autor: string;
  categoria: string;
  sinopse: string;
  capaUrl: string;
  quantidadeDisponivel?: number;
};
