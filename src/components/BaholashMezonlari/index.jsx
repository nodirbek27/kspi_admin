import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import APIBaholashMezonlari from "../../services/baholashMezonlari";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import Loader from "../Loader";

const BaholashMezonlari = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItemId, setEditItemId] = useState(null);
  const [file, setFile] = useState(null);
  const fayl = useRef(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await APIBaholashMezonlari.get();
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
      await APIBaholashMezonlari.del(id);
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
    });
  };

  const validationSchema = Yup.object({
    title_uz: Yup.string().required("Title uz is required"),
    title_ru: Yup.string().required("Title ru is required"),
    title_en: Yup.string().required("Title en is required"),
  });

  const formik = useFormik({
    initialValues: {
      title_uz: "",
      title_ru: "",
      title_en: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("title_uz", values.title_uz);
        formData.append("title_ru", values.title_ru);
        formData.append("title_en", values.title_en);
        if (file) {
          formData.append("fayl", file);
        }

        if (editItemId) {
          await APIBaholashMezonlari.put(editItemId, formData);
        } else {
          await APIBaholashMezonlari.post(formData);
        }
        fetchItems();
        resetForm();
        setEditItemId(null);
        setFile(null);
      } catch (error) {
        console.error("Failed to submit form", error);
      }
    },
  });

  return (
    <div className="p-4">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="text-2xl font-medium my-5 p-3">
            Baholash mezonlari
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
                    value={formik.values.title_en}
                  />
                  {formik.touched.title_en && formik.errors.title_en ? (
                    <div className="text-red-600">{formik.errors.title_en}</div>
                  ) : null}
                </label>
              </div>
            </div>
            <label className="w-[33%]" htmlFor="fayl">
              Fayl
              <input
                ref={fayl}
                onChange={handleChange}
                type="file"
                id="fayl"
                name="fayl"
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
                <th className="px-4 py-2">Fayl</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            {items.map((item) => (
              <tbody key={item.id}>
                <tr>
                  <th>Sarlavha</th>
                  <td className="border px-4 py-2">{item.title_uz}</td>
                  <td className="border px-4 py-2">{item.title_ru}</td>
                  <td className="border px-4 py-2">{item.title_en}</td>
                  <td className="border px-4 py-2">
                    <a
                      href={item.fayl}
                      className="text-blue-400 underline"
                      target="blank"
                    >
                      Faylni ko'rish
                    </a>
                  </td>
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

export default BaholashMezonlari;
