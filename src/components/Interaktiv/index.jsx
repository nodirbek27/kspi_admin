import React, { useEffect, useState, useCallback } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import APIInteraktiv from "../../services/interaktiv";
import { RxArrowTopRight } from "react-icons/rx";
import { TextWarn } from "./styled";
import Loader from "../Loader";
import APIVideomaruza from "../../services/videomaruza";
import APITuzilmaFakultet from "../../services/tuzilmaFakultet";

const Interaktiv = () => {
  const [data, setData] = useState(null);
  const [dataMasofaviy, setDataMasofaviy] = useState(null);
  const [warn, setWarn] = useState(false);
  const [load, setLoad] = useState(true);
  const [dataVideomaruza, setDataVideomaruza] = useState(null);
  const [dataFakultet, setDataFakultet] = useState(null);

  const getData = useCallback(async () => {
    try {
      const res = await APIInteraktiv.get();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getDataMasofaviy = useCallback(async () => {
    try {
      const res = await APIInteraktiv.getMasofaviy();
      setDataMasofaviy(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getDataVideomaruza = useCallback(async () => {
    try {
      const res = await APIVideomaruza.get();
      setDataVideomaruza(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoad(false);
    }
  }, []);

  const getFakultet = useCallback(async () => {
    try {
      const res = await APITuzilmaFakultet.get();
      setDataFakultet(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoad(false);
    }
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await APIInteraktiv.del(id);
        getData();
      } catch (err) {
        console.error(err);
      }
    },
    [getData]
  );

  const handleDeleteMasofaviy = useCallback(
    async (id) => {
      try {
        await APIInteraktiv.delMasofaviy(id);
        getDataMasofaviy();
      } catch (err) {
        console.error(err);
      }
    },
    [getDataMasofaviy]
  );

  const handleDeleteVideo = useCallback(
    async (id) => {
      try {
        await APIVideomaruza.del(id);
        getDataVideomaruza();
      } catch (err) {
        console.error(err);
      }
    },
    [getDataVideomaruza]
  );

  useEffect(() => {
    setLoad(true);
    getFakultet();
    getData();
    getDataMasofaviy();
    getDataVideomaruza();
  }, [getData, getDataMasofaviy, getDataVideomaruza, getFakultet]);

  const formik = useFormik({
    initialValues: { link: "" },
    validationSchema: Yup.object({
      link: Yup.string().url("Invalid URL").required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = new FormData();
        data.append("link", values.link);
        await APIInteraktiv.post(data);
        resetForm();
        getData();
      } catch (err) {
        console.error(err);
      }
    },
  });

  const formik2 = useFormik({
    initialValues: { link: "" },
    validationSchema: Yup.object({
      link: Yup.string().url("Invalid URL").required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = new FormData();
        data.append("link", values.link);
        await APIInteraktiv.postMasofaviy(data);
        resetForm();
        getDataMasofaviy();
      } catch (err) {
        console.error(err);
      }
    },
  });

  const formik3 = useFormik({
    initialValues: { fakultet_id: 0, link: "" },
    validationSchema: Yup.object({
      fakultet_id: Yup.number().required("Ushbu maydon to'ldirilishi shart."),
      link: Yup.string().url("Invalid URL").required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (values.fakultet_id === 0) {
        setWarn(true);
      } else {
        setLoad(true);
        try {
          const formData = {
            ...values,
            fakultet_id: parseInt(values.fakultet_id, 10),
          };
          await APIVideomaruza.post(formData);
          getDataVideomaruza();
          resetForm();
          setWarn(false);
        } catch (err) {
          console.error(err);
        }
      }
    },
  });

  return (
    <div className="p-4 relative">
      {load && (
        <div className="fixed top-[60px] right-[15px] w-[calc(100%-310px)] h-[100vh] bg-[#0000002d] flex justify-center items-center z-50">
          <Loader />
        </div>
      )}
      <h2 className="text-2xl font-semibold text-center my-5 p-3">
        Interaktiv xizmatlar
      </h2>
      <div>
        {/* Post */}
        <div className="max-w-7xl mx-auto mb-5">
          <form
            onSubmit={formik.handleSubmit}
            className={`${data?.length >= 1 ? "hidden" : ""}`}
          >
            <table className="table">
              <tbody>
                <tr className="grid grid-cols-3">
                  <td className="font-bold">E-kutubxona</td>
                  <td className="text-center">
                    <input
                      id="link"
                      name="link"
                      type="text"
                      placeholder="https://kspi.uz"
                      className="input input-bordered w-full max-w-xs"
                      onChange={formik.handleChange}
                      value={formik.values.link}
                    />
                    {formik.touched.link && formik.errors.link ? (
                      <div className="text-red-600">{formik.errors.link}</div>
                    ) : null}
                  </td>
                  <td className="text-center">
                    <button
                      className="bg-blue-400 hover:bg-blue-600 flex justify-center items-center gap-1 w-[100%] h-[48px] text-white font-bold rounded-lg active:scale-95"
                      type="submit"
                    >
                      SUBMIT
                      <RxArrowTopRight className="font-bold text-[20px] mt-[2px]" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <form
            onSubmit={formik2.handleSubmit}
            className={`${dataMasofaviy?.length >= 1 ? "hidden" : ""}`}
          >
            <table className="table">
              <tbody>
                <tr className="grid grid-cols-3">
                  <td className="font-bold">Masofaviy ta'lim</td>
                  <td className="text-center">
                    <input
                      id="link"
                      name="link"
                      type="text"
                      placeholder="https://kspi.uz"
                      className="input input-bordered w-full max-w-xs"
                      onChange={formik2.handleChange}
                      value={formik2.values.link}
                    />
                    {formik2.touched.link && formik2.errors.link ? (
                      <div className="text-red-600">{formik2.errors.link}</div>
                    ) : null}
                  </td>
                  <td className="text-center">
                    <button
                      className="bg-blue-400 hover:bg-blue-600 flex justify-center items-center gap-1 w-[100%] h-[48px] text-white font-bold rounded-lg active:scale-95"
                      type="submit"
                    >
                      SUBMIT
                      <RxArrowTopRight className="font-bold text-[20px] mt-[2px]" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <form onSubmit={formik3.handleSubmit}>
            <table className="table">
              <tbody>
                <tr className="grid grid-cols-3">
                  <td className="font-bold">Videomaruza</td>
                  <td className="text-center">
                    <select
                      name="fakultet_id"
                      id="fakultet_id"
                      className="select select-bordered w-full max-w-xs"
                      onChange={formik3.handleChange}
                      value={formik3.values.fakultet_id}
                    >
                      <option value="0">Fakultetni tanlang</option>
                      {dataFakultet?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name_uz}
                        </option>
                      ))}
                    </select>
                    <input
                      id="link"
                      name="link"
                      type="text"
                      placeholder="https://kspi.uz"
                      className="input input-bordered w-full max-w-xs mt-2"
                      onChange={formik3.handleChange}
                      value={formik3.values.link}
                    />
                    {warn && <TextWarn>Maydonlarni to'ldiring</TextWarn>}
                    {formik3.touched.fakultet_id &&
                    formik3.errors.fakultet_id ? (
                      <div className="text-red-600">
                        {formik3.errors.fakultet_id}
                      </div>
                    ) : null}
                    {formik3.touched.link && formik3.errors.link ? (
                      <div className="text-red-600">{formik3.errors.link}</div>
                    ) : null}
                  </td>
                  <td className="text-center">
                    <button
                      className="bg-blue-400 hover:bg-blue-600 flex justify-center items-center gap-1 w-[100%] h-[48px] text-white font-bold rounded-lg active:scale-95"
                      type="submit"
                    >
                      SUBMIT
                      <RxArrowTopRight className="font-bold text-[20px] mt-[2px]" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        {/* Display */}
        <div className="overflow-x-auto w-full mb-20">
          <table className="table table-zebra">
            <thead>
              <tr className="grid grid-cols-3">
                <th className="text-[16px]">Nomi</th>
                <th className="text-[16px]">Link</th>
                <th className="text-[16px] text-center">O'chirish</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr className="grid grid-cols-3" key={item.id}>
                  <td className="text-[16px] font-semibold">E-kutubxona</td>
                  <td className="text-[16px]">
                    <a href={item.link}>{item.link}</a>
                  </td>
                  <td className="text-[16px]">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-error text-[16px] flex justify-center items-center gap-1 w-[150px] h-[40px] text-white font-bold rounded-lg active:scale-95 mx-auto"
                    >
                      O'chirish
                      <RiDeleteBin5Line className="font-bold text-[18px] mt-[2px]" />
                    </button>
                  </td>
                </tr>
              ))}
              {dataMasofaviy?.map((item) => (
                <tr className="grid grid-cols-3" key={item.id}>
                  <td className="text-[16px] font-semibold">
                    Masofaviy ta'lim
                  </td>
                  <td className="text-[16px]">
                    <a href={item.link}>{item.link}</a>
                  </td>
                  <td className="text-[16px]">
                    <button
                      onClick={() => handleDeleteMasofaviy(item.id)}
                      className="btn btn-error text-[16px] flex justify-center items-center gap-1 w-[150px] h-[40px] text-white font-bold rounded-lg active:scale-95 mx-auto"
                    >
                      O'chirish
                      <RiDeleteBin5Line className="font-bold text-[18px] mt-[2px]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2
          className={`${
            dataVideomaruza?.length > 0 ? "" : "hidden"
          } text-2xl font-semibold text-center my-5 p-3`}
        >
          Video maruzalar
        </h2>
        {/* Display */}
        <div className="overflow-x-auto w-full mb-20">
          <table className="table table-zebra">
            <thead>
              <tr className="grid grid-cols-3">
                <th className="text-[16px]">Fakultet</th>
                <th className="text-[16px]">Link</th>
                <th className="text-[16px] text-center">O'chirish</th>
              </tr>
            </thead>
            <tbody>
              {dataVideomaruza?.map((item) => {
                const fakultet = dataFakultet?.find(
                  (fakultet) => fakultet.id === item.fakultet_id
                );
                return (
                  <tr className="grid grid-cols-3" key={item.id}>
                    <td className="text-[16px] font-semibold">
                      {fakultet ? fakultet.name_uz : "Videomaruza"}
                    </td>
                    <td className="text-[16px]">
                      <a href={item.link}>{item.link}</a>
                    </td>
                    <td className="text-[16px] text-center">
                      <button
                        onClick={() => handleDeleteVideo(item.id)}
                        className="btn btn-error text-[16px] flex justify-center items-center gap-1 w-[150px] h-[40px] text-white font-bold rounded-lg active:scale-95 mx-auto"
                      >
                        O'chirish
                        <RiDeleteBin5Line className="font-bold text-[18px] mt-[2px]" />
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
  );
};

export default Interaktiv;
