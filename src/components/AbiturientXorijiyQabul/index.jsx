import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { RxArrowTopRight } from "react-icons/rx";
import { BiBlock } from "react-icons/bi";
import APIAbiturientXorijiy from "../../services/abiturientXorijiyQabul";
import { TextWarn } from "./styled";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa6";

const AbiturientXorijiyQabul = () => {
  const [errTxt, setErrTxt] = useState(false);
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const rasm = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    APIAbiturientXorijiy.get()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  console.log(data);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      if (values.title === "") {
        setErrTxt(true);
        setTimeout(() => {
          setErrTxt(false);
        }, 5000);
      } else {
        if (file) {
          const data = new FormData();
          data.append("title", values.title);
          data.append("fayl", file);
          APIAbiturientXorijiy.post(data)
            .then(() => {
              getData();
              formik.resetForm();
              setFile(null);
              if (rasm.current) {
                rasm.current.value = "";
              }
            })
            .catch((err) => console.log(err));
        }
      }
    },
  });

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  // DELETE qilish
  const handleDelete = async (id) => {
    await APIAbiturientXorijiy.del(id);
    getData();
  };

  return (
    <div className="w-full p-4">
      <div>
        <h1 className="text-[1.4rem] font-bold text-center my-5">
          Xorijiy talabalarni qabul qilish hujjatlari
        </h1>
        <h2 className="text-[1.4rem] font-semibold my-5">Hujjat qo'shish</h2>
        <form
          className="flex items-center gap-2 p-4"
          onSubmit={formik.handleSubmit}
        >
          <label className="w-[25%]" htmlFor="fayl">
            <h3>Hujjat doc/pdf</h3>
            <input
              ref={rasm}
              onChange={handleChange}
              className="w-full file-input file-input-bordered file-input-info"
              type="file"
              id="fayl"
            />
          </label>
          <label className="w-[25%]" htmlFor="title">
            <h3>Hujjat nomi</h3>
            <input
              className="w-full input input-bordered px-[7px]"
              id="title"
              value={formik.values.title}
              onChange={formik.handleChange}
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

      {/* Table */}
      <div className="overflow-x-auto mb-5">
        <h2 className="text-[1.4rem] font-semibold mb-2 pt-3">
          Mavjud hujjatlar
        </h2>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>№</th>
              <th>Hujjat nomi</th>
              <th>Hujjat</th>
              <th>O'chirish</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data &&
              data.map((item, idx) => (
                <tr key={idx}>
                  <th>{item.id}</th>
                  <td>{item.title}</td>
                  <td>
                    {" "}
                    <a
                      href={item.fayl}
                      className="border-2 rounded p-2 border-blue-400 flex items-center w-[100px] font-semibold"
                      target="blank"
                    >
                      <FaRegEye className="mr-1" /> Ko'rish
                    </a>
                  </td>
                  <td className="">
                    <RiDeleteBin5Line
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 cursor-pointer h-5 w-5"
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

export default AbiturientXorijiyQabul;
