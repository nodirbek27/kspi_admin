import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import APIStatistika from "../../services/statistics";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RxArrowTopRight } from "react-icons/rx";

const Statistics = () => {
  const [data, setData] = useState(null);

  // Post
  const formik = useFormik({
    initialValues: {
      statistika_title_uz: "",
      statistika_title_ru: "",
      statistika_title_en: "",
      statistika_text_uz: "",
      statistika_text_ru: "",
      statistika_text_en: "",
      talaba_title_uz: "",
      talaba_title_ru: "",
      talaba_title_en: "",
      talaba_nomer: "",
      phd_title_uz: "",
      phd_title_ru: "",
      phd_title_en: "",
      phd_nomer: "",
      oqituvchi_title_uz: "",
      oqituvchi_title_ru: "",
      oqituvchi_title_en: "",
      oqituvchi_nomer: "",
      fan_doktiri_title_uz: "",
      fan_doktiri_title_ru: "",
      fan_doktiri_title_en: "",
      fan_doktiri_nomer: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const data = new FormData();
      data.append("statistika_title_uz", values.statistika_title_uz);
      data.append("statistika_title_ru", values.statistika_title_ru);
      data.append("statistika_title_en", values.statistika_title_en);
      data.append("statistika_text_uz", values.statistika_text_uz);
      data.append("statistika_text_ru", values.statistika_text_ru);
      data.append("statistika_text_en", values.statistika_text_en);
      data.append("talaba_title_uz", values.talaba_title_uz);
      data.append("talaba_title_ru", values.talaba_title_ru);
      data.append("talaba_title_en", values.talaba_title_en);
      data.append("talaba_nomer", values.talaba_nomer);
      data.append("phd_title_uz", values.phd_title_uz);
      data.append("phd_title_ru", values.phd_title_ru);
      data.append("phd_title_en", values.phd_title_en);
      data.append("phd_nomer", values.phd_nomer);
      data.append("oqituvchi_title_uz", values.oqituvchi_title_uz);
      data.append("oqituvchi_title_ru", values.oqituvchi_title_ru);
      data.append("oqituvchi_title_en", values.oqituvchi_title_en);
      data.append("oqituvchi_nomer", values.oqituvchi_nomer);
      data.append("fan_doktiri_title_uz", values.fan_doktiri_title_uz);
      data.append("fan_doktiri_title_ru", values.fan_doktiri_title_ru);
      data.append("fan_doktiri_title_en", values.fan_doktiri_title_en);
      data.append("fan_doktiri_nomer", values.fan_doktiri_nomer);
      await APIStatistika.post(data);
      getData();
      resetForm();
    },
  });

  //   Get
  const getData = async () => {
    await APIStatistika.get()
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
      await APIStatistika.del(id);
      getData();
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-5 p-3">Statistika</h2>

      {/* Card get */}
      {data &&
        data.map((item) => (
          <div
            className="card lg:card-side bg-neutral text-neutral-content shadow-xl my-5"
            key={item.id}
          >
            <div className="card-body text-center">
              <h2 className="text-2xl">{item.statistika_title_uz}</h2>
              <h3 className="card-subtitle text-xl mb-3">{item.statistika_text_uz}</h3>
              <div className="card-actions justify-evenly border-2 p-5 rounded mb-3">
                <div className="flex flex-col text-center">
                  <h3 className="text-xl">{item.talaba_nomer}</h3>
                  <div>{item.talaba_title_uz}</div>
                </div>
                <div className="flex flex-col text-center">
                  <h3 className="text-xl">{item.phd_nomer}</h3>
                  <div>{item.phd_title_uz}</div>
                </div>
                <div className="flex flex-col text-center">
                  <h3 className="text-xl">{item.oqituvchi_nomer}</h3>
                  <div>{item.oqituvchi_title_uz}</div>
                </div>
                <div className="flex flex-col text-center">
                  <h3 className="text-xl">{item.fan_doktiri_nomer}</h3>
                  <div>{item.fan_doktiri_title_uz}</div>
                </div>
              </div>
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
        {/* Sarlavha */}
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="statistika_title_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sarlavha Uz
            </label>
            <input
              id="statistika_title_uz"
              name="statistika_title_uz"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Sarlavha..."
              onChange={formik.handleChange}
              value={formik.values.statistika_title_uz}
            />
          </div>
          <div>
            <label
              htmlFor="statistika_title_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sarlavha Ru
            </label>
            <input
              id="statistika_title_ru"
              name="statistika_title_ru"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Sarlavha..."
              onChange={formik.handleChange}
              value={formik.values.statistika_title_ru}
            />
          </div>
          <div>
            <label
              htmlFor="statistika_title_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sarlavha En
            </label>
            <input
              id="statistika_title_en"
              name="statistika_title_en"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Sarlavha..."
              onChange={formik.handleChange}
              value={formik.values.statistika_title_en}
            />
          </div>
        </div>

        {/* Qo'shimcha sarlavha */}
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="statistika_text_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Qo'shimcha sarlavha Uz
            </label>
            <input
              id="statistika_text_uz"
              name="statistika_text_uz"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Qo'shimcha sarlavha..."
              onChange={formik.handleChange}
              value={formik.values.statistika_text_uz}
            />
          </div>
          <div>
            <label
              htmlFor="statistika_text_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Qo'shimcha sarlavha Ru
            </label>
            <input
              id="statistika_text_ru"
              name="statistika_text_ru"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Qo'shimcha sarlavha..."
              onChange={formik.handleChange}
              value={formik.values.statistika_text_ru}
            />
          </div>
          <div>
            <label
              htmlFor="statistika_text_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Qo'shimcha sarlavha En
            </label>
            <input
              id="statistika_text_en"
              name="statistika_text_en"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Qo'shimcha sarlavha..."
              onChange={formik.handleChange}
              value={formik.values.statistika_text_en}
            />
          </div>
        </div>

        <hr className="my-5" />

        {/* Talabalar */}
        <div className="grid lg:grid-cols-4 gap-3">
          <div>
            <label
              htmlFor="talaba_title_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Talabalar Uz
            </label>
            <input
              id="talaba_title_uz"
              name="talaba_title_uz"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Talabalar..."
              onChange={formik.handleChange}
              value={formik.values.talaba_title_uz}
            />
          </div>
          <div>
            <label
              htmlFor="talaba_title_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Talabalar Ru
            </label>
            <input
              id="talaba_title_ru"
              name="talaba_title_ru"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Talabalar..."
              onChange={formik.handleChange}
              value={formik.values.talaba_title_ru}
            />
          </div>
          <div>
            <label
              htmlFor="talaba_title_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Talabalar En
            </label>
            <input
              id="talaba_title_en"
              name="talaba_title_en"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Talabalar..."
              onChange={formik.handleChange}
              value={formik.values.talaba_title_en}
            />
          </div>
          <div>
            <label
              htmlFor="talaba_nomer"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Talabalar soni
            </label>
            <input
              id="talaba_nomer"
              name="talaba_nomer"
              type="number"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Talabalar soni..."
              onChange={formik.handleChange}
              value={formik.values.talaba_nomer}
            />
          </div>
        </div>

        {/* Phd */}
        <div className="grid lg:grid-cols-4 gap-3">
          <div>
            <label
              htmlFor="phd_title_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phd Uz
            </label>
            <input
              id="phd_title_uz"
              name="phd_title_uz"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Phd..."
              onChange={formik.handleChange}
              value={formik.values.phd_title_uz}
            />
          </div>
          <div>
            <label
              htmlFor="phd_title_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phd Ru
            </label>
            <input
              id="phd_title_ru"
              name="phd_title_ru"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Phd..."
              onChange={formik.handleChange}
              value={formik.values.phd_title_ru}
            />
          </div>
          <div>
            <label
              htmlFor="phd_title_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phd En
            </label>
            <input
              id="phd_title_en"
              name="phd_title_en"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Phd..."
              onChange={formik.handleChange}
              value={formik.values.phd_title_en}
            />
          </div>
          <div>
            <label
              htmlFor="phd_nomer"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phd soni
            </label>
            <input
              id="phd_nomer"
              name="phd_nomer"
              type="number"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Phd soni..."
              onChange={formik.handleChange}
              value={formik.values.phd_nomer}
            />
          </div>
        </div>

        {/* O'qituvchi */}
        <div className="grid lg:grid-cols-4 gap-3">
          <div>
            <label
              htmlFor="oqituvchi_title_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              O'qituvchi Uz
            </label>
            <input
              id="oqituvchi_title_uz"
              name="oqituvchi_title_uz"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="O'qituvchi..."
              onChange={formik.handleChange}
              value={formik.values.oqituvchi_title_uz}
            />
          </div>
          <div>
            <label
              htmlFor="oqituvchi_title_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              O'qituvchi Ru
            </label>
            <input
              id="oqituvchi_title_ru"
              name="oqituvchi_title_ru"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="O'qituvchi..."
              onChange={formik.handleChange}
              value={formik.values.oqituvchi_title_ru}
            />
          </div>
          <div>
            <label
              htmlFor="oqituvchi_title_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              O'qituvchi En
            </label>
            <input
              id="oqituvchi_title_en"
              name="oqituvchi_title_en"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="O'qituvchi..."
              onChange={formik.handleChange}
              value={formik.values.oqituvchi_title_en}
            />
          </div>
          <div>
            <label
              htmlFor="oqituvchi_nomer"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              O'qituvchilar soni
            </label>
            <input
              id="oqituvchi_nomer"
              name="oqituvchi_nomer"
              type="number"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="O'qituvchilar soni..."
              onChange={formik.handleChange}
              value={formik.values.oqituvchi_nomer}
            />
          </div>
        </div>

        {/* Fan doktori */}
        <div className="grid lg:grid-cols-4 gap-3">
          <div>
            <label
              htmlFor="fan_doktiri_title_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fan doktori Uz
            </label>
            <input
              id="fan_doktiri_title_uz"
              name="fan_doktiri_title_uz"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Fan doktori..."
              onChange={formik.handleChange}
              value={formik.values.fan_doktiri_title_uz}
            />
          </div>
          <div>
            <label
              htmlFor="fan_doktiri_title_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fan doktori Ru
            </label>
            <input
              id="fan_doktiri_title_ru"
              name="fan_doktiri_title_ru"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Fan doktori..."
              onChange={formik.handleChange}
              value={formik.values.fan_doktiri_title_ru}
            />
          </div>
          <div>
            <label
              htmlFor="fan_doktiri_title_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fan doktori En
            </label>
            <input
              id="fan_doktiri_title_en"
              name="fan_doktiri_title_en"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Fan doktori..."
              onChange={formik.handleChange}
              value={formik.values.fan_doktiri_title_en}
            />
          </div>
          <div>
            <label
              htmlFor="fan_doktiri_nomer"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fan doktorlari soni
            </label>
            <input
              id="fan_doktiri_nomer"
              name="fan_doktiri_nomer"
              type="number"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Fan doktorlari soni..."
              onChange={formik.handleChange}
              value={formik.values.fan_doktiri_nomer}
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

export default Statistics;
