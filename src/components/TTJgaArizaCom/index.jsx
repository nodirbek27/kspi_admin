import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import MyTextInput from "../MyTextInput";
import APITTJAriza from "../../services/ttjgaAriza";

function TTJgaArizaCom() {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [datas, setDatas] = useState([]);

  const fechtData = async () => {
    try {
      const response = await APITTJAriza.get();
      setDatas(response.data);
    } catch (error) {
      console.error("Xatolik yuz berdi!", error);
    }
  };
  // formik for requisite institute
  const formik = useFormik({
    initialValues: {
      link_1_title_uz: "",
      link_1_title_ru: "",
      link_1_title_en: "",
      link_1: "",
      link_2_title_uz: "",
      link_2_title_ru: "",
      link_2_title_en: "",
      link_2: "",
    }, // Initial values for formik
    onSubmit: async (values, onSubmitProps) => {
      const data = new FormData();
      for (let key in values) {
        data.append(key, values[key]);
      }
      try {
        // POST
        if (!edit && datas.length === 0) {
          await APITTJAriza.post(data);
        }
        // PATCH
        else {
          await APITTJAriza.patch(id, data);
          setEdit(false);
          setId(null);
        }
        onSubmitProps.resetForm();
        fechtData();
      } catch (error) {
        console.error("Xatolik sodir bo'ldi!", error);
        onSubmitProps.resetForm();
      }
    },
  });

  const handleEdit = (id) => {
    setEdit(true);
    setId(id);
    const data = datas.find((item) => item.id === id);
    if (data) {
      formik.setValues({
        link_1_title_uz: data.link_1_title_uz,
        link_1_title_ru: data.link_1_title_ru,
        link_1_title_en: data.link_1_title_en,
        link_1: data.link_1,
        link_2_title_uz: data.link_1_title_uz,
        link_2_title_ru: data.link_1_title_ru,
        link_2_title_en: data.link_1_title_en,
        link_2: data.link_2,
      });
    }
    fechtData();
  };

  const handleDelete = async (id) => {
    try {
      await APITTJAriza.del(id);
      fechtData();
    } catch (error) {
      console.error("Xatolik yuz berdi!", error);
    }
  };

  useEffect(() => {
    fechtData();
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto">
      <h1 className="text-xl font-medium text-gray-700 text-center my-5">
        TTJ Ariza
      </h1>
      <div>
        <div className="border p-5">
          <Formik>
            <form onSubmit={formik.handleSubmit}>
              <fieldset className="border px-5 mb-5">
                <legend className="text-red-500 font-medium">
                  TTJ Ariza
                </legend>
                <div className="grid grid-cols-3 gap-2 my-5">
                  <MyTextInput
                    type="text"
                    id="link_1_title_uz"
                    name="link_1_title_uz"
                    label="Birinchi link nomi"
                    tab="uz"
                    value={formik.values.link_1_title_uz}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="link_1_title_ru"
                    name="link_1_title_ru"
                    label="Birinchi link nomi"
                    tab="ru"
                    value={formik.values.link_1_title_ru}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="link_1_title_en"
                    name="link_1_title_en"
                    label="Birinchi link nomi"
                    tab="eng"
                    value={formik.values.link_1_title_en}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="gap-2 my-5">
                  <MyTextInput
                    type="text"
                    id="link_1"
                    name="link_1"
                    label="Birinchi link"
                    tab="(sayt linki)"
                    value={formik.values.link_1}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 my-5">
                  <MyTextInput
                    type="text"
                    id="link_2_title_uz"
                    name="link_2_title_uz"
                    label="Ikkinchi link nomi"
                    tab="uz"
                    value={formik.values.link_2_title_uz}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="link_2_title_ru"
                    name="link_2_title_ru"
                    label="Ikkinchi link nomi"
                    tab="ru"
                    value={formik.values.link_2_title_ru}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="link_2_title_en"
                    name="link_2_title_en"
                    label="Ikkinchi link nomi"
                    tab="eng"
                    value={formik.values.link_2_title_en}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="gap-2 my-5">
                  <MyTextInput
                    type="text"
                    id="link_2"
                    name="link_2"
                    label="Ikkinchi link"
                    tab="(sayt linki)"
                    value={formik.values.link_2}
                    onChange={formik.handleChange}
                  />
                </div>
              </fieldset>
              <button type="submit" className="btn btn-success w-full">
                {!edit ? "Yuborish" : "Saqlash"}
              </button>
            </form>
          </Formik>
        </div>
        <div className="col-span-1 border p-2">
          <div>
            <h4 className="text-md font-bold font-source text-center text-red-500">
              TTJ Ariza
            </h4>
            {datas &&
              datas.map((data) => {
                return (
                  <div key={data.id} className="px-5">
                    <div className="grid grid-cols-2 mt-5">
                      <div>
                        <h1 className="text-slate-600 font-bold">Birinchi link nomi</h1>
                        <p className="text-slate-500 font-medium">{data.link_1_title_uz}</p>
                      </div>
                      <div>
                        <h1 className="text-slate-600 font-bold">Birinchi link</h1>
                        <p className="text-blue-500 font-medium">{data.link_1}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 mt-5">
                      <div>
                        <h1 className="text-slate-600 font-bold">Birinchi link nomi</h1>
                        <p className="text-slate-500 font-medium">{data.link_2_title_uz}</p>
                      </div>
                      <div>
                        <h1 className="text-slate-600 font-bold">Birinchi link</h1>
                        <p className="text-blue-500 font-medium">{data.link_2}</p>
                      </div>
                    </div>
                    <div className="flex justify-end py-2 mt-5">
                      <button
                        type="submit"
                        className="px-3 py-0.5 text-xs rounded-lg border border-teal-500 bg-teal-500 active:bg-white active:text-teal-500 text-gray-800 font-semibold"
                        onClick={() => handleEdit(data.id)}
                      >
                        Taxrirlash
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-0.5 text-xs rounded-lg border border-red-500 bg-red-500 active:bg-white active:text-red-500 text-gray-800 font-semibold ml-2"
                        onClick={() => handleDelete(data.id)}
                      >
                        O'chirish
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TTJgaArizaCom;
