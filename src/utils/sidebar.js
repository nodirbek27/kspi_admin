//Icons
// import Settings from "../assets/icons/setting.svg?react";

import { ReactComponent as Analitika } from "../assets/icons/analytics.svg";

import AnalitikaView from "../pages/Main";
import NewsPage from "../pages/NewsPage";
import Elonlar from "../pages/ElonlarPage";

// LOGIN
import Login from "../components/Login";

// HOME
import AsosiyVideo from "../pages/Home/AsosiyVideo";
import OchiqMalumot from "../pages/Home/OchiqMalumot";
import InteraktivXizmatlar from "../pages/Home/InteraktivXizmatlar";
import Statistika from "../pages/Home/Statistika";
import TalabaFikri from "../pages/Home/TalabaFikri";
import UchtalikVideoPage from "../pages/Home/UchtalikVideoPage";
import Galleriya from "../pages/Home/Galleriya";
import Hamkorlar from "../pages/Home/Hamkorlar";
import Boglanish from "../pages/Home/Boglanish";
import ImtihonlarniKuzatish from "../pages/Home/ImtihonlarniKuzatish";

// INSTITUT
import InstitutKengashi from "../pages/Institut/InstitutKengashi";
import InstitutHaqida from "../pages/Institut/InstitutHaqida";
import InstitutTuzilmasi from "../pages/Institut/InstitutTuzilmasi";
import Rekvizitlar from "../pages/Institut/Rekvizitlar";
import VirtualQabulxona from "../pages/Institut/VirtualQabulxona";
import InstitutQarorlar from "../pages/Institut/Hujjatlar/ORVMq";
import InstitutFarmonlar from "../pages/Institut/Hujjatlar/ORpf";
import InstitutQonunlar from "../pages/Institut/Hujjatlar/ORQ";
import InstitutHujjatlar from "../pages/Institut/Hujjatlar/IIm-hh";

// FAOLIYAT
import JamoatchilikKengashi from "../pages/Faoliyat/JamoatchilikKengashi";
import MadaniyMarifiy from "../pages/Faoliyat/MadaniyMarifiy";
import OquvUslubiy from "../pages/Faoliyat/OquvUslubiy";
import AkademikLitsey from "../pages/Faoliyat/AkademikLitsey";
import Ilmiy from "../pages/Faoliyat/Ilmiy";
import Yoshlar from "../pages/Faoliyat/YoshlarFaoliyat";
import XalqaroProfessorlarFikri from "../pages/Faoliyat/XalqaroFaoliyat/XorijiyProfessorlarFikri";
import XalqaroHamkorlar from "../pages/Faoliyat/XalqaroFaoliyat/XalqaroHamkorlarPage";

// TUZILMA
import Rektorat from "../pages/Tuzilma/Rektorat";
import Fakultetlar from "../pages/Tuzilma/Fakultetlar";
import Kafedralar from "../pages/Tuzilma/Kafedralar";
import Bolimlar from "../pages/Tuzilma/Bolimlar";
import Markazlar from "../pages/Tuzilma/Markazlar";

// TALABALAR
import Bakalavriat from "../pages/Talabalar/Bakalavriat";
import Magistratura from "../pages/Talabalar/Magistratura";
import TalabalarTurarJoyi from "../pages/Talabalar/TalabalarTurarJoyi";
import BMalakaTalab from "../pages/Talabalar/BMalakaTalab"
import MMalakaTalab from "../pages/Talabalar/MMalakaTalab"
import BOquvReja from "../pages/Talabalar/BOquvReja"
import MOquvReja from "../pages/Talabalar/MOquvReja"
import BFanDasturlari from "../pages/Talabalar/BFanDasturlari"
import MFanDasturlari from "../pages/Talabalar/MFanDasturlari";

// ABITURIENT
import AbiturientBakalavriat from "../pages/Abiturient/Bakalavriat";
import AbiturientMagistratura from "../pages/Abiturient/Magistratura";
import MeyoriyHuquqiyHujjatlar from "../pages/Abiturient/MeyoriyHuquqiyHujjatlar";
import XorijiyTalabalarQabul from "../pages/Abiturient/XorijiyTalabalarQabul";
import CallMarkaz from "../pages/Abiturient/CallMarkaz";
import Qabul from "../pages/Abiturient/Qabul";

// BO'SH ISH O'RINLARI hidden
import Vakansiyalar from "../pages/Vakansiyalar";
import OtishBallari from "../components/OtishBallari";

// Korrupsya
import KorHaqHabBer from "../pages/KorHaqHabBer";
import NormativHuj from "../pages/NormativHuj";
import IchkiIdorHuj from "../pages/IchkiIdorHuj";

const sidebar = [
  {
    id: 1,
    title: "Analitika",
    path: "/analitika",
    icon: Analitika,
    isPrivate: true,
    element: AnalitikaView,
    role: ["admin"],
  },
  {
    id: 2,
    title: "Yangiliklar",
    path: "/yangiliklar",
    icon: Analitika,
    isPrivate: true,
    element: NewsPage,
    role: ["admin"],
  },
  {
    id: 3,
    title: "E'lonlar",
    path: "/elonlar",
    icon: Analitika,
    isPrivate: true,
    element: Elonlar,
    role: ["admin"],
  },
  {
    id: 4,
    title: "Home",
    path: "/home",
    icon: Analitika,
    isPrivate: true,
    element: Analitika,
    role: ["admin"],
    children: [
      {
        id: `4-0`,
        title: "Ochiq ma'lumotlar",
        path: "/home/ochiq-malumotlar",
        isPrivate: true,
        element: OchiqMalumot,
        role: ["admin"],
      },
      {
        id: `4-1`,
        title: "Asosiy video",
        path: "/home/asosiy-video",
        isPrivate: true,
        element: AsosiyVideo,
        role: ["admin"],
      },
      {
        id: `4-2`,
        title: "Interaktiv xizmatlar",
        path: "/home/interaktiv-xizmatlar",
        isPrivate: true,
        element: InteraktivXizmatlar,
        role: ["admin"],
      },
      {
        id: `4-3`,
        title: "Statistika",
        path: "/home/statistika",
        isPrivate: true,
        element: Statistika,
        role: ["admin"],
      },
      {
        id: `4-4`,
        title: "Talaba fikri",
        path: "/home/talaba-fikri",
        isPrivate: true,
        element: TalabaFikri,
        role: ["admin"],
      },
      {
        id: `4-5`,
        title: "Uchtalik video",
        path: "/home/uchtalik-video",
        isPrivate: true,
        element: UchtalikVideoPage,
        role: ["admin"],
      },
      {
        id: `4-6`,
        title: "Galleriya",
        path: "/home/galleriya",
        isPrivate: true,
        element: Galleriya,
        role: ["admin"],
      },
      {
        id: `4-7`,
        title: "Hamkorlar",
        path: "/home/hamkorlar",
        isPrivate: true,
        element: Hamkorlar,
        role: ["admin"],
      },
      {
        id: `4-8`,
        title: "Bog'lanish",
        path: "/home/boglanish",
        isPrivate: true,
        element: Boglanish,
        role: ["admin"],
      },
      {
        id: `4-9`,
        title: "Imtihonlarni kuzatish",
        path: "/home/imtihonlarni-kuzatish",
        isPrivate: true,
        element: ImtihonlarniKuzatish,
        role: ["admin"],
      },
    ],
  },
  {
    id: 5,
    title: "Institut",
    path: "/institut",
    icon: Analitika,
    isPrivate: true,
    element: "",
    role: ["admin"],
    children: [
      {
        id: `5-1`,
        title: "Institut kengashi",
        path: "/institut/institut-kengashi",
        isPrivate: true,
        element: InstitutKengashi,
        role: ["admin"],
      },
      {
        id: `5-2`,
        title: "Institut haqida",
        path: "/institut/institut-haqida",
        isPrivate: true,
        element: InstitutHaqida,
        role: ["admin"],
      },
      {
        id: `5-3`,
        title: "Institut tuzilmasi",
        path: "/institut/institut-tuzilmasi",
        isPrivate: true,
        element: InstitutTuzilmasi,
        role: ["admin"],
      },
      {
        id: `5-4`,
        title: "Rekvizitlar",
        path: "/institut/rekvizitlar",
        isPrivate: true,
        element: Rekvizitlar,
        role: ["admin"],
      },
      {
        id: `5-5`,
        title: "Virtual qabulxona",
        path: "/institut/virtual-qabulxona",
        isPrivate: true,
        element: VirtualQabulxona,
        role: ["admin"],
      },
      {
        id: `5-6`,
        title: "O'zbekiston Respublikasi prezidentining farmonlari",
        path: "/institut/farmonlar",
        isPrivate: true,
        element: InstitutFarmonlar,
        role: ["admin"],
      },
      {
        id: `5-7`,
        title: "O'zbekiston Respublikasi Qonunlari",
        path: "/institut/qounular",
        isPrivate: true,
        element: InstitutQonunlar,
        role: ["admin"],
      },
      {
        id: `5-8`,
        title: "O'zbekiston Respublikasi Vazirlar Mahkamasining qarorlari",
        path: "/institut/qarorlar",
        isPrivate: true,
        element: InstitutQarorlar,
        role: ["admin"],
      },
      {
        id: `5-9`,
        title: "Institut ichki me'yoriy-huquqiy hujjatlari",
        path: "/institut/ichki-me'yoriy-huquqiy-hujjatlar",
        isPrivate: true,
        element: InstitutHujjatlar,
        role: ["admin"],
      },
    ],
  },
  {
    id: 6,
    title: "Faoliyat",
    path: "/faoliyat",
    icon: Analitika,
    isPrivate: true,
    element: "",
    role: ["admin"],
    children: [
      {
        id: `6-1`,
        title: "Jamoatchilik kengashi",
        path: "/faoliyat/jamoatchilik-kengashi",
        isPrivate: true,
        element: JamoatchilikKengashi,
        role: ["admin"],
      },
      {
        id: `6-2`,
        title: "Madaniy-ma'rifiy",
        path: "/faoliyat/madaniy-marifiy-faoliyat",
        isPrivate: true,
        element: MadaniyMarifiy,
        role: ["admin"],
      },
      {
        id: `6-3`,
        title: "O'quv-uslubiy",
        path: "/faoliyat/oquv-uslubiy-faoliyat",
        isPrivate: true,
        element: OquvUslubiy,
        role: ["admin"],
      },
      {
        id: `6-4`,
        title: "Akademik litsey",
        path: "/faoliyat/akademik-litsey",
        isPrivate: true,
        element: AkademikLitsey,
        role: ["admin"],
      },
      {
        id: `6-5`,
        title: "Ilmiy faoliyat",
        path: "/faoliyat/ilmiy-faoliyat",
        isPrivate: true,
        element: Ilmiy,
        role: ["admin"],
      },
      {
        id: `6-6`,
        title: "Yoshlar bilan ishlash, ma'naviy va marifiy yo'nalishdagi ishlar",
        path: "/faoliyat/yoshlar-bilan-ishlash",
        isPrivate: true,
        element: Yoshlar,
        role: ["admin"],
      },
      {
        id: `6-7`,
        title: "Xorijlik professorlar fikri",
        path: "/faoliyat/xorijlik-professorlar-fikri",
        isPrivate: true,
        element: XalqaroProfessorlarFikri,
        role: ["admin"],
      },
      {
        id: `6-8`,
        title: "Xalqaro hamkor tashkilotlar",
        path: "/faoliyat/xalqaro-hamkorlar",
        isPrivate: true,
        element: XalqaroHamkorlar,
        role: ["admin"],
      },
    ],
  },
  {
    id: 7,
    title: "Tuzilma",
    path: "/tuzilma",
    icon: Analitika,
    isPrivate: true,
    element: "",
    role: ["admin"],
    children: [
      {
        id: `7-1`,
        title: "Rektorat",
        path: "/tuzilma/rektorat",
        isPrivate: true,
        element: Rektorat,
        role: ["admin"],
      },
      {
        id: `7-2`,
        title: "Fakultetlar",
        path: "/tuzilma/fakultetlar",
        isPrivate: true,
        element: Fakultetlar,
        role: ["admin"],
      },
      {
        id: `7-3`,
        title: "Kafedralar",
        path: "/tuzilma/kafedralar",
        isPrivate: true,
        element: Kafedralar,
        role: ["admin"],
      },
      {
        id: `7-4`,
        title: "Bo'limlar",
        path: "/tuzilma/bolimlar",
        isPrivate: true,
        element: Bolimlar,
        role: ["admin"],
      },
      {
        id: `7-5`,
        title: "Markazlar",
        path: "/tuzilma/markazlar",
        isPrivate: true,
        element: Markazlar,
        role: ["admin"],
      },
    ],
  },
  {
    id: 8,
    title: "Talabalar",
    path: "/talabalar",
    icon: Analitika,
    isPrivate: true,
    element: "",
    role: ["admin"],
    children: [
      {
        id: `8-1`,
        title: "Bakalavriat",
        path: "/talabalar/bakalavriat",
        isPrivate: true,
        element: Bakalavriat,
        role: ["admin"],
      },
      {
        id: `8-2`,
        title: "Magistratura",
        path: "/talabalar/magistratura",
        isPrivate: true,
        element: Magistratura,
        role: ["admin"],
      },
      {
        id: `8-3`,
        title: "Talabalar turar joyi",
        path: "/talabalar/talabalar-turar-joyi",
        isPrivate: true,
        element: TalabalarTurarJoyi,
        role: ["admin"],
      },
      {
        id: `8-4`,
        title: "Bakalavr malaka talablari",
        path: "/talabalar/bakalavr-malaka-talab",
        isPrivate: true,
        element: BMalakaTalab,
        role: ["admin"],
      },
      {
        id: `8-5`,
        title: "Magist malaka talablari",
        path: "/talabalar/magist-malaka-talab",
        isPrivate: true,
        element: MMalakaTalab,
        role: ["admin"],
      },
      {
        id: `8-6`,
        title: "Bakalavr o'quv rejasi",
        path: "/talabalar/bakalavr-oquv-rejasi",
        isPrivate: true,
        element: BOquvReja,
        role: ["admin"],
      },
      {
        id: `8-7`,
        title: "Magistr o'quv rejasi",
        path: "/talabalar/magistr-oquv-rejasi",
        isPrivate: true,
        element: MOquvReja,
        role: ["admin"],
      },
      {
        id: `8-8`,
        title: "Bakalavr fan dasturlari",
        path: "/talabalar/bakalavr-fan-dasturlari",
        isPrivate: true,
        element: BFanDasturlari,
        role: ["admin"],
      },
      {
        id: `8-9`,
        title: "Magistr fan dasturlari",
        path: "/talabalar/magistr-fan-dasturlari",
        isPrivate: true,
        element: MFanDasturlari,
        role: ["admin"],
      },
    ],
  },
  {
    id: 9,
    title: "Abiturient",
    path: "/abiturient",
    icon: Analitika,
    isPrivate: true,
    element: "",
    role: ["admin"],
    children: [
      {
        id: `9-1`,
        title: "Bakalavriat",
        path: "/abiturient/abiturient-bakalavriat",
        isPrivate: true,
        element: AbiturientBakalavriat,
        role: ["admin"],
      },
      {
        id: `9-2`,
        title: "Magistratura",
        path: "/abiturient/abiturient-magistratura",
        isPrivate: true,
        element: AbiturientMagistratura,
        role: ["admin"],
      },
      {
        id: `9-3`,
        title: "Xorijiy talabalar qabul",
        path: "/abiturient/xorijiy-talabalar-qabul",
        isPrivate: true,
        element: XorijiyTalabalarQabul,
        role: ["admin"],
      },
      {
        id: `9-4`,
        title: "Call markaz",
        path: "/abiturient/call-markaz",
        isPrivate: true,
        element: CallMarkaz,
        role: ["admin"],
      },
      {
        id: `9-5`,
        title: "Me'yoriy huquqiy hujjatlar",
        path: "/abiturient/meyoriy-huquqiy-hujjatlar",
        isPrivate: true,
        element: MeyoriyHuquqiyHujjatlar,
        role: ["admin"],
      },
      {
        id: `9-6`,
        title: "Qabul",
        path: "/abiturient/qabul",
        isPrivate: true,
        element: Qabul,
        role: ["admin"],
      },
      {
        id: `9-7`,
        title: "O'tish ballari",
        path: "/abiturient/o'tish-ballari",
        isPrivate: true,
        element: OtishBallari,
        role: ["admin"],
      },
    ],
  },
  {
    id: 10,
    title: "Bo'sh ish o'rinlari",
    path: "/vakansiyalar",
    icon: Analitika,
    isPrivate: true,
    element: Vakansiyalar,
    role: ["admin"],
  },

  {
    id: 11,
    title: "Log In",
    path: "/login",
    isPrivate: true,
    element: Login,
    hidden: true,
  },
  {
    id: 12,
    title: "Reset",
    path: "/reset",
    isPrivate: true,
    element: "",
    hidden: true,
  },
  {
    id: 13,
    title: "Korrupsyaga qarshi kurash",
    path: "/korrupsyaga-qarshi-kurash",
    icon: Analitika,
    isPrivate: true,
    element: "",
    role: ["admin"],
    children: [
      {
        id: `13-1`,
        title: "Normativ hujjatlar",
        path: "/korrupsyaga-qarshi-kurash/normativ-hujjatlar",
        isPrivate: true,
        element: NormativHuj,
        role: ["admin"],
      },
      {
        id: `13-2`,
        title: "Ichki idoraviy hujjatlar",
        path: "/korrupsyaga-qarshi-kurash/ichki-idoraviy-hujjatlar",
        isPrivate: true,
        element: IchkiIdorHuj,
        role: ["admin"],
      },
      {
        id: `13-3`,
        title: "Korrupsya haqida habar berish",
        path: "/korrupsyaga-qarshi-kurash/korrupsya-haqida-habar-berish",
        isPrivate: true,
        element: KorHaqHabBer,
        role: ["admin"],
      },
    ],
  },
];
export default sidebar;
