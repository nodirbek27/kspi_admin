import React, { useEffect, useState, useRef } from "react";
import APIInstitutMalumotlari from "../../services/institutMalumotlari";
import { Formik, useFormik } from "formik";
import MyTextInput from "../MyTextInput";
import MyTextarea from "../MyTextarea";

const InstitutMalumotlariCom = () => {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [datas, setDatas] = useState([]);

  const fileInputRefs = {
    rasm: useRef(null),
    fayl: useRef(null)
  };

  const fechtData = async () => {
    try {
      const response = await APIInstitutMalumotlari.getInstitutMalumotlari();
      setDatas(response.data);
    } catch (error) {
      console.error("Xatolik yuz berdi!", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title_uz: "",
      title_ru: "",
      title_en: "",
      body_uz: "",
      body_ru: "",
      body_en: "",
      rasm: null,
      fayl: "",
    }, // Initial values for formik
    onSubmit: async (values, onSubmitProps) => {
      const data = new FormData();
      for (let key in values) {
        data.append(key, values[key]);
      }
      try {
        // POST
        if (!edit) {
          await APIInstitutMalumotlari.postInstitutMalumotlari(data);
        }
        // PATCH
        else {
          await APIInstitutMalumotlari.patchInstitutMalumotlari(id, data);
          console.log(data);
          setEdit(false);
          setId(null);
        }
        // Resets file input
        Object.values(fileInputRefs).forEach((ref) => {
          if (ref.current) {
            ref.current.value = "";
          }
        });
        onSubmitProps.resetForm();
        fechtData();
      } catch (error) {
        console.error("Xatolik sodir bo'ldi!", error);
        Object.values(fileInputRefs).forEach((ref) => {
          if (ref.current) {
            ref.current.value = "";
          }
        });
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
        title_uz: data.title_uz,
        title_ru: data.title_ru,
        title_en: data.title_en,
        body_uz: data.body_uz,
        body_ru: data.body_ru,
        body_en: data.body_en,
      });
    }
    fechtData();
  };

  const handleDelete = async (id) => {
    try {
      await APIInstitutMalumotlari.delInstitutMalumotlari(id);
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
      <h1 className="text-3xl font-medium text-gray-700 text-center my-5">
        Institut ma'lumotlari
      </h1>
      <div className="grid grid-cols-4">
        <div className="col-span-3 border p-5">
          <Formik>
            <form onSubmit={formik.handleSubmit}>
              <fieldset className="border px-5 pb-5 mb-5">
                <legend className="text-red-500 font-medium">
                  Biz haqimizda
                </legend>
                <div className="grid grid-cols-3 gap-2 my-5">
                  <MyTextInput
                    type="text"
                    id="title_uz"
                    name="title_uz"
                    label="Sarlavha"
                    tab="uz"
                    value={formik.values.title_uz}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="title_ru"
                    name="title_ru"
                    label="Sarlavha"
                    tab="ru"
                    value={formik.values.title_ru}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="title_en"
                    name="title_en"
                    label="Sarlavha"
                    tab="eng"
                    value={formik.values.title_en}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 my-5">
                  <MyTextarea
                    type="text"
                    id="body_uz"
                    name="body_uz"
                    label="Matn"
                    tab="uz"
                    value={formik.values.body_uz}
                    onChange={formik.handleChange}
                  />
                  <MyTextarea
                    type="text"
                    id="body_ru"
                    name="body_ru"
                    label="Matn"
                    tab="ru"
                    value={formik.values.body_ru}
                    onChange={formik.handleChange}
                  />
                  <MyTextarea
                    type="text"
                    id="body_en"
                    name="body_en"
                    label="Matn"
                    tab="eng"
                    value={formik.values.body_en}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="my-5">
                  <MyTextInput
                    type="file"
                    id="rasm"
                    name="rasm"
                    label="Rasm"
                    tab=""
                    innerRef={fileInputRefs.rasm}
                    onChange={(event) =>
                      formik.setFieldValue(
                        "rasm",
                        event.currentTarget.files[0]
                      )
                    }
                  />
                </div>
                <div className="my-5">
                  <MyTextInput
                    type="file"
                    id="fayl"
                    name="fayl"
                    label="PDF file"
                    tab=""
                    innerRef={fileInputRefs.fayl}
                    onChange={(event) =>
                      formik.setFieldValue(
                        "fayl",
                        event.currentTarget.files[0]
                      )
                    }
                  />
                </div>
              <button type="submit" className="btn btn-success w-full">
                {!edit ? "Yuborish" : "Saqlash"}
              </button>
              </fieldset>
            </form>
          </Formik>
        </div>
        <div className="col-span-1 border p-2">
          {datas &&
            datas.map((data) => {
              return (
                <div key={data.id} className="rounded-lg shadow-xl p-2">
                  <h3 className="text-xl font-bold font-source text-center text-[#004269]">
                    {data.title_uz}
                  </h3>
                  <p className="text-sm text-center">{data.body_uz}</p>
                  <div>
                    <img
                      src={data.rasm}
                      alt=""
                      className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl opacity-75 mt-5"
                    />
                  </div>
                  <div className="text-center py-2">
                    <a
                      href={data.fayl}
                      className="text-sm text-blue-500 font-medium"
                      target="blank"
                      rel="noopener noreferrer"
                    >
                      PDF variantini yuklab oling
                    </a>
                  </div>
                  <div className="flex justify-between py-2">
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
  );
}

export default InstitutMalumotlariCom;
