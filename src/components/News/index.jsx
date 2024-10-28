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
    sana: "",
    xalqaro: false,
  });

  const [files, setFiles] = useState({
    rasm_1: null,
    rasm_2: null,
    rasm_3: null,
    rasm_4: null,
    rasm_5: null,
    fayl_1: null,
    fayl_2: null,
    fayl_3: null,
    fayl_4: null,
    fayl_5: null,
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

  const { toolbarElement, editableElements, data } = useMultiRootEditor(editorProps);

  const handleChange = (e) => {
    const { name, value, type, checked, files: inputFiles } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (inputFiles) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [name]: inputFiles[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append("title_uz", formData.title_uz);
    postData.append("title_ru", formData.title_ru);
    postData.append("title_en", formData.title_en);
    postData.append("subtitle_uz", formData.subtitle_uz);
    postData.append("subtitle_ru", formData.subtitle_ru);
    postData.append("subtitle_en", formData.subtitle_en);
    postData.append("sana", formData.sana);
    postData.append("xalqaro", formData.xalqaro);
    postData.append("body_uz", data.contentUz);
    postData.append("body_ru", data.contentRu);
    postData.append("body_en", data.contentEn);

    Object.keys(files).forEach((key) => {
      if (files[key]) {
        postData.append(key, files[key]);
      }
    });

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
        xalqaro: false,
        sana: "",
      });
      setFiles({
        rasm_1: null,
        rasm_2: null,
        rasm_3: null,
        rasm_4: null,
        rasm_5: null,
        fayl_1: null,
        fayl_2: null,
        fayl_3: null,
        fayl_4: null,
        fayl_5: null,
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await APIYangilik.get();
      const sortedData = res.data.sort((a, b) => new Date(b.sana) - new Date(a.sana));
      setContent(sortedData);
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
          {/* Qo'shimcha sarlavha */}
          <label className="w-full" htmlFor="subtitle_uz">
            <h3>Qo'shimcha sarlavha Uz</h3>
            <textarea
              id="subtitle_uz"
              name="subtitle_uz"
              value={formData.subtitle_uz}
              onChange={handleChange}
              className="input input-bordered w-full px-2"
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
            ></textarea>
          </label>

          {/* Rasm */}
          <label className="w-full" htmlFor="rasm_1">
            Asosiy rasm
            <input
              onChange={handleChange}
              type="file"
              id="rasm_1"
              name="rasm_1"
              className="w-full file-input file-input-bordered"
              required
            />
          </label>
          <label className="w-full" htmlFor="rasm_2">
            Rasm 2
            <input
              onChange={handleChange}
              type="file"
              id="rasm_2"
              name="rasm_2"
              className="w-full file-input file-input-bordered"
            />
          </label>
          <label className="w-full" htmlFor="rasm_3">
            Rasm 3
            <input
              onChange={handleChange}
              type="file"
              id="rasm_3"
              name="rasm_3"
              className="w-full file-input file-input-bordered"
            />
          </label>
          <label className="w-full" htmlFor="rasm_4">
            Rasm 4
            <input
              onChange={handleChange}
              type="file"
              id="rasm_4"
              name="rasm_4"
              className="w-full file-input file-input-bordered"
            />
          </label>
          <label className="w-full" htmlFor="rasm_5">
            Rasm 5
            <input
              onChange={handleChange}
              type="file"
              id="rasm_5"
              name="rasm_5"
              className="w-full file-input file-input-bordered"
            />
          </label>
          {/* Fayl */}
          <label className="w-full" htmlFor="fayl_1">
            Asosiy fayl
            <input
              onChange={handleChange}
              type="file"
              id="fayl_1"
              name="fayl_1"
              className="w-full file-input file-input-bordered"
            />
          </label>
          <label className="w-full" htmlFor="fayl_2">
            Fayl 2
            <input
              onChange={handleChange}
              type="file"
              id="fayl_2"
              name="fayl_2"
              className="w-full file-input file-input-bordered"
            />
          </label>
          <label className="w-full" htmlFor="fayl_3">
            Fayl 3
            <input
              onChange={handleChange}
              type="file"
              id="fayl_3"
              name="fayl_3"
              className="w-full file-input file-input-bordered"
            />
          </label>
          <label className="w-full" htmlFor="fayl_4">
            Fayl 4
            <input
              onChange={handleChange}
              type="file"
              id="fayl_4"
              name="fayl_4"
              className="w-full file-input file-input-bordered"
            />
          </label>
          <label className="w-full" htmlFor="fayl_5">
            Fayl 5
            <input
              onChange={handleChange}
              type="file"
              id="fayl_5"
              name="fayl_5"
              className="w-full file-input file-input-bordered"
            />
          </label>

          {/* Sana */}
          <label className="w-full" htmlFor="sana">
            Sana
            <input
              onChange={handleChange}
              type="date"
              id="sana"
              name="sana"
              value={formData.sana}
              className="input input-bordered w-full"
              required
            />
          </label>
        </div>

        {toolbarElement}
        {editableElements}

        <div className="max-w-xs">
          <label className="cursor-pointer label flex items-center gap-3">
            <input
              type="checkbox"
              className="checkbox checkbox-success"
              id="xalqaro"
              name="xalqaro"
              checked={formData.xalqaro}
              onChange={handleChange}
            />
            Xalqaro bo'limga tegishli yangilikmi?
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-full mt-3">
          SUBMIT
        </button>
      </form>

      <h2 className="my-5 text-lg lg:text-xl xl:text-2xl font-semibold">
        Mavjud yangiliklar
      </h2>
      <div className="mt-8">
        {loading && <p>Yuklanyapti...</p>}
        {error && <p>Xatolik yuz berdi: {error.message}</p>}
        <div className="grid grid-cols-2 gap-3">
          {content?.map((item) => (
            <div key={item.id} className="p-4 bg-gray-100 rounded-lg flex">
              <img
                src={item?.rasm_1}
                alt="news pic"
                className="mr-3 object-cover w-[100px] h-[100px] rounded"
              />
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h2 className="text-lg font-bold mb-2">{item?.title_uz}</h2>
                  <p className="mb-2">{item?.subtitle_uz}</p>
                </div>
                <div className="ml-auto">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-outline btn-danger"
                  >
                    <RiDeleteBin5Line className="inline-block" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
