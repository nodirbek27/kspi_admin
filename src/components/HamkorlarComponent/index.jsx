import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { RxArrowTopRight } from "react-icons/rx";
import { BiBlock } from "react-icons/bi";
import APIHamkor from "../../services/hamkor";
import { TextWarn } from "./styled";
import { RiDeleteBin5Line } from "react-icons/ri";

const HamkorlarComponent = () => {
  const [errTxt, setErrTxt] = useState(false);
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const rasm = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    APIHamkor.get()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      hamkor_url: "",
    },
    onSubmit: (values) => {
      if (values.hamkor_url === "") {
        setErrTxt(true);
        setTimeout(() => {
          setErrTxt(false);
        }, 5000);
      } else {
        if (file) {
          const data = new FormData();
          data.append("hamkor_url", values.hamkor_url);
          data.append("hamkor_rasm", file);
          APIHamkor.post(data)
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
    await APIHamkor.del(id);
    getData();
  };

  return (
    <div className="w-full p-4">
      <div>
        <h1 className="text-[1.4rem] font-bold text-center my-5">
          Hamkorlar
        </h1>
        <h2 className="text-[1.4rem] font-semibold my-5">
          Hamkor qo'shish
        </h2>
        <form
          className="flex items-center gap-2 p-4"
          onSubmit={formik.handleSubmit}
        >
          <label className="w-[25%]" htmlFor="hamkor_rasm">
            <h3>Hamkor emblemasi</h3>
            <input
              ref={rasm}
              onChange={handleChange}
              className="w-full file-input file-input-bordered file-input-info"
              type="file"
              id="hamkor_rasm"
            />
          </label>
          <label className="w-[25%]" htmlFor="hamkor_url">
            <h3>Hamkor sayt manzili</h3>
            <input
              className="w-full input input-bordered px-[7px]"
              id="hamkor_url"
              value={formik.values.hamkor_url}
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
          Mavjud hamkorlar
        </h2>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>№</th>
              <th>Hamkor rasm</th>
              <th>Hamkor url</th>
              <th>O'chirish</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data &&
              data.map((item, idx) => (
                <tr key={idx}>
                  <th>{item.id}</th>
                  <td>
                    {" "}
                    <img
                      src={item.hamkor_rasm}
                      alt="Hamkor rasmi"
                      className="rounded h-[50px] object-cover"
                      width={100}
                    />
                  </td>
                  <td>{item.hamkor_url}</td>
                  <td>
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

export default HamkorlarComponent;
