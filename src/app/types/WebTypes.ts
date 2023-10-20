export type CategoriaProps = {
  categoria: string;
};

export type LivroBuscaProps = {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
  onSearch: (searchText: string) => void;
  categorias: CategoriaProps[];
  buscaCategoria?: (value: string) => void;
  todosLivros: () => void;
};
