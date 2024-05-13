import React, { useEffect, useState } from "react";
import APIInstitutHaqida from "../../services/institutHaqida";
import { Formik, useField, useFormik } from "formik";

// Component MyTextInput
const MyTextInput = ({label, tab, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name} className="block mb-2 font-medium text-gray-700">{label} <span className="text-red-500">{tab}</span></label>
      <input className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300" {...field} {...props} />
      {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
    </div>
  )
}

// Component MyTextarea 
const MyTextarea = ({label, tab, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name} className="block mb-2 font-medium text-gray-700">{label}<span className="text-red-500">{tab}</span></label>
      <textarea className="w-full block text-gray-700 outline-none bg-gray-50 border border-gray-300  p-3 rounded-lg focus:shadow-md focus:border-blue-300" {...field} {...props}></textarea>
      {meta.touched && meta.error ? (<div>{meta.error}</div>) : null}
    </div>
  )
}

function InstitutHaqidaCom() {
  const [datas, setDatas] = useState([]);
  const [yes, setYes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  console.log(isEdit);

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
      bizning_maqsadimiz_title_uz: "",
      bizning_maqsadimiz_title_ru: "",
      bizning_maqsadimiz_title_en: "",
      bizning_maqsadimiz_text_uz: "",
      bizning_maqsadimiz_text_ru: "",
      bizning_maqsadimiz_text_en: "",

      biz_haqimizda_title_uz: "",
      biz_haqimizda_title_ru: "",
      biz_haqimizda_title_en: "",
      biz_haqimizda_text_uz: "",
      biz_haqimizda_text_ru: "",
      biz_haqimizda_text_en: "",

      institut_rasm: null,

      qoshimcha_title_uz: "",
      qoshimcha_title_ru: "",
      qoshimcha_title_en: "",

      biz_kimmiz_title_uz: "",
      biz_kimmiz_title_ru: "",
      biz_kimmiz_title_en: "",
      biz_kimmiz_text_uz: "",
      biz_kimmiz_text_ru: "",
      biz_kimmiz_text_en: "",
      biz_kimmiz: null,

      qoshma_hamkorlar_title_uz: "",
      qoshma_hamkorlar_title_ru: "",
      qoshma_hamkorlar_title_en: "",
      qoshma_hamkorlar_text_uz: "",
      qoshma_hamkorlar_text_ru: "",
      qoshma_hamkorlar_text_en: "",
      qoshma_hamkorlar: null,

      rivojlanayotgan_talabalar_hayoti_title_uz: "",
      rivojlanayotgan_talabalar_hayoti_title_ru: "",
      rivojlanayotgan_talabalar_hayoti_title_en: "",
      rivojlanayotgan_talabalar_hayoti_text_uz: "",
      rivojlanayotgan_talabalar_hayoti_text_ru: "",
      rivojlanayotgan_talabalar_hayoti_text_en: "",
      rivojlanayotgan_talabalar_hayoti: null,

      kirish_title_uz: "",
      kirish_title_ru: "",
      kirish_title_en: "",

      barcha_shakillar_title_uz: "",
      barcha_shakillar_title_ru: "",
      barcha_shakillar_title_en: "",
      barcha_shakillar_text_uz: "",
      barcha_shakillar_text_ru: "",
      barcha_shakillar_text_en: "",
      barcha_shakillar: null,

      moliyaviy_yordam_title_uz: "",
      moliyaviy_yordam_title_ru: "",
      moliyaviy_yordam_title_en: "",
      moliyaviy_yordam_text_uz: "",
      moliyaviy_yordam_text_ru: "",
      moliyaviy_yordam_text_en: "",
      moliyaviy_yordam: null,

      sport_bilan_birga_title_uz: "",
      sport_bilan_birga_title_ru: "",
      sport_bilan_birga_title_en: "",
      sport_bilan_birga_text_uz: "",
      sport_bilan_birga_text_ru: "",
      sport_bilan_birga_text_en: "",
      sport_bilan_birga: null,
    },
    onSubmit: async (values, { resetForm }) => {
      if (isEdit) {
        console.log("Put");
      } else {
        console.log("Post");
      }
      const data = new FormData();
      for (let key in values) {
        data.append(key, values[key]);
      }
      try {
        const resPost = await APIInstitutHaqida.postInstitutHaqida(data);
        setYes(resPost);
        resetForm();
        fetchData();
      } catch (error) {
        console.error("Xatolik sodir bo'ldi:", error);
      }
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleSet = (item) => {
    setIsEdit(!isEdit);
    formik.setValues({
      bizning_maqsadimiz_title_uz: item.bizning_maqsadimiz_title_uz,
      bizning_maqsadimiz_title_ru: item.bizning_maqsadimiz_title_ru,
      bizning_maqsadimiz_title_en: item.bizning_maqsadimiz_title_en,
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <h1 className="text-3xl font-medium text-gray-700 text-center my-5">
        Institut haqida
      </h1>
      <div className="grid grid-cols-4">
        <Formik>
        <div className="col-span-3 border">
          <form
            onSubmit={formik.handleSubmit}
            className="max-w-full mx-auto p-5"
          >
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Asosiy sahifadagi institut haqida
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">             
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="bizning_maqsadimiz_title_uz" name="bizning_maqsadimiz_title_uz" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="bizning_maqsadimiz_title_ru" name="bizning_maqsadimiz_title_ru" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="bizning_maqsadimiz_title_en" name="bizning_maqsadimiz_title_en" onChange={formik.handleChange}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="bizning_maqsadimiz_text_uz" name="bizning_maqsadimiz_text_uz" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="bizning_maqsadimiz_text_ru" name="bizning_maqsadimiz_text_ru" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="en" id="bizning_maqsadimiz_text_en" name="bizning_maqsadimiz_text_en" onChange={formik.handleChange}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Institut haqida 1
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="biz_haqimizda_title_uz" name="biz_haqimizda_title_uz" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="biz_haqimizda_title_ru" name="biz_haqimizda_title_ru" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="biz_haqimizda_title_en" name="biz_haqimizda_title_en" onChange={formik.handleChange}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="biz_haqimizda_text_uz" name="biz_haqimizda_text_uz" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="biz_haqimizda_text_ru" name="biz_haqimizda_text_ru" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="en" id="biz_haqimizda_text_en" name="biz_haqimizda_text_en" onChange={formik.handleChange}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Institut rasmi
              </legend>
              <div className="my-5">
                <MyTextInput type="file" labe="Rasm" tab="" id="institut_rasm" name="institut_rasm" onChange={(event) => formik.setFieldValue("institut_rasm", event.currentTarget.files[0])}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">Sarlavha 2</legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="qoshimcha_title_uz" name="qoshimcha_title_uz" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="qoshimcha_title_ru" name="qoshimcha_title_ru" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="qoshimcha_title_en" name="qoshimcha_title_en" onChange={formik.handleChange}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">Biz kimmiz</legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="biz_kimmiz_title_uz" name="biz_kimmiz_title_uz" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="biz_kimmiz_title_ru" name="biz_kimmiz_title_ru" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="biz_kimmiz_title_en" name="biz_kimmiz_title_en" onChange={formik.handleChange}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="biz_kimmiz_text_uz" name="biz_kimmiz_text_uz" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="biz_kimmiz_text_ru" name="biz_kimmiz_text_ru" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="en" id="biz_kimmiz_text_en" name="biz_kimmiz_text_en" onChange={formik.handleChange}/>
              </div>
              <div className="my-5">
                <MyTextInput type="file" labe="Rasm" tab="" id="biz_kimmiz" name="biz_kimmiz" onChange={(event) => formik.setFieldValue("biz_kimmiz", event.currentTarget.files[0])}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Qo'shma hamkorlar
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="qoshma_hamkorlar_title_uz" name="qoshma_hamkorlar_title_uz" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="qoshma_hamkorlar_title_ru" name="qoshma_hamkorlar_title_ru" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="qoshma_hamkorlar_title_en" name="qoshma_hamkorlar_title_en" onChange={formik.handleChange}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="qoshma_hamkorlar_text_uz" name="qoshma_hamkorlar_text_uz" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="qoshma_hamkorlar_text_ru" name="qoshma_hamkorlar_text_ru" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="en" id="qoshma_hamkorlar_text_en" name="qoshma_hamkorlar_text_en" onChange={formik.handleChange}/>
              </div>
              <div className="my-5">
                <MyTextInput type="file" labe="Rasm" tab="" id="qoshma_hamkorlar" name="qoshma_hamkorlar" onChange={(event) => formik.setFieldValue("qoshma_hamkorlar", event.currentTarget.files[0])}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Rivojlanayotgan talabalik hayoti
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="rivojlanayotgan_talabalar_hayoti_title_uz" name="rivojlanayotgan_talabalar_hayoti_title_uz" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="rivojlanayotgan_talabalar_hayoti_title_ru" name="rivojlanayotgan_talabalar_hayoti_title_ru" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="rivojlanayotgan_talabalar_hayoti_title_en" name="rivojlanayotgan_talabalar_hayoti_title_en" onChange={formik.handleChange}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="rivojlanayotgan_talabalar_hayoti_text_uz" name="rivojlanayotgan_talabalar_hayoti_text_uz" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="rivojlanayotgan_talabalar_hayoti_text_ru" name="rivojlanayotgan_talabalar_hayoti_text_ru" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="en" id="rivojlanayotgan_talabalar_hayoti_text_en" name="rivojlanayotgan_talabalar_hayoti_text_en" onChange={formik.handleChange}/>
              </div>
              <div className="my-5">
                <MyTextInput type="file" labe="Rasm" tab="" id="rivojlanayotgan_talabalar_hayoti" name="rivojlanayotgan_talabalar_hayoti" onChange={(event) => formik.setFieldValue("rivojlanayotgan_talabalar_hayoti", event.currentTarget.files[0])}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Sarlavha 3 (Kirish)
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="kirish_title_uz" name="kirish_title_uz" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="kirish_title_ru" name="kirish_title_ru" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="kirish_title_en" name="kirish_title_en" onChange={formik.handleChange}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Uning barcha shakllarida xilma-xillikka chuqur hurmat
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="barcha_shakillar_title_uz" name="barcha_shakillar_title_uz" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="barcha_shakillar_title_ru" name="barcha_shakillar_title_ru" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="barcha_shakillar_title_en" name="barcha_shakillar_title_en" onChange={formik.handleChange}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="barcha_shakillar_text_uz" name="barcha_shakillar_text_uz" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="barcha_shakillar_text_ru" name="barcha_shakillar_text_ru" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="en" id="barcha_shakillar_text_en" name="barcha_shakillar_text_en" onChange={formik.handleChange}/>
              </div>
              <div className="my-5">
                <MyTextInput type="file" labe="Rasm" tab="" id="barcha_shakillar" name="barcha_shakillar" onChange={(event) => formik.setFieldValue("barcha_shakillar", event.currentTarget.files[0])}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Farq qiladigan moliyaviy yordam
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="moliyaviy_yordam_title_uz" name="moliyaviy_yordam_title_uz" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="moliyaviy_yordam_title_ru" name="moliyaviy_yordam_title_ru" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="moliyaviy_yordam_title_en" name="moliyaviy_yordam_title_en" onChange={formik.handleChange}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="moliyaviy_yordam_text_uz" name="moliyaviy_yordam_text_uz" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="moliyaviy_yordam_text_ru" name="moliyaviy_yordam_text_ru" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="en" id="moliyaviy_yordam_text_en" name="moliyaviy_yordam_text_en" onChange={formik.handleChange}/>
              </div>
              <div className="my-5">
                <MyTextInput type="file" labe="Rasm" tab="" id="moliyaviy_yordam" name="moliyaviy_yordam" onChange={(event) => formik.setFieldValue("moliyaviy_yordam", event.currentTarget.files[0])}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Sport bilan birga
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="sport_bilan_birga_title_uz" name="sport_bilan_birga_title_uz" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="sport_bilan_birga_title_ru" name="sport_bilan_birga_title_ru" onChange={formik.handleChange}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="sport_bilan_birga_title_en" name="sport_bilan_birga_title_en" onChange={formik.handleChange}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="sport_bilan_birga_text_uz" name="sport_bilan_birga_text_uz" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="sport_bilan_birga_text_ru" name="sport_bilan_birga_text_ru" onChange={formik.handleChange}/>
                <MyTextarea type="text" label="Matn" tab="en" id="sport_bilan_birga_text_en" name="sport_bilan_birga_text_en" onChange={formik.handleChange}/>
              </div>
              <div className="my-5">
                <MyTextInput type="file" labe="Rasm" tab="" id="sport_bilan_birga" name="sport_bilan_birga" onChange={(event) => formik.setFieldValue("sport_bilan_birga", event.currentTarget.files[0])}/>
              </div>
            </fieldset>
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Saqlash (put)" : "Jo'natish (post)"}
            </button>
          </form>
        </div>
        </Formik>
        <div onSubmit={formik.handleSubmit} className="border">
          <div className="max-w-7xl mx-auto my-5">
            <div>
              <p className="text-xl font-bold font-source text-center text-red-500">
                ←←←Asosiy saxifa uchun→→→
              </p>
              <h1 className="text-xl font-bold font-source text-center text-[#004269]">
                Bizning maqsadimiz
              </h1>
              <p className="text-xl font-light text-center my-10">
                Qo'qon davlat pedagogika instituti bundan qariyb 93 yil avval
                gumanitar ta'limni rivojlantirish maqsadida tashkil etilgan.
                Bizning vazifamiz zamonaviy pedagogikaning yangilanishi va
                rivojlanishiga hissa qo'shish, o'quvchilarda yetakchilik
                fazilatlarini shakllantirish va rivojlantirish, fundamental
                bilimlarni targ'ib qilish va ijodkorlikni qaror toptirish,
                o'zbek pedagogikasining muvaffaqiyatli taraqqiy etishiga hissa
                qo'shadigan innovatsion tadqiqotlar olib borishdan iborat.
              </p>
            </div>
            <div>
              <p className="text-xl font-bold font-source text-center text-red-500">
                ←←←Institut haqida uchun→→→
              </p>
              <h1 className="text-xl font-bold font-source text-center text-[#004269]">
                Biz haqimizda
              </h1>
            </div>
            <div className="px-2">
              <p className="text-xl font-light text-center my-10">
                Muqimiy nomidagi Qo'qon davlat pedagogika instituti 1931-yil
                yanvar oyida o'z faoliyatini boshlab kelmoqda. Qo'qon davlat
                pedagogika institutida oliy ta'limda amalga oshiralayotgan tub
                islohotlar sharoitida sezilarli ijobiy o'zgarishlar ro'y
                bermoqda. Oliygohning qiyofasi o'zgarib, moddiy-texnika bazasi
                yaxshilanmoqda, ilmiy ishlanmalarni moliyalashtirish va ijtimoiy
                qo'llab-quvvatlash kuchaytirilmoqda. Oliy ta'lim ilm-fan ishlab
                chiqarish o'rtasida uzviylik yaratildi. Bularning barchasi oliy
                ta'limga bo'lgan yondashuvni o'zgartirib, uning sifati hamda
                darajasini ko'tarishga xizmat qilmoqda.
              </p>
            </div>
            <div className="px-4 xl:px-0 py-4">
              <img
                src=""
                className="w-full max-h-[547px] shadow-2xl rounded-xl opacity-75"
                alt=""
              />
            </div>
            <div>
              <h1 className="text-xl font-bold font-source text-center text-[#004269]">
                Tadqiqot, o'qitish va murabbiylik sohasidagi mukammallik
              </h1>
              <div className="grid items-center grid-cols-1 px-6 my-20">
                <div className="z-10 mx-6">
                  <img
                    src=""
                    className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl"
                    alt=""
                  />
                </div>
                <div className="bg-[#F1F5F9] p-10 -mt-6">
                  <h3 className="text-xl font-medium">Biz kimmiz</h3>
                  <p className="text-md mt-3">
                    Fakultetimiz, talabalarimiz va xodimlarimizni harakatga
                    keltiradigan narsa bu imkoniyatlar ruhi, boshqa odamlarning
                    farzandlariga foyda keltirish uchun yagona farzandi
                    xotirasiga Institutimizda biz o'tmishimizdan saboq olamiz,
                    lekin kelajakka e'tibor qaratamiz va doimiy ravishda dunyoni
                    yaxshiroq joyga aylantirishning yangi usullarini qidiramiz.
                    Biz oliy ta'lim gullab-yashnayotgan jamiyatni
                    qo'llab-quvvatlashda muhim rol o'ynashiga qattiq ishonamiz.
                    Institutimiz nafaqat talabalarni o'zlari tanlagan yo'lga
                    tayyorlaydilar, balki ular fuqarolar rahbarlari va
                    muammolarni hal qiluvchilarning keyingi avlodini yaratishga
                    yordam beradi. Oliy ta'lim muassasalari jamiyatimizda faqat
                    bilimlarni yaratish va tarqatishga bag'ishlangan o'ziga xos
                    va doimiy vazifani bajaradi.
                  </p>
                </div>
              </div>
              <div className="grid items-center grid-cols-1 px-6 my-20">
                <div className="z-10 mx-6">
                  <img
                    src=""
                    className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl"
                    alt=""
                  />
                </div>
                <div className="bg-[#F1F5F9] p-10 -mt-6">
                  <h3 className="text-xl font-medium">Qo'shma hamkorlar</h3>
                  <p className="text-md mt-3">
                    Institutimizda 4 ta xorijiy oliy ta'lim muassalalari bilan
                    hamkorlikda bakalavriat va magistratura mutaxassisliklari
                    bo'yicha qo'shma ta'lim dasturlari asosida o'qitish ham
                    yo'lga qo'yilgan. Rossiyaning Akmulla nomli Boshqird davlat
                    pedagogika universiteti (BDPU), Rossiya davlat kasb-hunar
                    pedagogika universiteti (RDKXPU), Qozon federal universiteti
                    va Belarusning Yanka kupala nomidagi Grodno davlat
                    universitetilari (GrDU) bilan jami 168 nafar talaba qo'shma
                    ta'lim dasturlari asosida o'qitilmoqda.
                  </p>
                </div>
              </div>
              <div className="grid items-center grid-cols-1 px-6">
                <div className="z-10 mx-6">
                  <img
                    src=""
                    className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl"
                    alt=""
                  />
                </div>
                <div className="bg-[#F1F5F9] p-10 -mt-6">
                  <h3 className="text-xl font-medium">
                    Rivojlanayotgan talabalik hayoti
                  </h3>
                  <p className="text-md mt-3">
                    Rivojlanayotgan turar joy kampusi Institutimiz taklif
                    qiladigan jahon miqyosidagi ta'lim tajribasining ajralmas
                    qismidir. Institutimizda akapella qo'shiqchilaridan tortib
                    olimpiya sportchilarigacha bo'lgan dunyoning turli
                    burchaklaridan kelgan ijodiy va qobiliyatli odamlar
                    hamjamiyati yashaydi. Talabalar 600 dan ortiq talaba
                    tashkilotlari orasidan diniy, etnik va madaniy guruhlardan
                    tortib, san'at va jamoat xizmatiga, ijtimoiy, sport va
                    ko'ngilochar tadbirlarga e'tibor qaratadigan tashkilotlarga
                    jalb qilishlari mumkin.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="py-5 max-w-[1910px] mx-auto"
            // style={{
            //   backgroundImage: `url(${require("../../assets/images/institutHaqidaCom/bacgroundSayt.png")})`,
            //   backgroundRepeat: "no-repeat",
            //   backgroundSize: "cover",
            // }}
          >
            <div className="max-w-7xl mx-auto">
              <h1 className="text-xl font-bold font-source text-center text-[#ffffff]">
                Kirish
              </h1>
              <div className="grid items-center grid-cols-1 px-6">
                <div className="z-10 mx-6">
                  <img
                    src=""
                    className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl"
                    alt=""
                  />
                </div>
                <div className="bg-[#F1F5F9] p-10 -mt-6">
                  <h3 className="text-xl font-medium">
                    Uning barcha shakllarida xilma-xillikka chuqur hurmat
                  </h3>
                  <p className="text-md mt-3">
                    QDPI tajriba, qiziqishlar va istiqboldagi xilma-xillikni
                    qadrlaydi. Biz barcha talabalar bir-birining tajribasidan
                    o'rganish va o'z qarashlari va tasavvurlari haqida tanqidiy
                    fikr yuritish imkoniyatiga ega bo'lgan kampus muhitini
                    yaratishga harakat qilmoqdamiz. Institutimiz barcha
                    talabalarga irqiy, ijtimoiy-iqtisodiy, geografik va siyosiy
                    yo'nalishlar bo'ylab hamjamiyat va aloqa o'rnatish uchun
                    imkoniyat va vositalarni taqdim etishga intiladi, bu
                    ko'pincha ko'proq tushunish, o'zaro hurmat va haqiqiy
                    do'stlikka to'sqinlik qiladi. Ijtimoiy mas'uliyat va axloqni
                    qadrlashni rivojlantirish imkoniyatlari Institutimiz ta'lim
                    tajribasining ajralmas qismidir.
                  </p>
                </div>
              </div>
              <div className="grid items-center grid-cols-1 px-6 py-20">
                <div className="z-10 mx-6">
                  <img
                    src=""
                    className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl"
                    alt=""
                  />
                </div>
                <div className="bg-[#F1F5F9] p-10 -mt-6">
                  <h3 className="text-xl font-medium">
                    Farq qiladigan moliyaviy yordam
                  </h3>
                  <p className="text-md mt-3">
                    Biz har bir talabani QDPIda muvaffaqiyatli o'qish uchun
                    zarur bo'lgan to'liq miqdorda moliyaviy yordam olishda
                    qo'llab-quvvatlashga intilamiz. Moliyaviy tenglikka bo'lgan
                    bu majburiyat nafaqat uni olgan talabalarning hayotini,
                    balki ular bilan birga o'qiyotganlarning ta'limini ham
                    o'zgartiradi. institutimiz magistrantlarining qariyb 70
                    foizi moliyaviy yordam oladi, kam ta'minlangan oilalar esa
                    o'qish uchun to'lov, xona va ovqat bilan to'liq
                    ta'minlanadi. QDPIda bakalavr darajasini olganlarning 80
                    foizdan ortig'i qarzsiz bitiradi.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="grid items-center grid-cols-1 px-6">
              <div className="z-10 mx-6">
                <img
                  src=""
                  className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl"
                  alt=""
                />
              </div>
              <div className="bg-[#F1F5F9] p-10 -mt-6">
                <h3 className="text-xl font-medium">Sport bilan birga</h3>
                <p className="text-md mt-3">Sport bilan birga</p>
              </div>
            </div>
          </div>
          {datas?.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleSet(item)}
                type="submit"
                className="btn"
              >
                {isEdit ? "Saqlashh" : "Update"}
              </button>
            </div>
          ))}
          <button
            onClick={() => setIsEdit(!isEdit)}
            type="submit"
            className="btn"
          >
            {isEdit ? "Saqlashh" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstitutHaqidaCom;
