import React, { useEffect, useState } from "react";
import { useMultiRootEditor } from "@ckeditor/ckeditor5-react";
import MultiRootEditor from "@ckeditor/ckeditor5-build-multi-root";
import APICallMarkaz from "../../services/callMarkaz";
import { RiDeleteBin5Line } from "react-icons/ri";

const CallMarkazCom = () => {
  const [formData, setFormData] = useState({
    title_uz: "",
    title_ru: "",
    title_en: "",
    tel_nomer_1: "",
    tel_nomer_2: "",
    tel_nomer_3: "",
    tel_nomer_4: "",
    tel_nomer_5: "",
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
        "blockQuote",
        "|",
        "numberedList",
        "bulletedList",
      ],
    },
  };

  const { editor, toolbarElement, editableElements, data } = useMultiRootEditor(editorProps);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title_uz: formData.title_uz,
      title_ru: formData.title_ru,
      title_en: formData.title_en,
      tel_nomer_1: formData.tel_nomer_1,
      tel_nomer_2: formData.tel_nomer_2,
      tel_nomer_3: formData.tel_nomer_3,
      tel_nomer_4: formData.tel_nomer_4,
      tel_nomer_5: formData.tel_nomer_5,
      body_uz: data.contentUz,
      body_ru: data.contentRu,
      body_en: data.contentEn,
    };

    try {
      await APICallMarkaz.post(postData);
      alert("Data successfully posted!");
      getData();
      setFormData({
        title_uz: "",
        title_ru: "",
        title_en: "",
        tel_nomer_1: "",
        tel_nomer_2: "",
        tel_nomer_3: "",
        tel_nomer_4: "",
        tel_nomer_5: "",
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  // Get
  const getData = async () => {
    setLoading(true);
    try {
      const res = await APICallMarkaz.get();
      setContent(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await APICallMarkaz.del(id);
      getData();
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h1 className="text-2xl font-bold mb-5 p-3 text-center">Call markaz</h1>

      <form onSubmit={handleSubmit} id="form">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          <textarea
            placeholder="Sarlavha Uz"
            id="title_uz"
            name="title_uz"
            value={formData.title_uz}
            onChange={handleChange}
            className="input input-bordered"
            required
          ></textarea>
          <textarea
            placeholder="Sarlavha Ru"
            id="title_ru"
            name="title_ru"
            value={formData.title_ru}
            onChange={handleChange}
            className="input input-bordered"
            required
          ></textarea>
          <textarea
            placeholder="Sarlavha En"
            id="title_en"
            name="title_en"
            value={formData.title_en}
            onChange={handleChange}
            className="input input-bordered"
            required
          ></textarea>
          <textarea
            placeholder="Telefon nomer"
            id="tel_nomer_1"
            name="tel_nomer_1"
            value={formData.tel_nomer_1}
            onChange={handleChange}
            className="input input-bordered"
            required
          ></textarea>
          <textarea
            placeholder="Telefon nomer"
            id="tel_nomer_2"
            name="tel_nomer_2"
            value={formData.tel_nomer_2}
            onChange={handleChange}
            className="input input-bordered"
            required
          ></textarea>
          <textarea
            placeholder="Telefon nomer"
            id="tel_nomer_3"
            name="tel_nomer_3"
            value={formData.tel_nomer_3}
            onChange={handleChange}
            className="input input-bordered"
            required
          ></textarea>
          <textarea
            placeholder="Telefon nomer"
            id="tel_nomer_4"
            name="tel_nomer_4"
            value={formData.tel_nomer_4}
            onChange={handleChange}
            className="input input-bordered"
            required
          ></textarea>
          <textarea
            placeholder="Telefon nomer"
            id="tel_nomer_5"
            name="tel_nomer_5"
            value={formData.tel_nomer_5}
            onChange={handleChange}
            className="input input-bordered"
            required
          ></textarea>
        </div>

        {toolbarElement}
        {editableElements}

        <button type="submit" className="btn btn-primary mt-5">
          Submit
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading content: {error.message}</p>
      ) : (
        content.map((item) => (
          <div key={item.id} className="content-item">
            <h2>{item.title_uz}</h2>
            <p dangerouslySetInnerHTML={{ __html: item.body_uz }}></p>
            <h2>{item.title_ru}</h2>
            <p dangerouslySetInnerHTML={{ __html: item.body_ru }}></p>
            <h2>{item.title_en}</h2>
            <p dangerouslySetInnerHTML={{ __html: item.body_en }}></p>
            <button className="btn" onClick={() => handleDelete(item.id)}>
              <RiDeleteBin5Line className="text-red-600 cursor-pointer h-5 w-5" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CallMarkazCom;
