import Link from "next/link";
import BannerHome from "./components/BannerHome";
import Footer from "./components/Footer";
import HeaderHome from "./components/HeaderHome";
import ListRecentBooks from "./components/ListRecentBooks";

import { RiArrowUpDoubleFill } from "react-icons/ri";

export default function Home() {
  return (
    <main>
      <HeaderHome />
      <div className="mt-[70px] md:mt-0">
        <BannerHome />
      </div>
      <div className="mt-24 md:mt-40 mb-40">
        <ListRecentBooks />
      </div>
      <Link
        href=""
        className="text-2xl absolute right-5 mt-[-30px] bg-slate-300 p-2 animate-bounce rounded-full"
      >
        <RiArrowUpDoubleFill />
      </Link>
      <Footer />
    </main>
  );
}
