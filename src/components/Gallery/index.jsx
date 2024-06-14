import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useFormik } from "formik";
import APIGallery from "../../services/gallery";
import { TextWarn } from "./styled";
import { BiBlock } from "react-icons/bi";
import { RxArrowTopRight } from "react-icons/rx";

const Gallery = () => {
  const [tur, setTur] = useState(null);
  const [data, setData] = useState(null);
  const [selectedTurId, setSelectedTurId] = useState(null);
  const [errTxt, setErrTxt] = useState(false);

  // Turni POST qilish
  const formik = useFormik({
    initialValues: {
      tur_uz: "",
      tur_ru: "",
      tur_en: "",
    },
    onSubmit: (values) => {
      if (
        values.tur_uz === "" ||
        values.tur_ru === "" ||
        values.tur_en === ""
      ) {
        setErrTxt(true);
        setTimeout(() => {
          setErrTxt(false);
        }, 5000);
      } else {
        APIGallery.postTur(values)
          .then(() => loadTur())
          .catch((err) => console.log(err));
        formik.resetForm();
      }
    },
  });
  // Turni GET qilish
  const loadTur = async () => {
    await APIGallery.getTur().then((res) => setTur(res.data));
  };

  // Turni DELETE qilish
  const handleTurDelete = async (id) => {
    await APIGallery.delTur(id);
    loadTur();
  };
  useEffect(() => {
    loadTur();
  }, []);

  // Turni IDsini ushlash
  const handleClick = (id) => {
    setSelectedTurId(Number(id));
  };

  // Rasm yuklash
  const formik2 = useFormik({
    initialValues: {
      tur_id: selectedTurId,
      rasm: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const rasm = document.getElementById("rasm").files[0];
      const data = new FormData();

      data.append("rasm", rasm);
      data.append("tur_id", selectedTurId);

      await APIGallery.post(data);
      resetForm();
      getRasm();
    },
  });

  // Rasmni GET qilish
  const getRasm = async () => {
    await APIGallery.get().then((res) => setData(res.data.reverse()));
  };

  // Rasmni DELETE qilish
  const handleDelete = async (id) => {
    await APIGallery.del(id);
    getRasm();
  };
  useEffect(() => {
    getRasm();
  }, []);

  return (
    <div className="mx-3 lg:mx-5 lg:max-w-7xl xl:mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-5 pt-3">Galleriya</h2>

      {/* Galleriyaga tur yaratish */}
      <div>
        <h1 className="text-[1.4rem] font-medium">Galleriyaga tur yaratish</h1>
        <form
          className="flex items-center gap-2"
          onSubmit={formik.handleSubmit}
        >
          <label className="w-[25%]" htmlFor="tur_uz">
            <h3>Tur uz</h3>
            <textarea
              className="w-full input input-bordered px-[7px]"
              type="text"
              id="tur_uz"
              value={formik.values.tur_uz}
              onChange={formik.handleChange}
            />
          </label>
          <label className="w-[25%]" htmlFor="tur_ru">
            <h3>Tur ru</h3>
            <textarea
              className="w-full input input-bordered px-[7px]"
              type="text"
              id="tur_ru"
              value={formik.values.tur_ru}
              onChange={formik.handleChange}
            />
          </label>
          <label className="w-[25%]" htmlFor="tur_en">
            <h3>Tur en</h3>
            <textarea
              className="w-full input input-bordered px-[7px]"
              type="text"
              id="tur_en"
              value={formik.values.tur_en}
              onChange={formik.handleChange}
            />
          </label>
          <button
            className={`${
              errTxt
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-400 hover:bg-blue-600"
            } flex justify-center items-center gap-1 w-[25%] h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95`}
            type="submit"
          >
            SUBMIT
            {errTxt ? (
              <BiBlock />
            ) : (
              <RxArrowTopRight className="font-bold text-[20px] mt-[2px]" />
            )}
          </button>
        </form>
        <TextWarn
          className={`${
            errTxt ? "inline-block" : "hidden"
          } w-full font-medium text-center`}
        >
          Hamma kiritish bo'limlari kiritilishi shart!
        </TextWarn>
      </div>
      {/* Table */}
      <div className="overflow-x-auto mb-5">
        <h2 className="text-2xl font-bold mb-2 pt-3">
          Turini tahrirlash va o'chirish
        </h2>
        <p className="italic mb-5">
          Standart holatda galleriya 3ta turli bo'lishi tavsiya etiladi.!
        </p>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>№</th>
              <th>Turi-Uz</th>
              <th>Turi-Ru</th>
              <th>Turi-En</th>
              <th>Tahrirlash</th>
              <th>O'chirish</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {tur &&
              tur.map((item, idx) => (
                <tr key={idx}>
                  <th>{item.id}</th>
                  <td>{item.tur_uz}</td>
                  <td>{item.tur_ru}</td>
                  <td>{item.tur_en}</td>
                  <td>
                    <CiEdit className="text-green-600 cursor-pointer h-5 w-5" />
                  </td>
                  <td>
                    <RiDeleteBin5Line
                      onClick={() => handleTurDelete(item.id)}
                      className="text-red-600 cursor-pointer h-5 w-5"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Rasm yuklash */}
      <h2 className="text-2xl font-bold mb-5 pt-3">Rasm yuklash</h2>
      <div className="md:flex gap-5">
        <form
          onSubmit={formik2.handleSubmit}
          className="card max-w-sm border-2 border-[#555] p-3 gap-3 mb-5"
        >
          <div className="max-w-xs mx-auto w-full">
            <label htmlFor="tur_id" className="mb-3">
              Galleriya turlari
            </label>
            <select
              id="tur_id"
              name="tur_id"
              className="select select-bordered w-full"
              onChange={(e) => handleClick(e.target.value)}
              value={selectedTurId ? selectedTurId : "Galleriya turlari"}
            >
              <option disabled>Galleriya turlari</option>
              {tur &&
                tur.map((item, idx) => (
                  <option key={idx} value={item.id}>
                    {item.tur_uz}
                  </option>
                ))}
            </select>
          </div>
          <div className="max-w-xs mx-auto w-full">
            <label htmlFor="rasm">Rasm tanlang.!</label>
            <input
              id="rasm"
              name="rasm"
              type="file"
              className="file-input file-input-bordered file-input-info w-full"
              onChange={formik2.handleChange}
              value={formik2.values.rasm}
            />
          </div>
          <button
            className="bg-blue-400 hover:bg-blue-600 flex justify-center items-center gap-1 w-[100%] h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95"
            type="submit"
          >
            SUBMIT
            <RxArrowTopRight className="font-bold text-[20px] mt-[2px]" />
          </button>
        </form>
        <div className="max-w-[340px] md:max-w-[500px] xl:max-w-[800px] mx-auto grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-3 overflow-y-scroll max-h-[500px] md:max-h-[240px]">
          {data?.map((item, idx) => (
            <div key={idx}>
              <div className="mb-1">
                <img
                  className="w-[110px] h-[65px] object-cover rounded-md"
                  src={item.rasm}
                  alt="rasm"
                />
              </div>
              <div>{item.tur_uz}</div>
              <div className="text-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-2 bg-red-500 rounded-md py-1 px-4 text-white font-medium hover:bg-red-600 active:scale-95"
                >
                  <span>Delete</span>
                  <RiDeleteBin5Line />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
