"use client";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTheme } from "@/app/context/ThemeContext";

import { AiOutlineHome, AiFillShopping } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";
import { LuBookX } from "react-icons/lu";
import { IoBagRemoveOutline } from "react-icons/io5";
import { LuBookUp } from "react-icons/lu";
import { FaBook } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

import { useAuth } from "@/app/context/AuthContext";

const routes = [
  {
    label: "Home",
    Icone: AiOutlineHome,
    href: "/dashboard",
  },
  {
    label: "Adicionar",
    Icone: BiBookAdd,
    href: "/dashboard/adicionar",
  },
  {
    label: "Remover",
    Icone: LuBookX,
    href: "/dashboard/remover",
  },

  {
    label: "Reservas",
    Icone: AiFillShopping,
    href: "/dashboard/reservas",
  },
  {
    label: "Retiradas",
    Icone: IoBagRemoveOutline,
    href: "/dashboard/retiradas",
  },
  {
    label: "Pedentes",
    Icone: LuBookUp,
    href: "/dashboard/pedentes",
  },
  {
    label: "Finalizados",
    Icone: FaBook,
    href: "/dashboard/finalizados",
  },
  {
    label: "Usuários",
    Icone: FaUsers,
    href: "/dashboard/usuarios",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const { themeValue } = useTheme();

  const { validateTokenRoleFunction, isAuthenticated } = useAuth();

  useEffect(() => {
    validateTokenRoleFunction();
  }, [validateTokenRoleFunction]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      className={`space-y-4 py-4 flex flex-col h-full ${
        themeValue === "light"
          ? "bg-light-dashboardLight"
          : "bg-dark-dashboardDark"
      } `}
    >
      <div className="px-3 py-2 flex-1 ">
        <Link
          href="/dashboard"
          className="flex items-center justify-start mb-7 flex-col "
        >
          <div className=" relative w-14 h-12 ">
            <Image fill alt="logo" src="/logo.png" />
          </div>
          <h1
            className={`${
              themeValue === "light"
                ? "text-light-dashboardText"
                : "text-dark-dashboardText"
            } font-semibold text-3xl md:text-3xl   tracking-wide`}
          >
            BIBLIOTECA
          </h1>
        </Link>
        <div className="flex flex-col h-3/4  justify-around">
          {routes.map(({ href, label, Icone }) => {
            const isActive = pathname === href;

            return (
              <Link key={href} href={href}>
                <div
                  className={`flex items-center p-2  transition rounded ${
                    isActive
                      ? themeValue === "light"
                        ? "bg-gray-100 hover:bg-gray-100 shadow-md"
                        : "bg-gray-600 hover:bg-gray-600"
                      : themeValue === "light"
                      ? "bg-gray-300 hover:bg-gray-200"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <Icone
                    className="h-7 w-7 mr-1"
                    color={`${themeValue === "light" ? "#171f29" : "#f1f5f9"}`}
                  />
                  <h2
                    className={`${
                      themeValue === "light"
                        ? "text-light-dashboardTextSecundary"
                        : "text-dark-dashboardText"
                    } font-semibold text-lg `}
                  >
                    {label}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
