import React, { useState } from "react";
import { useMultiRootEditor } from "@ckeditor/ckeditor5-react";
import MultiRootEditor from "@ckeditor/ckeditor5-build-multi-root";
import APICallMarkaz from "../../services/callMarkaz";

const CallMarkazCom = () => {
  const [formData, setFormData] = useState({
    title_uz: "",
    title_ru: "",
    title_en: "",
    tel_nomer: "",
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

  const { editor, toolbarElement, editableElements, data } =
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
      tel_nomer: formData.tel_nomer,
      body_uz: data.contentUz,
      body_ru: data.contentRu,
      body_en: data.contentEn,
    };

    try {
      await APICallMarkaz.post(postData);
      alert("Data successfully posted!");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="App">
      <h1 className="text-2xl font-bold mb-5 p-3 text-center">Call markaz</h1>
      <h2 className="card-title mb-5">Ma'lumotlarni o'zbek tilida kiriting</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 mb-3">
          <input
            placeholder="Sarlavha Uz"
            type="text"
            id="title_uz"
            name="title_uz"
            value={formData.title_uz}
            onChange={handleChange}
            className="input input-bordered"
          />
          <input
            placeholder="Sarlavha Ru"
            type="text"
            id="title_ru"
            name="title_ru"
            value={formData.title_ru}
            onChange={handleChange}
            className="input input-bordered"
          />
          <input
            placeholder="Sarlavha En"
            type="text"
            id="title_en"
            name="title_en"
            value={formData.title_en}
            onChange={handleChange}
            className="input input-bordered"
          />
          <input
            placeholder="Telefon nomer"
            type="text"
            id="tel_nomer"
            name="tel_nomer"
            value={formData.tel_nomer}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        {toolbarElement}

        {editableElements}

        <button type="submit" className="btn btn-primary mt-5">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CallMarkazCom;
