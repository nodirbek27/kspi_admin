import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import MyTextInput from "../MyTextInput";
import APITTJStatistika from "../../services/ttjStatistika";

function TTJStatistikaCom() {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [datas, setDatas] = useState([]);

  const fechtData = async () => {
    try {
      const response = await APITTJStatistika.get();
      setDatas(response.data);
    } catch (error) {
      console.error("Xatolik yuz berdi!", error);
    }
  };
  // formik for requisite institute
  const formik = useFormik({
    initialValues: {
      talabalar: "",
      xonalar: "",
      binolar: "",
    }, // Initial values for formik
    onSubmit: async (values, onSubmitProps) => {
      const data = new FormData();
      for (let key in values) {
        data.append(key, values[key]);
      }
      try {
        // POST
        if (!edit && datas.length === 0) {
          await APITTJStatistika.post(data);
        }
        // PATCH
        else {
          await APITTJStatistika.patch(id, data);
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
        talabalar: data.talabalar,
        xonalar: data.xonalar,
        binolar: data.binolar,
      });
    }
    fechtData();
  };

  const handleDelete = async (id) => {
    try {
      await APITTJStatistika.del(id);
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
        TTJ Statistika
      </h1>
      <div>
        <div className="border p-5">
          <Formik>
            <form onSubmit={formik.handleSubmit}>
              <fieldset className="border px-5 mb-5">
                <legend className="text-red-500 font-medium">
                  TTJ Statistika
                </legend>
                <div className="grid grid-cols-3 gap-2 my-5">
                  <MyTextInput
                    type="text"
                    id="talabalar"
                    name="talabalar"
                    label="Talabalar"
                    tab="soni"
                    value={formik.values.talabalar}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="xonalar"
                    name="xonalar"
                    label="Xonalar"
                    tab="soni"
                    value={formik.values.xonalar}
                    onChange={formik.handleChange}
                  />
                  <MyTextInput
                    type="text"
                    id="binolar"
                    name="binolar"
                    label="Binolar"
                    tab="soni"
                    value={formik.values.binolar}
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
              TTJ Statistika
            </h4>
            <div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Talabalar
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Xonalar
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Binolar
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        Taxrirlash
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
                              {data.talabalar}
                            </th>
                            <td className="px-6 py-2">{data.xonalar}</td>
                            <td className="px-6 py-2">{data.binolar}</td>
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

export default TTJStatistikaCom;
