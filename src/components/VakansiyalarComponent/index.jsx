import React from "react";
import { BsCash } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";

const Vakansiya = () => {
    
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center my-5 p-3">
        Bo'sh ish o'rinlari
      </h2>
      <div className="border-2 p-2 rounded">
        <div className="border-b-2 py-2">
          <h2 className="font-bold text-lg md:text-xl lg:text-2xl">
            Bo'lim mudiri (boshlig'i){" "}
          </h2>
          <p className="text-blue-500 font-semibold">
            Boshqaruv hodimlari bo'limi
          </p>
        </div>
        <div className="py-2">
          <p className="flex items-center">
            <BsCash className="text-blue-500 mr-2" /> Shtat jadvali bo'yicha
          </p>
          <p className="flex items-center">
            <MdAccessTime className="text-blue-500 mr-2" /> To'liq
          </p>
        </div>
        <div className="border-b-2 py-2">
          <h2 className="text-md md:text-lg lg:text-xl xl:text-2xl font-semibold">
            Malakaviy talablar
          </h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, ipsum
            aliquam. Ex in, fugit accusantium amet, expedita voluptatem iusto
            molestias itaque debitis quisquam fuga sit magnam totam vitae
            officiis molestiae?
          </p>
        </div>
        <div className="py-2">
          <p className="font-bold text-base-300">20.06.2024</p>
        </div>
      </div>
    </div>
  );
};

export default Vakansiya;
