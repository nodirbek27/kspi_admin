import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import APIAbiturientBakalavr from "../../services/abiturientBakalavr";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import Loader from "../Loader";

const AbiturientBakalavr = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await APIAbiturientBakalavr.get();
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await APIAbiturientBakalavr.del(id);
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

  const formik = useFormik({
    initialValues: {
      title_uz: "",
      title_ru: "",
      title_en: "",
      body_uz: "",
      body_ru: "",
      body_en: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editItemId) {
          await APIAbiturientBakalavr.put(editItemId, values);
        } else {
          await APIAbiturientBakalavr.post(values);
        }
        fetchItems();
        resetForm();
        setEditItemId(null);
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
          <h2 className="text-2xl font-semibold text-center my-5 p-3">Bakalavr</h2>

          <form onSubmit={formik.handleSubmit} className="mb-5">
            <div className="grid grid-cols-1 gap-4 mb-4">
              <input
                id="title_uz"
                name="title_uz"
                type="text"
                placeholder="Title uz"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.title_uz}
              />
              <input
                id="title_ru"
                name="title_ru"
                type="text"
                placeholder="Title ru"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.title_ru}
              />
              <input
                id="title_en"
                name="title_en"
                type="text"
                placeholder="Title en"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.title_en}
              />
              <textarea
                id="body_uz"
                name="body_uz"
                placeholder="Body uz"
                className="textarea textarea-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.body_uz}
              ></textarea>
              <textarea
                id="body_ru"
                name="body_ru"
                placeholder="Body ru"
                className="textarea textarea-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.body_ru}
              ></textarea>
              <textarea
                id="body_en"
                name="body_en"
                placeholder="Body en"
                className="textarea textarea-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.body_en}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              {editItemId ? "Update" : "Submit"}
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
                  <th>Title</th>
                  <td className="border px-4 py-2">{item.title_uz}</td>
                  <td className="border px-4 py-2">{item.title_ru}</td>
                  <td className="border px-4 py-2">{item.title_en}</td>
                  <td className="border px-4 py-2 flex justify-center gap-2">
                    <img src={item.rasm} className="w-[100px] h-[60px] object-cover rounded" alt="Abiturient bakalavr haqida" />
                  </td>
                </tr>
                <tr>
                  <th>Body</th>
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

export default AbiturientBakalavr;
