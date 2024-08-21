import React, { useEffect, useState } from "react";
import { useMultiRootEditor } from "@ckeditor/ckeditor5-react";
import MultiRootEditor from "@ckeditor/ckeditor5-build-multi-root";
import APIinstitutKengashi from "../../services/institutKengashi";

const InstitutKengashiCom = () => {
  const [formData, setFormData] = useState({
    fish_uz: "",
    fish_ru: "",
    fish_en: "",
    telefon: "",
    email: "",
    rasm: null,
  });
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const editorProps = {
    editor: MultiRootEditor,
    data: {
      kengash_vazifasi_uz: "Kengash vazifasi <em>(uz)</em> ...",
      kengash_vazifasi_ru: "Kengash vazifasi <em>(ru)</em> ...",
      kengash_vazifasi_en: "Kengash vazifasi <em>(en)</em> ...",
      kengash_haqida_uz: "Kengash haqida <em>(uz)</em> ...",
      kengash_haqida_ru: "Kengash haqida <em>(ru)</em> ...",
      kengash_haqida_en: "Kengash haqida <em>(en)</em> ...",
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
        rasm: files[0], // Update only the file data
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
    formDataToSend.append("fish_uz", formData.fish_uz);
    formDataToSend.append("fish_ru", formData.fish_ru);
    formDataToSend.append("fish_en", formData.fish_en);
    formDataToSend.append("telefon", formData.telefon);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("kengash_vazifasi_uz", data.kengash_vazifasi_uz);
    formDataToSend.append("kengash_vazifasi_ru", data.kengash_vazifasi_ru);
    formDataToSend.append("kengash_vazifasi_en", data.kengash_vazifasi_en);
    formDataToSend.append("kengash_haqida_uz", data.kengash_haqida_uz);
    formDataToSend.append("kengash_haqida_ru", data.kengash_haqida_ru);
    formDataToSend.append("kengash_haqida_en", data.kengash_haqida_en);
    if (formData.rasm) {
      formDataToSend.append("rasm", formData.rasm);
    }

    try {
      // POST
      await APIinstitutKengashi.postInstitutKengashi(formDataToSend);
      alert("Data successfully posted!");
      getData();
      setFormData({
        fish_uz: "",
        fish_ru: "",
        fish_en: "",
        telefon: "",
        email: "",
        rasm: null,
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await APIinstitutKengashi.getInstitutKengashi();
      setContent(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await APIinstitutKengashi.delInstitutKengashi(id);
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
        Institut kengashi
      </h1>

      <form
        onSubmit={handleSubmit}
        id="form"
      >
        <div className="grid grid-cols-3 gap-2 my-5">
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="fish_uz"
          >
            <h3>
              F.I.SH <span className="text-red-500">uz</span>
            </h3>
            <input
              type="text"
              id="fish_uz"
              name="fish_uz"
              value={formData.fish_uz}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="fish_ru"
          >
            <h3>
              F.I.SH <span className="text-red-500">ru</span>
            </h3>
            <input
              type="text"
              id="fish_ru"
              name="fish_ru"
              value={formData.fish_ru}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="fish_en"
          >
            <h3>
              F.I.SH <span className="text-red-500">en</span>
            </h3>
            <input
              type="text"
              id="fish_en"
              name="fish_en"
              value={formData.fish_en}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
        </div>
        <div className="grid grid-cols-3 gap-2 my-5">
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="telefon"
          >
            <h3>Telefon <span className="text-red-500">raqami</span></h3>
            <input
              type="text"
              id="telefon"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="email"
          >
            <h3>Email <span className="text-red-500">(Elektron pochta manzili)</span></h3>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300"
              required
            />
          </label>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="rasm"
          >
            <h3>Rasm <span className="text-red-500">(Kotib)</span></h3>
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
              <h2>
                <span className="text-red-500 font-semibold">F.I.SH: </span>
                {data.fish_uz}
              </h2>
              <div className="mt-5">
                <p className="text-base inline-block text-slate-500 mr-5">
                  <span className="text-red-500 font-semibold">Telefon: </span>
                  {data.telefon}
                </p>
                <p className="text-base inline-block text-slate-500">
                  <span className="text-red-500 font-semibold">Email: </span>
                  {data.email}
                </p>
              </div>
            </div>
            <div className="collapse-content">
              <div className="grid gap-5">
                <p className="text-red-500 font-semibold text-center">
                  Kengash vazifalari
                </p>
                <p
                  dangerouslySetInnerHTML={{ __html: data.kengash_vazifasi_uz }}
                ></p>
                <p className="text-red-500 font-semibold text-center">
                  Kengash haqida batafsil
                </p>
                <p
                  dangerouslySetInnerHTML={{ __html: data.kengash_haqida_uz }}
                ></p>
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

export default InstitutKengashiCom;