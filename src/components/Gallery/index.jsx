import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { useFormik } from "formik";
import APIGallery from "../../services/gallery";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [tur, setTur] = useState(null);
  const [data, setData] = useState(null);
  const [selectedTurId, setSelectedTurId] = useState(null);

  const hide = () => {
    setOpen(!open);
  };

  // Turni POST qilish
  const formik = useFormik({
    initialValues: {
      tur_uz: "",
      tur_ru: "",
      tur_en: "",
    },
    onSubmit: async (values, { resetForm }) => {
      await APIGallery.postTur(values);
      resetForm();
      loadTur();
      console.log(values);
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
    setSelectedTurId(id);
  };

  // Rasm yuklash
  const formik2 = useFormik({
    initialValues: {
      tur_id: "",
      rasm: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const rasm = document.getElementById("rasm").files[0];
      const data = new FormData();

      data.append("rasm", rasm);
      data.append("tur_id", selectedTurId);

      await APIGallery.post(data);
      console.log(data);
      resetForm();
      getRasm();
    },
  });

  // Rasmni GET qilish
  const getRasm = async () => {
    await APIGallery.get().then((res) => setData(res.data));
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
    <div className="mx-3 lg:mx-5 lg:max-w-7xl xl:mx-auto">
      <h2 className="text-3xl font-bold text-center mb-5 pt-3">Galleriya</h2>

      {/* Tur qo'shish */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold mb-2 pt-3">
          Galleriyaga tur yaratish
        </h2>
        <button onClick={() => hide()} className="btn text-xl bold">
          <MdOutlineCreateNewFolder />
        </button>
      </div>
      {/* Galleriyaga tur yaratish */}
      <div className={`mb-5 ${open ? "" : "hidden"}`}>
        <form
          onSubmit={formik.handleSubmit}
          className="border-2 border-[#555] p-3 rounded"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 p-3">
            <div className="max-w-xs mx-auto w-full">
              <label className="mb-2" htmlFor="tur_uz">
                Tur Uz:
              </label>
              <input
                id="tur_uz"
                name="tur_uz"
                type="text"
                className="input input-bordered w-full"
                placeholder="Type here"
                onChange={formik.handleChange}
                value={formik.values.tur_uz}
              />
            </div>
            <div className="max-w-xs mx-auto w-full">
              <label className="mb-2" htmlFor="tur_ru">
                Tur Ru:
              </label>
              <input
                id="tur_ru"
                name="tur_ru"
                type="text"
                className="input input-bordered w-full"
                placeholder="Type here"
                onChange={formik.handleChange}
                value={formik.values.tur_ru}
              />
            </div>
            <div className="max-w-xs mx-auto w-full">
              <label className="mb-2" htmlFor="tur_en">
                Tur En:
              </label>
              <input
                id="tur_en"
                name="tur_en"
                type="text"
                className="input input-bordered w-full"
                placeholder="Type here"
                onChange={formik.handleChange}
                value={formik.values.tur_en}
              />
            </div>
            <button type="submit" className="btn max-w-xs mx-auto w-full">
              Qo'shish
            </button>
          </div>
        </form>
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
      <div className="">
        <form
          onSubmit={formik2.handleSubmit}
          className="card max-w-sm border-2 border-[#555] p-3 gap-3"
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
              className="file-input file-input-bordered w-full"
              onChange={formik2.handleChange}
              value={formik2.values.rasm}
            />
          </div>
          <button type="submit" className="btn max-w-xs mx-auto w-full">
            Qo'shish
          </button>
        </form>
        {data?.map((item, idx) => (
          <div key={idx}>
            <div>
              <img src={item.rasm} alt="rasm" />
            </div>
            <p>{item}</p>
            <button onClick={handleDelete()} className="btn border-2 border-red-600">O'chirish</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
