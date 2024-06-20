import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import MyTextInput from "../MyTextInput";
import MyTextarea from "../MyTextarea";
import APIinstitutKengashi from "../../services/institutKengashi";

function InstitutKengashiCom() {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [datas, setDatas] = useState([]);

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
      fish: "",
      telefon: "",
      email: "",
      kengash_vazifasi: "",
      kengash_haqida: "",
    }, // Initial values for formik
    onSubmit: async (values, onSubmitProps) => {
      const data = new FormData();
      for (let key in values) {
        data.append(key, values[key]);
      }
      try {
        // POST
        if (!edit) {
          await APIinstitutKengashi.postInstitutKengashi(data);
        }
        // PATCH
        else {
          await APIinstitutKengashi.patchInstitutKengashi(id, data);
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
        fish: data.fish,
        telefon: data.telefon,
        email: data.email,
        kengash_vazifasi: data.kengash_vazifasi,
        kengash_haqida: data.kengash_haqida,
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
                    id="fish"
                    name="fish"
                    label="F.I.SH"
                    tab="(Familiya, Ism, Sharif)"
                    value={formik.values.name_uz}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="telefon"
                    name="telefon"
                    label="Telefon"
                    tab="raqami"
                    value={formik.values.name_ru}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    tab="(Elektron pochta manzili)"
                    value={formik.values.name_en}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="grid gap-2 my-5">
                  <MyTextarea
                    type="text"
                    id="kengash_vazifasi"
                    name="kengash_vazifasi"
                    label="Kengash"
                    tab="vazifasi"
                    value={formik.values.kengash_vazifasi}
                    onChange={formik.handleChange}
                  />
                  <MyTextarea
                    type="text"
                    id="kengash_haqida"
                    name="kengash_haqida"
                    label="Kengash haqida"
                    tab="batafsil"
                    value={formik.values.kengash_haqida}
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
                          <h2>{data.fish}</h2>
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
                          <p>{data.kengash_vazifasi}</p>
                          <p>{data.kengash_haqida}</p>
                          <div className="text-right">
                            <button
                              type="submit"
                              className="px-3 py-0.5 mt-5 text-xs rounded-lg border border-red-500 bg-red-500 active:bg-white active:text-red-500 text-gray-800 font-semibold"
                              onClick={() => handleEdit(data.id)}
                            >
                              O'chirish
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-0.5 mt-5 text-xs rounded-lg border border-red-500 bg-red-500 active:bg-white active:text-red-500 text-gray-800 font-semibold"
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
