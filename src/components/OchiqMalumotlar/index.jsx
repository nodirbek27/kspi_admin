import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { RxArrowTopRight } from "react-icons/rx";
import { MdEdit, MdDelete } from "react-icons/md";
import * as Yup from "yup";
import Loader from "../../components/Loader";
import APIOchiqMalumotlar from "../../services/ochiqMalumotlar";

const OchiqMalumotlar = () => {
    const [data, setData] = useState([]);

    const [isEdit, setIsEdit] = useState(null);
    // Rasm
    const [file, setFile] = useState(null);
    // const rasm = useRef(null);
    // load
    const [load, setLoad] = useState(true);

    const fileRaf = useRef();

    const getData = () => {
        APIOchiqMalumotlar.get()
            .then((res) => {
                setData(res.data);
                setLoad(false);
            })
            .catch((err) => {
                setLoad(false);
                console.log(err);
            });
    };

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
    });

    const formik = useFormik({
        initialValues: {
            name_uz: "",
            name_ru: "",
            name_en: "",
        },
        validationSchema,
        onSubmit: (values) => {
            if (file) {
                setLoad(true);
                const data = { ...values, fayl: file };
                APIOchiqMalumotlar.post(data)
                    .then(() => getData())
                    .catch((err) => console.log(err));
                if (fileRaf.current) {
                    fileRaf.current.value = "";
                }
                setLoad(false);
                setFile(null);
                formik.resetForm();
            }
        },
    });

    // Rasm
    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    // onDelN
    const onDelN = (id) => {
        if (isEdit) {
            alert("Siz tahrirlash jarayonidasiz!");
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setLoad(true);
                APIOchiqMalumotlar.del(id)
                    .then(() => {
                        getData();
                        setIsEdit(null);
                    })
                    .catch((err) => console.log(err));
            }
        }
    };

    const onEditN = (item, boolean) => {
        if (boolean) {
            setLoad(true);
            const { id, fayl, ...res } = isEdit;
            let data = res;
            if (file) {
                data = { ...res, fayl: file };
            }
            APIOchiqMalumotlar.patch(item.id, data)
                .then(() => {
                    getData();
                })
                .catch((err) => console.log(err));
            setIsEdit(null);
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setIsEdit({ ...item });
            }
        }
    };

    const handleChangeEditN = (e) => {
        setIsEdit({
            ...isEdit,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        setLoad(true);
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
                    Ochiq ma'lumotlar
                </h1>
                <div className="my-10">
                    <h1 className="text-[1.4rem] font-medium mb-2">
                        Hujjatlar nomi
                    </h1>
                    <div className="flex flex-col gap-4">
                        <form
                            className="w-full flex flex-col gap-2"
                            onSubmit={formik.handleSubmit}
                        >
                            {/* Lavozim */}
                            <div className="w-full flex gap-2">
                                <label
                                    className="w-[33.33%]"
                                    htmlFor="lavozim_uz"
                                >
                                    Nom uz
                                    <textarea
                                        type="text"
                                        id="name_uz"
                                        className={`${
                                            formik.errors.name_uz &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik.values.name_uz}
                                        onChange={formik.handleChange}
                                    />
                                </label>
                                <label className="w-[33.33%]" htmlFor="name_ru">
                                    Nom ru
                                    <textarea
                                        type="text"
                                        id="name_ru"
                                        className={`${
                                            formik.errors.name_ru &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik.values.name_ru}
                                        onChange={formik.handleChange}
                                    />
                                </label>
                                <label className="w-[33.33%]" htmlFor="name_en">
                                    Nom en
                                    <textarea
                                        type="text"
                                        id="name_en"
                                        className={`${
                                            formik.errors.name_en &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik.values.name_en}
                                        onChange={formik.handleChange}
                                    />
                                </label>
                            </div>
                            <div className="w-full flex gap-2">
                                {/* Fayl */}
                                <label className="w-[33.33%]" htmlFor="fayl">
                                    Fayl
                                    <input
                                        ref={fileRaf}
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
                                type="submit"
                                className="w-full bg-blue-400 hover:bg-blue-600 flex justify-center items-center gap-1 h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95 "
                            >
                                JO'NATISH
                            </button>
                        </form>

                        <div className="my-10">
                            <div className="collapse collapse-arrow">
                                <input type="checkbox" name="my-accordion-2" />
                                <div className="collapse-title text-xl font-medium bg-gray-200">
                                    Joylangan hujjatlar:
                                </div>
                                <div className="collapse-content">
                                    <ol className="list-decimal flex flex-col gap-3 ps-4 my-4">
                                        {data?.length !== 0 && data ? (
                                            data?.map((item) => (
                                                <li
                                                    className="w-full border bg-gray-50 shadow-md p-2"
                                                    key={item.id}
                                                >
                                                    <div className="flex flex-col items-start gap-4">
                                                        <div className="flex flex-col gap-y-4 w-full">
                                                            <div className="w-[200px] h-auto flex gap-2 mt-4 ms-4">
                                                                <b>Fayl: </b><a className="text-[blue]" href={item.fayl} target="_blank"  rel="noreferrer" >{item.fayl}</a>
                                                            </div>
                                                            {isEdit?.id ===
                                                                item.id && (
                                                                <label htmlFor="rasm">
                                                                    <div className="text-red-600 font-medium">
                                                                        Agar
                                                                        fayl
                                                                        jo'natilmasa
                                                                        o'z
                                                                        holida
                                                                        qoladi!
                                                                    </div>
                                                                    <input
                                                                        ref={
                                                                            fileRaf
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        type="file"
                                                                        id="fayl"
                                                                        name="fayl"
                                                                        className="w-[400px] file-input file-input-bordered mt-2"
                                                                    />
                                                                </label>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="overflow-x-auto">
                                                                <table className="table">
                                                                    {/* head */}
                                                                    <thead>
                                                                        <tr>
                                                                            <th></th>
                                                                            <th>
                                                                                Uz
                                                                            </th>
                                                                            <th>
                                                                                Ru
                                                                            </th>
                                                                            <th>
                                                                                En
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {/* Nomi */}
                                                                        <tr>
                                                                            <th>
                                                                                Nomi
                                                                            </th>
                                                                            <td>
                                                                                {isEdit?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="name_uz"
                                                                                        id="name_uz"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditN
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
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditN
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
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditN
                                                                                        }
                                                                                        value={
                                                                                            isEdit.name_en
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.name_en
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div className="w-full flex justify-end">
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() =>
                                                                        onEditN(
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
                                                                        onDelN(
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
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <div className="text-red-600">
                                                Ma'lumot mavjud emas!
                                            </div>
                                        )}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OchiqMalumotlar;
