import React, { useEffect, useState, useCallback } from "react";
import { Formik, useFormik } from "formik";
import MyTextInput from "../MyTextInput";
import MySelect from "../MySelect";
import APIBFanDasturlariYonalish from "../../services/bFanDasturlariYonalish";
import APIBFanDasturlariTalimTur from "../../services/bFanDasturlariTalimTur";
import APIBFanDasturlariKurs from "../../services/bFanDasturlariKurs";

function BakalavrFanDasturlariYonalishCom() {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [datas, setDatas] = useState([]);
  const [dataTalimTur, setDataTalimTur] = useState([]);
  const [dataKurs, setDataKurs] = useState([]);
  
  const [selectedKurs, setselectedKurs] = useState("");
  const [yonalish, setYonalish] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const [resYonalish, resTalimTur, resKurs] = await Promise.all([
        APIBFanDasturlariYonalish.get(),
        APIBFanDasturlariTalimTur.get(),
        APIBFanDasturlariKurs.get(),
      ]);
      setDatas(resYonalish.data);
      setDataTalimTur(resTalimTur.data);
      setDataKurs(resKurs.data);
    } catch (error) {
      console.error("Xatolik yuz berdi!", error);
    }
  }, []);
  // formik for requisite institute
  const formik = useFormik({
    initialValues: {
      name_uz: "",
      name_ru: "",
      name_en: "",
      fan_dastur_talim_turi_id: "",
    }, // Initial values for formik
    onSubmit: async (values, onSubmitProps) => {
      const data = new FormData();
      for (let key in values) {
        data.append(key, values[key]);
      }
      try {
        // POST
        if (!edit) {
          await APIBFanDasturlariYonalish.post(data);
        }
        // PATCH
        else {
          await APIBFanDasturlariYonalish.patch(id, data);
          setEdit(false);
          setId(null);
        }
        onSubmitProps.resetForm();
        fetchData();
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
        fan_dastur_talim_turi_id: data.fan_dastur_talim_turi_id,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await APIBFanDasturlariYonalish.del(id);
      fetchData();
    } catch (error) {
      console.error("Xatolik yuz berdi!", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (selectedKurs) {
      const filteredTalimTur = dataTalimTur.filter(
        (item) => item.fan_dastur_kurs_id === parseInt(selectedKurs)
      );
      setYonalish(filteredTalimTur);
    }
  }, [selectedKurs, dataTalimTur]);

  const getKursName = (kursId) => {
    const kurs = dataKurs.find((k) => k.id === kursId);
    return kurs ? kurs.name_uz : "Noma'lum kurs"; // Kursni topib, name_uz ni qaytaramiz
  };
  
  const getTalimTurName = (talimTurId) => {
    const talimTur = dataTalimTur.find((k) => k.id === talimTurId);
    if (talimTur) {
      const kursName = getKursName(talimTur.fan_dastur_kurs_id); // Kurs nomini olamiz
      return `${kursName} - ${talimTur.name_uz}`; // Talim tur va kurs nomini birlashtirib qaytaramiz
    }
    return "Noma'lum ta'lim tur"; // Agar talim tur topilmasa
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <h1 className="text-xl font-medium text-gray-700 text-center my-5">
        Bakalavr yo'nalishlarni kiritish
      </h1>
      <div>
        <div className="border p-5">
          <Formik>
            <form onSubmit={formik.handleSubmit}>
              <fieldset className="border px-5 mb-5">
                <legend className="text-red-500 font-medium">
                  Bakalavr kurs turlari
                </legend>
                <div className="grid grid-cols-3 gap-2 my-5">
                  <MySelect
                    id="fan_dastur_kurs_id"
                    name="fan_dastur_kurs_id"
                    label="Kursni"
                    tab="tanlang"
                    options={
                      dataKurs &&
                      dataKurs.map((item) => {
                        return { value: item.id, label: item.name_uz };
                      })
                    }
                    value={selectedKurs}
                    onChange={(e) => setselectedKurs(e.target.value)}
                  />
                  <MySelect
                    id="fan_dastur_talim_turi_id"
                    name="fan_dastur_talim_turi_id"
                    label="Ta'lim turini"
                    tab="tanlang"
                    options={
                      yonalish &&
                      yonalish.map((item) => {
                        return { value: item.id, label: item.name_uz };
                      })
                    }
                    value={formik.values.fan_dastur_talim_turi_id}
                    onChange={formik.handleChange}
                  />
                </div>
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
              Bakalavr yo'nalishlari
            </h4>
            <div>
              <div className="max-h-96 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Kurs va tur nomi
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Yo'nalish nomi uz
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        Taxrirlash
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {datas &&
                      datas.map((data) => {
                        return (
                          <tr
                            key={data.id}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-red-500 whitespace-nowrap dark:text-white"
                            >
                              {getTalimTurName(data.fan_dastur_talim_turi_id)}
                            </th>
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {data.name_uz}
                            </th>
                            <td className="px-6 py-2 text-right">
                              <button
                                type="button"
                                className="px-3 py-0.5 text-xs rounded-lg border border-teal-500 bg-teal-500 active:bg-white active:text-teal-500 text-gray-800 font-semibold"
                                onClick={() => handleEdit(data.id)}
                              >
                                Taxrirlash
                              </button>
                              <button
                                type="button"
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

export default BakalavrFanDasturlariYonalishCom;
