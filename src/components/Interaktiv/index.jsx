import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useFormik } from "formik";
// import { BiBlock } from "react-icons/bi";
import APIInteraktiv from "../../services/interaktiv";
import { RxArrowTopRight } from "react-icons/rx";
import { TextWarn } from "./styled";
import Loader from "../Loader";
import APIVideomaruza from "../../services/videomaruza";

const Interaktiv = () => {
  const [data, setData] = useState(null);
  const [dataMasofaviy, setDataMasofaviy] = useState(null);
  const [warn, setWarn] = useState(false);
  // const [errTxt, setErrTxt] = useState(false);
  // load
  const [load, setLoad] = useState(true);
  const [dataVideomaruza, setDataVideomaruza] = useState(null);
  const [dataFakultet, setDataFakultet] = useState(null);

  // Post
  const formik = useFormik({
    initialValues: {
      link: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const data = new FormData();
      data.append("link", values.link);
      await APIInteraktiv.post(data);
      resetForm();
      getData();
    },
  });
  // GET qilish
  const getData = async () => {
    await APIInteraktiv.get().then((res) => setData(res.data));
  };
  // Delete qilish
  const handleDelete = async (id) => {
    await APIInteraktiv.del(id);
    getData();
  };

  // Post
  const formik2 = useFormik({
    initialValues: {
      link: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const data = new FormData();
      data.append("link", values.link);
      await APIInteraktiv.postMasofaviy(data);
      resetForm();
      getDataMasofaviy();
    },
  });
  // GET qilish
  const getDataMasofaviy = async () => {
    await APIInteraktiv.getMasofaviy().then((res) =>
      setDataMasofaviy(res.data)
    );
  };
  // Delete qilish
  const handleDeleteMasofaviy = async (id) => {
    await APIInteraktiv.delMasofaviy(id);
    getDataMasofaviy();
  };

  useEffect(() => {
    getData();
    getDataMasofaviy();
  }, []);

  // Post video
  const formik3 = useFormik({
    initialValues: {
      fakultet_id: "",
      link: "",
    },
    onSubmit: (values) => {
      if (values.fakultet_id === "0" || values.fakultet_id === "") {
        setWarn(true);
      } else {
        setLoad(true);
        const data = { ...values };
        APIVideomaruza.post(data)
          .then(() => getDataVideomaruza())
          .catch((err) => console.log(err));
        formik3.resetForm();
        setWarn(false);
      }
    },
  });

    // Get fakultet
    const getFakultet = () => {
      APIVideomaruza.get()
        .then((res) => {
          setDataFakultet(res.data);
          setLoad(false);
        })
        .catch((err) => {
          setLoad(false);
          console.log(err);
        });
    };

  // Get video
  const getDataVideomaruza = () => {
    APIVideomaruza.get()
      .then((res) => {
        setDataVideomaruza(res.data);
        setLoad(false);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
      });
  };

  // Delete video
  const handleDeleteVideo = async (id) => {
    await APIVideomaruza.del(id);
    getData();
  };

  useEffect(() => {
    formik3.values.fakultet_id === "0" ? setWarn(true) : setWarn(false);
  }, [formik3.values.fakultet_id]);

  useEffect(() => {
    setLoad(true);
    getFakultet();
    getDataVideomaruza();
  }, []);

  return (
    <div className="p-4 relative">
      <div
        className={`${
          !load && "hidden z-50"
        } fixed top-[60px] right-[15px] w-[calc(100%-310px)] h-[100vh] bg-[#0000002d] border boredr-[red] `}
      >
        <div className="w-full h-full flex justify-center items-center relative">
          <Loader />
        </div>
      </div>
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
                {/* row 1 */}
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
                {/* row 2 */}
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

        {/* Get */}
        <div className="max-w-7xl mx-auto">
          <table className="table border-separate">
            {/* head */}
            <thead>
              <tr>
                <th className="text-lg font-bold">Nomi</th>
                <th className="text-center text-lg font-bold">Link</th>
                <th className="text-center text-lg font-bold">O'chirish</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data &&
                data.map((item) => (
                  <tr className="bg-base-200" key={item.id}>
                    <td className="font-bold">E-kutubxona</td>
                    <td className="text-center text-blue-400">{item.link}</td>
                    <td>
                      <RiDeleteBin5Line
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 cursor-pointer h-5 w-5 mx-auto"
                      />
                    </td>
                  </tr>
                ))}
              {/* row 2 */}
              {dataMasofaviy &&
                dataMasofaviy.map((item) => (
                  <tr key={item.id}>
                    <td className="font-bold">Masofaviy ta'lim</td>
                    <td className="text-center text-blue-400">{item.link}</td>
                    <td>
                      <RiDeleteBin5Line
                        onClick={() => handleDeleteMasofaviy(item.id)}
                        className="text-red-600 cursor-pointer h-5 w-5 mx-auto"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-center my-5 p-3">
        Video maruzalar
      </h2>
      <form
        className="w-full flex flex-col gap-2"
        onSubmit={formik3.handleSubmit}
      >
        <div className="flex items-center gap-4 border-b-2 pb-5">
          <select
            name="fakultet_id"
            id="fakultet_id"
            className={`${
              warn && "select-error"
            } select select-bordered w-full max-w-xs`}
            value={formik3.values.fakultet_id}
            onChange={formik3.handleChange}
          >
            <option value="0">Fakultetni tanlang!</option>
            {dataFakultet?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name_uz}
              </option>
            ))}
          </select>
          <TextWarn
            className={`${warn ? "inline-block" : "hidden"} font-medium`}
          >
            Iltimos fakultetni tanlang!
          </TextWarn>
        </div>
        {/* Lavozim */}
        <table className="table">
          <tbody>
            {/* row 1 */}
            <tr className="grid grid-cols-3">
              <td className="font-bold">Video (YouTube) linki</td>
              <td className="text-center">
                <input
                  id="link"
                  name="link"
                  type="text"
                  placeholder="https://www.youtube.com/@qoqondpi/"
                  className="input input-bordered w-full max-w-xs"
                  onChange={formik3.handleChange}
                  value={formik3.values.link}
                />
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

      {/* Get */}
      <div className="max-w-7xl mx-auto">
        <table className="table border-separate">
          {/* head */}
          <thead>
            <tr>
              <th className="text-lg font-bold">Fakultet</th>
              <th className="text-center text-lg font-bold">Link</th>
              <th className="text-center text-lg font-bold">O'chirish</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {dataVideomaruza &&
              dataVideomaruza.map((item) => (
                <tr className="bg-base-200" key={item.id}>
                  <td className="font-bold">{item.fakultet}</td>
                  <td className="text-center text-blue-400">{item.link}</td>
                  <td>
                    <RiDeleteBin5Line
                      onClick={() => handleDeleteVideo(item.id)}
                      className="text-red-600 cursor-pointer h-5 w-5 mx-auto"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Interaktiv;