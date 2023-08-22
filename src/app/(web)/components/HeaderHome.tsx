"use client";

import Link from "next/link";
import React, { useState } from "react";

import { HiMenu } from "react-icons/hi";
import { HiMenuAlt3 } from "react-icons/hi";
import { BsFillBookFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { BiSolidLogIn } from "react-icons/bi";

export default function HeaderHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="">
      <div className="hidden md:flex max-w-[1200px] px-8 items-center h-[50px] m-auto  justify-between xl:px-0">
        <h2 className="text-gray-700 text-[14px]">BEM VINDO(A) A BIBLIOTECA</h2>
        <div className="group ">
          <Link
            className="mr-[25px] text-gray-700 text-[14px] hover:text-gray-950"
            href=""
          >
            CADASTRAR
          </Link>
          <Link
            className="text-gray-700 text-[14px] hover:text-gray-950"
            href=""
          >
            ENTRAR
          </Link>
        </div>
      </div>
      <div className="w-full border-b"></div>
      <div className="fixed z-20 bg-[white] md:relative top-0 max-w-[1200px] m-auto w-full flex justify-around md:justify-between items-center h-[70px] px-8 xl:px-0 ">
        <h1 className="font-semibold text-3xl md:text-5xl text-gray-800">
          BIBLIOTECA
        </h1>
        <div className="md:hidden text-3xl text-gray-800" onClick={toggleMenu}>
          <HiMenu />
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden z-20 fixed bg-gray-500 w-48 right-0 top-0 h-full backdrop-blur-md">
            <HiMenuAlt3
              className="block my-2 text-gray-50 text-2xl ml-2"
              onClick={toggleMenu}
            />
            <div className="flex flex-col h-5/6 justify-between">
              <div className="flex flex-col items-center gap-4">
                <Link
                  className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                  href=""
                >
                  <span>
                    <AiFillHome className="text-gray-50" />
                  </span>{" "}
                  HOME
                </Link>

                <Link
                  className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                  href=""
                >
                  <span>
                    <BsFillBookFill className="text-gray-50" />
                  </span>{" "}
                  LIVROS
                </Link>
                <Link
                  className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                  href=""
                >
                  <span>
                    <HiDotsCircleHorizontal className="text-gray-50" />
                  </span>{" "}
                  SOBRE
                </Link>
              </div>

              <div className="flex flex-col items-center">
                <Link
                  className="my-2 text-gray-50 text-1xl flex justify-start items-center gap-2"
                  href=""
                >
                  <span>
                    {" "}
                    <BiSolidLogIn className="text-gray-50" />
                  </span>{" "}
                  ENTRAR
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="group hidden md:flex">
          <Link
            className="mr-[35px] text-gray-800 hover:text-gray-950 "
            href=""
          >
            HOME
          </Link>
          <Link className="mr-[35px] text-gray-800 hover:text-gray-950" href="">
            LIVROS
          </Link>
          <Link className="text-gray-800 hover:text-gray-950" href="">
            SOBRE
          </Link>
        </div>
      </div>
    </nav>
  );
}
