import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { RxArrowTopRight } from "react-icons/rx";
import { BiBlock } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import APIProfessorlarFikri from "../../services/xalqaroProfessorFikri";
import { TextWarn } from "./styled";
import { RiDeleteBin5Line } from "react-icons/ri";

const XalqaroProfessorlarFikri = () => {
  const [errTxt, setErrTxt] = useState(false);
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const rasm = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    APIProfessorlarFikri.get()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      title_uz: "",
      title_ru: "",
      title_en: "",
      fikr_uz: "",
      fikr_ru: "",
      fikr_en: "",
      fish_uz: "",
      fish_ru: "",
      fish_en: "",
      lavozim_uz: "",
      lavozim_ru: "",
      lavozim_en: "",
      link: "",
    },
    onSubmit: (values) => {
      if (values.link === "") {
        setErrTxt(true);
        setTimeout(() => {
          setErrTxt(false);
        }, 5000);
      } else {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });
        if (file) {
          formData.append("rasm", file);
        }

        const apiCall = editMode
          ? APIProfessorlarFikri.put(editId, formData)
          : APIProfessorlarFikri.post(formData);

        apiCall
          .then(() => {
            getData();
            formik.resetForm();
            setFile(null);
            if (rasm.current) {
              rasm.current.value = "";
            }
            setEditMode(false);
            setEditId(null);
          })
          .catch((err) => console.log(err));
      }
    },
  });

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEdit = (item) => {
    formik.setValues({
      title_uz: item.title_uz,
      title_ru: item.title_ru,
      title_en: item.title_en,
      fikr_uz: item.fikr_uz,
      fikr_ru: item.fikr_ru,
      fikr_en: item.fikr_en,
      fish_uz: item.fish_uz,
      fish_ru: item.fish_ru,
      fish_en: item.fish_en,
      lavozim_uz: item.lavozim_uz,
      lavozim_ru: item.lavozim_ru,
      lavozim_en: item.lavozim_en,
      link: item.link,
    });
    setEditMode(true);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    await APIProfessorlarFikri.del(id);
    getData();
  };

  return (
    <div className="w-full p-4">
      <div>
        <h1 className="text-[1.4rem] font-bold text-center my-5">
          Xorijlik professorlar fikri
        </h1>
        <h2 className="text-[1.4rem] font-semibold my-5">Fikr qo'shish</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4"
          onSubmit={formik.handleSubmit}
        >
          {/* Sarlavha */}
          <label className="w-full" htmlFor="title_uz">
            <h3>Sarlavha Uz</h3>
            <input
              className="w-full input input-bordered px-[7px]"
              id="title_uz"
              value={formik.values.title_uz}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title_uz && formik.errors.title_uz && (
              <TextWarn>{formik.errors.title_uz}</TextWarn>
            )}
          </label>
          <label className="w-full" htmlFor="title_ru">
            <h3>Sarlavha Ru</h3>
            <input
              className="w-full input input-bordered px-[7px]"
              id="title_ru"
              value={formik.values.title_ru}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title_ru && formik.errors.title_ru && (
              <TextWarn>{formik.errors.title_ru}</TextWarn>
            )}
          </label>
          <label className="w-full" htmlFor="title_en">
            <h3>Sarlavha En</h3>
            <input
              className="w-full input input-bordered px-[7px]"
              id="title_en"
              value={formik.values.title_en}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title_en && formik.errors.title_en && (
              <TextWarn>{formik.errors.title_en}</TextWarn>
            )}
          </label>
          {/* Fikr */}
          <label className="w-full" htmlFor="fikr_uz">
            <h3>Fikr Uz</h3>
            <input
              className="w-full input input-bordered px-[7px]"
              id="fikr_uz"
              value={formik.values.fikr_uz}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fikr_uz && formik.errors.fikr_uz && (
              <TextWarn>{formik.errors.fikr_uz}</TextWarn>
            )}
          </label>
          <label className="w-full" htmlFor="fikr_ru">
            <h3>Fikr Ru</h3>
            <input
              className="w-full input input-bordered px-[7px]"
              id="fikr_ru"
              value={formik.values.fikr_ru}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fikr_ru && formik.errors.fikr_ru && (
              <TextWarn>{formik.errors.fikr_ru}</TextWarn>
            )}
          </label>
          <label className="w-full" htmlFor="fikr_en">
            <h3>Fikr En</h3>
            <input
              className="w-full input input-bordered px-[7px]"
              id="fikr_en"
              value={formik.values.fikr_en}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fikr_en && formik.errors.fikr_en && (
              <TextWarn>{formik.errors.fikr_en}</TextWarn>
            )}
          </label>
          {/* FISH */}
          <label className="w-full" htmlFor="fish_uz">
            <h3>F.I.Sh Uz</h3>
            <input
              className="w-full input input-bordered px-[7px]"
              id="fish_uz"
              value={formik.values.fish_uz}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fish_uz && formik.errors.fish_uz && (
              <TextWarn>{formik.errors.fish_uz}</TextWarn>
            )}
          </label>
          <label className="w-full" htmlFor="fish_ru">
            <h3>F.I.Sh Ru</h3>
            <input
              className="w-full input input-bordered px-[7px]"
              id="fish_ru"
              value={formik.values.fish_ru}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fish_ru && formik.errors.fish_ru && (
              <TextWarn>{formik.errors.fish_ru}</TextWarn>
            )}
          </label>
          <label className="w-full" htmlFor="fish_en">
            <h3>F.I.Sh En</h3>
            <input
              className="w-full input input-bordered px-[7px]"
              id="fish_en"
              value={formik.values.fish_en}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fish_en && formik.errors.fish_en && (
              <TextWarn>{formik.errors.fish_en}</TextWarn>
            )}
          </label>
          {/* Lavozim */}
          <label className="w-full" htmlFor="lavozim_uz">
            <h3>Lavozim Uz</h3>
            <input
              className="w-full input input-bordered px-[7px]"
              id="lavozim_uz"
              value={formik.values.lavozim_uz}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lavozim_uz && formik.errors.lavozim_uz && (
              <TextWarn>{formik.errors.lavozim_uz}</TextWarn>
            )}
          </label>
          <label className="w-full" htmlFor="lavozim_ru">
            <h3>Lavozim Ru</h3>
            <input
              className="w-full input input-bordered px-[7px]"
              id="lavozim_ru"
              value={formik.values.lavozim_ru}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lavozim_ru && formik.errors.lavozim_ru && (
              <TextWarn>{formik.errors.lavozim_ru}</TextWarn>
            )}
          </label>
          <label className="w-full" htmlFor="lavozim_en">
            <h3>Lavozim En</h3>
            <input
              className="w-full input input-bordered px-[7px]"
              id="lavozim_en"
              value={formik.values.lavozim_en}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lavozim_en && formik.errors.lavozim_en && (
              <TextWarn>{formik.errors.lavozim_en}</TextWarn>
            )}
          </label>
          {/* Rasm */}
          <label className="w-full" htmlFor="rasm">
            <h3>Professor rasmi</h3>
            <input
              ref={rasm}
              onChange={handleChange}
              className="w-full file-input file-input-bordered file-input-info"
              type="file"
              id="rasm"
            />
          </label>
          <label className="w-full" htmlFor="link">
            <h3>YouTube linki</h3>
            <input
              className="w-full input input-bordered px-[7px]"
              id="link"
              value={formik.values.link}
              onChange={formik.handleChange}
            />
          </label>
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
          Mavjud fikrlar
        </h2>
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>№</th>
              <th>Rasm/Link</th>
              <th>Title</th>
              <th>Fikr</th>
              <th>F.I.Sh</th>
              <th>Lavozim</th>
              <th>O'chirish/Tahrirlash</th>
            </tr>
          </thead>
          {data &&
            data.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      src={item.rasm}
                      alt="professor rasmi"
                      className="rounded h-[50px] object-cover"
                      width={100}
                    />
                  </td>
                  <td>{item.title_uz}</td>
                  <td>{item.fikr_uz}</td>
                  <td>{item.fish_uz}</td>
                  <td>{item.lavozim_uz}</td>
                  <td>
                  <CiEdit className="text-green-600 cursor-pointer h-5 w-5" onClick={() => handleEdit(item)} />
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <td>
                  </td>
                  <td>{item.title_ru}</td>
                  <td>{item.fikr_ru}</td>
                  <td>{item.fish_ru}</td>
                  <td>{item.lavozim_ru}</td>
                  <td>
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <td>{item.link}
                  </td>
                  <td>{item.title_en}</td>
                  <td>{item.fikr_en}</td>
                  <td>{item.fish_en}</td>
                  <td>{item.lavozim_en}</td>
                  <td>
                    <RiDeleteBin5Line
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 cursor-pointer h-5 w-5"
                    />
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};

export default XalqaroProfessorlarFikri;
