"use client";

import { useState } from "react";

import Link from "next/link";

import { GrFormClose } from "react-icons/gr";
import { HiMenu } from "react-icons/hi";

import { AiOutlineHome } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";
import { LuBookX } from "react-icons/lu";
import { IoBagRemoveOutline } from "react-icons/io5";
import { LuBookUp } from "react-icons/lu";
import { FaBook } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

export default function MobileSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <button className="md:hidden ">
        <HiMenu onClick={toggleMenu} />
      </button>
      {menuOpen && (
        <div className="md:hidden absolute bg-gray-500 w-48 right-0 top-0 h-full backdrop-blur-md">
          <GrFormClose
            className="block my-2 text-gray-50 text-2xl ml-2"
            onClick={toggleMenu}
          />
          <div className="flex flex-col h-5/6 justify-between">
            <div className="flex flex-col items-center">
              <Link
                className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                href="/dashboard"
              >
                <span>
                  <AiOutlineHome className="text-gray-50" />
                </span>
                HOME
              </Link>

              <Link
                className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                href="/dashboard/adicionar"
              >
                <span>
                  <BiBookAdd className="/dashboard/adicionartext-gray-50" />
                  ADICIONAR
                </span>
              </Link>
              <Link
                className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                href="/dashboard/remover"
              >
                <span>
                  <LuBookX className="text-gray-50" />
                </span>
                REMOVER
              </Link>
              <Link
                className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                href="/dashboard/retiradas"
              >
                <span>
                  <IoBagRemoveOutline className="text-gray-50" />
                </span>
                RETIRADAS
              </Link>
              <Link
                className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                href="/dashboard/pedentes"
              >
                <span>
                  <LuBookUp className="text-gray-50" />
                </span>
                PEDENTES
              </Link>
              <Link
                className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                href="/dashboard/finalizados"
              >
                <span>
                  <FaBook className="text-gray-50" />
                </span>
                FINALIZADOS
              </Link>
              <Link
                className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                href="/dashboard/usuarios"
              >
                <span>
                  <FaUsers className="text-gray-50" />
                </span>
                USUÁRIOS
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
