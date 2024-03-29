import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import APIYangilik from "../../services/yangilik";

const NewsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await APIYangilik.getbyId(id);
        setNewsData(response.data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    fetchNewsData();
  }, [id]);

  console.log(newsData);

  const formik = useFormik({
    initialValues: {
      rasm_1: newsData?.rasm_1,
      rasm_2: newsData?.rasm_2,
      rasm_3: newsData?.rasm_3,
      rasm_4: newsData?.rasm_4,
      rasm_5: newsData?.rasm_5,
      title_uz: newsData?.title_uz,
      title_ru: newsData?.title_ru,
      title_en: newsData?.title_en,
      subtitle_uz: newsData?.subtitle_uz,
      subtitle_ru: newsData?.subtitle_ru,
      subtitle_en: newsData?.subtitle_en,
      body_0_uz: newsData?.body_0_uz,
      body_0_ru: newsData?.body_0_ru,
      body_0_en: newsData?.body_0_en,
      body_1_uz: newsData?.body_1_uz,
      body_1_ru: newsData?.body_1_ru,
      body_1_en: newsData?.body_1_en,
      body_2_uz: newsData?.body_2_uz,
      body_2_ru: newsData?.body_2_ru,
      body_2_en: newsData?.body_2_en,
      body_3_uz: newsData?.body_3_uz,
      body_3_ru: newsData?.body_3_ru,
      body_3_en: newsData?.body_3_en,
      body_4_uz: newsData?.body_4_uz,
      body_4_ru: newsData?.body_4_ru,
      body_4_en: newsData?.body_4_en,
      body_5_uz: newsData?.body_5_uz,
      body_5_ru: newsData?.body_5_ru,
      body_5_en: newsData?.body_5_en,
      body_6_uz: newsData?.body_6_uz,
      body_6_ru: newsData?.body_6_ru,
      body_6_en: newsData?.body_6_en,
      body_7_uz: newsData?.body_7_uz,
      body_7_ru: newsData?.body_7_ru,
      body_7_en: newsData?.body_7_en,
      body_8_uz: newsData?.body_8_uz,
      body_8_ru: newsData?.body_8_ru,
      body_8_en: newsData?.body_8_en,
      body_9_uz: newsData?.body_9_uz,
      body_9_ru: newsData?.body_9_ru,
      body_9_en: newsData?.body_9_en,
      sana: newsData?.sana,
    },
    onSubmit: async (values) => {
      const rasm1 = document.getElementById("rasm_1").files[0];
      const rasm2 = document.getElementById("rasm_2").files[0];
      const rasm3 = document.getElementById("rasm_3").files[0];
      const rasm4 = document.getElementById("rasm_4").files[0];
      const rasm5 = document.getElementById("rasm_5").files[0];
      const data = new FormData();

      data.append("rasm_1", rasm1);
      if (rasm2) data.append("rasm_2", rasm2);
      if (rasm3) data.append("rasm_3", rasm3);
      if (rasm4) data.append("rasm_4", rasm4);
      if (rasm5) data.append("rasm_5", rasm5);

      data.append("title_uz", values.title_uz);
      data.append("title_ru", values.title_ru);
      data.append("title_en", values.title_en);
      data.append("subtitle_uz", values.subtitle_uz);
      data.append("subtitle_ru", values.subtitle_ru);
      data.append("subtitle_en", values.subtitle_en);
      data.append("body_0_uz", values.body_0_uz);
      data.append("body_0_ru", values.body_0_ru);
      data.append("body_0_en", values.body_0_en);
      data.append("body_1_uz", values.body_1_uz);
      data.append("body_1_ru", values.body_1_ru);
      data.append("body_1_en", values.body_1_en);
      data.append("body_2_uz", values.body_2_uz);
      data.append("body_2_ru", values.body_2_ru);
      data.append("body_2_en", values.body_2_en);
      data.append("body_3_uz", values.body_3_uz);
      data.append("body_3_ru", values.body_3_ru);
      data.append("body_3_en", values.body_3_en);
      data.append("body_4_uz", values.body_4_uz);
      data.append("body_4_ru", values.body_4_ru);
      data.append("body_4_en", values.body_4_en);
      data.append("body_5_uz", values.body_5_uz);
      data.append("body_5_ru", values.body_5_ru);
      data.append("body_5_en", values.body_5_en);
      data.append("body_6_uz", values.body_6_uz);
      data.append("body_6_ru", values.body_6_ru);
      data.append("body_6_en", values.body_6_en);
      data.append("body_7_uz", values.body_7_uz);
      data.append("body_7_ru", values.body_7_ru);
      data.append("body_7_en", values.body_7_en);
      data.append("body_8_uz", values.body_8_uz);
      data.append("body_8_ru", values.body_8_ru);
      data.append("body_8_en", values.body_8_en);
      data.append("body_9_uz", values.body_9_uz);
      data.append("body_9_ru", values.body_9_ru);
      data.append("body_9_en", values.body_9_en);
      data.append("sana", values.sana);
      try {
        await APIYangilik.patch(id, data);
        navigate("/yangiliklar");
      } catch (error) {
        console.error("Error updating news:", error);
      }
    },
  });

  return (
    <div className="mx-2 lg:mx-5 xl:mx-10 mb-10">
      <h1 className="text-3xl font-bold text-center mb-5 p-3">
        Yangilikni tahrirlash
      </h1>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        {/* SARLAVHA */}
        <h3 className="mt-3 text-2xl">Sarlavha</h3>
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="title_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sarlavha Uz
            </label>
            <textarea
              id="title_uz"
              name="title_uz"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Sarlavha..."
              onChange={formik.handleChange}
              value={formik.values.title_uz}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="title_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sarlavha Ru
            </label>
            <textarea
              id="title_ru"
              name="title_ru"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Sarlavha..."
              onChange={formik.handleChange}
              value={formik.values.title_ru}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="title_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sarlavha En
            </label>
            <textarea
              id="title_en"
              name="title_en"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Sarlavha..."
              onChange={formik.handleChange}
              value={formik.values.title_en}
            ></textarea>
          </div>
        </div>

        {/* QO'SHIMCHA SARLAVHA */}
        <div className="join join-vertical w-full">
          <div className="collapse collapse-plus border border-base-300">
            <input type="checkbox" name="accordion" defaultChecked />
            <div className="collapse-title">
              <h3 className="text-2xl">Qo'shimcha sarlavha</h3>
            </div>
            <div className="grid lg:grid-cols-3 gap-3 collapse-content">
              <div>
                <label
                  htmlFor="subtitle_uz"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Qo'shimcha sarlavha Uz
                </label>
                <textarea
                  id="subtitle_uz"
                  name="subtitle_uz"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Qo'shimcha sarlavha..."
                  onChange={formik.handleChange}
                  value={formik.values.subtitle_uz}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="subtitle_ru"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Qo'shimcha sarlavha Ru
                </label>
                <textarea
                  id="subtitle_ru"
                  name="subtitle_ru"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Qo'shimcha sarlavha..."
                  onChange={formik.handleChange}
                  value={formik.values.subtitle_ru}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="subtitle_en"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Qo'shimcha sarlavha En
                </label>
                <textarea
                  id="subtitle_en"
                  name="subtitle_en"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Qo'shimcha sarlavha..."
                  onChange={formik.handleChange}
                  value={formik.values.subtitle_en}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <h3 className="mt-3 text-2xl">Rasm va sana</h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            {/* Image */}
            <label
              htmlFor="rasm_1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Qo'shimcha rasm (ixtiyoriy)
            </label>
            <input
              id="rasm_1"
              name="rasm_1"
              type="file"
              className="file-input file-input-bordered w-full md:col-span-1"
              onChange={formik.handleChange}
              value={formik.values.rasm_1}
            />
          </div>
          <div>
            {/* Image */}
            <label
              htmlFor="rasm_2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Qo'shimcha rasm (ixtiyoriy)
            </label>
            <input
              id="rasm_2"
              name="rasm_2"
              type="file"
              className="file-input file-input-bordered w-full md:col-span-1"
              onChange={formik.handleChange}
              value={formik.values.rasm_2}
            />
          </div>
          <div>
            {/* Image */}
            <label
              htmlFor="rasm_3"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Qo'shimcha rasm (ixtiyoriy)
            </label>
            <input
              id="rasm_3"
              name="rasm_3"
              type="file"
              className="file-input file-input-bordered w-full md:col-span-1"
              onChange={formik.handleChange}
              value={formik.values.rasm_3}
            />
          </div>
          <div>
            {/* Image */}
            <label
              htmlFor="rasm_4"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Qo'shimcha rasm (ixtiyoriy)
            </label>
            <input
              id="rasm_4"
              name="rasm_4"
              type="file"
              className="file-input file-input-bordered w-full md:col-span-1"
              onChange={formik.handleChange}
              value={formik.values.rasm_4}
            />
          </div>
          {/* Image */}
          <div>
            <label
              htmlFor="rasm_5"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Asosiy rasm_5
            </label>
            <input
              id="rasm_5"
              name="rasm_5"
              type="file"
              // accept="image/*"
              className="file-input file-input-bordered w-full md:col-span-1"
              onChange={formik.handleChange}
              value={formik.values.rasm_5}
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="sana"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sana
            </label>
            <input
              id="sana"
              name="sana"
              type="datetime-local"
              className="input input-bordered w-full md:col-span-2 xl:col-span-1"
              onChange={formik.handleChange}
              value={formik.values.sana}
            />
          </div>
        </div>

        {/* MALUMOT */}
        <h3 className="mt-3 text-2xl">Ma'lumotlar</h3>
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="body_0_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot Uz
            </label>
            <textarea
              id="body_0_uz"
              name="body_0_uz"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot..."
              onChange={formik.handleChange}
              value={formik.values.body_0_uz}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_0_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot Ru
            </label>
            <textarea
              id="body_0_ru"
              name="body_0_ru"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot..."
              onChange={formik.handleChange}
              value={formik.values.body_0_ru}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_0_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot En
            </label>
            <textarea
              id="body_0_en"
              name="body_0_en"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot..."
              onChange={formik.handleChange}
              value={formik.values.body_0_en}
            ></textarea>
          </div>
        </div>

        {/* MALUMOT-2 */}
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="body_1_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-2 Uz
            </label>
            <textarea
              id="body_1_uz"
              name="body_1_uz"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-2..."
              onChange={formik.handleChange}
              value={formik.values.body_1_uz}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_1_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-2 Ru
            </label>
            <textarea
              id="body_1_ru"
              name="body_1_ru"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-2..."
              onChange={formik.handleChange}
              value={formik.values.body_1_ru}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_1_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-2 En
            </label>
            <textarea
              id="body_1_en"
              name="body_1_en"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-2..."
              onChange={formik.handleChange}
              value={formik.values.body_1_en}
            ></textarea>
          </div>
        </div>

        {/* MALUMOT-3 */}
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="body_2_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-3 Uz
            </label>
            <textarea
              id="body_2_uz"
              name="body_2_uz"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-3..."
              onChange={formik.handleChange}
              value={formik.values.body_2_uz}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_2_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-3 Ru
            </label>
            <textarea
              id="body_2_ru"
              name="body_2_ru"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-3..."
              onChange={formik.handleChange}
              value={formik.values.body_2_ru}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_2_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-3 En
            </label>
            <textarea
              id="body_2_en"
              name="body_2_en"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-3..."
              onChange={formik.handleChange}
              value={formik.values.body_2_en}
            ></textarea>
          </div>
        </div>

        {/* MALUMOT-4 */}
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="body_3_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-4 Uz
            </label>
            <textarea
              id="body_3_uz"
              name="body_3_uz"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-4..."
              onChange={formik.handleChange}
              value={formik.values.body_3_uz}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_3_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-4 Ru
            </label>
            <textarea
              id="body_3_ru"
              name="body_3_ru"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-4..."
              onChange={formik.handleChange}
              value={formik.values.body_3_ru}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_3_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-4 En
            </label>
            <textarea
              id="body_3_en"
              name="body_3_en"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-4..."
              onChange={formik.handleChange}
              value={formik.values.body_3_en}
            ></textarea>
          </div>
        </div>

        {/* MALUMOT-5 */}
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="body_4_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-5 Uz
            </label>
            <textarea
              id="body_4_uz"
              name="body_4_uz"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-5..."
              onChange={formik.handleChange}
              value={formik.values.body_4_uz}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_4_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-5 Ru
            </label>
            <textarea
              id="body_4_ru"
              name="body_4_ru"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-5..."
              onChange={formik.handleChange}
              value={formik.values.body_4_ru}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_4_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-5 En
            </label>
            <textarea
              id="body_4_en"
              name="body_4_en"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-5..."
              onChange={formik.handleChange}
              value={formik.values.body_4_en}
            ></textarea>
          </div>
        </div>

        {/* MALUMOT-6 */}
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="body_5_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-6 Uz
            </label>
            <textarea
              id="body_5_uz"
              name="body_5_uz"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-6..."
              onChange={formik.handleChange}
              value={formik.values.body_5_uz}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_5_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-6 Ru
            </label>
            <textarea
              id="body_5_ru"
              name="body_5_ru"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-6..."
              onChange={formik.handleChange}
              value={formik.values.body_5_ru}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_5_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-6 En
            </label>
            <textarea
              id="body_5_en"
              name="body_5_en"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-6..."
              onChange={formik.handleChange}
              value={formik.values.body_5_en}
            ></textarea>
          </div>
        </div>

        {/* MALUMOT-7 */}
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="body_6_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-7 Uz
            </label>
            <textarea
              id="body_6_uz"
              name="body_6_uz"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-7..."
              onChange={formik.handleChange}
              value={formik.values.body_6_uz}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_6_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-7 Ru
            </label>
            <textarea
              id="body_6_ru"
              name="body_6_ru"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-7..."
              onChange={formik.handleChange}
              value={formik.values.body_6_ru}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_6_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-7 En
            </label>
            <textarea
              id="body_6_en"
              name="body_6_en"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-7..."
              onChange={formik.handleChange}
              value={formik.values.body_6_en}
            ></textarea>
          </div>
        </div>

        {/* MALUMOT-8 */}
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="body_7_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-8 Uz
            </label>
            <textarea
              id="body_7_uz"
              name="body_7_uz"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-8..."
              onChange={formik.handleChange}
              value={formik.values.body_7_uz}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_7_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-8 Ru
            </label>
            <textarea
              id="body_7_ru"
              name="body_7_ru"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-8..."
              onChange={formik.handleChange}
              value={formik.values.body_7_ru}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_7_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-8 En
            </label>
            <textarea
              id="body_7_en"
              name="body_7_en"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-8..."
              onChange={formik.handleChange}
              value={formik.values.body_7_en}
            ></textarea>
          </div>
        </div>

        {/* MALUMOT-9 */}
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="body_8_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-9 Uz
            </label>
            <textarea
              id="body_8_uz"
              name="body_8_uz"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-9..."
              onChange={formik.handleChange}
              value={formik.values.body_8_uz}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_8_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-9 Ru
            </label>
            <textarea
              id="body_8_ru"
              name="body_8_ru"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-9..."
              onChange={formik.handleChange}
              value={formik.values.body_8_ru}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_8_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-9 En
            </label>
            <textarea
              id="body_8_en"
              name="body_8_en"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-9..."
              onChange={formik.handleChange}
              value={formik.values.body_8_en}
            ></textarea>
          </div>
        </div>

        {/* MALUMOT-10 */}
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="body_9_uz"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-10 Uz
            </label>
            <textarea
              id="body_9_uz"
              name="body_9_uz"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-10..."
              onChange={formik.handleChange}
              value={formik.values.body_9_uz}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_9_ru"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-10 Ru
            </label>
            <textarea
              id="body_9_ru"
              name="body_9_ru"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-10..."
              onChange={formik.handleChange}
              value={formik.values.body_9_ru}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="body_9_en"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot-10 En
            </label>
            <textarea
              id="body_9_en"
              name="body_9_en"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot-10..."
              onChange={formik.handleChange}
              value={formik.values.body_9_en}
            ></textarea>
          </div>
        </div>

        {/* BUTTON QOSHISH */}
        <button
          className="btn bg-gray-800 hover:bg-gray-700 text-white mt-5"
          type="submit"
        >
          Saqlash
        </button>
      </form>
    </div>
  );
};

export default NewsEdit;
