"use client";

import { useState } from "react";
import Link from "next/link";

import MobileSidebar from "./MobileSidebar";

import { BiSolidUser } from "react-icons/bi";
import { BiExit } from "react-icons/bi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function abrirDropdown() {
    setOpen(!open);
  }

  return (
    <div className="flex items-center py-5 bg-gray-300">
      <MobileSidebar />
      <div className="flex w-full items-center justify-end px-10">
        <h4 className="font-semibold text-xl mr-2 text-gray-800">Admin</h4>
        <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full cursor-pointer">
          <button className="" onClick={abrirDropdown}>
            <BiSolidUser className="w-8 h-8" color="#1f2937" />
          </button>
          {open && (
            <div className="absolute  right-10 z-10 mt-24 w-48  rounded bg-white py-2 shadow-xl  focus:outline-none">
              <Link
                href=""
                className="flex items-center text-base  font-medium text-gray-700 px-3 py-1 bg-white hover:bg-gray-200"
              >
                <BiExit size={20} color="#263141" />
                Sair
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
