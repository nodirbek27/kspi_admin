import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { RxArrowTopRight } from "react-icons/rx";
import { MdEdit, MdDelete } from "react-icons/md";
import { TextWarn } from "./styled";
import { BiBlock } from "react-icons/bi";
import APITuzilmaRectorat from "../../services/tuzilmaRectorat";
import * as Yup from "yup";

const Rektorat = () => {
    const [dataLavozim, setDataLavozim] = useState([]);
    const [dataNomzod, setDataNomzod] = useState([]);
    const [warn, setWarn] = useState(false);
    const [errTxt, setErrTxt] = useState(false);

    const [isEdit, setIsEdit] = useState(null);
    const [isEditN, setIsEditN] = useState(null);

    // Rasm
    const [file, setFile] = useState(null);

    const rasm = useRef(null);

    const getDataLavozim = () =>
        APITuzilmaRectorat.get()
            .then((res) => setDataLavozim(res.data))
            .catch((err) => console.log(err));

    const getDataNomzod = () =>
        APITuzilmaRectorat.getN()
            .then((res) => setDataNomzod(res.data))
            .catch((err) => console.log(err));

    const validationSchema = Yup.object().shape({
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
            // .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        tg_username: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        biografiya_uz: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        biografiya_ru: Yup.string()
            .min(3, "Juda kam!")
            .max(300, "Juda ko'p!")
            .required("To'ldirilishi shart!"),
        biografiya_en: Yup.string()
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
                APITuzilmaRectorat.post(values)
                    .then(() => getDataLavozim())
                    .catch((err) => console.log(err));
                formik.resetForm();
            }
        },
    });

    const formik_2 = useFormik({
        initialValues: {
            rektorat_id: "",
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
        validationSchema,
        onSubmit: (values) => {
            if (values.rektorat_id === "0" || values.rektorat_id === "") {
                setWarn(true);
            } else {
                setWarn(false);
                const data = { ...values, rasm: file };
                APITuzilmaRectorat.postN(data)
                    .then(() => getDataNomzod())
                    .catch((err) => console.log(err));
                formik_2.resetForm();
                setFile(null);
                if (rasm.current) {
                    rasm.current.value = "";
                }
            }
        },
    });
    // Rasm
    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onDel = (id) => {
        const res = window.confirm("Ishonchingiz komilmi?");
        if (res) {
            APITuzilmaRectorat.del(id)
                .then(() => {
                    getDataLavozim();
                    setIsEdit(null);
                })
                .catch((err) => console.log(err));
        }
    };

    const onEdit = ({ id, name_uz, name_ru, name_en }, boolean) => {
        if (boolean) {
            const { id, ...res } = isEdit;
            const data = res;
            APITuzilmaRectorat.patch(id, data);
            setIsEdit(null);
            getDataLavozim();
        } else {
            setIsEdit({ id, name_uz, name_ru, name_en });
        }
    };

    const onEditN = (item, boolean) => {
        if (boolean) {
            // const { id, ...res } = isEdit;
            // const data = res;
            // APITuzilmaRectorat.patch(id, data);
            // setIsEdit(null);
            // getDataLavozim();
            setIsEditN(null);
            getDataNomzod();
        } else {
            setIsEditN({ ...item });
            // setIsEdit({ id, name_uz, name_ru, name_en });
        }
    };

    const handleChangeEdit = (e) => {
        setIsEdit({
            ...isEdit,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeEditN = (e) => {
        setIsEditN({
            ...isEditN,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        formik_2.values.rektorat_id === "0" ? setWarn(true) : setWarn(false);
    }, [formik_2.values.rektorat_id]);

    useEffect(() => {
        getDataLavozim();
        getDataNomzod();
    }, []);

    return (
        <div className="relative">
            <div className="w-full">
                <h1 className="text-center text-[1.8rem] font-medium mt-4">
                    Rektorat
                </h1>
                <div className="w-full my-12">
                    <div>
                        <h1 className="text-[1.4rem] font-medium">
                            Rektarat lavozim yaratish
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
                    <div className="mt-5">
                        <h1 className="text-[1.2rem] font-medium mb-2">
                            Rektarat lavozimlari:
                        </h1>
                        <ol className="list-decimal flex flex-col gap-2 ps-4">
                            {dataLavozim?.length !== 0 && dataLavozim ? (
                                dataLavozim?.map((item) => (
                                    <li
                                        className="border bg-gray-50 shadow-md p-2"
                                        key={item.id}
                                    >
                                        <div className="flex justify-between gap-20 items-center">
                                            <div className="w-full flex flex-col justify-start items-start">
                                                <p className="w-full">
                                                    <b>name_uz:</b>
                                                    {isEdit?.id === item.id ? (
                                                        <textarea
                                                            type="text"
                                                            name="name_uz"
                                                            id="name_uz"
                                                            className="w-full border border-black rounded-sm"
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
                                                </p>
                                                <p className="w-full">
                                                    <b>name_ru:</b>
                                                    {isEdit?.id === item.id ? (
                                                        <textarea
                                                            type="text"
                                                            name="name_ru"
                                                            id="name_ru"
                                                            className="w-full border border-black rounded-sm"
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
                                                </p>
                                                <p className="w-full">
                                                    <b>name_en:</b>
                                                    {isEdit?.id === item.id ? (
                                                        <textarea
                                                            type="text"
                                                            name="name_en"
                                                            id="name_en"
                                                            className="w-full border border-black rounded-sm"
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
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        onEdit(
                                                            item,
                                                            isEdit?.id ===
                                                                item.id
                                                        )
                                                    }
                                                    className={` ${
                                                        isEdit?.id === item.id
                                                            ? "bg-blue-400 hover:bg-blue-600"
                                                            : "bg-gray-400 hover:bg-gray-600"
                                                    } flex items-center gap-2  rounded-md py-1 px-4 text-white font-medium active:scale-95`}
                                                >
                                                    {isEdit?.id === item.id ? (
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
                                                        onDel(item.id)
                                                    }
                                                    className="flex items-center gap-2 bg-red-500 rounded-md py-1 px-4 text-white font-medium hover:bg-red-600 active:scale-95"
                                                >
                                                    <span>Delete</span>
                                                    <MdDelete />
                                                </button>
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

                <div className="w-full border border-red-600" />

                <div className="my-10">
                    <h1 className="text-[1.4rem] font-medium mb-2">
                        Rektarat lavozim nomzodini yaratish
                    </h1>
                    <div className="flex flex-col gap-4">
                        <form
                            className="w-full flex flex-col gap-2"
                            onSubmit={formik_2.handleSubmit}
                        >
                            <div className="flex items-center gap-4">
                                <select
                                    name="rektorat_id"
                                    id="rektorat_id"
                                    className={`${
                                        warn && "select-error"
                                    } select select-bordered w-full max-w-xs`}
                                    value={formik_2.values.rektorat_id}
                                    onChange={formik_2.handleChange}
                                >
                                    <option value="0">Birini tanlang!</option>
                                    {dataLavozim?.map((item) => (
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
                                        ref={rasm}
                                        onChange={handleChange}
                                        type="file"
                                        id="rasm"
                                        name="rasm"
                                        className="w-full file-input file-input-bordered"
                                    />
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-400 hover:bg-blue-600 flex justify-center items-center gap-1 h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95 "
                            >
                                Submit
                            </button>
                        </form>

                        <div className="my-10">
                            <h1 className="text-[1.2rem] font-medium mb-2">
                                Rektarat lavozimlari:
                            </h1>
                            <ol className="list-decimal flex flex-col gap-2 ps-4">
                                {dataNomzod?.length !== 0 && dataNomzod ? (
                                    dataNomzod?.map((item) => (
                                        <li
                                            className="w-full border bg-gray-50 shadow-md p-2"
                                            key={item.id}
                                        >
                                            <div className="flex flex-col items-start gap-4">
                                                <div className="w-full">
                                                    <div className="w-[200px] h-auto">
                                                        <img
                                                            src={item.rasm}
                                                            alt="Lavozim rasmi"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>
                                                        <b>Lavozim: </b>
                                                        {isEditN?.id ===
                                                        item.id ? (
                                                            <textarea
                                                                type="text"
                                                                name="lavozim_uz"
                                                                id="lavozim_uz"
                                                                className="w-full border border-black rounded-sm"
                                                                onChange={
                                                                    handleChangeEditN
                                                                }
                                                                value={
                                                                    isEditN.lavozim_uz
                                                                }
                                                            />
                                                        ) : (
                                                            item.lavozim_uz
                                                        )}
                                                        {/* {item.lavozim_uz} */}
                                                    </p>
                                                    <p>
                                                        <b>FISH:</b>
                                                        {isEditN?.id ===
                                                        item.id ? (
                                                            <textarea
                                                                type="text"
                                                                name="fish_uz"
                                                                id="fish_uz"
                                                                className="w-full border border-black rounded-sm"
                                                                onChange={
                                                                    handleChangeEditN
                                                                }
                                                                value={
                                                                    isEditN.fish_uz
                                                                }
                                                            />
                                                        ) : (
                                                            item.fish_uz
                                                        )}
                                                        {/* {item.fish_uz} */}
                                                    </p>
                                                    <p>
                                                        <b>Unvon:</b>{" "}
                                                        {item.unvon_uz}
                                                    </p>
                                                    <p>
                                                        <b>Qabul soatlari:</b>{" "}
                                                        {item.qabul_soati_uz}
                                                    </p>
                                                    <p>
                                                        <b>Telefon no'meri:</b>{" "}
                                                        {item.telefon_nomer}
                                                    </p>
                                                    <p>
                                                        <b>Telegram linki:</b>{" "}
                                                        {item.tg_username}
                                                    </p>
                                                    <p>
                                                        <b>Biografyasi:</b>{" "}
                                                        {item.biografiya_uz}
                                                    </p>
                                                </div>
                                                <div className="w-full flex justify-end">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() =>
                                                                onEditN(
                                                                    item,
                                                                    isEditN?.id ===
                                                                        item.id
                                                                )
                                                            }
                                                            className={` ${
                                                                isEditN?.id ===
                                                                item.id
                                                                    ? "bg-blue-400 hover:bg-blue-600"
                                                                    : "bg-gray-400 hover:bg-gray-600"
                                                            } flex items-center gap-2  rounded-md py-1 px-4 text-white font-medium active:scale-95`}
                                                        >
                                                            {isEditN?.id ===
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
                                                        <button className="flex items-center gap-2 bg-red-500 rounded-md py-1 px-4 text-white font-medium hover:bg-red-600 active:scale-95">
                                                            <span>Delete</span>
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
    );
};

export default Rektorat;
