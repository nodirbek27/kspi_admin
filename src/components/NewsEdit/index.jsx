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

  const formik = useFormik({
    initialValues: {
      title: newsData.title || "",
      rasm: "",
      body: newsData.body || "",
    },
    onSubmit: async (values) => {
      try {
        const rasm = document.getElementById("rasm").files[0];
        const data = new FormData();
        data.append("rasm", rasm);
        data.append("title", values.title);
        data.append("body", values.body);
        await APIYangilik.put(id, data);
        console.log("Yangilik muvaffaqiyatli tahrirlandi");
        navigate("/yangiliklar");
      } catch (error) {
        console.error("Error editing news:", error);
      }
    },
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-5 p-3">
        Yangilikni tahrirlash
      </h1>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <div className="grid px-3 md:grid-cols-3 gap-3">
          {/* TITLE-Uz */}
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xl col-span-2"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          {/* Image */}
          <input
            id="rasm"
            name="rasm"
            type="file"
            className="file-input file-input-bordered w-full max-w-xl col-span-1"
            onChange={formik.handleChange}
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
          Saqlash
        </button>
      </form>
    </div>
  );
};

export default NewsEdit;
