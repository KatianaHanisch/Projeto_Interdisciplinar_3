import Image from "next/image";
import { BsBook } from "react-icons/bs";

export default function BannerHome() {
  return (
    <section className="text-gray-900">
      <Image src="/banner.jpg" alt="exemplo" width={5000} height={600}></Image>
      <div className="bg-[#EBEBEB] h-[80px] flex items-center justify-center">
        <div className="flex justify-between w-[1200px] text-xl">
          <div className="flex flex-col items-center">
            <p className="z-10">Mais de tantos livros disponíveis</p>
            <span className="absolute bg-[#EBEBEB] mt-3 p-6 rounded-full text-4xl">
              <BsBook />
            </span>
          </div>
          <div className="flex flex-col items-center">
            <p className="z-10">Mais de tantos livros disponíveis</p>
            <span className="absolute bg-[#EBEBEB] mt-3 p-6 rounded-full text-4xl">
              <BsBook />
            </span>
          </div>
          <div className="flex flex-col items-center">
            <p className="z-10">Mais de tantos livros disponíveis</p>
            <span className="absolute bg-[#EBEBEB] mt-3 p-6 rounded-full text-4xl">
              <BsBook />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
