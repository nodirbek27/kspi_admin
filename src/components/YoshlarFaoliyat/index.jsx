import React, { useEffect, useState } from "react";
import { useMultiRootEditor } from "@ckeditor/ckeditor5-react";
import MultiRootEditor from "@ckeditor/ckeditor5-build-multi-root";
import APIYoshlar from "../../services/faoliyatYoshlar";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./style.css";

const YoshlarFaoliyat = () => {
  const [formData, setFormData] = useState({
    title_uz: "",
    title_ru: "",
    title_en: "",
    tel_nomer_1: "",
  });
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      body_uz: data.contentUz,
      body_ru: data.contentRu,
      body_en: data.contentEn,
    };

    try {
      await APIYoshlar.post(postData);
      alert("Data successfully posted!");
      getData();
      setFormData({
        title_uz: "",
        title_ru: "",
        title_en: "",
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await APIYoshlar.get();
      setContent(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await APIYoshlar.del(id);
      getData();
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-5 p-3 text-center">
        Yoshlar bilan ishlash, ma'naviy va marifiy yo'nalishdagi ishlar
      </h1>

      <form
        onSubmit={handleSubmit}
        id="form"
        className={`${content.length >= 1 ? "hidden" : ""}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
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

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading content: {error.message}</p>
      ) : (
        content?.map((item) => (
          <div key={item.id} className="content-items">
            <div className="mb-5">
              <h2 className="text-xl">{item.title_uz}</h2>
              <p
                className="mb-5 content-item"
                dangerouslySetInnerHTML={{ __html: item.body_uz }}
              ></p>
            </div>
            <div className="mb-5">
              <h2 className="text-xl">{item.title_ru}</h2>
              <p
                className="mb-5 content-item"
                dangerouslySetInnerHTML={{ __html: item.body_ru }}
              ></p>
            </div>
            <div className="mb-5">
              <h2 className="text-xl">{item.title_en}</h2>
              <p
                className="mb-5 content-item"
                dangerouslySetInnerHTML={{ __html: item.body_en }}
              ></p>
            </div>
            <div className="flex justify-end">
              <button className="btn" onClick={() => handleDelete(item.id)}>
                <RiDeleteBin5Line className="text-red-600 cursor-pointer h-5 w-5" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default YoshlarFaoliyat;
