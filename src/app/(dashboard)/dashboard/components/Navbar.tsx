"use client";

import { useState, useEffect } from "react";

import { useAuth } from "@/app/context/AuthContext";
import { useTheme } from "@/app/context/ThemeContext";

import MobileSidebar from "./MobileSidebar";

import { BiSolidUser } from "react-icons/bi";
import { BiExit } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { validateTokenRoleFunction, isAuthenticated, name, logout } =
    useAuth();

  const { toggleTheme, themeValue } = useTheme();

  function abrirDropdown() {
    setOpen(!open);
  }

  useEffect(() => {
    validateTokenRoleFunction();
  }, [validateTokenRoleFunction]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      className={`flex items-center py-5 ${
        themeValue === "light"
          ? "bg-light-dashboardLight"
          : "bg-dark-dashboardDark"
      }`}
    >
      <MobileSidebar />
      <div className="flex w-full items-center justify-end px-10">
        <div
          className={`w-10 h-10 ${
            themeValue === "light"
              ? "bg-light-dashboardSecundaryColor"
              : "bg-dark-dashboardSecundaryColor"
          } flex items-center justify-center rounded-full cursor-pointer mr-20`}
        >
          <button onClick={toggleTheme}>
            {themeValue === "light" ? (
              <BsMoonFill color="#111827" />
            ) : (
              <BsSunFill color="#f1f5f9" />
            )}
          </button>
        </div>
        <h4
          className={`font-semibold text-xl mr-2 ${
            themeValue === "light" ? "text-light-text" : "text-dark-text"
          }`}
        >
          {name}
        </h4>
        <div
          className={`w-10 h-10 ${
            themeValue === "light"
              ? "bg-light-dashboardSecundaryColor"
              : "bg-dark-dashboardSecundaryColor"
          } flex items-center justify-center rounded-full cursor-pointer`}
        >
          <button className="" onClick={abrirDropdown}>
            <BiSolidUser
              className="w-8 h-8"
              color={`${themeValue === "light" ? "#1f2937" : "#f1f5f9"}`}
            />
          </button>
        </div>
        {open && (
          <div className="absolute  right-10 z-10 mt-24 w-48  rounded bg-white py-2 shadow-xl  focus:outline-none">
            <button
              onClick={() => logout()}
              className=" w-full flex items-center text-base font-medium text-gray-700 px-3 py-1 bg-white hover:bg-gray-200"
            >
              <BiExit size={20} color="#263141" />
              Sair
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
