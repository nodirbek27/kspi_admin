import React, { useEffect, useRef, useState } from "react";
import { Formik, useFormik } from "formik";
import MyTextInput from "../MyTextInput";
import MyTextarea from "../MyTextarea";
import APIinstitutKengashi from "../../services/institutKengashi";

function InstitutKengashiCom() {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [datas, setDatas] = useState([]);

  const fileInputRefs = {
    rasm: useRef(null),
  };

  const fechtData = async () => {
    try {
      const response = await APIinstitutKengashi.getInstitutKengashi();
      setDatas(response.data);
    } catch (error) {
      console.error("Xatolik yuz berdi!", error);
    }
  };
  // formik for requisite institute
  const formik = useFormik({
    initialValues: {
      fish_uz: "",
      fish_ru: "",
      fish_en: "",
      telefon: "",
      email: "",
      kengash_vazifasi_uz: "",
      kengash_vazifasi_ru: "",
      kengash_vazifasi_en: "",
      kengash_haqida_uz: "",
      kengash_haqida_ru: "",
      kengash_haqida_en: "",
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
          await APIinstitutKengashi.postInstitutKengashi(data);
        }
        // PATCH
        else {
          await APIinstitutKengashi.patchInstitutKengashi(id, data);
          Object.values(fileInputRefs).forEach((ref) => {
            if (ref.current) {
              ref.current.value = "";
            }
          });
          setEdit(false);
          setId(null);
        }
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
        fish_uz: data.fish_uz,
        fish_ru: data.fish_ru,
        fish_en: data.fish_en,
        telefon: data.telefon,
        email: data.email,
        kengash_vazifasi_uz: data.kengash_vazifasi_uz,
        kengash_vazifasi_ru: data.kengash_vazifasi_ru,
        kengash_vazifasi_en: data.kengash_vazifasi_en,
        kengash_haqida_uz: data.kengash_haqida_uz,
        kengash_haqida_ru: data.kengash_haqida_ru,
        kengash_haqida_en: data.kengash_haqida_en,
      });
    }
    fechtData();
  };

  const handleDelete = async (id) => {
    try {
      await APIinstitutKengashi.delInstitutKengashi(id);
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
        Institut Kengashi
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
                    id="fish_uz"
                    name="fish_uz"
                    label="F.I.SH"
                    tab="uz"
                    value={formik.values.fish_uz}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="fish_ru"
                    name="fish_ru"
                    label="F.I.SH"
                    tab="ru"
                    value={formik.values.fish_ru}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="fish_en"
                    name="fish_en"
                    label="F.I.SH"
                    tab="eng"
                    value={formik.values.fish_en}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 my-5">
                  <MyTextInput
                    type="text"
                    id="telefon"
                    name="telefon"
                    label="Telefon"
                    tab="raqami"
                    value={formik.values.telefon}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    tab="(Elektron pochta manzili)"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="file"
                    id="rasm"
                    name="rasm"
                    label="Rasm"
                    tab="(Kotib)"
                    innerRef={fileInputRefs.rasm}
                    onChange={(event) =>
                      formik.setFieldValue("rasm", event.currentTarget.files[0])
                    }
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 my-5">
                  <MyTextarea
                    type="text"
                    id="kengash_vazifasi_uz"
                    name="kengash_vazifasi_uz"
                    label="Kengash vazifasi"
                    tab="uz"
                    value={formik.values.kengash_vazifasi_uz}
                    onChange={formik.handleChange}
                  />
                  <MyTextarea
                    type="text"
                    id="kengash_vazifasi_ru"
                    name="kengash_vazifasi_ru"
                    label="Kengash"
                    tab="ru"
                    value={formik.values.kengash_vazifasi_ru}
                    onChange={formik.handleChange}
                  />
                  <MyTextarea
                    type="text"
                    id="kengash_vazifasi_en"
                    name="kengash_vazifasi_en"
                    label="Kengash"
                    tab="eng"
                    value={formik.values.kengash_vazifasi_en}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 my-5">
                  <MyTextarea
                    type="text"
                    id="kengash_haqida_uz"
                    name="kengash_haqida_uz"
                    label="Kengash batafsil"
                    tab="uz"
                    value={formik.values.kengash_haqida_uz}
                    onChange={formik.handleChange}
                  />
                  <MyTextarea
                    type="text"
                    id="kengash_haqida_ru"
                    name="kengash_haqida_ru"
                    label="Kengash batafsil"
                    tab="ru"
                    value={formik.values.kengash_haqida_ru}
                    onChange={formik.handleChange}
                  />
                  <MyTextarea
                    type="text"
                    id="kengash_haqida_en"
                    name="kengash_haqida_en"
                    label="Kengash batafsil"
                    tab="eng"
                    value={formik.values.kengash_haqida_en}
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
              Institut Kengashi
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
                              F.I.SH:{" "}
                            </span>
                            {data.fish_uz}
                          </h2>
                          <div className="mt-5">
                            <p className="text-base inline-block text-slate-500 mr-5">
                              <span className="text-red-500 font-semibold">
                                Telefon:{" "}
                              </span>
                              {data.telefon}
                            </p>
                            <p className="text-base inline-block text-slate-500">
                              <span className="text-red-500 font-semibold">
                                Email:{" "}
                              </span>
                              {data.email}
                            </p>
                          </div>
                        </div>
                        <div className="collapse-content">
                          <div className="grid gap-5">
                            <p className="text-red-500 font-semibold text-center">
                              Kengash vazifalari
                            </p>
                            <p>{data.kengash_vazifasi_uz}</p>
                            <p className="text-red-500 font-semibold text-center">
                              Kengash haqida batafsil
                            </p>
                            <p>{data.kengash_haqida_uz}</p>
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

export default InstitutKengashiCom;
