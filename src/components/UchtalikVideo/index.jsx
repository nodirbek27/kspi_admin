import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import APIFikr from "../../services/fikr";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";

const UchtalikVideo = () => {
  const [fikr, setFikr] = useState(null);

  // POST
  const formik = useFormik({
    initialValues: {
      rasm: "",
      video: "",
      link: "",
      text_uz: "",
      text_ru: "",
      text_en: "",
      talaba_uz: "",
      talaba_ru: "",
      talaba_en: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const rasm = document.getElementById("rasm").files[0];
      const video = document.getElementById("video").files[0];
      const data = new FormData();

      data.append("rasm", rasm);
      data.append("video", video);
      data.append("link", values.link);
      data.append("text_uz", values.text_uz);
      data.append("text_ru", values.text_ru);
      data.append("text_en", values.text_en);
      data.append("talaba_uz", values.talaba_uz);
      data.append("talaba_ru", values.talaba_ru);
      data.append("talaba_en", values.talaba_en);
      await APIFikr.post(data);
      console.log(data);
      loadPost();
      resetForm();
    },
  });

  // GET
  const loadPost = async () => {
    try {
      await APIFikr.get()
        .then((res) => {
          setFikr(res.data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadPost();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    try {
      await APIFikr.del(id);
      const res = await APIFikr.get();
      setFikr(res?.data);
      loadPost();
    } catch (error) {
      console.error("Error deleting fikrlar:", error);
    }
  };

  return (
    <div>
      <h2 className="text-center my-5 font-bold md:text-lg lg:text-xl xl:text-2xl">
        Talabalar qanday fikrda?
      </h2>
      <div className="max-w-7xl mx-auto px-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid md:grid-cols-3 gap-3">
            {/* Rasm */}
            <div className="flex flex-col">
              <label htmlFor="rasm">Ustki rasm</label>
              <input
                type="file"
                id="rasm"
                name="rasm"
                className="file-input file-input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.rasm}
              />
            </div>
            {/* Video */}
            <div className="flex flex-col">
              <label htmlFor="video">Qisqa video</label>
              <input
                type="file"
                id="video"
                name="video"
                className="file-input file-input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.video}
              />
            </div>
            {/* Link */}
            <div className="flex flex-col">
              <label htmlFor="link">YouTube linki</label>
              <input
                type="text"
                id="link"
                name="link"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.link}
                placeholder="YouTube linki"
              />
            </div>

            {/* Savol */}
            <div className="flex flex-col">
              <label htmlFor="text_uz">Savol Uz</label>
              <input
                type="text"
                id="text_uz"
                name="text_uz"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.text_uz}
                placeholder="Savol"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="text_ru">Savol Ru</label>
              <input
                type="text"
                id="text_ru"
                name="text_ru"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.text_ru}
                placeholder="Savol"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="text_en">Savol En</label>
              <input
                type="text"
                id="text_en"
                name="text_en"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.text_en}
                placeholder="Savol"
              />
            </div>

            {/* Ism */}
            <div className="flex flex-col">
              <label htmlFor="talaba_uz">Ism Uz</label>
              <input
                type="text"
                id="talaba_uz"
                name="talaba_uz"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.talaba_uz}
                placeholder="Ism"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="talaba_ru">Ism Ru</label>
              <input
                type="text"
                id="talaba_ru"
                name="talaba_ru"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.talaba_ru}
                placeholder="Ism"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="talaba_en">Ism En</label>
              <input
                type="text"
                id="talaba_en"
                name="talaba_en"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.talaba_en}
                placeholder="Ism"
              />
            </div>
          </div>

          {/* BUTTON QOSHISH */}
          <button
            className="btn bg-gray-800 hover:bg-gray-700 text-white"
            type="submit"
          >
            Qo'shish
          </button>
        </form>
      </div>

      {/* Get */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {fikr &&
          fikr.map((item, idx) => (
            <div key={idx} className="max-w-[250px]">
              <img src={item.rasm} alt="rasm" />
              <p>
                <b>Savol: </b>
                {item.text_uz}
              </p>
              <p>
                <b>Ism: </b>
                {item.talaba_uz}
              </p>
              <div className="card-actions justify-end p-2">
                <Link className="btn" to={`/yangiliklar/${item.id}`}>
                  <CiEdit className="text-green-600 cursor-pointer h-5 w-5" />
                </Link>
                <button className="btn" onClick={() => handleDelete(item.id)}>
                  <RiDeleteBin5Line className="text-red-600 cursor-pointer h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UchtalikVideo;
