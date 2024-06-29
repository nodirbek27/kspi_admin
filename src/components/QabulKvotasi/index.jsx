import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import APIKvota from "../../services/kvota";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import Loader from "../Loader";

const QabulKvotasi = () => {
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
      const response = await APIKvota.get();
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
      await APIKvota.del(id);
      fetchItems();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const handleEdit = (item) => {
    setEditItemId(item.id);
    formik.setValues({
      name_uz: item.name_uz,
      name_ru: item.name_ru,
      name_en: item.name_en,
    });
  };

  const validationSchema = Yup.object({
    name_uz: Yup.string().required("Title uz is required"),
    name_ru: Yup.string().required("Title ru is required"),
    name_en: Yup.string().required("Title en is required"),
  });

  const formik = useFormik({
    initialValues: {
      name_uz: "",
      name_ru: "",
      name_en: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("name_uz", values.name_uz);
        formData.append("name_ru", values.name_ru);
        formData.append("name_en", values.name_en);
        if (file) {
          formData.append("fayl", file);
        }

        if (editItemId) {
          await APIKvota.put(editItemId, formData);
        } else {
          await APIKvota.post(formData);
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
            Qabul kvotasi
          </h2>

          <form onSubmit={formik.handleSubmit} className="mb-5">
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <label htmlFor="name_uz">
                  Sarlavha Uz
                  <input
                    id="name_uz"
                    name="name_uz"
                    type="text"
                    placeholder="Title uz"
                    className="input input-bordered w-full"
                    onChange={formik.handleChange}
                    value={formik.values.name_uz}
                  />
                  {formik.touched.name_uz && formik.errors.name_uz ? (
                    <div className="text-red-600">{formik.errors.name_uz}</div>
                  ) : null}
                </label>
                <label htmlFor="name_ru">
                  Sarlavha Ru
                  <input
                    id="name_ru"
                    name="name_ru"
                    type="text"
                    placeholder="Title ru"
                    className="input input-bordered w-full"
                    onChange={formik.handleChange}
                    value={formik.values.name_ru}
                  />
                  {formik.touched.name_ru && formik.errors.name_ru ? (
                    <div className="text-red-600">{formik.errors.name_ru}</div>
                  ) : null}
                </label>
                <label htmlFor="name_en">
                  Sarlavha En
                  <input
                    id="name_en"
                    name="name_en"
                    type="text"
                    placeholder="Title en"
                    className="input input-bordered w-full"
                    onChange={formik.handleChange}
                    value={formik.values.name_en}
                  />
                  {formik.touched.name_en && formik.errors.name_en ? (
                    <div className="text-red-600">{formik.errors.name_en}</div>
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
                  <td className="border px-4 py-2">{item.name_uz}</td>
                  <td className="border px-4 py-2">{item.name_ru}</td>
                  <td className="border px-4 py-2">{item.name_en}</td>
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

export default QabulKvotasi;
