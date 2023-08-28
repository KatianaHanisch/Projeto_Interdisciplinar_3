import { ListaProps } from "../types/ListaProps";

import InputBusca from "./InputBusca";
import LinhasTabela from "./LinhasTabela";

export default function ListaDashboard({
  dados,
  tituloButton,
  corButton,
  Icone,
  abrirModal,
}: ListaProps) {
  return (
    <div className="w-full h-full py-6 px-4">
      <div className="w-full   flex items-center justify-end">
        <div className="w-1/2 py-4 ">
          <InputBusca placeholderInput="Digite o nome que procura" />
        </div>
      </div>
      <div className="w-full mt-1 shadow-md">
        <table className="w-full divide-y bg-gray-200  divide-gray-200 text-left">
          <thead className="text-base font-medium text-gray-700  ">
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Telefone</th>
              <th className="px-6 py-3">Livro</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dados.map(({ nome, livro, telefone }) => (
              <LinhasTabela
                key={nome}
                nome={nome}
                livro={livro}
                telefone={telefone}
                tituloButton={tituloButton}
                corButton={corButton}
                Icone={Icone}
                abrirModal={abrirModal}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
