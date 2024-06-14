import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useFormik } from "formik";
import { BiBlock } from "react-icons/bi";
import APIInteraktiv from "../../services/interaktiv";
import { RxArrowTopRight } from "react-icons/rx";
import { TextWarn } from "./styled";

const Interaktiv = () => {
  const [data, setData] = useState(null);
  const [dataMasofaviy, setDataMasofaviy] = useState(null);
  const [errTxt, setErrTxt] = useState(false);

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

    // Post
    const formik3 = useFormik({
      initialValues: {
        link: "",
      },
      onSubmit: async (values, { resetForm }) => {
        const data = new FormData();
        data.append("link", values.link);
        await APIInteraktiv.postMasofaviy(data);
        resetForm();
        // getDataMasofaviy();
      },
    });

  return (
    <div className="p-4">
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
          className="flex items-center gap-2 p-4"
          onSubmit={formik3.handleSubmit}
        >
          <label className="w-[25%]" htmlFor="hamkor_rasm">
            <h3>Fakultet</h3>
            <input
              className="w-full input input-bordered file-input-info"
              type="text"
              id="hamkor_rasm"
              onChange={formik3.handleChange}
            />
          </label>
          <label className="w-[25%]" htmlFor="link">
            <h3>Hamkor sayt manzili</h3>
            <textarea
              className="w-full input input-bordered px-[7px]"
              id="link"
              value={formik3.values.link}
              onChange={formik3.handleChange}
            />
          </label>
          <button
            className={`${
              errTxt
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-400 hover:bg-blue-600"
            } flex justify-center items-center gap-1 w-[25%] h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95`}
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
        <TextWarn
          className={`${
            errTxt ? "inline-block" : "hidden"
          } w-full font-medium text-center`}
        >
          Hamma kiritish bo'limlari kiritilishi shart!
        </TextWarn>
    </div>
  );
};

export default Interaktiv;
