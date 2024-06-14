import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import APITalaba from "../../services/talabaFikr";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RxArrowTopRight } from "react-icons/rx";

const TalabaFikr = () => {
  const [data, setData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Post
  const formik = useFormik({
    initialValues: {
      talaba_rasm: "",
      talaba_coment_uz: "",
      talaba_coment_ru: "",
      talaba_coment_en: "",
      talaba_ism_uz: "",
      talaba_ism_ru: "",
      talaba_ism_en: "",
      talaba_inferior_uz: "",
      talaba_inferior_ru: "",
      talaba_inferior_en: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const data = new FormData();
      data.append("talaba_rasm", selectedFile);
      data.append("talaba_coment_uz", values.talaba_coment_uz);
      data.append("talaba_coment_ru", values.talaba_coment_ru);
      data.append("talaba_coment_en", values.talaba_coment_en);
      data.append("talaba_ism_uz", values.talaba_ism_uz);
      data.append("talaba_ism_ru", values.talaba_ism_ru);
      data.append("talaba_ism_en", values.talaba_ism_en);
      data.append("talaba_inferior_uz", values.talaba_inferior_uz);
      data.append("talaba_inferior_ru", values.talaba_inferior_ru);
      data.append("talaba_inferior_en", values.talaba_inferior_en);
      await APITalaba.post(data);
      getData();
      resetForm();
    },
  });

  //   Get
  const getData = async () => {
    await APITalaba.get()
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getData();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    try {
      await APITalaba.del(id);
      getData();
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-5 p-3">Talaba fikri</h2>

      {/* Card get */}
      {data &&
        data.map((item) => (
          <div
            className="card lg:card-side bg-base-100 shadow-xl my-5"
            key={item.id}
          >
            <figure className="max-w-[350px]">
              <img src={item.talaba_rasm} alt="Album" className="w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.talaba_coment_uz}</h2>
              <p className="text-end">{item.talaba_ism_uz}</p>
              <p className="text-end">{item.talaba_inferior_uz}</p>
              <div className="card-actions justify-end">
                {/* Tahrirlash */}
                <button className="btn" to={`/yangiliklar/${item.id}`}>
                  <CiEdit className="text-green-600 cursor-pointer h-5 w-5" />
                </button>
                {/* O'chirish */}
                <button className="btn" onClick={() => handleDelete(item.id)}>
                  <RiDeleteBin5Line className="text-red-600 cursor-pointer h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

      <form
        onSubmit={formik.handleSubmit}
        className={`flex flex-col gap-2 ${data?.length >= 1 ? "hidden" : ""}`}
      >
        <h3 className="mt-3 text-2xl">Talaba fikri yuklash</h3>
        {/* Fikri */}
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="talaba_coment_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Talabaning fikri Uz
            </label>
            <textarea
              id="talaba_coment_uz"
              name="talaba_coment_uz"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Talabaning fikri..."
              onChange={formik.handleChange}
              value={formik.values.talaba_coment_uz}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="talaba_coment_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Talabaning fikri Ru
            </label>
            <textarea
              id="talaba_coment_ru"
              name="talaba_coment_ru"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Talabaning fikri..."
              onChange={formik.handleChange}
              value={formik.values.talaba_coment_ru}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="talaba_coment_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Talabaning fikri En
            </label>
            <textarea
              id="talaba_coment_en"
              name="talaba_coment_en"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Talabaning fikri..."
              onChange={formik.handleChange}
              value={formik.values.talaba_coment_en}
            ></textarea>
          </div>
        </div>

        {/* Ism familiya */}
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="talaba_ism_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              FISH Uz
            </label>
            <input
              id="talaba_ism_uz"
              name="talaba_ism_uz"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ism familiya..."
              onChange={formik.handleChange}
              value={formik.values.talaba_ism_uz}
            />
          </div>
          <div>
            <label
              htmlFor="talaba_ism_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              FISH Ru
            </label>
            <input
              id="talaba_ism_ru"
              name="talaba_ism_ru"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ism familiya..."
              onChange={formik.handleChange}
              value={formik.values.talaba_ism_ru}
            />
          </div>
          <div>
            <label
              htmlFor="talaba_ism_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              FISH En
            </label>
            <input
              id="talaba_ism_en"
              name="talaba_ism_en"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ism familiya..."
              onChange={formik.handleChange}
              value={formik.values.talaba_ism_en}
            />
          </div>
        </div>

        {/* Kursi va yo'nalishi */}
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="talaba_inferior_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Kursi va yo'nalishi Uz
            </label>
            <input
              id="talaba_inferior_uz"
              name="talaba_inferior_uz"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Yo'nalishi kursi..."
              onChange={formik.handleChange}
              value={formik.values.talaba_inferior_uz}
            />
          </div>
          <div>
            <label
              htmlFor="talaba_inferior_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Kursi va yo'nalishi Ru
            </label>
            <input
              id="talaba_inferior_ru"
              name="talaba_inferior_ru"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Yo'nalishi kursi..."
              onChange={formik.handleChange}
              value={formik.values.talaba_inferior_ru}
            />
          </div>
          <div>
            <label
              htmlFor="talaba_inferior_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Kursi va yo'nalishi En
            </label>
            <input
              id="talaba_inferior_en"
              name="talaba_inferior_en"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Yo'nalishi kursi..."
              onChange={formik.handleChange}
              value={formik.values.talaba_inferior_en}
            />
          </div>
        </div>

        {/* File input */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="rasm"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Talaba rasmi
            </label>
            <input
              id="rasm"
              name="rasm"
              type="file"
              className="file-input file-input-bordered file-input-info text-red-600 w-full md:col-span-1"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>
        </div>
        <button
            className="bg-blue-400 hover:bg-blue-600 flex justify-center items-center gap-1 w-[100%] h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95"
            type="submit"
          >
            SUBMIT
            <RxArrowTopRight className="font-bold text-[20px] mt-[2px]" />
          </button>
      </form>
    </div>
  );
};

export default TalabaFikr;
