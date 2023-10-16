import { DadosTabelaUsuariosProps } from "@/app/types/DashboardTypes";

import LinhaTabelaUsuarios from "./LinhaTabelaUsuarios";

export default function ListaUsuarios({
  dados,
  roles,
  fetchDataUsers,
}: DadosTabelaUsuariosProps) {
  return (
    <div className="w-full h-full py-6 px-4">
      <div className="w-full mt-6 shadow-md">
        <table className="w-full divide-y bg-gray-200  divide-gray-200 text-left">
          <thead className="text-base font-medium text-gray-700  ">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dados.map(({ id, name, email, role_id }) => (
              <LinhaTabelaUsuarios
                key={id}
                id={id}
                name={name}
                email={email}
                role_id={role_id}
                roles={roles}
                fetchDataUsers={fetchDataUsers}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
