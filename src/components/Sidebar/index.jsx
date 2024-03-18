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
          {/* navbar end */}
          <div className="flex items-center">
            <label className="cursor-pointer grid place-items-center mr-5">
              <input
                type="checkbox"
                value="synthwave"
                className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
              />
              <svg
                className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <svg
                className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <MdAccountCircle size={40} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="#" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a href="#">Settings</a>
                </li>
                <li>
                  <a href="#">Logout</a>
                </li>
              </ul>
            </div>
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
