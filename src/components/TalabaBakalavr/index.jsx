import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import APITalabaBakalavr from "../../services/talabaBakalavr";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import Loader from "../Loader";

const TalabaBakalavr = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItemId, setEditItemId] = useState(null);
  const [file, setFile] = useState(null);
  const rasm = useRef(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await APITalabaBakalavr.get();
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDelete = async (id) => {
    try {
      await APITalabaBakalavr.del(id);
      fetchItems();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const handleEdit = (item) => {
    setEditItemId(item.id);
    formik.setValues({
      title_uz: item.title_uz,
      title_ru: item.title_ru,
      title_en: item.title_en,
      body_uz: item.body_uz,
      body_ru: item.body_ru,
      body_en: item.body_en,
    });
  };

  const validationSchema = Yup.object({
    title_uz: Yup.string().required("Title uz is required"),
    title_ru: Yup.string().required("Title ru is required"),
    title_en: Yup.string().required("Title en is required"),
    body_uz: Yup.string().required("Body uz is required"),
    body_ru: Yup.string().required("Body ru is required"),
    body_en: Yup.string().required("Body en is required"),
  });

  const formik = useFormik({
    initialValues: {
      title_uz: "",
      title_ru: "",
      title_en: "",
      body_uz: "",
      body_ru: "",
      body_en: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("title_uz", values.title_uz);
        formData.append("title_ru", values.title_ru);
        formData.append("title_en", values.title_en);
        formData.append("body_uz", values.body_uz);
        formData.append("body_ru", values.body_ru);
        formData.append("body_en", values.body_en);
        if (file) {
          formData.append("rasm", file);
        }

        if (editItemId) {
          await APITalabaBakalavr.put(editItemId, formData);
        } else {
          await APITalabaBakalavr.post(formData);
        }
        fetchItems();
        resetForm();
        setEditItemId(null);
        setFile(null); // Clear the file input
      } catch (error) {
        console.error("Failed to submit form", error);
      }
    },
  });

  const isFormDisabled = items.length >= 1 && !editItemId;

  return (
    <div className="p-4">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-center my-5 p-3">
            Bakalavr
          </h2>

          <form onSubmit={formik.handleSubmit} className="mb-5">
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <label htmlFor="title_uz">
                  Sarlavha Uz
                  <input
                    id="title_uz"
                    name="title_uz"
                    type="text"
                    placeholder="Title uz"
                    className="input input-bordered w-full"
                    onChange={formik.handleChange}
                    disabled={isFormDisabled}
                    value={formik.values.title_uz}
                  />
                  {formik.touched.title_uz && formik.errors.title_uz ? (
                    <div className="text-red-600">{formik.errors.title_uz}</div>
                  ) : null}
                </label>
                <label htmlFor="title_ru">
                  Sarlavha Ru
                  <input
                    id="title_ru"
                    name="title_ru"
                    type="text"
                    placeholder="Title ru"
                    className="input input-bordered w-full"
                    onChange={formik.handleChange}
                    disabled={isFormDisabled}
                    value={formik.values.title_ru}
                  />
                  {formik.touched.title_ru && formik.errors.title_ru ? (
                    <div className="text-red-600">{formik.errors.title_ru}</div>
                  ) : null}
                </label>
                <label htmlFor="title_en">
                  Sarlavha En
                  <input
                    id="title_en"
                    name="title_en"
                    type="text"
                    placeholder="Title en"
                    className="input input-bordered w-full"
                    onChange={formik.handleChange}
                    disabled={isFormDisabled}
                    value={formik.values.title_en}
                  />
                  {formik.touched.title_en && formik.errors.title_en ? (
                    <div className="text-red-600">{formik.errors.title_en}</div>
                  ) : null}
                </label>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <label htmlFor="body_uz">
                  Ma'lumot Uz
                  <textarea
                    id="body_uz"
                    name="body_uz"
                    placeholder="Body uz"
                    className="textarea textarea-bordered w-full"
                    onChange={formik.handleChange}
                    disabled={isFormDisabled}
                    value={formik.values.body_uz}
                  ></textarea>
                  {formik.touched.body_uz && formik.errors.body_uz ? (
                    <div className="text-red-600">{formik.errors.body_uz}</div>
                  ) : null}
                </label>
                <label htmlFor="body_ru">
                  Ma'lumot Ru
                  <textarea
                    id="body_ru"
                    name="body_ru"
                    placeholder="Body ru"
                    className="textarea textarea-bordered w-full"
                    onChange={formik.handleChange}
                    disabled={isFormDisabled}
                    value={formik.values.body_ru}
                  ></textarea>
                  {formik.touched.body_ru && formik.errors.body_ru ? (
                    <div className="text-red-600">{formik.errors.body_ru}</div>
                  ) : null}
                </label>
                <label htmlFor="body_en">
                  Ma'lumot En
                  <textarea
                    id="body_en"
                    name="body_en"
                    placeholder="Body en"
                    className="textarea textarea-bordered w-full"
                    onChange={formik.handleChange}
                    disabled={isFormDisabled}
                    value={formik.values.body_en}
                  ></textarea>
                  {formik.touched.body_en && formik.errors.body_en ? (
                    <div className="text-red-600">{formik.errors.body_en}</div>
                  ) : null}
                </label>
              </div>
            </div>
            <label className="w-[33%]" htmlFor="rasm">
              Rasm
              <input
                ref={rasm}
                onChange={handleChange}
                type="file"
                id="rasm"
                name="rasm"
                className={`${
                  !file && "file-input-error text-red-600"
                } w-full file-input file-input-bordered`}
              />
            </label>
            <button
              className="bg-blue-400 hover:bg-blue-600 flex justify-center items-center gap-1 w-[100%] h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95"
              type="submit"
            >
              {editItemId ? "UPDATE" : "SUBMIT"}
            </button>
          </form>

          <table className="table-auto w-full">
            <thead>
              <tr>
                <th></th>
                <th className="px-4 py-2">Uz</th>
                <th className="px-4 py-2">Ru</th>
                <th className="px-4 py-2">En</th>
                <th className="px-4 py-2">Rasm/Actions</th>
              </tr>
            </thead>
            {items.map((item) => (
              <tbody key={item.id}>
                <tr>
                  <th>Sarlavha</th>
                  <td className="border px-4 py-2">{item.title_uz}</td>
                  <td className="border px-4 py-2">{item.title_ru}</td>
                  <td className="border px-4 py-2">{item.title_en}</td>
                  <td className="border px-4 py-2 flex justify-center gap-2">
                    <img
                      src={item.rasm}
                      className="w-[100px] h-[60px] object-cover rounded"
                      alt="Abiturient bakalavr haqida"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Ma'lumot</th>
                  <td className="border px-4 py-2">{item.body_uz}</td>
                  <td className="border px-4 py-2">{item.body_ru}</td>
                  <td className="border px-4 py-2">{item.body_en}</td>
                  <td className="border px-4 py-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="btn btn-warning"
                    >
                      <RiEditLine />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-danger"
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default TalabaBakalavr;
