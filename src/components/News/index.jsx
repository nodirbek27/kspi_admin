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

  const formik = useFormik({
    initialValues: {
      sarlavha: "",
      rasm: "",
      body: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const itemsPerPage = 12;
  const pagesVisited = pageNumber * itemsPerPage;

  useEffect(() => {
    const loadPost = async () => {
      try {
        await APIYangilik.get()
          .then((res) => {
            setNews(res.data);
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

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-5 p-3">Yangiliklar</h1>

      {/* POST */}
      <div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <div className="grid px-3 md:grid-cols-3 gap-3">
            {/* SARLAVHA-Uz */}
            <input
              id="sarlavha"
              name="sarlavha"
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xl col-span-2"
              onChange={formik.handleChange}
              value={formik.values.sarlavha}
            />
            {/* Image */}
            <input
              id="rasm"
              name="rasm"
              type="file"
              className="file-input file-input-bordered w-full max-w-xl col-span-1"
              onChange={formik.handleChange}
              value={formik.values.rasm}
            />
            {/* Body */}
          </div>
          <div className="px-3">
            <textarea
              id="body"
              name="body"
              className="textarea textarea-bordered w-full"
              placeholder="Bio"
              onChange={formik.handleChange}
              value={formik.values.body}
            ></textarea>
          </div>
          <button className="btn bg-gray-800 text-white" type="submit">
            Qo'shish
          </button>
        </form>
      </div>

      <div className="flex flex-col mt-20">
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
                          <Link to={`/yangiliklar/${item.id}`}>
                            <CiEdit className="text-green-600 cursor-pointer h-5 w-5 mr-2" />
                          </Link>
                          <RiDeleteBin5Line className="text-red-600 cursor-pointer h-5 w-5" />
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

        {/* EDIT */}
        <div>EDIT</div>
      </div>
    </div>
  );
};

export default News;
