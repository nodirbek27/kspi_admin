import React, { useEffect, useState } from "react";
import APIInstitutHaqida from "../../services/institutHaqida";
import { Formik, useFormik } from "formik";
import MyTextInput from "../MyTextInput";
import MyTextarea from "../MyTextarea";

const InstitutHaqidaCom = () => {
  const [datas, setDatas] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await APIInstitutHaqida.getInstitutHaqida();
      setDatas(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(datas);

  const formik = useFormik({
    initialValues: {
      title_uz: "",
      title_ru: "",
      title_en: "",
      body_uz: "",
      body_ru: "",
      body_en: "",
      rasm: null,
    },
    onSubmit: async (values, onSubmitProps) => {
      const data = new FormData();
      for (let key in values) {
        data.append(key, values[key]);
      }
      try {
        if (!edit && datas.length === 0) {
          await APIInstitutHaqida.postInstitutHaqida(data);
        } else {
          await APIInstitutHaqida.putInstitutHaqida(id, data);
          setEdit(false);
          setId(null);
        }
        onSubmitProps.resetForm();
        fetchData();
      } catch (error) {
        console.error("Xatolik sodir bo'ldi:", error);
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto">
      <h1 className="text-3xl font-medium text-gray-700 text-center my-5">
        Institut haqida
      </h1>
      <div className="grid grid-cols-4 h-screen">
        <Formik>
          <div className="col-span-3 border">
            <form
              onSubmit={formik.handleSubmit}
              className="max-w-full mx-auto p-5"
            >
              <fieldset className="border px-5 mb-5">
                <legend className="text-red-500 font-medium">Biz kimmiz</legend>
                <div className="my-5 grid grid-cols-3 gap-2">
                  <MyTextInput
                    type="text"
                    label="Sarlavha"
                    tab="uz"
                    id="biz_kimmiz_title_uz"
                    name="biz_kimmiz_title_uz"
                    onChange={formik.handleChange}
                    value={formik.values.biz_kimmiz_title_uz}
                  />
                  <MyTextInput
                    type="text"
                    label="Sarlavha"
                    tab="ru"
                    id="biz_kimmiz_title_ru"
                    name="biz_kimmiz_title_ru"
                    onChange={formik.handleChange}
                    value={formik.values.biz_kimmiz_title_ru}
                  />
                  <MyTextInput
                    type="text"
                    label="Sarlavha"
                    tab="en"
                    id="biz_kimmiz_title_en"
                    name="biz_kimmiz_title_en"
                    onChange={formik.handleChange}
                    value={formik.values.biz_kimmiz_title_en}
                  />
                </div>
                <div className="my-5 grid grid-cols-3 gap-2">
                  <MyTextarea
                    type="text"
                    label="Matn"
                    tab="uz"
                    id="biz_kimmiz_text_uz"
                    name="biz_kimmiz_text_uz"
                    onChange={formik.handleChange}
                    value={formik.values.biz_kimmiz_text_uz}
                  />
                  <MyTextarea
                    type="text"
                    label="Matn"
                    tab="ru"
                    id="biz_kimmiz_text_ru"
                    name="biz_kimmiz_text_ru"
                    onChange={formik.handleChange}
                    value={formik.values.biz_kimmiz_text_ru}
                  />
                  <MyTextarea
                    type="text"
                    label="Matn"
                    tab="en"
                    id="biz_kimmiz_text_en"
                    name="biz_kimmiz_text_en"
                    onChange={formik.handleChange}
                    value={formik.values.biz_kimmiz_text_en}
                  />
                </div>
                <div className="my-5">
                  <MyTextInput
                    type="file"
                    label="Rasm"
                    tab=""
                    id="biz_kimmiz"
                    name="biz_kimmiz"
                    onChange={(event) =>
                      formik.setFieldValue(
                        "biz_kimmiz",
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
          </div>
        </Formik>
        {datas &&
          datas.map((data) => {
            return (
              <div key={data.id} className="border overflow-auto relative">
                <div className="max-w-7xl mx-auto my-5">
                  <div>
                    <p className="text-xl font-bold font-source text-center text-red-500">
                      ←←←Asosiy saxifa uchun→→→
                    </p>
                    <h1 className="text-xl font-bold font-source text-center text-[#004269]">
                      {data.bizning_maqsadimiz_title_uz}
                    </h1>
                    <p className="text-xl font-light text-center my-10">
                      {data.bizning_maqsadimiz_text_uz}
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-bold font-source text-center text-red-500">
                      ←←←Institut haqida uchun→→→
                    </p>
                    <h1 className="text-xl font-bold font-source text-center text-[#004269]">
                      {data.biz_haqimizda_title_uz}
                    </h1>
                  </div>
                  <div className="px-2">
                    <p className="text-xl font-light text-center my-10">
                      {data.biz_haqimizda_text_uz}
                    </p>
                  </div>
                  <div className="px-4 xl:px-0 py-4">
                    <img
                      src={data.institut_rasm}
                      className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl opacity-75"
                      alt="Institut rasm"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold font-source text-center text-[#004269]">
                      {data.qoshimcha_title_uz}
                    </h1>
                    <div className="grid items-center grid-cols-1 px-6 my-20">
                      <div className="z-10 mx-6">
                        <img
                          src={data.biz_kimmiz}
                          className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl"
                          alt="Biz kimmiz"
                        />
                      </div>
                      <div className="bg-[#F1F5F9] p-10 -mt-6">
                        <h3 className="text-xl font-medium">
                          {data.biz_kimmiz_title_uz}
                        </h3>
                        <p className="text-md mt-3">
                          {data.biz_kimmiz_text_uz}
                        </p>
                      </div>
                    </div>
                    <div className="grid items-center grid-cols-1 px-6 my-20">
                      <div className="z-10 mx-6">
                        <img
                          src={data.qoshma_hamkorlar}
                          className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl"
                          alt="Qo'shma hamkorlar"
                        />
                      </div>
                      <div className="bg-[#F1F5F9] p-10 -mt-6">
                        <h3 className="text-xl font-medium">
                          {data.qoshma_hamkorlar_title_uz}
                        </h3>
                        <p className="text-md mt-3">
                          {data.qoshma_hamkorlar_text_uz}
                        </p>
                      </div>
                    </div>
                    <div className="grid items-center grid-cols-1 px-6">
                      <div className="z-10 mx-6">
                        <img
                          src={data.rivojlanayotgan_talabalar_hayoti}
                          className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl"
                          alt="Rivojlanayotgan talabalar hayoti"
                        />
                      </div>
                      <div className="bg-[#F1F5F9] p-10 -mt-6">
                        <h3 className="text-xl font-medium">
                          {data.rivojlanayotgan_talabalar_hayoti_title_uz}
                        </h3>
                        <p className="text-md mt-3">
                          {data.rivojlanayotgan_talabalar_hayoti_text_uz}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-5 max-w-[1910px] mx-auto">
                  <div className="max-w-7xl mx-auto">
                    <h1 className="text-xl font-bold font-source text-center text-[#ffffff]">
                      {data.kirish_title_uz}
                    </h1>
                    <div className="grid items-center grid-cols-1 px-6">
                      <div className="z-10 mx-6">
                        <img
                          src={data.barcha_shakillar}
                          className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl"
                          alt=""
                        />
                      </div>
                      <div className="bg-[#F1F5F9] p-10 -mt-6">
                        <h3 className="text-xl font-medium">
                          {data.barcha_shakillar_title_uz}
                        </h3>
                        <p className="text-md mt-3">
                          {data.barcha_shakillar_text_uz}
                        </p>
                      </div>
                    </div>
                    <div className="grid items-center grid-cols-1 px-6 py-20">
                      <div className="z-10 mx-6">
                        <img
                          src={data.moliyaviy_yordam}
                          className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl"
                          alt=""
                        />
                      </div>
                      <div className="bg-[#F1F5F9] p-10 -mt-6">
                        <h3 className="text-xl font-medium">
                          {data.moliyaviy_yordam_title_uz}
                        </h3>
                        <p className="text-md mt-3">
                          {data.moliyaviy_yordam_text_uz}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="max-w-7xl mx-auto">
                  <div className="grid items-center grid-cols-1 px-6">
                    <div className="z-10 mx-6">
                      <img
                        src={data.sport_bilan_birga}
                        className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl"
                        alt="Sport bilan birga"
                      />
                    </div>
                    <div className="bg-[#F1F5F9] p-10 -mt-6">
                      <h3 className="text-xl font-medium">
                        {data.sport_bilan_birga_title_uz}
                      </h3>
                      <p className="text-md mt-3">
                        {data.sport_bilan_birga_text_uz}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={() => handleEdit(data.id)}
                  className="btn btn-secondary z-50 sticky bottom-5 left-4"
                >
                  O'zgartirish
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default InstitutHaqidaCom;
