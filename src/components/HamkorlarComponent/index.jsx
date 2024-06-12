import React, {useState} from "react";
import { useFormik } from "formik";
import { RxArrowTopRight } from "react-icons/rx";
import { TextWarn } from "./styled";
import { BiBlock } from "react-icons/bi";
import APIHamkor from "../../services/hamkor";

const HamkorlarComponent = () => {
  const [errTxt, setErrTxt] = useState(false);
  const [data, setData] = useState(null);

  const getData = () =>
    APIHamkor.get()
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
        console.log(data);

  const formik = useFormik({
    initialValues: {
        name_uz: "",
        name_ru: "",
    },
    onSubmit: (values) => {
        if (
            values.hamkor_rasm === "" ||
            values.hamkor_url === "" 
        ) {
            setErrTxt(true);
            setTimeout(() => {
                setErrTxt(false);
            }, 5000);
        } else {
            APIHamkor.post(values)
                .then(() => getData())
                .catch((err) => console.log(err));
            formik.resetForm();
        }
    },
});

  return (
    <div className="w-full">
      <div>
        <h1 className="text-[1.4rem] font-medium text-center my-5">Hamkor qo'shish</h1>
        <form
          className="flex items-center gap-2 p-4"
          onSubmit={formik.handleSubmit}
        >
          <label className="w-[25%]" htmlFor="hamkor_rasm">
            <h3>Hamkor emblemasi</h3>
            <input
              className="w-full file-input file-input-info file-input-bordered "
              type="file"
              id="hamkor_rasm"
              value={formik.values.hamkor_rasm}
              onChange={formik.handleChange}
            />
          </label>
          <label className="w-[25%]" htmlFor="hamkor_url">
            <h3>Hamkor sayt manzili</h3>
            <textarea
              className="w-full input input-bordered px-[7px]"
              type="text"
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
    </div>
  );
};

export default HamkorlarComponent;
