import React, { useEffect, useRef, useState } from "react";
import { Formik, useFormik } from "formik";
import MyTextInput from "../MyTextInput";
import APIinstitutTuzilmasi from "../../services/institutTuzilmasi";

function InstitutTuzilmasiCom() {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [datas, setDatas] = useState([]);

  const fileInputRefs = {
    rasm_1: useRef(null),
    rasm_2: useRef(null),
    rasm_3: useRef(null),
    rasm_4: useRef(null),
    rasm_5: useRef(null),
    pdf_fayl: useRef(null),
  };

  const fechtData = async () => {
    try {
      const response = await APIinstitutTuzilmasi.getInstitutTuzilmasi();
      setDatas(response.data);
    } catch (error) {
      console.error("Xatolik yuz berdi!", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name_uz: "",
      name_ru: "",
      name_en: "",
      rasm_1: "",
      rasm_2: "",
      rasm_3: "",
      rasm_4: "",
      rasm_5: "",
      pdf_fayl: "",
    }, // Initial values for formik
    onSubmit: async (values, onSubmitProps) => {
      const data = new FormData();
      for (let key in values) {
        data.append(key, values[key]);
      }
      try {
        // POST
        if (!edit && datas.length === 0) {
          await APIinstitutTuzilmasi.postInstitutTuzilmasi(data);
        }
        // PATCH
        else {
          await APIinstitutTuzilmasi.patchInstitutTuzilmasi(id, data);
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
        name_uz: data.name_uz,
        name_ru: data.name_ru,
        name_en: data.name_en,
      });
    }
    fechtData();
  };

  const handleDelete = async (id) => {
    try {
      await APIinstitutTuzilmasi.delInstitutTuzilmasi(id);
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
        Institut tuzilmasi
      </h1>
      <div className="grid grid-cols-4">
        <div className="col-span-3 border p-5">
          <Formik>
            <form onSubmit={formik.handleSubmit}>
              <fieldset className="border px-5 mb-5">
                <legend className="text-red-500 font-medium">
                  Institut tuzilmasi
                </legend>
                <div className="grid grid-cols-3 gap-2 my-5">
                  <MyTextInput
                    type="text"
                    id="name_uz"
                    name="name_uz"
                    label="Sarlavha"
                    tab="uz"
                    value={formik.values.name_uz}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="name_ru"
                    name="name_ru"
                    label="Sarlavha"
                    tab="ru"
                    value={formik.values.name_ru}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="name_en"
                    name="name_en"
                    label="Sarlavha"
                    tab="eng"
                    value={formik.values.name_en}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="grid gap-5 my-5">
                  <MyTextInput
                    type="file"
                    id="rasm_1"
                    name="rasm_1"
                    label="Rasm"
                    tab="1"
                    innerRef={fileInputRefs.rasm_1}
                    onChange={(event) =>
                      formik.setFieldValue(
                        "rasm_1",
                        event.currentTarget.files[0]
                      )
                    }
                  />
                  <MyTextInput
                    type="file"
                    id="rasm_2"
                    name="rasm_2"
                    label="Rasm"
                    tab="2"
                    innerRef={fileInputRefs.rasm_2}
                    onChange={(event) =>
                      formik.setFieldValue(
                        "rasm_2",
                        event.currentTarget.files[0]
                      )
                    }
                  />
                  <MyTextInput
                    type="file"
                    id="rasm_3"
                    name="rasm_3"
                    label="Rasm"
                    tab="3"
                    innerRef={fileInputRefs.rasm_3}
                    onChange={(event) =>
                      formik.setFieldValue(
                        "rasm_3",
                        event.currentTarget.files[0]
                      )
                    }
                  />
                  <MyTextInput
                    type="file"
                    id="rasm_4"
                    name="rasm_4"
                    label="Rasm"
                    tab="4"
                    innerRef={fileInputRefs.rasm_4}
                    onChange={(event) =>
                      formik.setFieldValue(
                        "rasm_4",
                        event.currentTarget.files[0]
                      )
                    }
                  />
                  <MyTextInput
                    type="file"
                    id="rasm_5"
                    name="rasm_5"
                    label="Rasm"
                    tab="5"
                    innerRef={fileInputRefs.rasm_5}
                    onChange={(event) =>
                      formik.setFieldValue(
                        "rasm_5",
                        event.currentTarget.files[0]
                      )
                    }
                  />
                  <MyTextInput
                    type="file"
                    id="pdf_fayl"
                    name="pdf_fayl"
                    label="PDF"
                    tab="file"
                    innerRef={fileInputRefs.pdf_fayl}
                    onChange={(event) =>
                      formik.setFieldValue(
                        "pdf_fayl",
                        event.currentTarget.files[0]
                      )
                    }
                  />
                </div>
              </fieldset>
              <button type="submit" className="btn btn-success">
                {!edit ? "Yuborish" : "Saqlash"}
              </button>
            </form>
          </Formik>
        </div>
        <div className="col-span-1 border p-2">
          {datas &&
            datas.map((data) => {
              return (
                <div key={data.id}>
                  <h3 className="text-xl font-bold font-source text-center text-[#004269]">
                    {data.name_uz}
                  </h3>
                  <div>
                    <img
                      src={data.rasm_1}
                      alt=""
                      className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl opacity-75 mt-5"
                    />
                    <img
                      src={data.rasm_2}
                      alt=""
                      className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl opacity-75 mt-5"
                    />
                    <img
                      src={data.rasm_3}
                      alt=""
                      className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl opacity-75 mt-5"
                    />
                    <img
                      src={data.rasm_4}
                      alt=""
                      className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl opacity-75 mt-5"
                    />
                    <img
                      src={data.rasm_5}
                      alt=""
                      className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl opacity-75 mt-5"
                    />
                  </div>
                  <div className="text-center py-5">
                    <a
                      href={data.pdf_fayl}
                      className="text-blue-500 font-bold"
                      target="blank"
                      rel="noopener noreferrer"
                    >
                      PDF variantini yuklab oling
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="btn btn-accent"
                      onClick={() => handleEdit(data.id)}
                    >
                      Taxrirlash
                    </button>
                    <button
                      type="submit"
                      className="btn btn-error ml-5"
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

export default InstitutTuzilmasiCom;
