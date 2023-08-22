import React from "react";

import { BiSearch } from "react-icons/bi";

export default function FilterBooks() {
  return (
    <div className="">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Pesquisar..."
          className="w-[300px] h-8 pl-8 border-[1px] rounded border-gray-500"
        />
        <label className="flex absolute top-0 text-2xl mt-1 ml-1">
          <BiSearch />
        </label>
      </div>
      <div className="mt-8 hidden xl:block">
        <h3>CATEGORIAS</h3>
        <ul className="mt-4">
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
