import React from 'react';
import { Formik} from 'formik';
import MyTextInput from '../MyTextInput';
import APIinstitutTuzilmasi from '../../services/institutTuzilmasi';

function InstitutTuzilmasiCom() {
  return (
    <div className='max-w-[1600px] mx-auto'>
      <h1 className="text-3xl font-medium text-gray-700 text-center my-5">Institut tuzilmasi</h1>
      <div className="grid grid-cols-4">
        <div className='col-span-3 border p-5'>
            <Formik
            initialValues={{ 
                name_uz: "",
                name_ru: "",
                name_en: "",
                rasm_1: null,
                rasm_2: null,
                rasm_3: null,
                rasm_4: null,
                rasm_5: null,
                pdf_fayl: null,
            }} // Initial values for formik
            onSubmit={async (values, onSubmitProps) => {
                const data = new FormData();
                for(let key in values ){
                    data.append(key, values[key]);
                }
                try {
                    await APIinstitutTuzilmasi.postInstitutTuzilmasi()
                    onSubmitProps.resetForm()
                } catch(error){
                    console.error("Xatolik sodir bo'ldi!", error);
                }
            }}
            >
                <form>
                <fieldset className="border px-5 mb-5">
                    <legend className="text-red-500 font-medium">Institut tuzilmasi</legend>
                    <div className="grid grid-cols-3 gap-2 my-5">
                        <MyTextInput type="text" name="name_uz" label="Sarlavha" tab="uz"/>
                        <MyTextInput type="text" name="name_ru" label="Sarlavha" tab="ru"/>
                        <MyTextInput type="text" name="name_eng" label="Sarlavha" tab="eng"/>
                    </div>
                    <div className="grid gap-5 my-5">
                        <MyTextInput type="file" name="rasm_1" label="Rasm" tab="1"/>
                        <MyTextInput type="file" name="rasm_2" label="Rasm" tab="2"/>
                        <MyTextInput type="file" name="rasm_3" label="Rasm" tab="3"/>
                        <MyTextInput type="file" name="rasm_4" label="Rasm" tab="4"/>
                        <MyTextInput type="file" name="rasm_5" label="Rasm" tab="5"/>
                        <MyTextInput type="file" name="pdf_fayl" label="PDF" tab="file"/>
                    </div>
                </fieldset>
                <button className='btn btn-success'>Saqlash</button>
                </form>
            </Formik>
        </div>
        <div className='col-span-1 border p-2'>
            <div>
                <h3 className="text-xl font-bold font-source text-center text-[#004269]">Institut tuzilmasi</h3>
                <div>
                    <img src="" alt="" className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl opacity-75 mt-5"/>
                    <img src="" alt="" className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl opacity-75 mt-5"/>
                    <img src="" alt="" className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl opacity-75 mt-5"/>
                    <img src="" alt="" className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl opacity-75 mt-5"/>
                    <img src="" alt="" className="w-full lg:max-h-40 xl:h-[460px] shadow-2xl opacity-75 mt-5"/>
                </div>
                <div>
                    {/* <a className='btn btn-accent w-full mt-5'>PDF shaklini yuklab oling</a> */}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default InstitutTuzilmasiCom;