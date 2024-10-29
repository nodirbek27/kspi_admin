import React, { useEffect, useState } from "react";
import { useMultiRootEditor } from "@ckeditor/ckeditor5-react";
import MultiRootEditor from "@ckeditor/ckeditor5-build-multi-root";
import APIElon from "../../services/elon";

const ElonlarCom = () => {
  const [formData, setFormData] = useState({
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
    xalqaro: false, // Checkbox state
  });

  const [files, setFiles] = useState({
    rasm: null,
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
      detail_uz: "E'lon tafsilotlari <em>(uz)</em> ...",
      detail_ru: "E'lon tafsilotlari <em>(ru)</em> ...",
      detail_en: "E'lon tafsilotlari <em>(en)</em> ...",
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
    if (inputFiles) {
        setFiles((prevFiles) => ({
          ...prevFiles,
          [name]: inputFiles[0],
      }));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked, // Update checkbox state
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

    const formDataToSend = new FormData();
    formDataToSend.append("title_uz", formData.title_uz);
    formDataToSend.append("title_ru", formData.title_ru);
    formDataToSend.append("title_en", formData.title_en);
    formDataToSend.append("field_uz", formData.field_uz);
    formDataToSend.append("field_ru", formData.field_ru);
    formDataToSend.append("field_en", formData.field_en);
    formDataToSend.append("adress_uz", formData.adress_uz);
    formDataToSend.append("adress_ru", formData.adress_ru);
    formDataToSend.append("adress_en", formData.adress_en);
    formDataToSend.append("detail_uz", data.detail_uz);
    formDataToSend.append("detail_ru", data.detail_ru);
    formDataToSend.append("detail_en", data.detail_en);
    formDataToSend.append("boshlanish_vaqti", formData.boshlanish_vaqti);
    formDataToSend.append("tugash_vaqti", formData.tugash_vaqti);
    formDataToSend.append("sana", formData.sana);
    
    // Add checkbox value to formData
    formDataToSend.append("xalqaro", formData.xalqaro);

    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formDataToSend.append(key, files[key]);
      }
    });

    try {
      await APIElon.post(formDataToSend);
      alert("Data successfully posted!");
      getData();
      setFormData({
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
        xalqaro: false, // Reset checkbox state
      });
      setFiles({
        rasm: null,
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
      const res = await APIElon.get();
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
      await APIElon.del(id);
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
      <h1 className="text-2xl font-bold mb-5 p-3 text-center">E'lonlar</h1>

      <form onSubmit={handleSubmit} id="form">
        {/* Yo'nalish */}
        <div className="grid grid-cols-3 gap-2 my-5">
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="field_uz"
          >
            <h3>
              Yo'nalish <span className="text-red-500">uz</span>
            </h3>
            <input
              type="text"
              id="field_uz"
              name="field_uz"
              value={formData.field_uz}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="field_ru"
          >
            <h3>
              Yo'nalish <span className="text-red-500">ru</span>
            </h3>
            <input
              type="text"
              id="field_ru"
              name="field_ru"
              value={formData.field_ru}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="field_en"
          >
            <h3>
              Yo'nalish <span className="text-red-500">en</span>
            </h3>
            <input
              type="text"
              id="field_en"
              name="field_en"
              value={formData.field_en}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
        </div>

        {/* Sarlavha */}
        <div className="grid grid-cols-3 gap-2 my-5">
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="title_uz"
          >
            <h3>
              Sarlavha <span className="text-red-500">uz</span>
            </h3>
            <input
              type="text"
              id="title_uz"
              name="title_uz"
              value={formData.title_uz}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="title_ru"
          >
            <h3>
              Sarlavha <span className="text-red-500">ru</span>
            </h3>
            <input
              type="text"
              id="title_ru"
              name="title_ru"
              value={formData.title_ru}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="title_en"
          >
            <h3>
              Sarlavha <span className="text-red-500">en</span>
            </h3>
            <input
              type="text"
              id="title_en"
              name="title_en"
              value={formData.title_en}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
        </div>

        {/* E'lon vaqtlari */}
        <div className="grid grid-cols-3 gap-2 my-5">
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="boshlanish_vaqti"
          >
            <h3>
              E'lon boshlanish <span className="text-red-500">vaqti</span>
            </h3>
            <input
              type="datetime-local"
              id="boshlanish_vaqti"
              name="boshlanish_vaqti"
              value={formData.boshlanish_vaqti}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="tugash_vaqti"
          >
            <h3>
              E'lon tugash <span className="text-red-500">vaqti</span>
            </h3>
            <input
              type="datetime-local"
              id="tugash_vaqti"
              name="tugash_vaqti"
              value={formData.tugash_vaqti}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="sana"
          >
            <h3>
              E'lon yuklash <span className="text-red-500">vaqti</span>
            </h3>
            <input
              type="datetime-local"
              id="sana"
              name="sana"
              value={formData.sana}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
        </div>

        {/* Rasm */}
        <div className="grid gap-2 my-5">
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="rasm"
          >
            <h3>
              E'lon <span className="text-red-500">rasmi</span>
            </h3>
            <input
              type="file"
              id="rasm"
              name="rasm"
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
        </div>

        {/* Manzil */}
        <div className="grid grid-cols-3 gap-2 my-5">
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="adress_uz"
          >
            <h3>
              Manzil <span className="text-red-500">uz</span>
            </h3>
            <input
              type="text"
              id="adress_uz"
              name="adress_uz"
              value={formData.adress_uz}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="adress_ru"
          >
            <h3>
              Manzil <span className="text-red-500">ru</span>
            </h3>
            <input
              type="text"
              id="adress_ru"
              name="adress_ru"
              value={formData.adress_ru}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="adress_en"
          >
            <h3>
              Manzil <span className="text-red-500">en</span>
            </h3>
            <input
              type="text"
              id="adress_en"
              name="adress_en"
              value={formData.adress_en}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
        </div>

        {/* PDF fayl */}
        <div className="grid gap-2 my-5">
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="fayl_1"
          >
            <h3>
              Fayl yuklash <span className="text-red-500">(PDF)</span>
            </h3>
            <input
              type="file"
              id="fayl_1"
              name="fayl_1"
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
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

        <button
          type="submit"
          className="w-full bg-blue-400 hover:bg-blue-500 flex justify-center items-center gap-1 h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95 "
        >
          Saqlash
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading content: {error.message}</p>
      ) : (
        content?.map((data) => (
          <div
            key={data.id}
            className="collapse collapse-arrow bg-gray-50 shadow-md mt-5"
          >
            <input type="checkbox" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              <h2>
                <span className="text-red-500 font-semibold">Yonalish: </span>
                {data.field_uz}
              </h2>
              <div className="mt-5">
                <p className="text-base inline-block text-slate-500 mr-5">
                  <span className="text-red-500 font-semibold">Sarlavha: </span>
                  {data.title_uz}
                </p>
                <p className="text-base inline-block text-slate-500">
                  <span className="text-red-500 font-semibold">Manzil: </span>
                  {data.adress_uz}
                </p>
              </div>
            </div>
            <div className="collapse-content">
              <div className="grid gap-5">
                <p>
                  <span className="text-red-500 font-semibold">
                    E'lon tafsiloti:{" "}
                  </span>
                  <span
                    dangerouslySetInnerHTML={{ __html: data.detail_uz }}
                  ></span>
                </p>
                <p>
                  <span className="text-red-500 font-semibold text-center">
                    E'lon boshlanish vaqti:{" "}
                  </span>
                  {data.boshlanish_vaqti}
                </p>
                <p>
                  <span className="text-red-500 font-semibold text-center">
                    E'lon tugash vaqti:{" "}
                  </span>
                  {data.tugash_vaqti}
                </p>
                <p>
                  <span className="text-red-500 font-semibold text-center">
                    E'lon yuklash vaqti:{" "}
                  </span>
                  {data.sana}
                </p>
              </div>
              <div>
                <button
                  type="button" // Change to 'button'
                  className="w-full bg-red-400 hover:bg-red-500 flex justify-center items-center gap-1 h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95 "
                  onClick={() => handleDelete(data.id)}
                >
                  O'chirish
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ElonlarCom;
