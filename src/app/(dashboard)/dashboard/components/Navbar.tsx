import MobileSidebar from "./MobileSidebar";

import { BiSolidUser } from "react-icons/bi";

export default function Navbar() {
  return (
    <div className="flex items-center py-5 bg-gray-300">
      <MobileSidebar />
      <div className="flex w-full items-center justify-end px-10">
        <h4 className="font-semibold text-xl mr-2 text-gray-800">Admin</h4>
        <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full cursor-pointer">
          <BiSolidUser className="w-8 h-8" color="#1f2937" />
        </div>
      </div>
    </div>
  );
}
