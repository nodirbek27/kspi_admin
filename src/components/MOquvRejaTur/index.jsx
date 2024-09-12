import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import MyTextInput from "../MyTextInput";
import APIMOquvRejaTur from "../../services/mOquvRejaTur";

function MagistrOquvRejaTurCom() {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [datas, setDatas] = useState([]);

  const fechtData = async () => {
    try {
      const response = await APIMOquvRejaTur.get();
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
    }, // Initial values for formik
    onSubmit: async (values, onSubmitProps) => {
      const data = new FormData();
      for (let key in values) {
        data.append(key, values[key]);
      }
      try {
        // POST
        if (!edit) {
          await APIMOquvRejaTur.post(data);
        }
        // PATCH
        else {
          await APIMOquvRejaTur.patch(id, data);
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
        name_uz: data.name_uz,
        name_ru: data.name_ru,
        name_en: data.name_en,
      });
    }
    fechtData();
  };

  const handleDelete = async (id) => {
    try {
      await APIMOquvRejaTur.del(id);
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
        Magistr kurs turlari
      </h1>
      <div>
        <div className="border p-5">
          <Formik>
            <form onSubmit={formik.handleSubmit}>
              <fieldset className="border px-5 mb-5">
                <legend className="text-red-500 font-medium">
                  Magistr kurs turlari
                </legend>
                <div className="grid grid-cols-3 gap-2 my-5">
                  <MyTextInput
                    type="text"
                    id="name_uz"
                    name="name_uz"
                    label="Nomi"
                    tab="uz"
                    value={formik.values.name_uz}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="name_ru"
                    name="name_ru"
                    label="Nomi"
                    tab="ru"
                    value={formik.values.name_ru}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="name_en"
                    name="name_en"
                    label="Nomi"
                    tab="eng"
                    value={formik.values.name_en}
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
              Magistr kurs turlari
            </h4>
            <div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Kurs nomi uz
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Kurs nomi ru
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Kurs nomi eng
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
                              {data.name_uz}
                            </th>
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {data.name_ru}
                            </th>
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {data.name_en}
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

export default MagistrOquvRejaTurCom;
