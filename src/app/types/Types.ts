export type User = {
  name?: string;
  phone?: string;
  password: string;
  confirmPassword?: string;
  email?: string;
  role?: number;
};

export type Roles = {
  id: string;
  name: string;
};

export type LivroProps = {
  id?: number;
  titulo: string;
  autor: string;
  categoria: string;
  sinopse?: string;
  capaUrl: string;
  quantidadeDisponivel?: number;
  themeValue?: any;
};
