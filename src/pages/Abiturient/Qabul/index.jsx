import React from "react";
import BaholashMezonlari from "../../../components/BaholashMezonlari";
import QabulKvotasi from "../../../components/QabulKvotasi";

const Qabul = () => {
  return (
    <div>
      <h2 className="text-2xl text-center font-semibold py-5">Qabul</h2>
      <BaholashMezonlari />
      <QabulKvotasi />
    </div>
  );
};

export default Qabul;
