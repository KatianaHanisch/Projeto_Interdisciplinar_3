"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { BsBook } from "react-icons/bs";

export default function BannerHome({ themeValue }: any) {
  const [booksCount, setBooksCount] = useState<number | undefined>();
  const [usersCount, setUsersCount] = useState<number | undefined>();
  const [emprestimosCount, setEsprestimosCount] = useState<
    number | undefined
  >();

  console.log(themeValue);

  const fetchData = async () => {
    //GET DOS DOS LIVROS
    const response = await fetch("/api/todosLivros", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setBooksCount(data.length);
    } else {
      console.error("Failed to fetch data");
    }

    //GET DOS EMPRÉSTIMOS
    const responseEmprestimos = await fetch("/api/web/emprestimo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (responseEmprestimos.ok) {
      const data = await responseEmprestimos.json();
      setEsprestimosCount(data.length);
    } else {
      console.error("Failed to fetch data");
    }

    //GET DOS USUÁRIOS
    const responseUsers = await fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (responseUsers.ok) {
      const data = await responseUsers.json();
      setUsersCount(data.length);
    } else {
      console.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className={`text-gray-800`}>
      <div className="hidden md:block">
        <Image
          src="/banner.jpg"
          alt="exemplo"
          width={5000}
          height={600}
          className="max-h-[600px]"
        ></Image>
      </div>

      <div className="block md:hidden">
        <Image
          src="/banner-mobile.jpg"
          alt="exemplo"
          width={5000}
          height={300}
        ></Image>
      </div>

      <div
        className={`md:flex ${
          themeValue === "dark" ? "bg-dark-sectionHome" : "bg-light-sectionHome"
        } md:h-[80px] h-[60px] items-center justify-center px-6`}
      >
        <div
          className={`flex justify-between md:w-[1200px] text-base lg:text-xl  ${
            themeValue === "light"
              ? "text-light-sectionHomeText"
              : "text-dark-sectionHomeText"
          }`}
        >
          <div className="flex mx-auto md:mx-0 mt-3 md:mt-0 flex-col items-center">
            <p className="z-10 gap-2 flex">
              São <span className="flex items-end">{booksCount}</span> livros
              disponíveis
            </p>
            <span
              className={`absolute  ${
                themeValue === "dark"
                  ? "bg-dark-sectionHome"
                  : "bg-light-sectionHome"
              } mt-1 md:mt-3 md:p-6 p-5 rounded-full text-4xl`}
            >
              <BsBook />
            </span>
          </div>
          <div className="hidden md:flex flex-col items-center">
            <p className="z-10 gap-2 flex">
              Total de{" "}
              <span className="flex items-end">{emprestimosCount}</span> livros
              emprestados
            </p>
            <span
              className={`absolute  ${
                themeValue === "dark"
                  ? "bg-dark-sectionHome"
                  : "bg-light-sectionHome"
              } mt-1 md:mt-3 md:p-6 p-5 rounded-full text-4xl`}
            >
              <BsBook />
            </span>
          </div>
          <div className="hidden md:flex flex-col items-center">
            <p className="z-10 gap-2 flex">
              Mais de <span className="flex items-end">{usersCount}</span>{" "}
              usuários cadastrados
            </p>

            <span
              className={`absolute  ${
                themeValue === "dark"
                  ? "bg-dark-sectionHome"
                  : "bg-light-sectionHome"
              } mt-1 md:mt-3 md:p-6 p-5 rounded-full text-4xl`}
            >
              <BsBook />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
