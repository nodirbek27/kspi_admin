import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useFormik } from "formik";
import APIYangilik from "../../services/yangilik";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useMultiRootEditor } from "@ckeditor/ckeditor5-react";
import MultiRootEditor from "@ckeditor/ckeditor5-build-multi-root";

const News = () => {
  const [news, setNews] = useState(null);
  const [newsOne, setNewsOne] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [showFourth, setShowFourth] = useState(false);
  const [showFivth, setShowFivth] = useState(false);

  const handleButtonClick = () => {
    if (!showFirst) {
      setShowFirst(true);
    } else if (!showSecond) {
      setShowSecond(true);
    } else if (!showThird) {
      setShowThird(true);
    } else if (!showFourth) {
      setShowFourth(true);
    } else if (!showFivth) {
      setShowFivth(true);
    }
  };

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
      body_uz: "",
      body_ru: "",
      body_en: "",  
      sana: "",
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
      data.append("body_uz", values.body_uz);
      data.append("body_ru", values.body_ru);
      data.append("body_en", values.body_en);
      data.append("sana", values.sana);
      await APIYangilik.post(data);
    },
  });
  
  const editorProps = {
    editor: MultiRootEditor,
    data: {
      contentUz: "Ma'lumot kiriting <em>(uz)</em> ...",
      contentRu: "Ma'lumot kiriting <em>(ru)</em> ...",
      contentEn: "Ma'lumot kiriting <em>(en)</em> ...",
    },
    config: {
      toolbar: [
        "|",
        "undo",
        "redo",
        "bold",
        "italic",
        "|",
        "link",
        "blockQuote",
        "|",
        "numberedList",
        "bulletedList",
      ],
    },
  };

  const { toolbarElement, editableElements, data } =
  useMultiRootEditor(editorProps);
  console.log(data);

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
  }, [pagesVisited, news]);
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
      window.location.reload();
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className="mx-2 lg:mx-5 xl:mx-10">
      <h1 className="text-3xl font-bold text-center mb-5 pt-3">Yangiliklar</h1>

      {/* POST */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-5 p-3">
          Yangilik qo'shish
        </h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          {/* SARLAVHA */}
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
          </div>

          {/* QO'SHIMCHA SARLAVHA */}
          <div className="grid lg:grid-cols-3 gap-3">
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
                rows="2"
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
                rows="2"
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
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Qo'shimcha sarlavha..."
                onChange={formik.handleChange}
                value={formik.values.subtitle_en}
              ></textarea>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              {/* Image */}
              <label
                htmlFor="rasm_1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Asosiy rasm
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
            <div className={showSecond ? "" : "hidden"}>
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
            <div className={showThird ? "" : "hidden"}>
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
            <div className={showFourth ? "" : "hidden"}>
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
            <div className={showFivth ? "" : "hidden"}>
              <label
                htmlFor="rasm_5"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Qo'shimcha rasm (ixtiyoriy)
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
            <div>
              <label
                htmlFor="button"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Rasm qo'shish
              </label>
              <input
                id="button"
                name="button"
                type="button"
                className="file-input file-input-bordered w-full md:col-span-1 text-xl font-bold cursor-pointer"
                onClick={handleButtonClick}
                value={"+"}
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

          {toolbarElement}
          {editableElements}

          {/* BUTTON QOSHISH */}
          <button
            className="bg-blue-400 hover:bg-blue-600 flex justify-center items-center gap-1 w-[100%] h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95"
            type="submit"
          >
            SUBMIT
          </button>
        </form>
      </div>

      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-5 p-3">
          Mavjud yangiliklar
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
