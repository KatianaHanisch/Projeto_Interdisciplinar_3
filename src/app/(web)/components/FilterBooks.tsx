import React from "react";

import { BiSearch } from "react-icons/bi";

type LivroBuscaProps = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FilterBooks({ value, onChange }: LivroBuscaProps) {
  return (
    <div className="">
      <div className="flex items-center justify-center w-[300px] bg-gray-50 px-3 py-1 border border-gray-400 rounded-md">
        <BiSearch color="#89909b" size={22} />
        <input
          type="text"
          placeholder="Pesquisar..."
          onChange={onChange}
          value={value}
          className="w-full h-6 ml-2 text-gray-600 bg-transparent focus:outline-none border-l border-gray-300 px-2"
        />
      </div>
      <div className="mt-8 hidden xl:block">
        <h3 className="font-semibold">CATEGORIAS</h3>
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
