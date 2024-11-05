import React, { useEffect, useState } from "react";
import { useMultiRootEditor } from "@ckeditor/ckeditor5-react";
import MultiRootEditor from "@ckeditor/ckeditor5-build-multi-root";
import APIXalqaroHamkorlar from "../../services/xalqaroHamkorlar";

const ImagesContianer = ({ data }) => {
  const images = [
    data?.rasm_1,
    data?.rasm_2,
    data?.rasm_3,
    data?.rasm_4,
    data?.rasm_5,
  ].filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-5 gap-3">
      {images.map((img, index) => (
        <div key={index}>
          <img
            className="w-36 h-36 object-cover"
            src={img}
            alt={`imaga ${index}`}
          />
        </div>
      ))}
    </div>
  );
};

const XalqaroHamkorlar = () => {
  const [formData, setFormData] = useState({
    davlat_uz: "",
    davlat_ru: "",
    davlat_en: "",
    name_uz: "",
    name_ru: "",
    name_en: "",
    rasm_1: null,
    rasm_2: null,
    rasm_3: null,
    rasm_4: null,
    rasm_5: null,
  });
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const editorProps = {
    editor: MultiRootEditor,
    data: {
      body_uz: "Hamkorlar haqida batafsil <em>(uz)</em> ...",
      body_ru: "Hamkorlar haqida batafsil <em>(ru)</em> ...",
      body_en: "Hamkorlar haqida batafsil <em>(en)</em> ...",
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
    const { name, value, files } = e.target;
    if (e.target.type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Update only the file data
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
    formDataToSend.append("davlat_uz", formData.davlat_uz);
    formDataToSend.append("davlat_ru", formData.davlat_ru);
    formDataToSend.append("davlat_en", formData.davlat_en);
    formDataToSend.append("name_uz", formData.name_uz);
    formDataToSend.append("name_ru", formData.name_ru);
    formDataToSend.append("name_en", formData.name_en);
    formDataToSend.append("body_uz", data.body_uz);
    formDataToSend.append("body_ru", data.body_ru);
    formDataToSend.append("body_en", data.body_en);
    formDataToSend.append("rasm_1", formData.rasm_1);
    formDataToSend.append("rasm_2", formData.rasm_2);
    formDataToSend.append("rasm_3", formData.rasm_3);
    formDataToSend.append("rasm_4", formData.rasm_4);
    formDataToSend.append("rasm_5", formData.rasm_5);
    // if (formData.rasm) {
    //   formDataToSend.append("rasm", formData.rasm);
    // }

    try {
      // POST
      await APIXalqaroHamkorlar.post(formDataToSend);
      alert("Data successfully posted!");
      getData();
      setFormData({
        davlat_uz: "",
        davlat_ru: "",
        davlat_en: "",
        name_uz: "",
        name_ru: "",
        name_en: "",
        body_uz: "",
        body_ru: "",
        body_en: "",
        rasm_1: null,
        rasm_2: null,
        rasm_3: null,
        rasm_4: null,
        rasm_5: null,
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await APIXalqaroHamkorlar.get();
      setContent(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await APIXalqaroHamkorlar.del(id);
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
        Xalqaro hamkorlar
      </h1>

      <form onSubmit={handleSubmit} id="form">
        <div className="grid grid-cols-3 gap-2 my-5">
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="davlat_uz"
          >
            <h3>
              Mamlakat nomi <span className="text-red-500">uz</span>
            </h3>
            <input
              type="text"
              id="davlat_uz"
              name="davlat_uz"
              value={formData.davlat_uz}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="davlat_ru"
          >
            <h3>
              Mamlakat nomi <span className="text-red-500">ru</span>
            </h3>
            <input
              type="text"
              id="davlat_ru"
              name="davlat_ru"
              value={formData.davlat_ru}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="davlat_en"
          >
            <h3>
              Mamlakat nomi <span className="text-red-500">en</span>
            </h3>
            <input
              type="text"
              id="davlat_en"
              name="davlat_en"
              value={formData.davlat_en}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
        </div>
        <div className="grid grid-cols-3 gap-2 my-5">
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="name_uz"
          >
            <h3>
              Muassasa nomi <span className="text-red-500">uz</span>
            </h3>
            <input
              type="text"
              id="name_uz"
              name="name_uz"
              value={formData.name_uz}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="name_ru"
          >
            <h3>
              Muassasa nomi <span className="text-red-500">ru</span>
            </h3>
            <input
              type="text"
              id="name_ru"
              name="name_ru"
              value={formData.name_ru}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="name_en"
          >
            <h3>
              Muassasa nomi <span className="text-red-500">en</span>
            </h3>
            <input
              type="text"
              id="name_en"
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
        </div>
        <div className="grid grid-cols-5 gap-2 my-5">
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="rasm_1"
          >
            <h3>
              Rasm <span className="text-red-500">(1)</span>
            </h3>
            <input
              type="file"
              id="rasm_1"
              name="rasm_1"
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="rasm_2"
          >
            <h3>
              Rasm <span className="text-red-500">(2)</span>
            </h3>
            <input
              type="file"
              id="rasm_2"
              name="rasm_2"
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="rasm_3"
          >
            <h3>
              Rasm <span className="text-red-500">(3)</span>
            </h3>
            <input
              type="file"
              id="rasm_3"
              name="rasm_3"
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="rasm_4"
          >
            <h3>
              Rasm <span className="text-red-500">(4)</span>
            </h3>
            <input
              type="file"
              id="rasm_4"
              name="rasm_4"
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="rasm_5"
          >
            <h3>
              Rasm <span className="text-red-500">(5)</span>
            </h3>
            <input
              type="file"
              id="rasm_5"
              name="rasm_5"
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
        </div>

        {toolbarElement}
        {editableElements}

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
              <p className="text-base inline-block text-slate-500 mr-5">
                <span className="text-red-500 font-semibold">
                  Mamlakat nomi:{" "}
                </span>
                {data.davlat_uz}
              </p>
              <p className="text-base inline-block text-slate-500 mr-5">
                <span className="text-red-500 font-semibold">
                  Muassasa nomi:{" "}
                </span>
                {data.name_uz}
              </p>
            </div>
            <div className="collapse-content">
              <div className="my-5">
                <ImagesContianer data={data} />
              </div>
              <div className="grid gap-5">
                <p className="text-red-500 font-semibold text-center">
                  Hamkor haqida batafsil
                </p>
                <p dangerouslySetInnerHTML={{ __html: data.body_uz }}></p>
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

export default XalqaroHamkorlar;
