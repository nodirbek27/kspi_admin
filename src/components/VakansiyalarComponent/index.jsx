import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import { BsCash } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import Loader from "../Loader";
import APIVakansiya from "../../services/vakansiya";

const Vakansiya = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await APIVakansiya.get();
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await APIVakansiya.del(id);
      fetchItems();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const handleEdit = (item) => {
    setEditItemId(item.id);
    formik.setValues({
      lavozim_uz: item.lavozim_uz,
      lavozim_ru: item.lavozim_ru,
      lavozim_en: item.lavozim_en,
      bolim_uz: item.bolim_uz,
      bolim_ru: item.bolim_ru,
      bolim_en: item.bolim_en,
      sana: item.sana,
      stavka_uz: item.stavka_uz,
      stavka_ru: item.stavka_ru,
      stavka_en: item.stavka_en,
      oylik_uz: item.oylik_uz,
      oylik_ru: item.oylik_ru,
      oylik_en: item.oylik_en,
      malakaviy_talablar_uz: item.malakaviy_talablar_uz,
      malakaviy_talablar_ru: item.malakaviy_talablar_ru,
      malakaviy_talablar_en: item.malakaviy_talablar_en,
    });
  };

  const validationSchema = Yup.object({
    lavozim_uz: Yup.string().max(255).required("Majburiy"),
    lavozim_ru: Yup.string().max(255).required("Majburiy"),
    lavozim_en: Yup.string().max(255).required("Majburiy"),
    bolim_uz: Yup.string().max(255).required("Majburiy"),
    bolim_ru: Yup.string().max(255).required("Majburiy"),
    bolim_en: Yup.string().max(255).required("Majburiy"),
    sana: Yup.string().max(255).required("Majburiy"),
    stavka_uz: Yup.string().max(255).required("Majburiy"),
    stavka_ru: Yup.string().max(255).required("Majburiy"),
    stavka_en: Yup.string().max(255).required("Majburiy"),
    oylik_uz: Yup.string().max(255).required("Majburiy"),
    oylik_ru: Yup.string().max(255).required("Majburiy"),
    oylik_en: Yup.string().max(255).required("Majburiy"),
    malakaviy_talablar_uz: Yup.string().required("Majburiy"),
    malakaviy_talablar_ru: Yup.string().required("Majburiy"),
    malakaviy_talablar_en: Yup.string().required("Majburiy"),
  });

  const formik = useFormik({
    initialValues: {
      lavozim_uz: "",
      lavozim_ru: "",
      lavozim_en: "",
      bolim_uz: "",
      bolim_ru: "",
      bolim_en: "",
      sana: "",
      stavka_uz: "",
      stavka_ru: "",
      stavka_en: "",
      oylik_uz: "",
      oylik_ru: "",
      oylik_en: "",
      malakaviy_talablar_uz: "",
      malakaviy_talablar_ru: "",
      malakaviy_talablar_en: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (editItemId) {
          await APIVakansiya.put(editItemId, values);
        } else {
          await APIVakansiya.post(values);
        }
        fetchItems();
        formik.resetForm();
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
          <h2 className="text-2xl font-semibold text-center my-5 p-3">
            Vakansiyalar
          </h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <label htmlFor="lavozim_uz">
                Lavozim (Uz)
                <input
                  id="lavozim_uz"
                  name="lavozim_uz"
                  type="text"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.lavozim_uz}
                />
                {formik.touched.lavozim_uz && formik.errors.lavozim_uz ? (
                  <div className="text-red-600">{formik.errors.lavozim_uz}</div>
                ) : null}
              </label>

              <label htmlFor="lavozim_ru">
                Lavozim (Ru)
                <input
                  id="lavozim_ru"
                  name="lavozim_ru"
                  type="text"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.lavozim_ru}
                />
                {formik.touched.lavozim_ru && formik.errors.lavozim_ru ? (
                  <div className="text-red-600">{formik.errors.lavozim_ru}</div>
                ) : null}
              </label>

              <label htmlFor="lavozim_en">
                Lavozim (En)
                <input
                  id="lavozim_en"
                  name="lavozim_en"
                  type="text"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.lavozim_en}
                />
                {formik.touched.lavozim_en && formik.errors.lavozim_en ? (
                  <div className="text-red-600">{formik.errors.lavozim_en}</div>
                ) : null}
              </label>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <label htmlFor="bolim_uz">
                Bolim (Uz)
                <input
                  id="bolim_uz"
                  name="bolim_uz"
                  type="text"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.bolim_uz}
                />
                {formik.touched.bolim_uz && formik.errors.bolim_uz ? (
                  <div className="text-red-600">{formik.errors.bolim_uz}</div>
                ) : null}
              </label>

              <label htmlFor="bolim_ru">
                Bolim (Ru)
                <input
                  id="bolim_ru"
                  name="bolim_ru"
                  type="text"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.bolim_ru}
                />
                {formik.touched.bolim_ru && formik.errors.bolim_ru ? (
                  <div className="text-red-600">{formik.errors.bolim_ru}</div>
                ) : null}
              </label>

              <label htmlFor="bolim_en">
                Bolim (En)
                <input
                  id="bolim_en"
                  name="bolim_en"
                  type="text"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.bolim_en}
                />
                {formik.touched.bolim_en && formik.errors.bolim_en ? (
                  <div className="text-red-600">{formik.errors.bolim_en}</div>
                ) : null}
              </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <label htmlFor="sana">
                Sana
                <input
                  id="sana"
                  name="sana"
                  type="date"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.sana}
                />
                {formik.touched.sana && formik.errors.sana ? (
                  <div className="text-red-600">{formik.errors.sana}</div>
                ) : null}
              </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <label htmlFor="stavka_uz">
                Stavka (Uz)
                <input
                  id="stavka_uz"
                  name="stavka_uz"
                  type="text"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.stavka_uz}
                />
                {formik.touched.stavka_uz && formik.errors.stavka_uz ? (
                  <div className="text-red-600">{formik.errors.stavka_uz}</div>
                ) : null}
              </label>

              <label htmlFor="stavka_ru">
                Stavka (Ru)
                <input
                  id="stavka_ru"
                  name="stavka_ru"
                  type="text"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.stavka_ru}
                />
                {formik.touched.stavka_ru && formik.errors.stavka_ru ? (
                  <div className="text-red-600">{formik.errors.stavka_ru}</div>
                ) : null}
              </label>

              <label htmlFor="stavka_en">
                Stavka (En)
                <input
                  id="stavka_en"
                  name="stavka_en"
                  type="text"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.stavka_en}
                />
                {formik.touched.stavka_en && formik.errors.stavka_en ? (
                  <div className="text-red-600">{formik.errors.stavka_en}</div>
                ) : null}
              </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <label htmlFor="oylik_uz">
                Oylik (Uz)
                <input
                  id="oylik_uz"
                  name="oylik_uz"
                  type="text"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.oylik_uz}
                />
                {formik.touched.oylik_uz && formik.errors.oylik_uz ? (
                  <div className="text-red-600">{formik.errors.oylik_uz}</div>
                ) : null}
              </label>

              <label htmlFor="oylik_ru">
                Oylik (Ru)
                <input
                  id="oylik_ru"
                  name="oylik_ru"
                  type="text"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.oylik_ru}
                />
                {formik.touched.oylik_ru && formik.errors.oylik_ru ? (
                  <div className="text-red-600">{formik.errors.oylik_ru}</div>
                ) : null}
              </label>

              <label htmlFor="oylik_en">
                Oylik (En)
                <input
                  id="oylik_en"
                  name="oylik_en"
                  type="text"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.oylik_en}
                />
                {formik.touched.oylik_en && formik.errors.oylik_en ? (
                  <div className="text-red-600">{formik.errors.oylik_en}</div>
                ) : null}
              </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <label htmlFor="malakaviy_talablar_uz">
                Malakaviy Talablar (Uz)
                <input
                  id="malakaviy_talablar_uz"
                  name="malakaviy_talablar_uz"
                  type="text"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.malakaviy_talablar_uz}
                />
                {formik.touched.malakaviy_talablar_uz &&
                formik.errors.malakaviy_talablar_uz ? (
                  <div className="text-red-600">
                    {formik.errors.malakaviy_talablar_uz}
                  </div>
                ) : null}
              </label>

              <label htmlFor="malakaviy_talablar_ru">
                Malakaviy Talablar (Ru)
                <input
                  id="malakaviy_talablar_ru"
                  name="malakaviy_talablar_ru"
                  type="text"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.malakaviy_talablar_ru}
                />
                {formik.touched.malakaviy_talablar_ru &&
                formik.errors.malakaviy_talablar_ru ? (
                  <div className="text-red-600">
                    {formik.errors.malakaviy_talablar_ru}
                  </div>
                ) : null}
              </label>

              <label htmlFor="malakaviy_talablar_en">
                Malakaviy Talablar (En)
                <input
                  id="malakaviy_talablar_en"
                  name="malakaviy_talablar_en"
                  type="text"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  value={formik.values.malakaviy_talablar_en}
                />
                {formik.touched.malakaviy_talablar_en &&
                formik.errors.malakaviy_talablar_en ? (
                  <div className="text-red-600">
                    {formik.errors.malakaviy_talablar_en}
                  </div>
                ) : null}
              </label>
            </div>
            <button
              className="bg-blue-400 hover:bg-blue-600 flex justify-center items-center gap-1 w-[100%] h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95"
              type="submit"
            >
              {editItemId ? "UPDATE" : "SUBMIT"}
            </button>
          </form>

          <h2 className="text-2xl font-semibold text-center my-5 p-3">
            Mavjud vakansiyalar
          </h2>
          {items.map((item) => (
            <div className="border-2 p-2 rounded mb-5" key={item.id}>
              <div className="border-b-2 py-2">
                <h2 className="font-bold text-lg md:text-xl lg:text-2xl">
                  {item.lavozim_uz}
                </h2>
                <p className="text-blue-500 font-semibold">{item.bolim_uz}</p>
              </div>
              <div className="py-2">
                <p className="flex items-center">
                  <BsCash className="text-blue-500 mr-2" /> {item.oylik_uz}
                </p>
                <p className="flex items-center">
                  <MdAccessTime className="text-blue-500 mr-2" />
                  {item.stavka_uz}
                </p>
              </div>
              <div className="border-b-2 py-2">
                <h2 className="text-md md:text-lg lg:text-xl xl:text-2xl font-semibold">
                  Malakaviy talablar
                </h2>
                <p>{item.malakaviy_talablar_uz}</p>
              </div>
              <div className="py-2 flex justify-between items-center">
                <p className="font-bold text-base-300">{item.sana}</p>
                <div>
                  <button
                    onClick={() => handleEdit(item)}
                    className="btn btn-warning mr-3"
                  >
                    <RiEditLine />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-danger"
                  >
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vakansiya;
