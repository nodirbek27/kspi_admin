import React, { useState } from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BiSolidInstitution } from "react-icons/bi";
import { MdOutlineLocalActivity } from "react-icons/md";
import { VscSymbolStructure } from "react-icons/vsc";
import { PiStudentDuotone } from "react-icons/pi";
import { TbNews } from "react-icons/tb";
import { TfiAnnouncement } from "react-icons/tfi";
import { GoPeople } from "react-icons/go";
import { CgWorkAlt } from "react-icons/cg";
import { MdAccountCircle } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoMdArrowRoundForward } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    localStorage.removeItem("token")
  }
  return (
    <div className="relative md:p-3 lg:p-4 xl:p-5 2xl:p-6 z-50">
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
                  <Link to="/" className="justify-between">
                    Profil
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => handleClick()}>Chiqish</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div
        className={`h-[100vh] bg-[#0e0e0e] overflow-auto ... left-0 top-0 ${
          open ? "w-72 pl-4 fixed left-0 top-0" : "w-0 px-0 absolute"
        } duration-500 text-gray-100 scrollbar-thumb-gray-400 scrollbar-track-gray-200`}
      >
        <div className="scrollbar-thin overflow-y-scroll h-full">
          <div
            className={`p-2 flex justify-end fixed top-4 left-60 ${
              !open && "hidden"
            }`}
          >
            <FaArrowLeft
              size={20}
              className="cursor-pointer flex text-end"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative top-20">
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
              to={"/elonlar"}
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
            <div className="join join-vertical w-full">
              {/* HOME */}
              <div className="collapse collapse-arrow join-item">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded">
                  <TiHome size={20} />
                  <h2
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Home
                  </h2>
                </div>
                <div className="collapse-content">
                  <Link
                    to={"/hemis"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      HEMIS tizimi
                    </h2>
                  </Link>
                  <div className="collapse collapse-arrow join-item">
                    <input type="checkbox" name="my-accordion-4" />
                    <div className="collapse-title flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded">
                      <IoMdArrowRoundForward size={14} />
                      <h2
                        className={`whitespace-pre duration-500 ${
                          !open && "opacity-0 translate-x-28 overflow-hidden"
                        }`}
                      >
                        Institut jurnali
                      </h2>
                    </div>
                    <div className="collapse-content">
                      <Link
                        to={"/ilmiy-xabarlar"}
                        className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                      >
                        <MdKeyboardDoubleArrowRight size={14} />
                        <h2
                          className={`whitespace-pre duration-500 ${
                            !open && "opacity-0 translate-x-28 overflow-hidden"
                          }`}
                        >
                          Qo'qon DPI. Ilmiy xabarlar
                        </h2>
                      </Link>
                      <Link
                        to={"/jahon-ilmiy-tadqiqotlar-jurnali"}
                        className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                      >
                        <MdKeyboardDoubleArrowRight size={14} />
                        <h2
                          className={`whitespace-pre duration-500 ${
                            !open && "opacity-0 translate-x-28 overflow-hidden"
                          }`}
                        >
                          Jahon ilmiy tadqiqot jurnali
                        </h2>
                      </Link>
                    </div>
                  </div>
                  <Link
                    to={"/konfirensiyalar"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Konfirensiyalar
                    </h2>
                  </Link>
                  <Link
                    to={"/ikkinchi-ta'lim"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Ikkinchi ta'lim
                    </h2>
                  </Link>
                  <Link
                    to={"/ochiq-manbalar"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Ochiq manbalar
                    </h2>
                  </Link>
                  <Link
                    to={"/asosiy-video"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Asosiy video
                    </h2>
                  </Link>
                  <Link
                    to={"/interaktiv-xizmatlar"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Interaktiv xizmatlar
                    </h2>
                  </Link>
                  <Link
                    to={"/statistika"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Statistika
                    </h2>
                  </Link>
                  <Link
                    to={"/talaba-fikri"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Talaba fikri
                    </h2>
                  </Link>
                  <Link
                    to={"/uchtalik-video"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Uchtalik video
                    </h2>
                  </Link>
                  <Link
                    to={"/galleriya"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Galleriya
                    </h2>
                  </Link>
                  <Link
                    to={"/hamkorlar"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Hamkorlar
                    </h2>
                  </Link>
                  <Link
                    to={"/boglanish"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Bog'lanish
                    </h2>
                  </Link>
                </div>
              </div>
              {/* INSTITUT */}
              <div className="collapse collapse-arrow join-item">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded">
                  <BiSolidInstitution size={20} />
                  <h2
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Institut
                  </h2>
                </div>
                <div className="collapse-content">
                  <Link
                    to={"/institut-kengashi"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Institut kengashi
                    </h2>
                  </Link>
                  <Link
                    to={"/institut-haqida"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Institut haqida
                    </h2>
                  </Link>
                  <Link
                    to={"/institut-tuzilmasi"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Institut tuzilmasi
                    </h2>
                  </Link>
                  <Link
                    to={"/rekvizitlar"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Rekvizitlar
                    </h2>
                  </Link>
                  <Link
                    to={"/virtual-qabulxona"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Virtual qabulxona
                    </h2>
                  </Link>
                </div>
              </div>
              {/* FAOLIYAT */}
              <div className="collapse collapse-arrow join-item">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded">
                  <MdOutlineLocalActivity size={20} />
                  <h2
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Faoliyat
                  </h2>
                </div>
                <div className="collapse-content">
                  <Link
                    to={"/jamoatchilik-kengashi"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Jamoatchilik kengashi
                    </h2>
                  </Link>
                  <Link
                    to={"/madaniy-marifiy-faoliyat"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Madaniy-ma'rifiy
                    </h2>
                  </Link>
                  <Link
                    to={"/oquv-uslubiy-faoliyat"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      O'quv-uslubiy
                    </h2>
                  </Link>
                  <Link
                    to={"/akademik-litsey"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Akademik litsey
                    </h2>
                  </Link>
                  <Link
                    to={"/ilmiy-faoliyat"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Ilmiy faoliyat
                    </h2>
                  </Link>
                  {/* <Link
                                    to={"/"}
                                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                                >
                                    <IoMdArrowRoundForward size={14} />
                                    <h2
                                        className={`whitespace-pre duration-500 ${
                                            !open &&
                                            "opacity-0 translate-x-28 overflow-hidden"
                                        }`}
                                    >
                                        Yoshlar bilan ishlash, ma'naviy va
                                        marifiy yo'nalishdagi ishlar
                                    </h2>
                                </Link> */}
                </div>
              </div>
              {/* Tuzilma */}
              <div className="collapse collapse-arrow join-item">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded">
                  <VscSymbolStructure size={20} />
                  <h2
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Tuzilma
                  </h2>
                </div>
                <div className="collapse-content">
                  <Link
                    to={"/rektorat"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Rektorat
                    </h2>
                  </Link>
                  <Link
                    to={"/fakultetlar"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Fakultetlar
                    </h2>
                  </Link>
                  <Link
                    to={"/kafedralar"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Kafedralar
                    </h2>
                  </Link>
                  <Link
                    to={"/bolimlar"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Bo'limlar
                    </h2>
                  </Link>
                  <Link
                    to={"/markazlar"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Markazlar
                    </h2>
                  </Link>
                </div>
              </div>
              {/* Talabalar */}
              <div className="collapse collapse-arrow join-item">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded">
                  <PiStudentDuotone size={20} />
                  <h2
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Talabalar
                  </h2>
                </div>
                <div className="collapse-content">
                  <Link
                    to={"/bakalavriat"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Bakalavriat
                    </h2>
                  </Link>
                  <Link
                    to={"/magistratura"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Magistratura
                    </h2>
                  </Link>
                  <Link
                    to={"/talabalar-turar-joyi"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Talabalar turar joyi
                    </h2>
                  </Link>
                </div>
              </div>
              {/* Tuzilma */}
              <div className="collapse collapse-arrow join-item">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded">
                  <GoPeople size={20} />
                  <h2
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    Abiturient
                  </h2>
                </div>
                <div className="collapse-content">
                  <Link
                    to={"/abiturient-bakalavriat"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Bakalavriat
                    </h2>
                  </Link>
                  <Link
                    to={"/abiturient-magistratura"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Magistratura
                    </h2>
                  </Link>
                  <Link
                    to={"/xorijiy-talabalar-qabul"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Xorijiy talabalar qabul
                    </h2>
                  </Link>
                  <Link
                    to={"/call-markaz"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Call markaz
                    </h2>
                  </Link>
                  <Link
                    to={"/meyoriy-huquqiy-hujjatlar"}
                    className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded`}
                  >
                    <IoMdArrowRoundForward size={14} />
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      Me'yoriy huquqiy hujjatlar
                    </h2>
                  </Link>
                </div>
              </div>
            </div>
            <Link
              to={"/vakansiyalar"}
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
    </div>
  );
};

export default Sidebar;
