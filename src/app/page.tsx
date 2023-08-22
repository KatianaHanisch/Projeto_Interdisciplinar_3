import Link from "next/link";
import BannerHome from "./(web)/components/BannerHome";
import Footer from "./(web)/components/Footer";
import HeaderHome from "./(web)/components/HeaderHome";
import ListRecentBook from "./(web)/components/ListRecentBook";

import { RiArrowUpDoubleFill } from "react-icons/ri";

export default function Home() {
  return (
    <main>
      <HeaderHome />
      <div className="mt-[70px] md:mt-0">
        <BannerHome />
      </div>
      <div className="mt-24 md:mt-40 mb-40">
        <ListRecentBook />
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
