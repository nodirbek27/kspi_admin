import React, { useEffect, useState } from "react";
import { useMultiRootEditor } from "@ckeditor/ckeditor5-react";
import MultiRootEditor from "@ckeditor/ckeditor5-build-multi-root";
import APIYangilik from "../../services/yangilik";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./style.css";

const News = () => {
  const [formData, setFormData] = useState({
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
  });
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showImageInputs, setShowImageInputs] = useState([true, false, false, false, false]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title_uz: formData.title_uz,
      title_ru: formData.title_ru,
      title_en: formData.title_en,
      subtitle_uz: formData.subtitle_uz,
      subtitle_ru: formData.subtitle_ru,
      subtitle_en: formData.subtitle_en,
      sana: formData.sana,
      body_uz: data.contentUz,
      body_ru: data.contentRu,
      body_en: data.contentEn,
    };

    try {
      await APIYangilik.post(postData);
      alert("Data successfully posted!");
      getData();
      setFormData({
        title_uz: "",
        title_ru: "",
        title_en: "",
        subtitle_uz: "",
        subtitle_ru: "",
        subtitle_en: "",
        sana: "",
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await APIYangilik.get();
      setContent(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await APIYangilik.del(id);
      getData();
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  const handleImageInputChange = (index) => {
    setShowImageInputs((prev) =>
      prev.map((show, i) => (i <= index ? true : show))
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-5 p-3 text-center">Yangiliklar</h1>

      <form onSubmit={handleSubmit} id="form">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          <label className="w-full" htmlFor="title_uz">
            <h3>Sarlavha Uz</h3>
            <textarea
              id="title_uz"
              name="title_uz"
              value={formData.title_uz}
              onChange={handleChange}
              className="input input-bordered w-full px-2"
              required
            ></textarea>
          </label>
          <label className="w-full" htmlFor="title_ru">
            <h3>Sarlavha Ru</h3>
            <textarea
              id="title_ru"
              name="title_ru"
              value={formData.title_ru}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            ></textarea>
          </label>
          <label className="w-full" htmlFor="title_en">
            <h3>Sarlavha En</h3>
            <textarea
              id="title_en"
              name="title_en"
              value={formData.title_en}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            ></textarea>
          </label>
          <label className="w-full" htmlFor="subtitle_uz">
            <h3>Qo'shimcha sarlavha Uz</h3>
            <textarea
              id="subtitle_uz"
              name="subtitle_uz"
              value={formData.subtitle_uz}
              onChange={handleChange}
              className="input input-bordered w-full px-2"
              required
            ></textarea>
          </label>
          <label className="w-full" htmlFor="subtitle_ru">
            <h3>Qo'shimcha sarlavha Ru</h3>
            <textarea
              id="subtitle_ru"
              name="subtitle_ru"
              value={formData.subtitle_ru}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            ></textarea>
          </label>
          <label className="w-full" htmlFor="subtitle_en">
            <h3>Qo'shimcha sarlavha En</h3>
            <textarea
              id="subtitle_en"
              name="subtitle_en"
              value={formData.subtitle_en}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            ></textarea>
          </label>
              
          <label className="w-full" htmlFor="sana">
            <h3>Sana</h3>
            <input
              id="sana"
              type="date"
              name="sana"
              value={formData.sana}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </label>
        </div>

        {toolbarElement}
        {editableElements}

        <button
          type="submit"
          className="w-full bg-blue-400 hover:bg-blue-600 flex justify-center items-center gap-1 h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95 "
        >
          Submit
        </button>
      </form>

      <h2 className="text-lg lg:text-xl xl:text-2xl font-semibold my-5">Mavjud yangiliklar</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading content: {error.message}</p>
      ) : (
        content?.map((item) => (
          <div key={item.id} className="content-items">
            <div className="mb-5">
              <p
                className="mb-5 content-item"
                dangerouslySetInnerHTML={{ __html: item.body_uz }}
              ></p>
              <div className="flex justify-between items-center border p-2 rounded">
                <h2 className="text-xl">{item.title_uz}</h2>
                <div className="text-xl">{item.tel_nomer_1}</div>
              </div>
            </div>
            <div className="mb-5">
              <p
                className="mb-5 content-item"
                dangerouslySetInnerHTML={{ __html: item.body_ru }}
              ></p>
              <div className="flex justify-between items-center border p-2 rounded">
                <h2 className="text-xl">{item.title_ru}</h2>
                <div className="text-xl">{item.tel_nomer_1}</div>
              </div>
            </div>
            <div className="mb-5">
              <p
                className="mb-5 content-item"
                dangerouslySetInnerHTML={{ __html: item.body_en }}
              ></p>
              <div className="flex justify-between items-center border p-2 rounded">
                <h2 className="text-xl">{item.title_en}</h2>
                <div className="text-xl">{item.tel_nomer_1}</div>
              </div>
            </div>
            <button className="btn" onClick={() => handleDelete(item.id)}>
              <RiDeleteBin5Line className="text-red-600 cursor-pointer h-5 w-5" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default News;