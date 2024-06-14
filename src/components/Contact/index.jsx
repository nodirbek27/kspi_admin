import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { RxArrowTopRight } from "react-icons/rx";
import { BiBlock } from "react-icons/bi";
import APIContact from "../../services/contact";
import { TextWarn } from "./styled";
import { RiDeleteBin5Line } from "react-icons/ri";

const Contact = () => {
  const [errTxt, setErrTxt] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    APIContact.get()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      manzil_uz: "",
      manzil_ru: "",
      manzil_en: "",
      telefon: "",
      email_1: "",
      email_2: "",
    },
    onSubmit: async (values) => {
      if (
        values.manzil_uz === "" ||
        values.manzil_ru === "" ||
        values.manzil_en === "" ||
        values.telefon === "" ||
        values.email_1 === "" ||
        values.email_2 === ""
      ) {
        setErrTxt(true);
        setTimeout(() => {
          setErrTxt(false);
        }, 5000);
      } else {
        try {
          if (data) {
            // Delete all previous data
            for (const item of data) {
              await handleDelete(item.id);
            }
          }
          // Post new data
          await APIContact.post(values);
          getData();
          formik.resetForm();
        } catch (err) {
          console.log(err);
        }
      }
    },
  });

  const handleDelete = async (id) => {
    await APIContact.del(id);
  };

  return (
    <div className="w-full p-4">
      <div>
        <h1 className="text-[1.4rem] font-bold text-center my-5">Bog'lanish</h1>
        <h2 className="text-[1.4rem] font-semibold my-5">
          Manzil va aloqa ma'lumotlarini qo'shish
        </h2>
        <h3 className="italic text-red-600">Yangi ma'lumot qo'shishingiz bilan eski ma'lumot avtomatik o'chiriladi!</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="items-center grid grid-cols-3 gap-2 p-4">
            <label htmlFor="manzil_uz">
              <h3>Manzil Uz</h3>
              <input
                className="w-full input input-bordered"
                type="text"
                id="manzil_uz"
                value={formik.values.manzil_uz}
                onChange={formik.handleChange}
              />
            </label>
            <label htmlFor="manzil_ru">
              <h3>Manzil Ru</h3>
              <textarea
                className="w-full input input-bordered"
                id="manzil_ru"
                value={formik.values.manzil_ru}
                onChange={formik.handleChange}
              />
            </label>
            <label htmlFor="manzil_en">
              <h3>Manzil En</h3>
              <textarea
                className="w-full input input-bordered"
                id="manzil_en"
                value={formik.values.manzil_en}
                onChange={formik.handleChange}
              />
            </label>
            <label htmlFor="telefon">
              <h3>Ishonch telefoni</h3>
              <textarea
                className="w-full input input-bordered"
                id="telefon"
                value={formik.values.telefon}
                onChange={formik.handleChange}
              />
            </label>
            <label htmlFor="email_1">
              <h3>Email</h3>
              <textarea
                className="w-full input input-bordered"
                id="email_1"
                value={formik.values.email_1}
                onChange={formik.handleChange}
              />
            </label>
            <label htmlFor="email_2">
              <h3>Email-2</h3>
              <textarea
                className="w-full input input-bordered"
                id="email_2"
                value={formik.values.email_2}
                onChange={formik.handleChange}
              />
            </label>
          </div>
          <TextWarn
            className={`${
              errTxt ? "inline-block" : "hidden"
            } w-full font-medium text-center`}
          >
            Hamma kiritish bo'limlari kiritilishi shart!
          </TextWarn>
          <button
            className={`${
              errTxt
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-400 hover:bg-blue-600"
            } flex justify-center items-center gap-1 w-full h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95`}
            type="submit"
          >
            SUBMIT
            {errTxt ? (
              <BiBlock />
            ) : (
              <RxArrowTopRight className="font-bold text-[20px] mt-[2px]" />
            )}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-5">
        <h2 className="text-[1.4rem] font-semibold my-2 pt-3">
          Manzil va aloqa ma'lumotlari
        </h2>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nomi Uz</th>
              <th>Nomi Ru</th>
              <th>Nomi En</th>
              <th className="text-center">O'chirish</th>
            </tr>
          </thead>
          {data &&
            data.map((item, idx) => (
              <tbody key={idx}>
                <tr>
                  <th>Manzil</th>
                  <td>{item.manzil_uz}</td>
                  <td>{item.manzil_ru}</td>
                  <td>{item.manzil_en}</td>
                  <td rowSpan={4}>
                    <RiDeleteBin5Line
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 mx-auto cursor-pointer h-[35px] w-[35px]"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Ishonch telefoni</th>
                  <td colSpan={3}>{item.telefon}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td colSpan={3}>{item.email_1}</td>
                </tr>
                <tr>
                  <th>Email-2</th>
                  <td colSpan={3}>{item.email_2}</td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};

export default Contact;