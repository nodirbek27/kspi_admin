import React, { useState } from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BiSolidInstitution } from "react-icons/bi";
import { MdOutlineLocalActivity } from "react-icons/md";
import { VscSymbolStructure } from "react-icons/vsc";
import { PiStudentDuotone } from "react-icons/pi";
import { TbNews } from "react-icons/tb";
import { TfiAnnouncement } from "react-icons/tfi";
import { GoPeople } from "react-icons/go";
import { GrGallery } from "react-icons/gr";
import { CgWorkAlt } from "react-icons/cg";
import { MdAccountCircle } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      {/* NAVBAR */}
      <div className="border-b-2">
        <div className="flex items-center justify-between p-3">
          {/* MENU */}
          <div className="py-3">
            <MdOutlineDashboardCustomize
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          {/* ACCOUNT */}
          <div>
            <MdAccountCircle size={26} />
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div
        className={`min-h-screen bg-[#0e0e0e] absolute left-0 top-0 ${
          open ? "w-72 px-4" : "w-0 px-0"
        } duration-500 text-gray-100 `}
      >
        <div className="p-2 flex justify-end">
          <IoClose
            size={20}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          <Link
            to={"/yangiliklar"}
            className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
          >
            <TbNews size={20} />
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Yangiliklar
            </h2>
          </Link>
          <Link
            to={"/"}
            className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
          >
            <TfiAnnouncement size={20} />
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              E'lonlar
            </h2>
          </Link>
          <Link
            to={"/"}
            className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
          >
            <BiSolidInstitution size={20} />
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Institut
            </h2>
          </Link>
          <Link
            to={"/"}
            className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
          >
            <MdOutlineLocalActivity size={20} />
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Faoliyat
            </h2>
          </Link>
          <Link
            to={"/"}
            className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
          >
            <VscSymbolStructure size={20} />
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Tuzilma
            </h2>
          </Link>
          <Link
            to={"/"}
            className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
          >
            <PiStudentDuotone size={20} />
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Talabalar
            </h2>
          </Link>
          <Link
            to={"/"}
            className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
          >
            <GoPeople size={20} />
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Abiturient
            </h2>
          </Link>
          <Link
            to={"/"}
            className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
          >
            <GrGallery size={20} />
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Galleriya
            </h2>
          </Link>
          <Link
            to={"/"}
            className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
          >
            <CgWorkAlt size={20} />
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Bo'sh ish o'rinlari
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
