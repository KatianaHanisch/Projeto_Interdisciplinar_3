import React from "react";

import { BiSearch } from "react-icons/bi";

type LivroBuscaProps = {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
  onSearch: (searchText: string) => void;
  themeValue: any;
};

export default function FilterBooks({
  value,
  onChange,
  onSearch,
  themeValue,
}: LivroBuscaProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    onChange(event);
    onSearch(searchText);
  };
  return (
    <div className="xl:mb-40">
      <div
        className={`flex items-center justify-center w-[300px] ${
          themeValue === "light" ? "bg-light-searchBg" : "bg-dark-searchBg"
        } px-3 py-1 border border-gray-400 rounded-md`}
      >
        <BiSearch
          className={`${
            themeValue === "light"
              ? "text-light-searchText"
              : "text-dark-searchText"
          }`}
          size={22}
        />
        <input
          type="text"
          placeholder="Pesquisar..."
          onChange={handleInputChange}
          value={value}
          className={`w-full h-6 ml-2 ${
            themeValue === "light"
              ? "text-light-searchText border-light-border"
              : "text-dark-searchText border-dark-border"
          } bg-transparent focus:outline-none border-l px-2`}
        />
      </div>
      <div
        className={`mt-8 hidden xl:block ${
          themeValue === "light" ? "text-light-tex" : "text-dark-text"
        }`}
      >
        <h3 className="font-semibold">CATEGORIAS</h3>
        <ul className="mt-4">
          <li className=" ml-2">ROMANCE</li>
          <div
            className={`border-b-[1px] ${
              themeValue === "dark"
                ? "border-dark-border"
                : "border-light-border"
            }`}
          ></div>
          <li className=" ml-2">ROMANCE</li>
          <div
            className={`border-b-[1px] ${
              themeValue === "dark"
                ? "border-dark-border"
                : "border-light-border"
            }`}
          ></div>
          <li className=" ml-2">ROMANCE</li>
          <div
            className={`border-b-[1px] ${
              themeValue === "dark"
                ? "border-dark-border"
                : "border-light-border"
            }`}
          ></div>
          <li className=" ml-2">ROMANCE</li>
          <div
            className={`border-b-[1px] ${
              themeValue === "dark"
                ? "border-dark-border"
                : "border-light-border"
            }`}
          ></div>
          <li className=" ml-2">ROMANCE</li>
          <div
            className={`border-b-[1px] ${
              themeValue === "dark"
                ? "border-dark-border"
                : "border-light-border"
            }`}
          ></div>
          <li className=" ml-2">ROMANCE</li>
          <div
            className={`border-b-[1px] ${
              themeValue === "dark"
                ? "border-dark-border"
                : "border-light-border"
            }`}
          ></div>
          <li className=" ml-2">ROMANCE</li>
          <div
            className={`border-b-[1px] ${
              themeValue === "dark"
                ? "border-dark-border"
                : "border-light-border"
            }`}
          ></div>
          <li className=" ml-2">ROMANCE</li>
          <div
            className={`border-b-[1px] ${
              themeValue === "dark"
                ? "border-dark-border"
                : "border-light-border"
            }`}
          ></div>
          <li className=" ml-2">ROMANCE</li>
          <div
            className={`border-b-[1px] ${
              themeValue === "dark"
                ? "border-dark-border"
                : "border-light-border"
            }`}
          ></div>
          <li className=" ml-2">ROMANCE</li>
          <div
            className={`border-b-[1px] ${
              themeValue === "dark"
                ? "border-dark-border"
                : "border-light-border"
            }`}
          ></div>
          <li className=" ml-2">ROMANCE</li>
          <div
            className={`border-b-[1px] ${
              themeValue === "dark"
                ? "border-dark-border"
                : "border-light-border"
            }`}
          ></div>
        </ul>
      </div>

      <div className="mt-8 xl:hidden mb-8">
        <details className="">
          <summary>CATEGORIAS</summary>
          <li className=" ml-2">ROMANCE</li>
          <div className="border-b-[1px]"></div>
          <li className=" ml-2">ROMANCE</li>
          <div className="border-b-[1px]"></div>
          <li className=" ml-2">ROMANCE</li>
          <div className="border-b-[1px]"></div>
          <li className=" ml-2">ROMANCE</li>
          <div className="border-b-[1px]"></div>
          <li className=" ml-2">ROMANCE</li>
          <div className="border-b-[1px]"></div>
          <li className=" ml-2">ROMANCE</li>
          <div className="border-b-[1px]"></div>
          <li className=" ml-2">ROMANCE</li>
          <div className="border-b-[1px]"></div>
          <li className=" ml-2">ROMANCE</li>
          <div className="border-b-[1px]"></div>
          <li className=" ml-2">ROMANCE</li>
          <div className="border-b-[1px]"></div>
          <li className=" ml-2">ROMANCE</li>
          <div className="border-b-[1px]"></div>
          <li className=" ml-2">ROMANCE</li>
          <div className="border-b-[1px]"></div>
        </details>
      </div>
    </div>
  );
}
