import React, { useEffect, useRef, useState } from "react";
import { Formik, useFormik } from "formik";
import MyTextInput from "../MyTextInput";
import MyTextarea from "../MyTextarea";
import APITTJRaxbar from "../../services/ttjRaxbar";

function TTJRaxbarCom() {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [datas, setDatas] = useState([]);

  const fileInputRefs = {
    rasm: useRef(null),
  };

  const fechtData = async () => {
    try {
      const response = await APITTJRaxbar.get();
      setDatas(response.data);
    } catch (error) {
      console.error("Xatolik yuz berdi!", error);
    }
  };
  // formik for requisite institute
  const formik = useFormik({
    initialValues: {
      title_uz: "",
      title_ru: "",
      title_en: "",
      body_uz: "",
      body_ru: "",
      body_en: "",
      rahbar_fish: "",
      rasm: null,
    }, // Initial values for formik
    onSubmit: async (values, onSubmitProps) => {
      const data = new FormData();
      for (let key in values) {
        data.append(key, values[key]);
      }
      try {
        // POST
        if (!edit && datas.length === 0) {
          await APITTJRaxbar.post(data);
        }
        // PATCH
        else {
          await APITTJRaxbar.patch(id, data);
          setEdit(false);
          setId(null);
        }
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
        rahbar_fish: data.rahbar_fish,
      });
    }
    fechtData();
  };

  const handleDelete = async (id) => {
    try {
      await APITTJRaxbar.del(id);
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
        TTJ Raxbar
      </h1>
      <div>
        <div className="border p-5">
          <Formik>
            <form onSubmit={formik.handleSubmit}>
              <fieldset className="border px-5 mb-5">
                <legend className="text-red-500 font-medium">
                  Institut Kengashi
                </legend>
                <div className="grid grid-cols-3 gap-2 my-5">
                  <MyTextInput
                    type="text"
                    id="title_uz"
                    name="title_uz"
                    label="Raxbar sarlavhasi"
                    tab="uz"
                    value={formik.values.title_uz}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="title_ru"
                    name="title_ru"
                    label="Raxbar sarlavhasi"
                    tab="ru"
                    value={formik.values.title_ru}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="title_en"
                    name="title_en"
                    label="Raxbar sarlavhasi"
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
                    label="Raxbar fikri"
                    tab="uz"
                    value={formik.values.body_uz}
                    onChange={formik.handleChange}
                  />
                  <MyTextarea
                    type="text"
                    id="body_ru"
                    name="body_ru"
                    label="Raxbar fikri"
                    tab="ru"
                    value={formik.values.body_ru}
                    onChange={formik.handleChange}
                  />
                  <MyTextarea
                    type="text"
                    id="body_en"
                    name="body_en"
                    label="Raxbar fikri"
                    tab="eng"
                    value={formik.values.body_en}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 my-5">
                  <MyTextInput
                    type="text"
                    id="rahbar_fish"
                    name="rahbar_fish"
                    label="F.I.Sh"
                    tab="Raxbar ismi"
                    value={formik.values.rahbar_fish}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="file"
                    id="rasm"
                    name="rasm"
                    label="Raxbar"
                    tab="rasmi"
                    innerRef={fileInputRefs.rasm}
                    onChange={(event) =>
                      formik.setFieldValue("rasm", event.currentTarget.files[0])
                    }
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
              TTJ Raxbar
            </h4>
            <div>
              <div className="grid gap-2">
                {datas &&
                  datas.map((data) => {
                    return (
                      <div
                        key={data.id}
                        className="collapse collapse-arrow bg-gray-50 shadow-md"
                      >
                        <input type="checkbox" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                          <h2>
                            <span className="text-red-500 font-semibold">
                              Title:{" "}
                            </span>
                            {data.title_uz}
                          </h2>
                          <div className="mt-5">
                            <p className="text-base inline-block text-slate-500 mr-5">
                              <span className="text-red-500 font-semibold">
                                F.I.SH:{" "}
                              </span>
                              {data.rahbar_fish}
                            </p>
                          </div>
                        </div>
                        <div className="collapse-content">
                          <div className="grid gap-5">
                            <p className="text-red-500 font-semibold text-center">
                              TTJ Raxbar fikri
                            </p>
                            <p>{data.body_uz}</p>
                          </div>
                          <div className="text-right">
                            <button
                              type="submit"
                              className="px-3 py-0.5 mt-5 text-xs rounded-lg border border-teal-500 bg-teal-500 active:bg-white active:text-red-500 text-gray-800 font-semibold"
                              onClick={() => handleEdit(data.id)}
                            >
                              Taxrirlash
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-0.5 mt-5 ml-5 text-xs rounded-lg border border-red-500 bg-red-500 active:bg-white active:text-red-500 text-gray-800 font-semibold"
                              onClick={() => handleDelete(data.id)}
                            >
                              O'chirish
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TTJRaxbarCom;
