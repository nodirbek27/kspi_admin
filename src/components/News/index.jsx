import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useFormik } from "formik";
import APIYangilik from "../../services/yangilik";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const News = () => {
  const [news, setNews] = useState(null);
  const [newsOne, setNewsOne] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  // POST
  const formik = useFormik({
    initialValues: {
      rasm_1: "",
      rasm_2: "",
      rasm_3: "",
      rasm_4: "",
      rasm_5: "",
      title_uz: "",
      title_ru: "",
      title_en: "",
      subtitle_uz: "",
      subtitle_ru: "",
      subtitle_en: "",
      body_0_uz: "",
      body_0_ru: "",
      body_0_en: "",
      body_1_uz: "",
      body_1_ru: "",
      body_1_en: "",
      body_2_uz: "",
      body_2_ru: "",
      body_2_en: "",
      body_3_uz: "",
      body_3_ru: "",
      body_3_en: "",
      body_4_uz: "",
      body_4_ru: "",
      body_4_en: "",
      body_5_uz: "",
      body_5_ru: "",
      body_5_en: "",
      body_6_uz: "",
      body_6_ru: "",
      body_6_en: "",
      body_7_uz: "",
      body_7_ru: "",
      body_7_en: "",
      body_8_uz: "",
      body_8_ru: "",
      body_8_en: "",
      body_9_uz: "",
      body_9_ru: "",
      body_9_en: "",
      sana: "",
    },
    onSubmit: async (values) => {
      console.log(values);
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
      await APIYangilik.post(data);
    },
  });

  // GET and PAGINATION
  const itemsPerPage = 4;
  const pagesVisited = pageNumber * itemsPerPage;
  useEffect(() => {
    const loadPost = async () => {
      try {
        await APIYangilik.get()
          .then((res) => {
            setNews(res.data.reverse());
            setNewsOne(
              res.data.slice(pagesVisited, pagesVisited + itemsPerPage)
            );
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    };
    loadPost();
  }, [pagesVisited]);
  const pageCount = Math.ceil((news && news.length) / itemsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await APIYangilik.del(id);
      const res = await APIYangilik.get();
      setNews(res?.data);
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className="mx-2 lg:mx-5 xl:mx-10">
      <h1 className="text-3xl font-bold text-center mb-5 pt-3">Yangiliklar</h1>

      {/* POST */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-center mb-5 p-3">
          Yangilik qo'shish
        </h2>
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
            className="btn bg-gray-800 hover:bg-gray-700 text-white"
            type="submit"
          >
            Qo'shish
          </button>
        </form>
      </div>

      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-5 p-3">
          Tahrirlash va o'chirish
        </h2>
        {/* GET */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
          {newsOne &&
            newsOne.map((item, idx) => (
              <div key={idx}>
                {item && (
                  <div className="p-4 max-w-sm lg:max-w-xs xl:max-w-md mx-auto group/item hover:cursor-pointer h-full">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 shadow-md hover:shadow-lg flex-col group/edit">
                      <div className="flex items-center mb-3 relative overflow-hidden">
                        <img
                          className="w-full h-48 md:h-48 object-cover rounded group-hover/item:scale-105 ease-in duration-300 ..."
                          src={item.rasm_1}
                          alt="Sunset in the mountains"
                        />
                        <div className="absolute top-0 left-3 h-12 w-12 bg-[#802323] text-center flex flex-col text-sm p-1 rounded-b-md">
                          {item.sana && (
                            <span className="text-white">
                              {item.sana.slice(8, 10)}.{item.sana.slice(5, 7)}
                            </span>
                          )}
                          {item.sana && (
                            <span className="text-white">
                              {item.sana.slice(0, 4)}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* News title */}
                      <div className="flex flex-col justify-between flex-grow px-2">
                        <h2 className="leading-relaxed font-bold line-clamp-3 xl:line-clamp-2 text-base text-[#004269] text-center dark:text-gray-300 line">
                          {item.title_uz}
                        </h2>
                        <div className="card-actions justify-end p-2">
                          <Link className="btn" to={`/yangiliklar/${item.id}`}>
                            <CiEdit className="text-green-600 cursor-pointer h-5 w-5" />
                          </Link>
                          <button
                            className="btn"
                            onClick={() => handleDelete(item.id)}
                          >
                            <RiDeleteBin5Line className="text-red-600 cursor-pointer h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>

        <ReactPaginate
          className="flex justify-center items-center gap-2"
          previousLabel={"«"}
          nextLabel={"»"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination flex justify-center p-0 my-5 mx-0"}
          previousLinkClassName={"pagination__link hover:bg-[#eee] font-bold"}
          nextLinkClassName={"pagination__link hover:bg-[#eee] font-bold"}
          disabledClassName={"pagination__link--disabled color-[#888]"}
          activeClassName={
            "pagination__link--active bg-[#004269] border rounded text-white py-1 px-2"
          }
        />
      </div>
    </div>
  );
};

export default News;
