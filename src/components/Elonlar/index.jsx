import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useFormik } from "formik";
import APIElon from "../../services/elon";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const News = () => {
  const [news, setNews] = useState(null);
  const [newsOne, setNewsOne] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  // GET
  const loadPost = async () => {
    try {
      const res = await APIElon.get();
      setNews(res.data.reverse());
      setNewsOne(res.data.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage));
    } catch (error) {
      console.log(error);
    }
  };

  // POST
  const formik = useFormik({
    initialValues: {
      rasm: "",
      title_uz: "",
      title_ru: "",
      title_en: "",
      detail_uz: "",
      detail_ru: "",
      detail_en: "",
      boshlanish_vaqti: "",
      tugash_vaqti: "",
      field_uz: "",
      field_ru: "",
      field_en: "",
      adress_uz: "",
      adress_ru: "",
      adress_en: "",
      sana: "",
    },
    onSubmit: async (values, {resetForm}) => {
      const rasm = document.getElementById("rasm").files[0];
      const data = new FormData();
      data.append("rasm", rasm);
      data.append("title_uz", values.title_uz);
      data.append("title_ru", values.title_ru);
      data.append("title_en", values.title_en);
      data.append("detail_uz", values.detail_uz);
      data.append("detail_ru", values.detail_ru);
      data.append("detail_en", values.detail_en);
      data.append("boshlanish_vaqti", values.boshlanish_vaqti);
      data.append("tugash_vaqti", values.tugash_vaqti);
      data.append("field_uz", values.field_uz);
      data.append("field_ru", values.field_ru);
      data.append("field_en", values.field_en);
      data.append("adress_uz", values.adress_uz);
      data.append("adress_ru", values.adress_ru);
      data.append("adress_en", values.adress_en);
      data.append("sana", values.sana);
      await APIElon.post(data);
      loadPost();
      resetForm();
    },
  });

  // GET and PAGINATION
  const itemsPerPage = 4;
  const pagesVisited = pageNumber * itemsPerPage;
  
  useEffect(() => {
    loadPost();
  },[pagesVisited]);

  const pageCount = Math.ceil((news && news.length) / itemsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await APIElon.del(id);
      loadPost()
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className="mx-2 lg:mx-5 xl:mx-10">
      <h1 className="text-3xl font-bold text-center mb-5 pt-3">E'lonlar</h1>

      {/* POST */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-5 p-3">E'lon qo'shish</h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
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
                rows="2"
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
                rows="2"
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
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Sarlavha..."
                onChange={formik.handleChange}
                value={formik.values.title_en}
              ></textarea>
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="rasm"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                E'lon rasmi
              </label>
              <input
                id="rasm"
                name="rasm"
                type="file"
                className="file-input file-input-bordered w-full md:col-span-1"
                onChange={formik.handleChange}
                value={formik.values.rasm}
              />
            </div>
            {/* Date */}
            <div>
              <label
                htmlFor="boshlanish_vaqti"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Boshlanish vaqti
              </label>
              <input
                id="boshlanish_vaqti"
                name="boshlanish_vaqti"
                type="datetime-local"
                className="input input-bordered w-full md:col-span-2 xl:col-span-1"
                onChange={formik.handleChange}
                value={formik.values.boshlanish_vaqti}
              />
            </div>
            <div>
              <label
                htmlFor="tugash_vaqti"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tugash vaqti
              </label>
              <input
                id="tugash_vaqti"
                name="tugash_vaqti"
                type="datetime-local"
                className="input input-bordered w-full md:col-span-2 xl:col-span-1"
                onChange={formik.handleChange}
                value={formik.values.tugash_vaqti}
              />
            </div>
            <div>
              <label
                htmlFor="field_uz"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Yo'nalish Uz
              </label>
              <input
                id="field_uz"
                name="field_uz"
                type="text"
                className="input input-bordered w-full md:col-span-2 xl:col-span-1"
                onChange={formik.handleChange}
                value={formik.values.field_uz}
              />
            </div>
            <div>
              <label
                htmlFor="field_ru"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Yo'nalish Ru
              </label>
              <input
                id="field_ru"
                name="field_ru"
                type="text"
                className="input input-bordered w-full md:col-span-2 xl:col-span-1"
                onChange={formik.handleChange}
                value={formik.values.field_ru}
              />
            </div>
            <div>
              <label
                htmlFor="field_en"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Yo'nalish En
              </label>
              <input
                id="field_en"
                name="field_en"
                type="text"
                className="input input-bordered w-full md:col-span-2 xl:col-span-1"
                onChange={formik.handleChange}
                value={formik.values.field_en}
              />
            </div>
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

          {/* Manzil */}
          <div className="grid lg:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="adress_uz"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Manzil Uz
              </label>
              <textarea
                id="adress_uz"
                name="adress_uz"
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Manzil..."
                onChange={formik.handleChange}
                value={formik.values.adress_uz}
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="adress_ru"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Manzil Ru
              </label>
              <textarea
                id="adress_ru"
                name="adress_ru"
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Manzil..."
                onChange={formik.handleChange}
                value={formik.values.adress_ru}
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="adress_en"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Manzil En
              </label>
              <textarea
                id="adress_en"
                name="adress_en"
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Manzil..."
                onChange={formik.handleChange}
                value={formik.values.adress_en}
              ></textarea>
            </div>
          </div>

          {/* MALUMOT */}
          <div className="grid lg:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="detail_uz"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ma'lumot Uz
              </label>
              <textarea
                id="detail_uz"
                name="detail_uz"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ma'lumot..."
                onChange={formik.handleChange}
                value={formik.values.detail_uz}
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="detail_ru"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ma'lumot Ru
              </label>
              <textarea
                id="detail_ru"
                name="detail_ru"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ma'lumot..."
                onChange={formik.handleChange}
                value={formik.values.detail_ru}
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="detail_en"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ma'lumot En
              </label>
              <textarea
                id="detail_en"
                name="detail_en"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ma'lumot..."
                onChange={formik.handleChange}
                value={formik.values.detail_en}
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
        <h2 className="text-2xl font-bold mb-5 p-3">Tahrirlash va o'chirish</h2>
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
                          src={item.rasm}
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
                          {item.title}
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
