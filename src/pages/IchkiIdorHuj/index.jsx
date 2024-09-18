import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
// import Ich from "../../services/";
import Loader from "../../components/Loader";
import { BiBlock } from "react-icons/bi";
import { RxArrowTopRight } from "react-icons/rx";
import { MdEdit, MdDelete } from "react-icons/md";
import { TextWarn } from "./styled";
import APIIchkiIdorHuj from "../../services/ichkiIdoraviyHuj";

const IchkiIdorHuj = () => {
    const [data, setData] = useState([]);
    const [isEdit, setIsEdit] = useState(null);

    const [errTxt, setErrTxt] = useState(false);
    const [load, setLoad] = useState(false);

    const [file, setFile] = useState(null);
    const fayl = useRef(null);

    const getData = () => {
        APIIchkiIdorHuj.get()
            .then((res) => {
                setData(res.data);
                setLoad(false);
            })
            .catch((err) => {
                setLoad(false);
                console.log(err);
            });
    };

    const formik = useFormik({
        initialValues: {
            name_uz: "",
            name_ru: "",
            name_en: "",
        },
        onSubmit: (values) => {
            if (
                values.name_uz === "" ||
                values.name_ru === "" ||
                values.name_en === "" ||
                !fayl
            ) {
                setErrTxt(true);
                setTimeout(() => {
                    setErrTxt(false);
                }, 5000);
            } else {
                if (file) {
                    setLoad(true);
                    const data = { ...values, fayl: file };
                    APIIchkiIdorHuj.post(data)
                        .then((res) => setData(res.data))
                        .catch((err) => console.log(err));
                    formik.resetForm();
                    setFile(null);
                    if (fayl.current) {
                        fayl.current.value = "";
                    }
                }
            }
        },
    });

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleChangeEdit = (e) => {
        setIsEdit({
            ...isEdit,
            [e.target.name]: e.target.value,
        });
    };

    const onEdit = ({ id, name_uz, name_ru, name_en }, boolean) => {
        if (boolean) {
            setLoad(true);
            const { id, ...res } = isEdit;
            const data = res;
            APIIchkiIdorHuj.patch(id, data)
                .then(() => {
                    getData();
                })
                .catch((err) => console.log(err));
            setIsEdit(null);
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setIsEdit({ id, name_uz, name_ru, name_en });
            }
        }
    };

    const onDel = (id) => {
        if (isEdit) {
            alert("Siz tahrirlash jarayonidasiz!");
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setLoad(true);
                APIIchkiIdorHuj.del(id)
                    .then(() => {
                        getData();
                        setIsEdit(null);
                    })
                    .catch((err) => console.log(err));
            }
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="relative">
            <div
                className={`${
                    !load && "hidden "
                } z-50 fixed top-[60px] right-[15px] w-[calc(100%-310px)] h-[100vh] bg-[#0000002d] border boredr-[red] `}
            >
                <div className="w-full h-full flex justify-center items-center relative">
                    <Loader />
                </div>
            </div>
            <div className="w-full p-[10px] -z-10">
                <h1 className="text-center text-[1.8rem] font-medium mt-4">
                    Ichki idoraviy hujjatlar
                </h1>
                <div className="w-full my-12">
                    <div>
                        <h1 className="text-[1.4rem] font-medium">Fayl nomi</h1>
                        <form
                            className="flex flex-col items-center gap-2"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="flex justify-start gap-4">
                                <label className="w-[25%]" htmlFor="name_uz">
                                    <h3>Nom uz</h3>
                                    <textarea
                                        className="w-full input input-bordered px-[7px]"
                                        type="text"
                                        id="name_uz"
                                        value={formik.values.name_uz}
                                        onChange={formik.handleChange}
                                    />
                                </label>
                                <label className="w-[25%]" htmlFor="name_ru">
                                    <h3>Nom ru</h3>
                                    <textarea
                                        className="w-full input input-bordered px-[7px]"
                                        type="text"
                                        id="name_ru"
                                        value={formik.values.name_ru}
                                        onChange={formik.handleChange}
                                    />
                                </label>
                                <label className="w-[25%]" htmlFor="name_en">
                                    <h3>Nom en</h3>
                                    <textarea
                                        className="w-full input input-bordered px-[7px]"
                                        type="text"
                                        id="name_en"
                                        value={formik.values.name_en}
                                        onChange={formik.handleChange}
                                    />
                                </label>
                                {/* Rasm */}
                                <label className="w-[33.33%]" htmlFor="fayl">
                                    Fayl
                                    <input
                                        ref={fayl}
                                        onChange={handleChange}
                                        type="file"
                                        id="fayl"
                                        name="fayl"
                                        className={`${
                                            !file &&
                                            "file-input-error text-red-600"
                                        } w-full file-input file-input-bordered`}
                                    />
                                </label>
                            </div>
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
                        <div className="collapse collapse-arrow">
                            <input type="checkbox" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium bg-gray-200">
                                Rektorat lavozimlari:
                            </div>
                            <div className="collapse-content">
                                {data?.length !== 0 ? (
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
                                            {data?.length !== 0 &&
                                                data.map((item, idx) => (
                                                    <tr key={item.id}>
                                                        <th>{idx + 1}</th>
                                                        <td>
                                                            {isEdit?.id ===
                                                            item.id ? (
                                                                <textarea
                                                                    type="text"
                                                                    name="name_uz"
                                                                    id="name_uz"
                                                                    className="w-full input input-bordered px-[7px]"
                                                                    onChange={
                                                                        handleChangeEdit
                                                                    }
                                                                    value={
                                                                        isEdit.name_uz
                                                                    }
                                                                />
                                                            ) : (
                                                                item.name_uz
                                                            )}
                                                        </td>
                                                        <td>
                                                            {isEdit?.id ===
                                                            item.id ? (
                                                                <textarea
                                                                    type="text"
                                                                    name="name_ru"
                                                                    id="name_ru"
                                                                    className="w-full input input-bordered px-[7px]"
                                                                    onChange={
                                                                        handleChangeEdit
                                                                    }
                                                                    value={
                                                                        isEdit.name_ru
                                                                    }
                                                                />
                                                            ) : (
                                                                item.name_ru
                                                            )}
                                                        </td>
                                                        <td>
                                                            {isEdit?.id ===
                                                            item.id ? (
                                                                <textarea
                                                                    type="text"
                                                                    name="name_en"
                                                                    id="name_en"
                                                                    className="w-full input input-bordered px-[7px]"
                                                                    onChange={
                                                                        handleChangeEdit
                                                                    }
                                                                    value={
                                                                        isEdit.name_en
                                                                    }
                                                                />
                                                            ) : (
                                                                item.name_en
                                                            )}
                                                        </td>
                                                        <td className="flex gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    onEdit(
                                                                        item,
                                                                        isEdit?.id ===
                                                                            item.id
                                                                    )
                                                                }
                                                                className={` ${
                                                                    isEdit?.id ===
                                                                    item.id
                                                                        ? "bg-blue-400 hover:bg-blue-600"
                                                                        : "bg-gray-400 hover:bg-gray-600"
                                                                } flex items-center gap-2  rounded-md py-1 px-4 text-white font-medium active:scale-95`}
                                                            >
                                                                {isEdit?.id ===
                                                                item.id ? (
                                                                    <>
                                                                        <span>
                                                                            Jo'natish
                                                                        </span>
                                                                        <RxArrowTopRight />
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span>
                                                                            Tahrirlash
                                                                        </span>
                                                                        <MdEdit />
                                                                    </>
                                                                )}
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    onDel(
                                                                        item.id
                                                                    )
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
                                    <div className="ms-4 text-red-600">
                                        Ma'lumot mavjud emas!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IchkiIdorHuj;
