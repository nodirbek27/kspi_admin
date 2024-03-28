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

  // POST
  const formik = useFormik({
    initialValues: {
      rasm: "",
      title: "",
      detail: "",
      boshlanish_vaqti: "",
      tugash_vaqti: "",
      field: "",
      adress: "",
      sana: "",
    },
    onSubmit: async (values) => {
      const rasm = document.getElementById("rasm").files[0];
      const data = new FormData();
      data.append("rasm", rasm);
      data.append("title", values.title);
      data.append("detail", values.detail);
      data.append("boshlanish_vaqti", values.boshlanish_vaqti);
      data.append("tugash_vaqti", values.tugash_vaqti);
      data.append("field", values.field);
      data.append("adress", values.adress);
      data.append("sana", values.sana);
      await APIElon.post(data);
      for (let entry of data.entries()) {
        console.log(entry[0], entry[1]);
      }
    },
  });

  // GET and PAGINATION
  const itemsPerPage = 4;
  const pagesVisited = pageNumber * itemsPerPage;
  useEffect(() => {
    const loadPost = async () => {
      try {
        await APIElon.get()
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
      await APIElon.del(id);
      const res = await APIElon.get();
      setNews(res.data);
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
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sarlavha
              </label>
              <textarea
                id="title"
                name="title"
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Sarlavha..."
                onChange={formik.handleChange}
                value={formik.values.title}
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
                htmlFor="field"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Yo'nalish
              </label>
              <input
                id="field"
                name="field"
                type="text"
                className="input input-bordered w-full md:col-span-2 xl:col-span-1"
                onChange={formik.handleChange}
                value={formik.values.field}
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
          <div>
            <label
              htmlFor="adress"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Manzil
            </label>
            <textarea
              id="adress"
              name="adress"
              rows="2"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Manzil..."
              onChange={formik.handleChange}
              value={formik.values.adress}
            ></textarea>
          </div>

          {/* MALUMOT */}
          <div>
            <label
              htmlFor="detail"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ma'lumot
            </label>
            <textarea
              id="detail"
              name="detail"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ma'lumot..."
              onChange={formik.handleChange}
              value={formik.values.detail}
            ></textarea>
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
