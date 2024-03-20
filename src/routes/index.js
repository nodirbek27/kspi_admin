import React from "react";
import Root from "../root/index";

import Main from "../pages/Main";
import NewsPage from "../pages/NewsPage";
import New from "../pages/NewsEditPage";
import Elonlar from "../pages/ElonlarPage";

// LOGIN
import Login from "../components/Login"

// HOME
import HEMIS from '../pages/Home/HEMIS'
import IlmiyXabarlar from '../pages/Home/InstitutJurnali/IlmiyXabarlar'
import JahonIlmTadJurnali from '../pages/Home/InstitutJurnali/JahonIlmTadJurnali'
import Konfirensiyalar from '../pages/Home/Konfirensiyalar'
import IkkinchiTalim from '../pages/Home/IkkinchiTalim'
import OchiqManbalar from '../pages/Home/OchiqManbalar'
import AsosiyVideo from '../pages/Home/AsosiyVideo'
import InteraktivXizmatlar from '../pages/Home/InteraktivXizmatlar'
import Statistika from '../pages/Home/Statistika'
import TalabaFikri from '../pages/Home/TalabaFikri'
import UchtalikVideo from '../pages/Home/UchtalikVideo'
import Galleriya from '../pages/Home/Galleriya'
import Hamkorlar from '../pages/Home/Hamkorlar'
import Boglanish from '../pages/Home/Boglanish'

// INSTITUT
import InstitutKengashi from '../pages/Institut/InstitutKengashi'
import InstitutHaqida from '../pages/Institut/InstitutHaqida'
import InstitutTuzilmasi from '../pages/Institut/InstitutTuzilmasi'
import Rekvizitlar from '../pages/Institut/Rekvizitlar'
import VirtualQabulxona from '../pages/Institut/VirtualQabulxona'

// FAOLIYAT
import JamoatchilikKengashi from '../pages/Faoliyat/JamoatchilikKengashi'
import MadaniyMarifiy from '../pages/Faoliyat/MadaniyMarifiy'
import OquvUslubiy from '../pages/Faoliyat/OquvUslubiy'
import AkademikLitsey from '../pages/Faoliyat/AkademikLitsey'
import Ilmiy from '../pages/Faoliyat/Ilmiy'

// TUZILMA
import Rektorat from '../pages/Tuzilma/Rektorat'
import Fakultetlar from '../pages/Tuzilma/Fakultetlar'
import Kafedralar from '../pages/Tuzilma/Kafedralar'
import Bolimlar from '../pages/Tuzilma/Bolimlar'
import Markazlar from '../pages/Tuzilma/Markazlar'

// TALABALAR
import Bakalavriat from '../pages/Talabalar/Bakalavriat'
import Magistratura from '../pages/Talabalar/Magistratura'
import TalabalarTurarJoyi from '../pages/Talabalar/TalabalarTurarJoyi'

// ABITURIENT
import AbiturientBakalavriat from '../pages/Abiturient/Bakalavriat'
import AbiturientMagistratura from '../pages/Abiturient/Magistratura'
import MeyoriyHuquqiyHujjatlar from '../pages/Abiturient/MeyoriyHuquqiyHujjatlar'
import XorijiyTalabalarQabul from '../pages/Abiturient/XorijiyTalabalarQabul'
import CallMarkaz from '../pages/Abiturient/CallMarkaz'

// BO'SH ISH O'RINLARI
import Vakansiyalar from '../pages/Vakansiyalar'


export const routes = [
    {
      element: <Root />,
      path: "/",
      children: [
        {
          element: <Login />,
          path: "/",
        },
        {
          element: <Main />,
          path: "/main",
        },
        {
          element: <NewsPage />,
          path: "/yangiliklar",
        },
        {
          element: <New />,
          path: "/yangiliklar/:id",
        },
        {
          element: <Elonlar />,
          path: "/elonlar",
        },

        // HOME
        {
          element: <HEMIS />,
          path: "/hemis",
        },
        {
          element: <IlmiyXabarlar />,
          path: "/ilmiy-xabarlar",
        },
        {
          element: <JahonIlmTadJurnali />,
          path: "/jahon-ilmiy-tadqiqotlar-jurnali",
        },
        {
          element: <Konfirensiyalar />,
          path: "/konfirensiyalar",
        },
        {
          element: <IkkinchiTalim />,
          path: "/ikkinchi-ta'lim",
        },
        {
          element: <OchiqManbalar />,
          path: "/ochiq-manbalar",
        },
        {
          element: <AsosiyVideo />,
          path: "/asosiy-video",
        },
        {
          element: <InteraktivXizmatlar />,
          path: "/interaktiv-xizmatlar",
        },
        {
          element: <Statistika />,
          path: "/statistika",
        },
        {
          element: <TalabaFikri />,
          path: "/talaba-fikri",
        },
        {
          element: <UchtalikVideo />,
          path: "/uchtalik-video",
        },
        {
          element: <Galleriya />,
          path: "/galleriya",
        },
        {
          element: <Hamkorlar />,
          path: "/hamkorlar",
        },
        {
          element: <Boglanish />,
          path: "/boglanish",
        },

        // INSTITUT
        {
          element: <InstitutKengashi />,
          path: "/institut-kengashi",
        },
        {
          element: <InstitutHaqida />,
          path: "/institut-haqida",
        },
        {
          element: <InstitutTuzilmasi />,
          path: "/institut-tuzilmasi",
        },
        {
          element: <Rekvizitlar />,
          path: "/rekvizitlar",
        },
        {
          element: <VirtualQabulxona />,
          path: "/virtual-qabulxona",
        },

        // FAOLIYAT
        {
          element: <JamoatchilikKengashi />,
          path: "/jamoatchilik-kengashi",
        },
        {
          element: <MadaniyMarifiy />,
          path: "/madaniy-marifiy-faoliyat",
        },
        {
          element: <OquvUslubiy />,
          path: "/oquv-uslubiy-faoliyat",
        },
        {
          element: <AkademikLitsey />,
          path: "/akademik-litsey",
        },
        {
          element: <Ilmiy />,
          path: "/ilmiy-faoliyat",
        },

        // TUZILMA
        {
          element: <Rektorat />,
          path: "/rektorat",
        },
        {
          element: <Fakultetlar />,
          path: "/fakultetlar",
        },
        {
          element: <Kafedralar />,
          path: "/kafedralar",
        },
        {
          element: <Bolimlar />,
          path: "/bolimlar",
        },
        {
          element: <Markazlar />,
          path: "/markazlar",
        },

        // TALABALAR
        {
          element: <Bakalavriat />,
          path: "/bakalavriat",
        },
        {
          element: <Magistratura />,
          path: "/magistratura",
        },
        {
          element: <TalabalarTurarJoyi />,
          path: "/talabalar-turar-joyi",
        },

        // ABITURIENT
        {
          element: <AbiturientBakalavriat />,
          path: "/abiturient-bakalavriat",
        },
        {
          element: <AbiturientMagistratura />,
          path: "/abiturient-magistratura",
        },
        {
          element: <MeyoriyHuquqiyHujjatlar />,
          path: "/meyoriy-huquqiy-hujjatlar",
        },
        {
          element: <XorijiyTalabalarQabul />,
          path: "/xorijiy-talabalar-qabul",
        },
        {
          element: <CallMarkaz />,
          path: "/call-markaz",
        },

        // BO'SH ISH O'RINLARI
        {
          element: <Vakansiyalar />,
          path: "/vakansiyalar",
        },
      ],
    },
  ];
  