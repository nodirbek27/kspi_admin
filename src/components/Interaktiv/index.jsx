import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useFormik } from "formik";
import APIInteraktiv from "../../services/interaktiv";
import { RxArrowTopRight } from "react-icons/rx";

const Interaktiv = () => {
  const [data, setData] = useState(null);
  const [dataMasofaviy, setDataMasofaviy] = useState(null);

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

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-5 p-3">
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
                  <tr className="bg-base-200">
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
                  <tr>
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
    </div>
  );
};

export default Interaktiv;
