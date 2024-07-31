import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { RxArrowTopRight } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { TextWarn } from "./styled";
import { BiBlock } from "react-icons/bi";
import APIImtihonKuzatish from "../../services/imtihonKuzatish";
import * as Yup from "yup";
import Loader from "../Loader";

const ImtihonKuzatish = () => {
    const [dataYonalish, setDataYonalish] = useState([]);
    const [havolalar, setHavolalar] = useState([]);
    const [warn, setWarn] = useState(false);
    const [errTxt, setErrTxt] = useState(false);

    // load
    const [load, setLoad] = useState(true);

    const getDataYonalish = () => {
        APIImtihonKuzatish.get()
            .then((res) => {
                setDataYonalish(res.data);
                setLoad(false);
            })
            .catch((err) => {
                setLoad(false);
                console.log(err);
            });
    };

    const getHavolalar = () => {
        APIImtihonKuzatish.getN()
            .then((res) => {
                setHavolalar(res.data);
                setLoad(false);
            })
            .catch((err) => {
                setLoad(false);
                console.log(err);
            });
    };

    const validationSchemaOne = Yup.object().shape({
        name_uz: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        name_ru: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        name_en: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
    });

    const validationSchema = Yup.object().shape({
        name_uz: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        name_ru: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        name_en: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        link: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
    });

    const formik = useFormik({
        initialValues: {
            name_uz: "",
            name_ru: "",
            name_en: "",
        },
        validationSchemaOne,
        onSubmit: (values) => {
            setErrTxt(false);
            setLoad(true);
            APIImtihonKuzatish.post(values)
                .then(() => {
                    getDataYonalish();
                })
                .catch((err) => console.log(err));
            formik.resetForm();
        },
    });

    const formik_2 = useFormik({
        initialValues: {
            efirname_id: "",
            name_uz: "",
            name_ru: "",
            name_en: "",
            link: "",
        },
        validationSchema,
        onSubmit: (values) => {
            if (values.efirname_id === "0" || values.efirname_id === "") {
                setWarn(true);
            } else {
                setLoad(true);
                APIImtihonKuzatish.postN(values)
                    .then(() => getHavolalar())
                    .catch((err) => console.log(err));
                formik_2.resetForm();
            }
            setWarn(false);

        },
    });

    useEffect(() => {

        
        console.log(warn);
    }, [warn])
    const onDel = (id) => {
        const res = window.confirm("Ishonchingiz komilmi?");
        if (res) {
            setLoad(true);
            APIImtihonKuzatish.del(id)
                .then(() => {
                    getDataYonalish();
                })
                .catch((err) => console.log(err));
        }
    };

    // onDelN
    const onDelN = (id) => {
        const res = window.confirm("Ishonchingiz komilmi?");
        if (res) {
            setLoad(true);
            APIImtihonKuzatish.delN(id)
                .then(() => {
                    getHavolalar();
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        setLoad(true);
        getDataYonalish();
        getHavolalar();
    }, []);

    // DELETE
    return (
        <div className="relative">
            {load && (
                <div className="z-50 fixed top-[60px] right-[15px] w-[calc(100%-310px)] h-[100vh] bg-[#0000002d] border boredr-[red]">
                    <div className="w-full h-full flex justify-center items-center relative">
                        <Loader />
                    </div>
                </div>
            )}
            <div className="w-full p-[10px] -z-10">
                <h1 className="text-center text-[1.8rem] font-medium mt-4">
                    Imtihonlarni kuzatish
                </h1>
                <div className="w-full my-12">
                    <div>
                        <h1 className="text-[1.4rem] font-medium">
                            Imtihon yo'nalishlari
                        </h1>
                        <form
                            className="flex items-center gap-2"
                            onSubmit={formik.handleSubmit}
                        >
                            <label className="w-[25%]" htmlFor="name_uz">
                                <h3>Yo'nalish uz</h3>
                                <textarea
                                    className="w-full input input-bordered px-[7px]"
                                    type="text"
                                    id="name_uz"
                                    value={formik.values.name_uz}
                                    onChange={formik.handleChange}
                                />
                            </label>
                            <label className="w-[25%]" htmlFor="name_ru">
                                <h3>Yo'nalish ru</h3>
                                <textarea
                                    className="w-full input input-bordered px-[7px]"
                                    type="text"
                                    id="name_ru"
                                    value={formik.values.name_ru}
                                    onChange={formik.handleChange}
                                />
                            </label>
                            <label className="w-[25%]" htmlFor="name_en">
                                <h3>Yo'nalish en</h3>
                                <textarea
                                    className="w-full input input-bordered px-[7px]"
                                    type="text"
                                    id="name_en"
                                    value={formik.values.name_en}
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
                                JO'NATISH
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
                    <div className="mt-5">
                        <div className="text-xl font-medium">Yo'nalishlar:</div>
                        <div>
                            {dataYonalish?.length !== 0 ? (
                                <table className="table -z-0">
                                    <thead>
                                        <tr className="font-medium text-black">
                                            <th></th>
                                            <th>Uz</th>
                                            <th>Ru</th>
                                            <th>En</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataYonalish?.length !== 0 &&
                                            dataYonalish.map((item, idx) => (
                                                <tr key={item.id}>
                                                    <th>{idx + 1}</th>
                                                    <td>{item.name_uz}</td>
                                                    <td>{item.name_ru}</td>
                                                    <td>{item.name_en}</td>
                                                    <td className="flex gap-2">
                                                        <button
                                                            onClick={() =>
                                                                onDel(item.id)
                                                            }
                                                            className="flex items-center gap-2 bg-red-500 rounded-md py-1 px-4 text-white font-medium hover:bg-red-600 active:scale-95"
                                                        >
                                                            <span>
                                                                O'CHIRISH
                                                            </span>
                                                            <MdDelete />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="font-medium text-lg">
                                    Yo'nalishlar mavjud emas
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full my-12">
                    <div>
                        <h1 className="text-[1.4rem] font-medium">
                            Link qo'shish
                        </h1>
                        <form
                            className="flex flex-col gap-2"
                            onSubmit={formik_2.handleSubmit}
                        >
                            <label className="w-[25%]" htmlFor="efirname_id">
                                <h3>Yo'nalish</h3>
                                <select
                                    name="efirname_id"
                                    className="select select-bordered w-full"
                                    id="efirname_id"
                                    value={formik_2.values.efirname_id}
                                    onChange={formik_2.handleChange}
                                >
                                    <option value={0}>
                                        Yo'nalish tanlanmagan
                                    </option>
                                    {dataYonalish?.length !== 0 &&
                                        dataYonalish.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name_uz}
                                            </option>
                                        ))}
                                </select>
                            </label>
                            <div className="flex gap-2 items-center">
                                <label className="w-[25%]" htmlFor="name_uz">
                                    <h3>Nomi uz</h3>
                                    <textarea
                                        className="w-full input input-bordered px-[7px]"
                                        type="text"
                                        id="name_uz"
                                        value={formik_2.values.name_uz}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>
                                <label className="w-[25%]" htmlFor="name_ru">
                                    <h3>Nomi ru</h3>
                                    <textarea
                                        className="w-full input input-bordered px-[7px]"
                                        type="text"
                                        id="name_ru"
                                        value={formik_2.values.name_ru}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>
                                <label className="w-[25%]" htmlFor="name_en">
                                    <h3>Nomi en</h3>
                                    <textarea
                                        className="w-full input input-bordered px-[7px]"
                                        type="text"
                                        id="name_en"
                                        value={formik_2.values.name_en}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>
                                <label className="w-[25%]" htmlFor="link">
                                    <h3>Havola</h3>
                                    <textarea
                                        className="w-full input input-bordered px-[7px]"
                                        type="text"
                                        id="link"
                                        value={formik_2.values.link}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>
                            </div>
                            <button
                                className={`${
                                    warn
                                        ? "bg-red-500 hover:bg-red-600"
                                        : "bg-blue-400 hover:bg-blue-600"
                                } flex justify-center items-center gap-1 w-full h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95`}
                                type="submit"
                            >
                                JO'NATISH
                                {warn ? (
                                    <BiBlock />
                                ) : (
                                    <RxArrowTopRight className="font-bold text-[20px] mt-[2px]" />
                                )}
                            </button>
                        </form>
                        <TextWarn
                            className={`${
                                warn ? "inline-block" : "hidden"
                            } w-full font-medium text-center`}
                        >
                            Yo'nalish tanlanmagan!
                        </TextWarn>
                    </div>
                    <div className="mt-5">
                        <div className="text-xl font-medium">Havolalar:</div>
                        <div>
                            {havolalar?.length !== 0 ? (
                                <table className="table">
                                    <thead>
                                        <tr className="font-medium text-black">
                                            <th></th>
                                            <th>Uz</th>
                                            <th>Ru</th>
                                            <th>En</th>
                                            <th>Havola</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {havolalar?.length !== 0 &&
                                            havolalar.map((item, idx) => (
                                                <tr key={item.id}>
                                                    <th>{idx + 1}</th>
                                                    <td>{item.name_uz}</td>
                                                    <td>{item.name_ru}</td>
                                                    <td>{item.name_en}</td>
                                                    <td>{item.link}</td>
                                                    <td className="flex gap-2">
                                                        <button
                                                            onClick={() =>
                                                                onDelN(item.id)
                                                            }
                                                            className="flex items-center gap-2 bg-red-500 rounded-md py-1 px-4 text-white font-medium hover:bg-red-600 active:scale-95"
                                                        >
                                                            <span>
                                                                O'CHIRISH
                                                            </span>
                                                            <MdDelete />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="font-medium text-lg">
                                    Nomzodlar mavjud emas
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImtihonKuzatish;
