import React, { useEffect, useState} from "react";
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
 
const InstitutHaqidaCom = () => {

  const [datas, setDatas] = useState([]);
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(null)

  const fetchData = async () => {
    try {
      const response = await APIInstitutHaqida.getInstitutHaqida();
      setDatas(response.data);
      console.log();
    } catch (error) {
      console.log(error);
    }
  };
  
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
    onSubmit: async (values, onSubmitProps) => {
      const data = new FormData();
      console.log(data);
      for (let key in values) {
        data.append(key, values[key]);
      }
      try {
        if(!edit && datas.length === 0){
          await APIInstitutHaqida.postInstitutHaqida(data);
        }else{
          await APIInstitutHaqida.putInstitutHaqida(id, data)
          setEdit(false)
          setId(null)
        }
        onSubmitProps.resetForm()
        fetchData();
      } catch (error) {
        console.error("Xatolik sodir bo'ldi:", error);
      }
    },
  });  

  const handleEdit = (id) => {
    setEdit(true);
    setId(id);
    const data = datas.find(item => item.id === id);
    if(data){
      formik.setValues({
        bizning_maqsadimiz_title_uz: data.bizning_maqsadimiz_title_uz,
        bizning_maqsadimiz_title_ru: data.bizning_maqsadimiz_title_ru,
        bizning_maqsadimiz_title_en: data.bizning_maqsadimiz_title_en,
        bizning_maqsadimiz_text_uz: data.bizning_maqsadimiz_text_uz,
        bizning_maqsadimiz_text_ru: data.bizning_maqsadimiz_text_ru,
        bizning_maqsadimiz_text_en: data.bizning_maqsadimiz_text_uz,
        
        biz_haqimizda_title_uz: data.biz_haqimizda_title_uz,
        biz_haqimizda_title_ru: data.biz_haqimizda_title_ru,
        biz_haqimizda_title_en: data.biz_haqimizda_title_en,
        biz_haqimizda_text_uz: data.biz_haqimizda_text_uz,
        biz_haqimizda_text_ru: data.biz_haqimizda_text_ru,
        biz_haqimizda_text_en: data.biz_haqimizda_text_en,
        
        institut_rasm: data.institut_rasm,
        
        qoshimcha_title_uz: data.qoshimcha_title_uz,
        qoshimcha_title_ru: data.qoshimcha_title_ru,
        qoshimcha_title_en: data.qoshimcha_title_en,
        
        biz_kimmiz_title_uz: data.biz_kimmiz_title_uz,
        biz_kimmiz_title_ru: data.biz_kimmiz_title_ru,
        biz_kimmiz_title_en: data.biz_kimmiz_title_en,
        biz_kimmiz_text_uz: data.biz_kimmiz_text_uz,
        biz_kimmiz_text_ru: data.biz_kimmiz_text_ru,
        biz_kimmiz_text_en: data.biz_kimmiz_text_en,
        biz_kimmiz: data.biz_kimmiz,
        
        qoshma_hamkorlar_title_uz: data.qoshma_hamkorlar_title_uz,
        qoshma_hamkorlar_title_ru: data.qoshma_hamkorlar_title_ru,
        qoshma_hamkorlar_title_en: data.qoshma_hamkorlar_title_en,
        qoshma_hamkorlar_text_uz: data.qoshma_hamkorlar_text_uz,
        qoshma_hamkorlar_text_ru: data.qoshma_hamkorlar_text_ru,
        qoshma_hamkorlar_text_en: data.qoshma_hamkorlar_text_en,
        qoshma_hamkorlar: data.qoshma_hamkorlar,
        
        rivojlanayotgan_talabalar_hayoti_title_uz: data.rivojlanayotgan_talabalar_hayoti_title_uz,
        rivojlanayotgan_talabalar_hayoti_title_ru: data.rivojlanayotgan_talabalar_hayoti_title_ru,
        rivojlanayotgan_talabalar_hayoti_title_en: data.rivojlanayotgan_talabalar_hayoti_title_en,
        rivojlanayotgan_talabalar_hayoti_text_uz: data.rivojlanayotgan_talabalar_hayoti_text_uz,
        rivojlanayotgan_talabalar_hayoti_text_ru: data.rivojlanayotgan_talabalar_hayoti_text_ru,
        rivojlanayotgan_talabalar_hayoti_text_en: data.rivojlanayotgan_talabalar_hayoti_text_en,
        rivojlanayotgan_talabalar_hayoti: data.rivojlanayotgan_talabalar_hayoti,
        
        kirish_title_uz: data.kirish_title_uz,
        kirish_title_ru: data.kirish_title_ru,
        kirish_title_en: data.kirish_title_en,
        
        barcha_shakillar_title_uz: data.barcha_shakillar_title_uz,
        barcha_shakillar_title_ru: data.barcha_shakillar_title_ru,
        barcha_shakillar_title_en: data.barcha_shakillar_title_en,
        barcha_shakillar_text_uz: data.barcha_shakillar_text_uz,
        barcha_shakillar_text_ru: data.barcha_shakillar_text_ru,
        barcha_shakillar_text_en: data.barcha_shakillar_text_en,
        barcha_shakillar: data.barcha_shakillar,
        
        moliyaviy_yordam_title_uz: data.moliyaviy_yordam_title_uz,
        moliyaviy_yordam_title_ru: data.moliyaviy_yordam_title_ru,
        moliyaviy_yordam_title_en: data.moliyaviy_yordam_title_en,
        moliyaviy_yordam_text_uz: data.moliyaviy_yordam_text_uz,
        moliyaviy_yordam_text_ru: data.moliyaviy_yordam_text_ru,
        moliyaviy_yordam_text_en: data.moliyaviy_yordam_text_en,
        moliyaviy_yordam: data.moliyaviy_yordam,
        
        sport_bilan_birga_title_uz: data.sport_bilan_birga_title_uz,
        sport_bilan_birga_title_ru: data.sport_bilan_birga_title_ru,
        sport_bilan_birga_title_en: data.sport_bilan_birga_title_en,
        sport_bilan_birga_text_uz: data.sport_bilan_birga_text_uz,
        sport_bilan_birga_text_ru: data.sport_bilan_birga_text_ru,
        sport_bilan_birga_text_en: data.sport_bilan_birga_text_en,
        sport_bilan_birga: data.sport_bilan_birga,
      })
    }
  }
  
  useEffect(()=>{
    fetchData();
  },[])
  
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
              <legend className="text-red-500 font-medium">
                Asosiy sahifadagi institut haqida
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">             
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="bizning_maqsadimiz_title_uz" name="bizning_maqsadimiz_title_uz" onChange={formik.handleChange} value={formik.values.bizning_maqsadimiz_title_uz}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="bizning_maqsadimiz_title_ru" name="bizning_maqsadimiz_title_ru" onChange={formik.handleChange} value={formik.values.bizning_maqsadimiz_title_ru}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="bizning_maqsadimiz_title_en" name="bizning_maqsadimiz_title_en" onChange={formik.handleChange} value={formik.values.bizning_maqsadimiz_title_en}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="bizning_maqsadimiz_text_uz" name="bizning_maqsadimiz_text_uz" onChange={formik.handleChange} value={formik.values.bizning_maqsadimiz_text_uz}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="bizning_maqsadimiz_text_ru" name="bizning_maqsadimiz_text_ru" onChange={formik.handleChange} value={formik.values.bizning_maqsadimiz_text_ru}/>
                <MyTextarea type="text" label="Matn" tab="en" id="bizning_maqsadimiz_text_en" name="bizning_maqsadimiz_text_en" onChange={formik.handleChange} value={formik.values.bizning_maqsadimiz_text_en}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Institut haqida 1
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="biz_haqimizda_title_uz" name="biz_haqimizda_title_uz" onChange={formik.handleChange} value={formik.values.biz_haqimizda_title_uz}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="biz_haqimizda_title_ru" name="biz_haqimizda_title_ru" onChange={formik.handleChange} value={formik.values.biz_haqimizda_title_ru}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="biz_haqimizda_title_en" name="biz_haqimizda_title_en" onChange={formik.handleChange} value={formik.values.biz_haqimizda_title_en}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="biz_haqimizda_text_uz" name="biz_haqimizda_text_uz" onChange={formik.handleChange} value={formik.values.biz_haqimizda_text_uz}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="biz_haqimizda_text_ru" name="biz_haqimizda_text_ru" onChange={formik.handleChange} value={formik.values.biz_haqimizda_text_ru}/>
                <MyTextarea type="text" label="Matn" tab="en" id="biz_haqimizda_text_en" name="biz_haqimizda_text_en" onChange={formik.handleChange} value={formik.values.biz_haqimizda_text_en}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Institut rasmi
              </legend>
              <div className="my-5">
                <MyTextInput type="file" label="Rasm" tab="" id="institut_rasm" name="institut_rasm" onChange={(event) => formik.setFieldValue("institut_rasm", event.currentTarget.files[0])}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">Sarlavha 2</legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="qoshimcha_title_uz" name="qoshimcha_title_uz" onChange={formik.handleChange} value={formik.values.qoshimcha_title_uz}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="qoshimcha_title_ru" name="qoshimcha_title_ru" onChange={formik.handleChange} value={formik.values.qoshimcha_title_ru}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="qoshimcha_title_en" name="qoshimcha_title_en" onChange={formik.handleChange} value={formik.values.qoshimcha_title_en}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">Biz kimmiz</legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="biz_kimmiz_title_uz" name="biz_kimmiz_title_uz" onChange={formik.handleChange} value={formik.values.biz_kimmiz_title_uz}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="biz_kimmiz_title_ru" name="biz_kimmiz_title_ru" onChange={formik.handleChange} value={formik.values.biz_kimmiz_title_ru}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="biz_kimmiz_title_en" name="biz_kimmiz_title_en" onChange={formik.handleChange} value={formik.values.biz_kimmiz_title_en}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="biz_kimmiz_text_uz" name="biz_kimmiz_text_uz" onChange={formik.handleChange} value={formik.values.biz_kimmiz_text_uz}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="biz_kimmiz_text_ru" name="biz_kimmiz_text_ru" onChange={formik.handleChange} value={formik.values.biz_kimmiz_text_ru}/>
                <MyTextarea type="text" label="Matn" tab="en" id="biz_kimmiz_text_en" name="biz_kimmiz_text_en" onChange={formik.handleChange} value={formik.values.biz_kimmiz_text_en}/>
              </div>
              <div className="my-5">
                <MyTextInput type="file" label="Rasm" tab="" id="biz_kimmiz" name="biz_kimmiz" onChange={(event) => formik.setFieldValue("biz_kimmiz", event.currentTarget.files[0])}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Qo'shma hamkorlar
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="qoshma_hamkorlar_title_uz" name="qoshma_hamkorlar_title_uz" onChange={formik.handleChange} value={formik.values.qoshma_hamkorlar_title_uz}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="qoshma_hamkorlar_title_ru" name="qoshma_hamkorlar_title_ru" onChange={formik.handleChange} value={formik.values.qoshma_hamkorlar_title_ru}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="qoshma_hamkorlar_title_en" name="qoshma_hamkorlar_title_en" onChange={formik.handleChange} value={formik.values.qoshma_hamkorlar_title_en}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="qoshma_hamkorlar_text_uz" name="qoshma_hamkorlar_text_uz" onChange={formik.handleChange} value={formik.values.qoshma_hamkorlar_text_uz}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="qoshma_hamkorlar_text_ru" name="qoshma_hamkorlar_text_ru" onChange={formik.handleChange} value={formik.values.qoshma_hamkorlar_text_ru}/>
                <MyTextarea type="text" label="Matn" tab="en" id="qoshma_hamkorlar_text_en" name="qoshma_hamkorlar_text_en" onChange={formik.handleChange} value={formik.values.qoshma_hamkorlar_text_en}/>
              </div>
              <div className="my-5">
                <MyTextInput type="file" label="Rasm" tab="" id="qoshma_hamkorlar" name="qoshma_hamkorlar" onChange={(event) => formik.setFieldValue("qoshma_hamkorlar", event.currentTarget.files[0])}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Rivojlanayotgan talabalik hayoti
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="rivojlanayotgan_talabalar_hayoti_title_uz" name="rivojlanayotgan_talabalar_hayoti_title_uz" onChange={formik.handleChange} value={formik.values.rivojlanayotgan_talabalar_hayoti_title_uz}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="rivojlanayotgan_talabalar_hayoti_title_ru" name="rivojlanayotgan_talabalar_hayoti_title_ru" onChange={formik.handleChange} value={formik.values.rivojlanayotgan_talabalar_hayoti_title_ru}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="rivojlanayotgan_talabalar_hayoti_title_en" name="rivojlanayotgan_talabalar_hayoti_title_en" onChange={formik.handleChange} value={formik.values.rivojlanayotgan_talabalar_hayoti_title_en}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="rivojlanayotgan_talabalar_hayoti_text_uz" name="rivojlanayotgan_talabalar_hayoti_text_uz" onChange={formik.handleChange} value={formik.values.rivojlanayotgan_talabalar_hayoti_text_uz}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="rivojlanayotgan_talabalar_hayoti_text_ru" name="rivojlanayotgan_talabalar_hayoti_text_ru" onChange={formik.handleChange} value={formik.values.rivojlanayotgan_talabalar_hayoti_text_ru}/>
                <MyTextarea type="text" label="Matn" tab="en" id="rivojlanayotgan_talabalar_hayoti_text_en" name="rivojlanayotgan_talabalar_hayoti_text_en" onChange={formik.handleChange} value={formik.values.rivojlanayotgan_talabalar_hayoti_text_en}/>
              </div>
              <div className="my-5">
                <MyTextInput type="file" label="Rasm" tab="" id="rivojlanayotgan_talabalar_hayoti" name="rivojlanayotgan_talabalar_hayoti" onChange={(event) => formik.setFieldValue("rivojlanayotgan_talabalar_hayoti", event.currentTarget.files[0])}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Sarlavha 3 (Kirish)
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="kirish_title_uz" name="kirish_title_uz" onChange={formik.handleChange} value={formik.values.kirish_title_uz}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="kirish_title_ru" name="kirish_title_ru" onChange={formik.handleChange} value={formik.values.kirish_title_ru}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="kirish_title_en" name="kirish_title_en" onChange={formik.handleChange} value={formik.values.kirish_title_en}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Uning barcha shakllarida xilma-xillikka chuqur hurmat
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="barcha_shakillar_title_uz" name="barcha_shakillar_title_uz" onChange={formik.handleChange} value={formik.values.barcha_shakillar_title_uz}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="barcha_shakillar_title_ru" name="barcha_shakillar_title_ru" onChange={formik.handleChange} value={formik.values.barcha_shakillar_title_ru}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="barcha_shakillar_title_en" name="barcha_shakillar_title_en" onChange={formik.handleChange} value={formik.values.barcha_shakillar_title_en}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="barcha_shakillar_text_uz" name="barcha_shakillar_text_uz" onChange={formik.handleChange} value={formik.values.barcha_shakillar_text_uz}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="barcha_shakillar_text_ru" name="barcha_shakillar_text_ru" onChange={formik.handleChange} value={formik.values.barcha_shakillar_text_ru}/>
                <MyTextarea type="text" label="Matn" tab="en" id="barcha_shakillar_text_en" name="barcha_shakillar_text_en" onChange={formik.handleChange} value={formik.values.barcha_shakillar_text_en}/>
              </div>
              <div className="my-5">
                <MyTextInput type="file" label="Rasm" tab="" id="barcha_shakillar" name="barcha_shakillar" onChange={(event) => formik.setFieldValue("barcha_shakillar", event.currentTarget.files[0])}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Farq qiladigan moliyaviy yordam
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="moliyaviy_yordam_title_uz" name="moliyaviy_yordam_title_uz" onChange={formik.handleChange} value={formik.values.moliyaviy_yordam_title_uz}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="moliyaviy_yordam_title_ru" name="moliyaviy_yordam_title_ru" onChange={formik.handleChange} value={formik.values.moliyaviy_yordam_title_ru}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="moliyaviy_yordam_title_en" name="moliyaviy_yordam_title_en" onChange={formik.handleChange} value={formik.values.moliyaviy_yordam_title_en}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="moliyaviy_yordam_text_uz" name="moliyaviy_yordam_text_uz" onChange={formik.handleChange} value={formik.values.moliyaviy_yordam_text_uz}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="moliyaviy_yordam_text_ru" name="moliyaviy_yordam_text_ru" onChange={formik.handleChange} value={formik.values.moliyaviy_yordam_text_ru}/>
                <MyTextarea type="text" label="Matn" tab="en" id="moliyaviy_yordam_text_en" name="moliyaviy_yordam_text_en" onChange={formik.handleChange} value={formik.values.moliyaviy_yordam_text_en}/>
              </div>
              <div className="my-5">
                <MyTextInput type="file" label="Rasm" tab="" id="moliyaviy_yordam" name="moliyaviy_yordam" onChange={(event) => formik.setFieldValue("moliyaviy_yordam", event.currentTarget.files[0])}/>
              </div>
            </fieldset>
            <fieldset className="border px-5 mb-5">
              <legend className="text-red-500 font-medium">
                Sport bilan birga
              </legend>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextInput type="text" label="Sarlavha" tab="uz" id="sport_bilan_birga_title_uz" name="sport_bilan_birga_title_uz" onChange={formik.handleChange} value={formik.values.sport_bilan_birga_title_uz}/>
                <MyTextInput type="text" label="Sarlavha" tab="ru" id="sport_bilan_birga_title_ru" name="sport_bilan_birga_title_ru" onChange={formik.handleChange} value={formik.values.sport_bilan_birga_title_ru}/>
                <MyTextInput type="text" label="Sarlavha" tab="en" id="sport_bilan_birga_title_en" name="sport_bilan_birga_title_en" onChange={formik.handleChange} value={formik.values.sport_bilan_birga_title_en}/>
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MyTextarea type="text" label="Matn" tab="uz" id="sport_bilan_birga_text_uz" name="sport_bilan_birga_text_uz" onChange={formik.handleChange} value={formik.values.sport_bilan_birga_text_uz}/>
                <MyTextarea type="text" label="Matn" tab="ru" id="sport_bilan_birga_text_ru" name="sport_bilan_birga_text_ru" onChange={formik.handleChange} value={formik.values.sport_bilan_birga_text_ru}/>
                <MyTextarea type="text" label="Matn" tab="en" id="sport_bilan_birga_text_en" name="sport_bilan_birga_text_en" onChange={formik.handleChange} value={formik.values.sport_bilan_birga_text_en}/>
              </div>
              <div className="my-5">
                <MyTextInput type="file" label="Rasm" tab="" id="sport_bilan_birga" name="sport_bilan_birga" onChange={(event) => formik.setFieldValue("sport_bilan_birga", event.currentTarget.files[0])}/>
              </div>
            </fieldset>
            <button type="submit" className="btn btn-success">
              {!edit ? "post" : "put"}
            </button>
          </form>
        </div>
        </Formik>
        {datas && datas.map((data) => {
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
                      <h3 className="text-xl font-medium">{data.biz_kimmiz_title_uz}</h3>
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
                      <h3 className="text-xl font-medium">{data.qoshma_hamkorlar_title_uz}</h3>
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
                    <h3 className="text-xl font-medium">{data.sport_bilan_birga_title_uz}</h3>
                    <p className="text-md mt-3">{data.sport_bilan_birga_text_uz}</p>
                  </div>
                </div>
              </div>
              <button type="submit" onClick={() => handleEdit(data.id)} className="btn btn-secondary z-50 sticky bottom-5 left-4">O'zgartirish</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default InstitutHaqidaCom;