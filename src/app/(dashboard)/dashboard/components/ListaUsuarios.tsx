import { DadosTabelaUsuariosProps } from "@/app/types/DashboardTypes";

import { useTheme } from "@/app/context/ThemeContext";

import LinhaTabelaUsuarios from "./LinhaTabelaUsuarios";

export default function ListaUsuarios({
  dados,
  roles,
  fetchDataUsers,
}: DadosTabelaUsuariosProps) {
  const { themeValue } = useTheme();

  return (
    <div className="w-full h-full py-6 px-4">
      <div className="w-full mt-6 shadow-md">
        <table
          className={`${
            themeValue === "light"
              ? "bg-gray-200  divide-gray-200"
              : "bg-gray-800 divide-gray-400"
          } w-full divide-y text-left rounded-md`}
        >
          <thead
            className={`${
              themeValue === "light"
                ? "text-light-dashboardText"
                : "text-dark-dashboardText"
            } text-base font-medium`}
          >
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Email</th>
            </tr>
          </thead>
          <tbody
            className={`${
              themeValue === "light"
                ? "bg-light-dashbardWhite divide-gray-200"
                : "bg-gray-700 divide-gray-400"
            } divide-y`}
          >
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
