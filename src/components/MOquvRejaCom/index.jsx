import React, { useEffect, useRef, useState } from "react";
import { Formik, useFormik } from "formik";
import MyTextInput from "../MyTextInput";
import MySelect from "../MySelect";
import APIMOquvReja from "../../services/mOquvReja";
import APIMOquvRejaTur from "../../services/mOquvRejaTur";

function MagistrOquvRejaCom() {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [datas, setDatas] = useState([]);
  const [dataTur, setDataTur] = useState([]);

  const fileInputRefs = {
    fayl: useRef(null),
  };

  const fechtData = async () => {
    try {
      const [responseTur, response] = await Promise.all([APIMOquvRejaTur.get(), APIMOquvReja.get()]) 
      setDataTur(responseTur.data);
      setDatas(response.data);
    } catch (error) {
      console.error("Xatolik yuz berdi!", error);
    }
  };
  
  // formik for requisite institute
  const formik = useFormik({
    initialValues: {
      name_uz: "",
      name_ru: "",
      name_en: "",
      sana: "",
      oquv_reja_turi_id: "",
      fayl: null,
    }, // Initial values for formik
    onSubmit: async (values, onSubmitProps) => {
      const data = new FormData();
      for (let key in values) {
        data.append(key, values[key]);
      }
      try {
        // POST
        if (!edit) {
          await APIMOquvReja.post(data);
        }
        // PATCH
        else {
          await APIMOquvReja.patch(id, data);
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
        name_uz: data.name_uz,
        name_ru: data.name_ru,
        name_en: data.name_en,
        oquv_reja_turi_id: data.oquv_reja_turi_id,
      });
    }
    fechtData();
  };

  const handleDelete = async (id) => {
    try {
      await APIMOquvReja.del(id);
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
        PDF fayl yuklash
      </h1>
      <div>
        <div className="border p-5">
          <Formik>
            <form onSubmit={formik.handleSubmit}>
              <fieldset className="border px-5 mb-5">
                <legend className="text-red-500 font-medium">
                  PDF fayl yuklash
                </legend>
                <div className="grid grid-cols-3 gap-2 my-5">
                  <MyTextInput
                    type="text"
                    id="name_uz"
                    name="name_uz"
                    label="PDF nomi"
                    tab="uz"
                    value={formik.values.name_uz}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="name_ru"
                    name="name_ru"
                    label="PDF nomi"
                    tab="ru"
                    value={formik.values.name_ru}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="name_en"
                    name="name_en"
                    label="PDF nomi"
                    tab="eng"
                    value={formik.values.name_en}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 my-5">
                  <MySelect
                    id="oquv_reja_turi_id"
                    name="oquv_reja_turi_id"
                    label="Kurs turini"
                    tab="tanlang"
                    options={
                      dataTur &&
                      dataTur.map((item) => {
                        return { value: item.id, label: item.name_uz };
                      })
                    }
                    value={formik.values.rahbar_fish}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="date"
                    id="sana"
                    name="sana"
                    label="PDF yuklsh"
                    tab="sanasi"
                    value={formik.values.sana}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="file"
                    id="fayl"
                    name="fayl"
                    label="PDF"
                    tab="yuklash"
                    innerRef={fileInputRefs.fayl}
                    onChange={(event) =>
                      formik.setFieldValue("fayl", event.currentTarget.files[0])
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
              Yuklangan fayllar
            </h4>
            <div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Kurs turi
                      </th>
                      <th scope="col" className="px-6 py-3">
                        PDF fayl nomi
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Yuklangan sanasi
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        Rekvizitni taxrirlash
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas &&
                      datas.map((data) => {
                        return (
                          <tr
                            key={data.id}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {dataTur && dataTur.map((item) => {
                                if(data.oquv_reja_turi_id === item.id){
                                    return item.name_uz
                                }
                                return null
                              })}
                            </th>
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {data.name_uz}
                            </th>
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {data.sana}
                            </th>
                            <td className="px-6 py-2 text-right">
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
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MagistrOquvRejaCom;
