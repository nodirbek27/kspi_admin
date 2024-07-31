import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { RxArrowTopRight } from "react-icons/rx";
import { MdEdit, MdDelete } from "react-icons/md";
import { TextWarn } from "../Rectorat/styled";
import { BiBlock } from "react-icons/bi";
import APITuzilmaBolim from "../../services/tuzilmaBolim";
import * as Yup from "yup";
import Loader from "../Loader";

const Bolimlar = () => {
    const [dataBolim, setDataBolim] = useState([]);
    const [dataRahbar, setDataRahbar] = useState([]);
    const [dataHodim, setDataHodim] = useState([]);
    const [warn, setWarn] = useState(false);
    const [warnH, setWarnH] = useState(false);
    const [errTxt, setErrTxt] = useState(false);
    const [errLog, setErrLog] = useState(null);

    const [isEdit, setIsEdit] = useState(null);
    const [isEditR, setIsEditR] = useState(null);
    const [isEditH, setIsEditH] = useState(null);
    // Rasm
    const [fileR, setFileR] = useState(null);
    const [fileH, setFileH] = useState(null);
    const rasmR = useRef(null);
    const rasmH = useRef(null);
    // load file
    const [load, setLoad] = useState(true);

    const getDataBolim = () => {
        APITuzilmaBolim.get()
            .then((res) => {
                setDataBolim(res.data);
                setLoad(false);
            })
            .catch((err) => {
                setLoad(false);
                console.log(err);
            });
    };

    const getDataRahbar = () => {
        APITuzilmaBolim.getR()
            .then((res) => {
                setDataRahbar(res.data);
                setLoad(false);
            })
            .catch((err) => {
                setLoad(false);
                console.log(err);
            });
    };

    const getDataHodim = () => {
        APITuzilmaBolim.getH()
            .then((res) => {
                setDataHodim(res.data);
                setLoad(false);
            })
            .catch((err) => {
                setLoad(false);
                console.log(err);
            });
    };

    const validationSchemaR = Yup.object().shape({
        lavozim_uz: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        lavozim_ru: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        lavozim_en: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        fish_uz: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        fish_ru: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        fish_en: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        unvon_uz: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        unvon_ru: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        unvon_en: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        qabul_soati_uz: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        qabul_soati_ru: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        qabul_soati_en: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        telefon_nomer: Yup.number()
            .min(3, "Juda kam!")
            .required("To'ldirilishi shart!"),
        tg_username: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
    });

    const validationSchemaH = Yup.object().shape({
        lavozim_uz: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        lavozim_ru: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        lavozim_en: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        fish_uz: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        fish_ru: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        fish_en: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        unvon_uz: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        unvon_ru: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        unvon_en: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        telefon_nomer: Yup.number()
            .min(3, "Juda kam!")
            .required("To'ldirilishi shart!"),
    });

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
                values.name_en === ""
            ) {
                setErrTxt(true);
                setTimeout(() => {
                    setErrTxt(false);
                }, 5000);
            } else {
                setLoad(true);
                APITuzilmaBolim.post(values)
                    .then(() => {
                        getDataBolim();
                    })
                    .catch((err) => console.log(err));
                formik.resetForm();
            }
        },
    });

    const formik_2 = useFormik({
        initialValues: {
            bolim_id: "",
            lavozim_uz: "",
            lavozim_ru: "",
            lavozim_en: "",
            fish_uz: "",
            fish_ru: "",
            fish_en: "",
            unvon_uz: "",
            unvon_ru: "",
            unvon_en: "",
            qabul_soati_uz: "",
            qabul_soati_ru: "",
            qabul_soati_en: "",
            telefon_nomer: "",
            tg_username: "",
            biografiya_uz: "",
            biografiya_ru: "",
            biografiya_en: "",
        },
        validationSchema: validationSchemaR,
        onSubmit: (values) => {
            if (values.bolim_id === "0" || values.bolim_id === "") {
                setWarn(true);
            } else {
                if (fileR) {
                    setLoad(true);
                    const data = { ...values, rasm: fileR };
                    APITuzilmaBolim.postR(data)
                        .then(() => getDataRahbar())
                        .catch((err) =>
                            setErrLog(
                                JSON.parse(err?.request?.response)?.rasm[0]
                            )
                        );
                    formik_2.resetForm();
                    setFileR(null);
                    if (rasmR.current) {
                        rasmR.current.value = "";
                    }
                }
                setWarn(false);
            }
        },
    });

    const formik_3 = useFormik({
        initialValues: {
            bolim_id: "",
            lavozim_uz: "",
            lavozim_ru: "",
            lavozim_en: "",
            fish_uz: "",
            fish_ru: "",
            fish_en: "",
            unvon_uz: "",
            unvon_ru: "",
            unvon_en: "",
            telefon_nomer: "",
            bolim_boshligi: false,
        },
        validationSchema: validationSchemaH,
        onSubmit: (values) => {
            if (values.bolim_id === "0" || values.bolim_id === "") {
                setWarnH(true);
                console.log("ishlamoqdaman");
            } else {
                if (fileH) {
                    setLoad(true);
                    const data = { ...values, rasm: fileH };
                    APITuzilmaBolim.postH(data)
                        .then(() => getDataHodim())
                        .catch((err) =>
                            setErrLog(
                                JSON.parse(err?.request?.response)?.rasm[0]
                            )
                        );
                    formik_3.resetForm();
                    setFileH(null);
                    if (rasmH.current) {
                        rasmH.current.value = "";
                    }
                }
                setWarnH(false);
            }
        },
    });

    // Rasm
    const handleChange = (e) => {
        setFileR(e.target.files[0]);
    };

    const handleChangeH = (e) => {
        setFileH(e.target.files[0]);
    };

    const onDel = (id) => {
        if (isEdit) {
            alert("Siz tahrirlash jarayonidasiz!");
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setLoad(true);
                APITuzilmaBolim.del(id)
                    .then(() => {
                        getDataBolim();
                        setIsEdit(null);
                    })
                    .catch((err) => console.log(err));
            }
        }
    };

    const onDelR = (id) => {
        if (isEditR) {
            alert("Siz tahrirlash jarayonidasiz!");
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setLoad(true);
                APITuzilmaBolim.delR(id)
                    .then(() => {
                        getDataRahbar();
                        setIsEditR(null);
                    })
                    .catch((err) => console.log(err));
            }
        }
    };

    const onDelH = (id) => {
        if (isEditH) {
            alert("Siz tahrirlash jarayonidasiz!");
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setLoad(true);
                APITuzilmaBolim.delH(id)
                    .then(() => {
                        getDataHodim();
                        setIsEditH(null);
                    })
                    .catch((err) => {
                        setLoad(false);
                        console.log(err);
                    });
            }
        }
    };

    const onEdit = ({ id, name_uz, name_ru, name_en }, boolean) => {
        if (boolean) {
            setLoad(true);
            const { id, ...res } = isEdit;
            const data = res;
            APITuzilmaBolim.patch(id, data)
                .then(() => {
                    getDataBolim();
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

    const onEditR = (item, boolean) => {
        if (boolean) {
            setLoad(true);
            const { id, rasm, ...res } = isEditR;
            let data = res;
            if (fileR) {
                data = { ...res, rasm: fileR };
            }
            APITuzilmaBolim.patchR(item.id, data)
                .then(() => {
                    getDataRahbar();
                })
                .catch((err) => console.log(err));
            setIsEditR(null);
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setIsEditR({ ...item });
            }
        }
    };

    const onEditH = (item, boolean) => {
        if (boolean) {
            setLoad(true);
            const { id, rasm, ...res } = isEditH;
            let data = res;
            if (fileH) {
                data = { ...res, rasm: fileH };
            }
            APITuzilmaBolim.patchH(item.id, data)
                .then(() => {
                    getDataHodim();
                })
                .catch((err) => console.log(err));
            setIsEditH(null);
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setIsEditH({ ...item });
            }
        }
    };

    const handleChangeEdit = (e) => {
        setIsEdit({
            ...isEdit,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeEditR = (e) => {
        setIsEditR({
            ...isEditR,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeEditH = (e) => {
        if (e.target.type === "checkbox") {
            setIsEditH({
                ...isEditH,
                [e.target.name]: e.target.checked,
            });
        } else {
            setIsEditH({
                ...isEditH,
                [e.target.name]: e.target.value,
            });
        }
    };

    useEffect(() => {
        formik_2.values.bolim_id === "0" ? setWarn(true) : setWarn(false);
    }, [formik_2.values.bolim_id]);

    useEffect(() => {
        formik_3.values.bolim_id === "0" ? setWarnH(true) : setWarnH(false);
    }, [formik_3.values.bolim_id]);

    useEffect(() => {
        setLoad(true);
        getDataBolim();
        getDataRahbar();
        getDataHodim();
    }, []);

    return (
        <div className="relative">
            <div
                className={`${
                    !load && "hidden "
                } z-50 fixed top-[60px] right-[15px] w-[calc(100%-310px)] h-[100vh] bg-[#0000002d] border boredr-[red] `}
            >
                <div className="w-full h-full flex justify-center items-center relative">
                    {errLog && (
                        <p className="translate-y-[-200px] text-[red]">
                            {errLog}
                        </p>
                    )}
                    <Loader />
                </div>
            </div>
            <div className="w-full p-[10px] -z-10">
                <h1 className="text-center text-[1.8rem] font-medium mt-4">
                    Bo'limlar
                </h1>
                <div className="w-full my-12">
                    <div>
                        <h1 className="text-[1.4rem] font-medium">
                            Bo'lim yaratish
                        </h1>
                        <form
                            className="flex items-center gap-2"
                            onSubmit={formik.handleSubmit}
                        >
                            <label className="w-[25%]" htmlFor="name_uz">
                                <h3>Lavozim uz</h3>
                                <textarea
                                    className="w-full input input-bordered px-[7px]"
                                    type="text"
                                    id="name_uz"
                                    value={formik.values.name_uz}
                                    onChange={formik.handleChange}
                                />
                            </label>
                            <label className="w-[25%]" htmlFor="name_ru">
                                <h3>Lavozim ru</h3>
                                <textarea
                                    className="w-full input input-bordered px-[7px]"
                                    type="text"
                                    id="name_ru"
                                    value={formik.values.name_ru}
                                    onChange={formik.handleChange}
                                />
                            </label>
                            <label className="w-[25%]" htmlFor="name_en">
                                <h3>Lavozim en</h3>
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
                        <div className="collapse collapse-arrow">
                            <input type="checkbox" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium bg-gray-200">
                                Bo'limlar
                            </div>
                            <div className="collapse-content">
                                {dataBolim?.length !== 0 ? (
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
                                            {dataBolim?.length !== 0 &&
                                                dataBolim.map((item, idx) => (
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

                <div className="w-full border border-red-600" />

                <div className="my-10">
                    <h1 className="text-[1.4rem] font-medium mb-2">
                        Bo'lim mudirini yaratish
                    </h1>
                    <div className="flex flex-col gap-4">
                        <form
                            className="w-full flex flex-col gap-2"
                            onSubmit={formik_2.handleSubmit}
                        >
                            <div className="flex items-center gap-4">
                                <select
                                    name="bolim_id"
                                    id="bolim_id"
                                    className={`${
                                        warn && "select-error"
                                    } select select-bordered w-full max-w-xs`}
                                    value={formik_2.values.bolim_id}
                                    onChange={formik_2.handleChange}
                                >
                                    <option value="0">Birini tanlang!</option>
                                    {dataBolim?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name_uz}
                                        </option>
                                    ))}
                                </select>
                                <TextWarn
                                    className={`${
                                        warn ? "inline-block" : "hidden"
                                    } font-medium`}
                                >
                                    Iltimos lavozimni tanlang!
                                </TextWarn>
                            </div>
                            {/* Lavozim */}
                            <div className="w-full flex gap-2">
                                <label
                                    className="w-[33.33%]"
                                    htmlFor="lavozim_uz"
                                >
                                    Lavozim uz
                                    <textarea
                                        type="text"
                                        id="lavozim_uz"
                                        className={`${
                                            formik_2.errors.lavozim_uz &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.lavozim_uz}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>

                                <label
                                    className="w-[33.33%]"
                                    htmlFor="lavozim_ru"
                                >
                                    Lavozim ru
                                    <textarea
                                        type="text"
                                        id="lavozim_ru"
                                        className={`${
                                            formik_2.errors.lavozim_ru &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.lavozim_ru}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>

                                <label
                                    className="w-[33.33%]"
                                    htmlFor="lavozim_en"
                                >
                                    Lavozim en
                                    <textarea
                                        type="text"
                                        id="lavozim_en"
                                        className={`${
                                            formik_2.errors.lavozim_en &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.lavozim_en}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>
                            </div>
                            {/* FIO */}
                            <div className="w-full flex gap-2">
                                <label className="w-[33.33%]" htmlFor="fish_uz">
                                    FISH uz
                                    <textarea
                                        type="text"
                                        id="fish_uz"
                                        className={`${
                                            formik_2.errors.fish_uz &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.fish_uz}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>

                                <label className="w-[33.33%]" htmlFor="fish_ru">
                                    FISH ru
                                    <textarea
                                        type="text"
                                        id="fish_ru"
                                        className={`${
                                            formik_2.errors.fish_ru &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.fish_ru}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>

                                <label className="w-[33.33%]" htmlFor="fish_en">
                                    FISH en
                                    <textarea
                                        type="text"
                                        id="fish_en"
                                        className={`${
                                            formik_2.errors.fish_en &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.fish_en}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>
                            </div>
                            {/* Unvoni */}
                            <div className="w-full flex gap-2">
                                <label
                                    className="w-[33.33%]"
                                    htmlFor="unvon_uz"
                                >
                                    Unvon uz
                                    <textarea
                                        type="text"
                                        id="unvon_uz"
                                        className={`${
                                            formik_2.errors.unvon_uz &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.unvon_uz}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>

                                <label
                                    className="w-[33.33%]"
                                    htmlFor="unvon_ru"
                                >
                                    Unvon ru
                                    <textarea
                                        type="text"
                                        id="unvon_ru"
                                        className={`${
                                            formik_2.errors.unvon_ru &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.unvon_ru}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>

                                <label
                                    className="w-[33.33%]"
                                    htmlFor="unvon_en"
                                >
                                    Unvon en
                                    <textarea
                                        type="text"
                                        id="unvon_en"
                                        className={`${
                                            formik_2.errors.unvon_en &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.unvon_en}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>
                            </div>
                            {/* Qabul soati */}
                            <div className="w-full flex gap-2">
                                <label
                                    className="w-[33.33%]"
                                    htmlFor="qabul_soati_uz"
                                >
                                    Qabul soati uz
                                    <textarea
                                        type="text"
                                        id="qabul_soati_uz"
                                        className={`${
                                            formik_2.errors.qabul_soati_uz &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.qabul_soati_uz}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>

                                <label
                                    className="w-[33.33%]"
                                    htmlFor="qabul_soati_ru"
                                >
                                    Qabul soati ru
                                    <textarea
                                        type="text"
                                        id="qabul_soati_ru"
                                        className={`${
                                            formik_2.errors.qabul_soati_ru &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.qabul_soati_ru}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>

                                <label
                                    className="w-[33.33%]"
                                    htmlFor="qabul_soati_en"
                                >
                                    Qabul soati en
                                    <textarea
                                        type="text"
                                        id="qabul_soati_en"
                                        className={`${
                                            formik_2.errors.qabul_soati_en &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.qabul_soati_en}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>
                            </div>
                            {/* biografiya_uz */}
                            <div className="w-full flex gap-2">
                                <label
                                    className="w-[33.33%]"
                                    htmlFor="biografiya_uz"
                                >
                                    Biografiya uz
                                    <textarea
                                        type="text"
                                        id="biografiya_uz"
                                        className={`${
                                            formik_2.errors.biografiya_uz &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.biografiya_uz}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>

                                <label
                                    className="w-[33.33%]"
                                    htmlFor="biografiya_ru"
                                >
                                    Biografiya ru
                                    <textarea
                                        type="text"
                                        id="biografiya_ru"
                                        className={`${
                                            formik_2.errors.biografiya_ru &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.biografiya_ru}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>

                                <label
                                    className="w-[33.33%]"
                                    htmlFor="biografiya_en"
                                >
                                    Biografiya en
                                    <textarea
                                        type="text"
                                        id="biografiya_en"
                                        className={`${
                                            formik_2.errors.biografiya_en &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.biografiya_en}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>
                            </div>
                            <div className="w-full flex gap-2">
                                {/* telefon_nomer */}
                                <label
                                    className="w-[33.33%]"
                                    htmlFor="telefon_nomer"
                                >
                                    Telefon No'mer
                                    <input
                                        type="number"
                                        id="telefon_nomer"
                                        className={`${
                                            formik_2.errors.telefon_nomer &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.telefon_nomer}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>

                                {/* tg_username */}
                                <label
                                    className="w-[33.33%]"
                                    htmlFor="tg_username"
                                >
                                    Telegram link
                                    <input
                                        type="text"
                                        id="tg_username"
                                        className={`${
                                            formik_2.errors.tg_username &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_2.values.tg_username}
                                        onChange={formik_2.handleChange}
                                    />
                                </label>

                                {/* Rasm */}
                                <label className="w-[33.33%]" htmlFor="rasm">
                                    Rasmi
                                    <input
                                        ref={rasmR}
                                        onChange={handleChange}
                                        type="file"
                                        id="rasm"
                                        name="rasm"
                                        className={`${
                                            !fileR &&
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
                            {/* Accardion */}
                            <div className="collapse collapse-arrow">
                                <input type="checkbox" name="my-accordion-2" />
                                <div className="collapse-title text-xl font-medium bg-gray-200">
                                    Bo'lim mudirlari
                                </div>
                                <div className="collapse-content">
                                    <ol className="list-decimal flex flex-col gap-3 ps-4 my-4">
                                        {dataRahbar?.length !== 0 &&
                                        dataRahbar ? (
                                            dataRahbar?.map((item) => (
                                                <li
                                                    className="w-full border bg-gray-50 shadow-md p-2"
                                                    key={item.id}
                                                >
                                                    <div className="flex flex-col items-start gap-4">
                                                        <div className="flex flex-col gap-y-4 w-full">
                                                            <div className="w-[200px] h-auto">
                                                                <img
                                                                    src={
                                                                        item.rasm
                                                                    }
                                                                    alt="Lavozim rasmi"
                                                                />
                                                            </div>
                                                            {isEditR?.id ===
                                                                item.id && (
                                                                <div>
                                                                    <div className="text-red-600 font-medium">
                                                                        Agar
                                                                        rasim
                                                                        jo'natilmasa
                                                                        o'z
                                                                        holida
                                                                        qoladi!
                                                                    </div>
                                                                    <input
                                                                        ref={
                                                                            rasmR
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        type="file"
                                                                        id="rasm"
                                                                        name="rasm"
                                                                        className="w-[400px] file-input file-input-bordered mt-2"
                                                                    />
                                                                </div>
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
                                                                        {/* Lavozim */}
                                                                        <tr>
                                                                            <th>
                                                                                Lavozim
                                                                            </th>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="lavozim_uz"
                                                                                        id="lavozim_uz"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.lavozim_uz
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.lavozim_uz
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="lavozim_ru"
                                                                                        id="lavozim_ru"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.lavozim_ru
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.lavozim_ru
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="lavozim_en"
                                                                                        id="lavozim_en"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.lavozim_en
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.lavozim_en
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                        {/* FISH */}
                                                                        <tr>
                                                                            <th>
                                                                                F.I.SH
                                                                            </th>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="fish_uz"
                                                                                        id="fish_uz"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.fish_uz
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.fish_uz
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="fish_ru"
                                                                                        id="fish_ru"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.fish_ru
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.fish_ru
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="fish_en"
                                                                                        id="fish_en"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.fish_en
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.fish_en
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                        {/* Unvon */}
                                                                        <tr>
                                                                            <th>
                                                                                Unvon
                                                                            </th>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="unvon_uz"
                                                                                        id="unvon_uz"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.unvon_uz
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.unvon_uz
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="unvon_ru"
                                                                                        id="unvon_ru"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.unvon_ru
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.unvon_ru
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="unvon_en"
                                                                                        id="unvon_en"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.unvon_en
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.unvon_en
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                        {/* Qabul s */}
                                                                        <tr>
                                                                            <th>
                                                                                Qabul
                                                                                soatlari
                                                                            </th>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="qabul_soati_uz"
                                                                                        id="qabul_soati_uz"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.qabul_soati_uz
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.qabul_soati_uz
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="qabul_soati_ru"
                                                                                        id="qabul_soati_ru"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.qabul_soati_ru
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.qabul_soati_ru
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="qabul_soati_en"
                                                                                        id="qabul_soati_en"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.qabul_soati_en
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.qabul_soati_en
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                        {/* Biografyasi */}
                                                                        <tr>
                                                                            <th>
                                                                                Biografyasi
                                                                            </th>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="biografiya_uz"
                                                                                        id="biografiya_uz"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.biografiya_uz
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.biografiya_uz
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="biografiya_ru"
                                                                                        id="biografiya_ru"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.biografiya_ru
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.biografiya_ru
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="biografiya_en"
                                                                                        id="biografiya_en"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.biografiya_en
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.biografiya_en
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                        {/* Telegram l */}
                                                                        <tr>
                                                                            <th>
                                                                                Telegram
                                                                                linki
                                                                            </th>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="tg_username"
                                                                                        id="tg_username"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.tg_username
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.tg_username
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                        {/* Telefon  */}
                                                                        <tr>
                                                                            <th>
                                                                                Telefon
                                                                                No'meri
                                                                            </th>
                                                                            <td>
                                                                                {isEditR?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="telefon_nomer"
                                                                                        id="telefon_nomer"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditR
                                                                                        }
                                                                                        value={
                                                                                            isEditR.telefon_nomer
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.telefon_nomer
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
                                                                        onEditR(
                                                                            item,
                                                                            isEditR?.id ===
                                                                                item.id
                                                                        )
                                                                    }
                                                                    className={` ${
                                                                        isEditR?.id ===
                                                                        item.id
                                                                            ? "bg-blue-400 hover:bg-blue-600"
                                                                            : "bg-gray-400 hover:bg-gray-600"
                                                                    } flex items-center gap-2  rounded-md py-1 px-4 text-white font-medium active:scale-95`}
                                                                >
                                                                    {isEditR?.id ===
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
                                                                        onDelR(
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

                            {/* /Accardion */}
                        </div>
                    </div>
                </div>

                <div className="w-full border border-red-600" />

                {/*  Hodim */}
                <div className="my-10">
                    <h1 className="text-[1.4rem] font-medium mb-2">
                        Bo'lim hodim yaratish
                    </h1>
                    <div className="flex flex-col gap-4">
                        <form
                            className="w-full flex flex-col gap-2"
                            onSubmit={formik_3.handleSubmit}
                        >
                            <div className="flex items-center gap-4">
                                <select
                                    name="bolim_id"
                                    id="bolim_id"
                                    className={`${
                                        warnH && "select-error"
                                    } select select-bordered w-full max-w-xs`}
                                    value={formik_3.values.bolim_id}
                                    onChange={formik_3.handleChange}
                                >
                                    <option value="0">Birini tanlang!</option>
                                    {dataBolim?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name_uz}
                                        </option>
                                    ))}
                                </select>
                                <TextWarn
                                    className={`${
                                        warnH ? "inline-block" : "hidden"
                                    } font-medium`}
                                >
                                    Iltimos lavozimni tanlang!
                                </TextWarn>
                            </div>
                            {/* Lavozim */}
                            <div className="w-full flex gap-2">
                                <div className="w-[33.33%]">
                                    Lavozim uz
                                    <textarea
                                        type="text"
                                        id="lavozim_uz"
                                        className={`${
                                            formik_3.errors.lavozim_uz &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_3.values.lavozim_uz}
                                        onChange={formik_3.handleChange}
                                    />
                                </div>

                                <div className="w-[33.33%]">
                                    Lavozim ru
                                    <textarea
                                        type="text"
                                        id="lavozim_ru"
                                        className={`${
                                            formik_3.errors.lavozim_ru &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_3.values.lavozim_ru}
                                        onChange={formik_3.handleChange}
                                    />
                                </div>
                                <div className="w-[33.33%]">
                                    Lavozim en
                                    <textarea
                                        type="text"
                                        id="lavozim_en"
                                        className={`${
                                            formik_3.errors.lavozim_en &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_3.values.lavozim_en}
                                        onChange={formik_3.handleChange}
                                    />
                                </div>
                            </div>
                            {/* FIO */}
                            <div className="w-full flex gap-2">
                                <div className="w-[33.33%]">
                                    FISH uz
                                    <textarea
                                        type="text"
                                        id="fish_uz"
                                        className={`${
                                            formik_3.errors.fish_uz &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_3.values.fish_uz}
                                        onChange={formik_3.handleChange}
                                    />
                                </div>

                                <div className="w-[33.33%]">
                                    FISH ru
                                    <textarea
                                        type="text"
                                        id="fish_ru"
                                        className={`${
                                            formik_3.errors.fish_ru &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_3.values.fish_ru}
                                        onChange={formik_3.handleChange}
                                    />
                                </div>

                                <div className="w-[33.33%]">
                                    FISH en
                                    <textarea
                                        type="text"
                                        id="fish_en"
                                        className={`${
                                            formik_3.errors.fish_en &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_3.values.fish_en}
                                        onChange={formik_3.handleChange}
                                    />
                                </div>
                            </div>
                            {/* Unvoni */}
                            <div className="w-full flex gap-2">
                                <div className="w-[33.33%]">
                                    Unvon uz
                                    <textarea
                                        type="text"
                                        id="unvon_uz"
                                        className={`${
                                            formik_3.errors.unvon_uz &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_3.values.unvon_uz}
                                        onChange={formik_3.handleChange}
                                    />
                                </div>

                                <div className="w-[33.33%]">
                                    Unvon ru
                                    <textarea
                                        type="text"
                                        id="unvon_ru"
                                        className={`${
                                            formik_3.errors.unvon_ru &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_3.values.unvon_ru}
                                        onChange={formik_3.handleChange}
                                    />
                                </div>

                                <div className="w-[33.33%]">
                                    Unvon en
                                    <textarea
                                        type="text"
                                        id="unvon_en"
                                        className={`${
                                            formik_3.errors.unvon_en &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_3.values.unvon_en}
                                        onChange={formik_3.handleChange}
                                    />
                                </div>
                            </div>
                            {/* telefon_nomer */}
                            <div className="w-full flex gap-2">
                                <div className="w-[33.33%]">
                                    Telefon No'mer
                                    <input
                                        type="number"
                                        id="telefon_nomer"
                                        className={`${
                                            formik_3.errors.telefon_nomer &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_3.values.telefon_nomer}
                                        onChange={formik_3.handleChange}
                                    />
                                </div>
                                {/* Rasm */}
                                <div className="w-[33.33%]">
                                    Rasmi
                                    <input
                                        ref={rasmH}
                                        onChange={handleChangeH}
                                        type="file"
                                        id="rasm"
                                        name="rasm"
                                        className={`${
                                            !fileH &&
                                            "file-input-error text-red-600"
                                        } w-full file-input file-input-bordered`}
                                    />
                                </div>
                                {/* Bo'lim boshlig'i */}
                            </div>
                            <div className="flex justify-start items-center">
                                <div className="form-control">
                                    <label className="cursor-pointer label mt-6">
                                        <input
                                            name="bolim_boshligi"
                                            type="checkbox"
                                            className="checkbox checkbox-accent"
                                            onChange={formik_3.handleChange}
                                        />
                                        <span className="label-text ms-2">
                                            Bo'lim boshlig'imi?
                                        </span>
                                    </label>
                                </div>
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
                                    Bo'lim hodimlari:
                                </div>
                                <div className="collapse-content">
                                    <ol className="list-decimal flex flex-col gap-3 ps-4 my-4">
                                        {dataHodim?.length !== 0 &&
                                        dataHodim ? (
                                            dataHodim?.map((item) => (
                                                <li
                                                    className="w-full border bg-gray-50 shadow-md p-2"
                                                    key={item.id}
                                                >
                                                    <div className="flex flex-col items-start gap-4">
                                                        <div className="flex flex-col gap-y-4 w-full">
                                                            <div className="w-[200px] h-auto">
                                                                <img
                                                                    src={
                                                                        item.rasm
                                                                    }
                                                                    alt="Lavozim rasmi"
                                                                />
                                                            </div>
                                                            {isEditH?.id ===
                                                                item.id && (
                                                                <div>
                                                                    <div className="text-red-600 font-medium">
                                                                        Agar
                                                                        rasim
                                                                        jo'natilmasa
                                                                        o'z
                                                                        holida
                                                                        qoladi!
                                                                    </div>
                                                                    <input
                                                                        ref={
                                                                            rasmH
                                                                        }
                                                                        onChange={
                                                                            handleChangeH
                                                                        }
                                                                        type="file"
                                                                        id="rasm"
                                                                        name="rasm"
                                                                        className="w-[400px] file-input file-input-bordered mt-2"
                                                                    />
                                                                </div>
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
                                                                        {/* Lavozim */}
                                                                        <tr>
                                                                            <th>
                                                                                Lavozim
                                                                            </th>
                                                                            <td>
                                                                                {isEditH?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="lavozim_uz"
                                                                                        id="lavozim_uz"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditH
                                                                                        }
                                                                                        value={
                                                                                            isEditH.lavozim_uz
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.lavozim_uz
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditH?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="lavozim_ru"
                                                                                        id="lavozim_ru"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditH
                                                                                        }
                                                                                        value={
                                                                                            isEditH.lavozim_ru
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.lavozim_ru
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditH?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="lavozim_en"
                                                                                        id="lavozim_en"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditH
                                                                                        }
                                                                                        value={
                                                                                            isEditH.lavozim_en
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.lavozim_en
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                        {/* FISH */}
                                                                        <tr>
                                                                            <th>
                                                                                F.I.SH
                                                                            </th>
                                                                            <td>
                                                                                {isEditH?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="fish_uz"
                                                                                        id="fish_uz"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditH
                                                                                        }
                                                                                        value={
                                                                                            isEditH.fish_uz
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.fish_uz
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditH?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="fish_ru"
                                                                                        id="fish_ru"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditH
                                                                                        }
                                                                                        value={
                                                                                            isEditH.fish_ru
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.fish_ru
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditH?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="fish_en"
                                                                                        id="fish_en"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditH
                                                                                        }
                                                                                        value={
                                                                                            isEditH.fish_en
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.fish_en
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                        {/* Unvon */}
                                                                        <tr>
                                                                            <th>
                                                                                Unvon
                                                                            </th>
                                                                            <td>
                                                                                {isEditH?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="unvon_uz"
                                                                                        id="unvon_uz"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditH
                                                                                        }
                                                                                        value={
                                                                                            isEditH.unvon_uz
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.unvon_uz
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditH?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="unvon_ru"
                                                                                        id="unvon_ru"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditH
                                                                                        }
                                                                                        value={
                                                                                            isEditH.unvon_ru
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.unvon_ru
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditH?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="unvon_en"
                                                                                        id="unvon_en"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditH
                                                                                        }
                                                                                        value={
                                                                                            isEditH.unvon_en
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.unvon_en
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                        {/* Telefon  */}
                                                                        <tr>
                                                                            <th>
                                                                                Telefon
                                                                                No'meri
                                                                            </th>
                                                                            <td>
                                                                                {isEditH?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="telefon_nomer"
                                                                                        id="telefon_nomer"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            handleChangeEditH
                                                                                        }
                                                                                        value={
                                                                                            isEditH.telefon_nomer
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.telefon_nomer
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                        {/* Bo'lim boshlig'i  */}
                                                                        <tr>
                                                                            <th>
                                                                                Bo'lim
                                                                                boshlig'imi?
                                                                            </th>
                                                                            <td>
                                                                                {isEditH?.id ===
                                                                                item.id ? (
                                                                                    <div className="form-control">
                                                                                        <input
                                                                                            name="bolim_boshligi"
                                                                                            type="checkbox"
                                                                                            className="checkbox checkbox-accent"
                                                                                            onChange={
                                                                                                handleChangeEditH
                                                                                            }
                                                                                            defaultChecked={
                                                                                                item.bolim_boshligi
                                                                                                    ? true
                                                                                                    : false
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                ) : item.bolim_boshligi ? (
                                                                                    "Ha"
                                                                                ) : (
                                                                                    "Yo'q"
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
                                                                        onEditH(
                                                                            item,
                                                                            isEditH?.id ===
                                                                                item.id
                                                                        )
                                                                    }
                                                                    className={` ${
                                                                        isEditH?.id ===
                                                                        item.id
                                                                            ? "bg-blue-400 hover:bg-blue-600"
                                                                            : "bg-gray-400 hover:bg-gray-600"
                                                                    } flex items-center gap-2  rounded-md py-1 px-4 text-white font-medium active:scale-95`}
                                                                >
                                                                    {isEditH?.id ===
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
                                                                        onDelH(
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

export default Bolimlar;
