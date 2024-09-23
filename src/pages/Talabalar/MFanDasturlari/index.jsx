import React, { useEffect, useRef, useState } from "react";
import { RxArrowTopRight } from "react-icons/rx";
import { MdEdit, MdDelete } from "react-icons/md";
import Loader from "../../../components/Loader";
import * as Yup from "yup";
import { useFormik } from "formik";
import APIFanDasKurs from "../../../services/mFanDasturKurs";
import APIFanDasYon from "../../../services/mFanDasturYonalish";
import APIFanDasTur from "../../../services/mFanDasturTur";
import APIFanDasFile from "../../../services/mFanDastur";
import { TextWarn } from "./styled";

const MFanDasturlari = () => {
    const [selectedValueKurs, setSelectedValueKurs] = useState("");
    const [warnKursSelect, setWarnKursSelect] = useState("");
    const [dataKurs, setDataKurs] = useState([]);
    const [dataYon, setDataYon] = useState([]);
    const [dataTur, setDataTur] = useState([]);
    const [dataFile, setDataFile] = useState([]);

    const [isEditKurs, setIsEditKurs] = useState(null);
    const [isEditYon, setIsEditYon] = useState(null);
    const [isEditTur, setIsEditTur] = useState(null);
    const [isEditFile, setIsEditFile] = useState(null);

    // loader
    const [load, setLoad] = useState(true);
    //
    const [warnYonSel, setWarnYonSel] = useState(false);
    const [warnTurSel, setWarnTurSel] = useState(false);
    const [warnFileSel, setWarnFileSel] = useState(false);

    const [fileItem, setFileItem] = useState(null);
    const fayl = useRef(null);

    const dataKursSelect = [
        {
            id: 1,
            nameId: "1-kurs",
        },
        {
            id: 2,
            nameId: "2-kurs",
        },
    ];

    const getDataKurs = () => {
        APIFanDasKurs.get()
            .then((res) => {
                setDataKurs(res.data);
                setLoad(false);
                if (res.data.length >= "2") {
                    const btn = document.getElementById("kursSubmiBtn");
                    btn.classList.add("btn-disabled");
                    btn.setAttribute("disabled", true);
                } else {
                    const btn = document.getElementById("kursSubmiBtn");
                    btn.classList.remove("btn-disabled");
                    btn.removeAttribute("disabled");
                }
            })
            .catch((err) => {
                setLoad(false);
                console.log(err);
            });
    };
    const getDataYon = () => {
        APIFanDasYon.get()
            .then((res) => {
                setDataYon(res.data);
                setLoad(false);
            })
            .catch((err) => {
                setLoad(false);
                console.log(err);
            });
    };

    const getDataTur = () => {
        APIFanDasTur.get()
            .then((res) => {
                setDataTur(res.data);
                setLoad(false);
            })
            .catch((err) => {
                setLoad(false);
                console.log(err);
            });
    };

    const getDataFile = () => {
        APIFanDasFile.get()
            .then((res) => {
                setDataFile(res.data);
                setLoad(false);
            })
            .catch((err) => {
                setLoad(false);
                console.log(err);
            });
    };
    //+++++++ Kurs
    const handleClickSubmit = () => {
        if (selectedValueKurs) {
            const data = {
                name_uz: selectedValueKurs === "1" ? "1-kurs" : "2-kurs",
                name_ru: selectedValueKurs === "1" ? "1-курс" : "2-курс",
                name_en: selectedValueKurs === "1" ? "1-course" : "2-course",
            };
            APIFanDasKurs.post(data)
                .then(() => getDataKurs())
                .catch((err) => console.log(err));
        } else {
            setWarnKursSelect(true);
            setTimeout(() => {
                setWarnKursSelect(false);
            }, 2000);
        }
    };
    const onDelKurs = (id) => {
        if (isEditKurs) {
            alert("Siz tahrirlash jarayonidasiz!");
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setLoad(true);
                APIFanDasKurs.del(id)
                    .then(() => {
                        getDataKurs();
                        setIsEditKurs(null);
                    })
                    .catch((err) => console.log(err));
            }
        }
    };
    const onEditKurs = (item, boolean) => {
        if (boolean) {
            setLoad(true);
            const { id, ...res } = isEditKurs;
            let data = res;
            if (!res.name_uz) {
                data = { ...data, name_uz: "1-kurs" };
            }
            APIFanDasKurs.patch(item.id, data)
                .then(() => {
                    getDataKurs();
                })
                .catch((err) => console.log(err));
            setIsEditKurs(null);
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                const { name_uz, ...res } = item;
                setIsEditKurs({ name_uz: "", ...res });
            }
        }
    };

    const handleChangeSelectKurs = (e) => {
        setSelectedValueKurs(e.target.value);
    };

    const handleChangeSelecEditKurs = (e) => {
        setIsEditKurs({
            ...isEditKurs,
            name_uz: e.target.value,
        });
    };

    // ++++++++ Yonalishi
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

    const formik_yon = useFormik({
        initialValues: {
            name_uz: "",
            name_ru: "",
            name_en: "",
            fan_dastur_kurs_id: "",
        },
        validationSchema,
        onSubmit: (values) => {
            if (
                values.fan_dastur_kurs_id === "0" ||
                values.fan_dastur_kurs_id === ""
            ) {
                setWarnYonSel(true);
            } else {
                setLoad(true);
                const res = dataKurs.filter(
                    (item) =>
                        Number(item.id) === Number(values.fan_dastur_kurs_id)
                )[0].name_uz;
                const newName_uz = `${values.name_uz} ${res}`;

                APIFanDasYon.post({ ...values, name_uz: newName_uz })
                    .then(() => getDataYon())
                    .catch((err) => console.log(err));
                formik_yon.resetForm();
                setWarnYonSel(false);
            }
        },
    });

    const onEditYon = (item, boolean) => {
        if (boolean) {
            setLoad(true);
            const { id, ...res } = isEditYon;
            let data = res;
            if (!res.fan_dastur_kurs_id) {
                data = { ...data, fan_dastur_kurs_id: dataKurs[0].id };
                const newRes = isEditYon.name_uz.slice(0, -7);
                data = { ...data, name_uz: `${newRes} ${dataKurs[0].name_uz}` };
            }
            APIFanDasYon.patch(item.id, data)
                .then(() => {
                    getDataYon();
                })
                .catch((err) => console.log(err));
            setIsEditYon(null);
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setIsEditYon({ ...item, fan_dastur_kurs_id: "" });
            }
        }
    };

    const onDelYon = (id) => {
        if (isEditYon) {
            alert("Siz tahrirlash jarayonidasiz!");
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setLoad(true);
                APIFanDasYon.del(id)
                    .then(() => {
                        getDataYon();
                        setIsEditYon(null);
                    })
                    .catch((err) => console.log(err));
            }
        }
    };

    const onChangeEditYon = (e) => {
        setIsEditYon({
            ...isEditYon,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeSelecEditYon = (e) => {
        let data = isEditYon;

        if (
            !isEditYon.name_uz.endsWith(` 1-kurs`) ||
            !isEditYon.name_uz.endsWith(` 2-kurs`)
        ) {
            const res = dataKurs.filter(
                (item) => Number(item.id) === Number(e.target.value)
            )[0].name_uz;
            const newRes = isEditYon.name_uz.slice(0, -7);

            data = { ...data, name_uz: `${newRes} ${res}` };
        }
        setIsEditYon({
            ...data,
            fan_dastur_kurs_id: e.target.value,
        });
    };

    // ++++++ Turi
    const validationSchemaTur = Yup.object().shape({
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

    const formik_tur = useFormik({
        initialValues: {
            name_uz: "",
            name_ru: "",
            name_en: "",
            fan_dastur_yonalish_id: "",
        },
        validationSchema: validationSchemaTur,
        onSubmit: (values) => {
            if (
                values.fan_dastur_yonalish_id === "0" ||
                values.fan_dastur_yonalish_id === ""
            ) {
                setWarnTurSel(true);
            } else {
                setLoad(true);
                const res = dataYon.filter(
                    (item) =>
                        Number(item.id) === Number(values.fan_dastur_yonalish_id)
                )[0].name_uz;
                const newName_uz = `${values.name_uz} (${res})`;

                APIFanDasTur.post({...values, name_uz: newName_uz,})
                    .then(() => getDataTur())
                    .catch((err) => console.log(err));
                formik_tur.resetForm();
                setWarnTurSel(false);
            }
        },
    });

    const onEditTur = (item, boolean) => {
        if (boolean) {
            setLoad(true);
            const { id, ...res } = isEditTur;
            let data = res;

            if (!res.fan_dastur_yonalish_id) {
                data = { ...data, fan_dastur_yonalish_id: dataYon[0].id };
                // **************
                const newRes = isEditTur.name_uz.replace(/\s*\([^)]*\)$/, "").trim()
                data = { ...data, name_uz: `${newRes} (${dataYon[0].name_uz})` };
            }
            APIFanDasTur.patch(item.id, data)
                .then(() => {
                    getDataTur();
                })
                .catch((err) => console.log(err));
            setIsEditTur(null);
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setIsEditTur({ ...item, fan_dastur_yonalish_id: "" });
            }
        }
    };

    const onDelTur = (id) => {
        if (isEditTur) {
            alert("Siz tahrirlash jarayonidasiz!");
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setLoad(true);
                APIFanDasTur.del(id)
                    .then(() => {
                        getDataTur();
                        setIsEditTur(null);
                    })
                    .catch((err) => console.log(err));
            }
        }
    };

    const onChangeEditTur = (e) => {
        setIsEditTur({
            ...isEditTur,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeSelecEditTur = (e) => {
        let data = isEditTur;
        if (
            !isEditTur.name_uz.endsWith(` 1-kurs)`) ||
            !isEditTur.name_uz.endsWith(` 2-kurs)`)
        ) {
            const res = dataYon.filter(
                (item) => Number(item.id) === Number(e.target.value)
            )[0].name_uz;
            const newRes = isEditTur.name_uz.replace(/\s*\([^)]*\)$/, "").trim();

            data = { ...data, name_uz: `${newRes} (${res})` };
        }
        setIsEditTur({
            ...data,
            fan_dastur_yonalish_id: e.target.value,
        });
    };

    // ++++++ File
    const validationSchemaFile = Yup.object().shape({
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
        sana: Yup.date().required("To'ldirilishi shart!"),
    });

    const formik_file = useFormik({
        initialValues: {
            name_uz: "",
            name_ru: "",
            name_en: "",
            fan_dastur_turi_id: "",
            sana: "",
        },
        validationSchema: validationSchemaFile,
        onSubmit: (values) => {
            if (
                values.fan_dastur_turi_id === "0" ||
                values.fan_dastur_turi_id === ""
            ) {
                setWarnFileSel(true);
            } else {
                if (fileItem) {
                    setLoad(true);
                    const res = dataTur.filter(
                        (item) =>
                            Number(item.id) === Number(values.fan_dastur_turi_id)
                    )[0].name_uz;
                    const newName_uz = `${values.name_uz} (${res})`;
                    const data = { ...values, fayl: fileItem, name_uz: newName_uz, };
                    APIFanDasFile.post(data)
                        .then(() => getDataFile())
                        .catch((err) => console.log(err)); 
                    formik_file.resetForm();
                    setFileItem(null);
                    if (fayl.current) {
                        fayl.current.value = "";
                    }
                }
                setWarnFileSel(false);
            }
        },
    });

    // file
    const handleChange = (e) => {
        setFileItem(e.target.files[0]);
    };

    const onEditFile = (item, boolean) => {
        if (boolean) {
            setLoad(true);
            const { id, fayl, ...res } = isEditFile;
            let data = res;
            if (fileItem) {
                data = { ...data, fayl: fileItem };
            }
            if (!res.fan_dastur_turi_id) {
                data = { ...data, fan_dastur_turi_id: dataTur[0].id };
                // *********
                const newRes = isEditFile.name_uz.replace(/\s*\(.*\)$/, "").trim();
                data = { ...data, name_uz: `${newRes} (${dataTur[0].name_uz})` };
            }
            APIFanDasFile.patch(item.id, data)
                .then(() => {
                    getDataFile();
                })
                .catch((err) => console.log(err));
            setIsEditFile(null);
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setIsEditFile({ ...item, fan_dastur_turi_id: "" });
            }
        }
    };

    const onDelFile = (id) => {
        if (isEditFile) {
            alert("Siz tahrirlash jarayonidasiz!");
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setLoad(true);
                APIFanDasFile.del(id)
                    .then(() => {
                        getDataFile();
                        setIsEditFile(null);
                    })
                    .catch((err) => console.log(err));
            }
        }
    };

    const onChangeEditFile = (e) => {
        setIsEditFile({
            ...isEditFile,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeSelecEditFile = (e) => {
        let data = isEditFile;
        if (
            !isEditFile.name_uz.endsWith(` 1-kurs))`) ||
            !isEditFile.name_uz.endsWith(` 2-kurs))`)
        ) {
            const res = dataTur.filter(
                (item) => Number(item.id) === Number(e.target.value)
            )[0].name_uz;
            const newRes = isEditFile.name_uz.replace(/\s*\(.*\)$/, "").trim();

            data = { ...data, name_uz: `${newRes} (${res})` };
        }
        setIsEditFile({
            ...data,
            fan_dastur_turi_id: e.target.value,
        });
    };

    useEffect(() => {
        setLoad(true);
        getDataKurs();
        getDataYon();
        getDataTur();
        getDataFile();
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
                    Magistr fan dasturlari
                </h1>
                <div className="my-10">
                    <h1 className="text-[1.4rem] font-medium mb-2">
                        Magistr fan dastur Kursi
                    </h1>
                    <div className="flex flex-col gap-4">
                        <form className="w-full flex flex-col gap-2">
                            <div className="w-full flex gap-2">
                                <select
                                    className={`${
                                        warnKursSelect &&
                                        "select-error text-[red]"
                                    } select select-bordered w-full max-w-xs`}
                                    value={selectedValueKurs}
                                    onChange={handleChangeSelectKurs}
                                >
                                    <option value="" disabled>
                                        Kursni tanlang!
                                    </option>
                                    {dataKursSelect.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.nameId}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="button"
                                id="kursSubmiBtn"
                                onClick={handleClickSubmit}
                                className="w-full bg-blue-400 hover:bg-blue-600 flex justify-center items-center gap-1 h-[48px] text-white mt-[18px] font-bold rounded-lg active:scale-95"
                            >
                                JO'NATISH
                            </button>
                        </form>

                        <div className="my-10">
                            <div className="collapse collapse-arrow">
                                <input type="checkbox" name="my-accordion-2" />
                                <div className="collapse-title text-xl font-medium bg-gray-200">
                                    Magistr fan dastur Kursi ma'lumotlari
                                </div>
                                <div className="collapse-content">
                                    <ol className="list-decimal flex flex-col gap-3 ps-4 my-4">
                                        {dataKurs?.length !== 0 && dataKurs ? (
                                            dataKurs?.map((item) => (
                                                <li
                                                    className="w-full border bg-gray-50 shadow-md p-2"
                                                    key={item.id}
                                                >
                                                    <div>
                                                        {isEditKurs?.id ===
                                                        item.id ? (
                                                            <select
                                                                className="select select-bordered w-full max-w-xs"
                                                                onChange={
                                                                    handleChangeSelecEditKurs
                                                                }
                                                            >
                                                                {dataKursSelect.map(
                                                                    (item) => (
                                                                        <option
                                                                            key={
                                                                                item.id
                                                                            }
                                                                            value={
                                                                                item.nameId
                                                                            }
                                                                        >
                                                                            {
                                                                                item.nameId
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        ) : (
                                                            item.name_uz
                                                        )}
                                                    </div>
                                                    <div className="w-full flex justify-end">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    onEditKurs(
                                                                        item,
                                                                        isEditKurs?.id ===
                                                                            item.id
                                                                    )
                                                                }
                                                                className={` ${
                                                                    isEditKurs?.id ===
                                                                    item.id
                                                                        ? "bg-blue-400 hover:bg-blue-600"
                                                                        : "bg-gray-400 hover:bg-gray-600"
                                                                } flex items-center gap-2  rounded-md py-1 px-4 text-white font-medium active:scale-95`}
                                                            >
                                                                {isEditKurs?.id ===
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
                                                                    onDelKurs(
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

                <div className="my-10">
                    <h1 className="text-[1.4rem] font-medium mb-2">
                        Magistr fan dastur Yo'nalishi
                    </h1>
                    <div className="flex flex-col gap-4">
                        <form
                            className="w-full flex flex-col gap-2"
                            onSubmit={formik_yon.handleSubmit}
                        >
                            <div className="flex items-center gap-4">
                                <select
                                    name="fan_dastur_kurs_id"
                                    id="fan_dastur_kurs_id"
                                    className={`${
                                        warnYonSel && "select-error"
                                    } select select-bordered w-full max-w-xs`}
                                    value={formik_yon.values.fan_dastur_kurs_id}
                                    onChange={formik_yon.handleChange}
                                >
                                    <option value="0">Kursni tanlang!</option>
                                    {dataKurs?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name_uz}
                                        </option>
                                    ))}
                                </select>
                                <TextWarn
                                    className={`${
                                        warnYonSel ? "inline-block" : "hidden"
                                    } font-medium`}
                                >
                                    Iltimos kursni tanlang!
                                </TextWarn>
                            </div>
                            {/* Lavozim */}
                            <div className="w-full flex gap-2">
                                <label className="w-[33.33%]" htmlFor="">
                                    Nomi uz
                                    <textarea
                                        type="text"
                                        id="name_uz"
                                        className={`${
                                            formik_yon.errors.name_uz &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_yon.values.name_uz}
                                        onChange={formik_yon.handleChange}
                                    />
                                </label>

                                <label className="w-[33.33%]" htmlFor="">
                                    Nomi ru
                                    <textarea
                                        type="text"
                                        id="name_ru"
                                        className={`${
                                            formik_yon.errors.name_ru &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_yon.values.name_ru}
                                        onChange={formik_yon.handleChange}
                                    />
                                </label>

                                <label className="w-[33.33%]" htmlFor="">
                                    Nomi en
                                    <textarea
                                        type="text"
                                        id="name_en"
                                        className={`${
                                            formik_yon.errors.name_en &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_yon.values.name_en}
                                        onChange={formik_yon.handleChange}
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
                                    Magistr fan dastur Yo'nalish ma'lumotlari
                                </div>
                                <div className="collapse-content">
                                    <ol className="list-decimal flex flex-col gap-3 ps-4 my-4">
                                        {dataYon?.length !== 0 && dataYon ? (
                                            dataYon?.map((item) => (
                                                <li
                                                    className="w-full border bg-gray-50 shadow-md p-2"
                                                    key={item.id}
                                                >
                                                    <div className="flex flex-col items-start gap-4">
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
                                                                        {/* Yo'nalish */}
                                                                        <tr>
                                                                            <th>
                                                                                Yo'nalish
                                                                            </th>
                                                                            <td>
                                                                                {isEditYon?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="name_uz"
                                                                                        id="name_uz"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            onChangeEditYon
                                                                                        }
                                                                                        value={
                                                                                            isEditYon.name_uz
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.name_uz
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditYon?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="name_ru"
                                                                                        id="name_ru"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            onChangeEditYon
                                                                                        }
                                                                                        value={
                                                                                            isEditYon.name_ru
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.name_ru
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditYon?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="name_en"
                                                                                        id="name_en"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            onChangeEditYon
                                                                                        }
                                                                                        value={
                                                                                            isEditYon.name_en
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.name_en
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                        {/* Kurs */}
                                                                        <tr>
                                                                            <th>
                                                                                Kurs
                                                                            </th>
                                                                            <td>
                                                                                {isEditYon?.id ===
                                                                                item.id ? (
                                                                                    <select
                                                                                        className="select select-bordered w-full max-w-xs"
                                                                                        onChange={
                                                                                            handleChangeSelecEditYon
                                                                                        }
                                                                                    >
                                                                                        {dataKurs?.map(
                                                                                            (
                                                                                                item
                                                                                            ) => (
                                                                                                <option
                                                                                                    key={
                                                                                                        item.id
                                                                                                    }
                                                                                                    value={
                                                                                                        item.id
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        item.name_uz
                                                                                                    }
                                                                                                </option>
                                                                                            )
                                                                                        )}
                                                                                    </select>
                                                                                ) : (
                                                                                    dataKurs?.filter(
                                                                                        (
                                                                                            kurs
                                                                                        ) =>
                                                                                            Number(
                                                                                                kurs.id
                                                                                            ) ===
                                                                                            Number(
                                                                                                item.fan_dastur_kurs_id
                                                                                            )
                                                                                    )[0]
                                                                                        ?.name_uz
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
                                                                        onEditYon(
                                                                            item,
                                                                            isEditYon?.id ===
                                                                                item.id
                                                                        )
                                                                    }
                                                                    className={` ${
                                                                        isEditYon?.id ===
                                                                        item.id
                                                                            ? "bg-blue-400 hover:bg-blue-600"
                                                                            : "bg-gray-400 hover:bg-gray-600"
                                                                    } flex items-center gap-2  rounded-md py-1 px-4 text-white font-medium active:scale-95`}
                                                                >
                                                                    {isEditYon?.id ===
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
                                                                        onDelYon(
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
                {/* Turi */}
                <div className="my-10">
                    <h1 className="text-[1.4rem] font-medium mb-2">
                        Magistr fan dastur Turi
                    </h1>
                    <div className="flex flex-col gap-4">
                        <form
                            className="w-full flex flex-col gap-2"
                            onSubmit={formik_tur.handleSubmit}
                        >
                            <div className="flex items-center gap-4">
                                <select
                                    name="fan_dastur_yonalish_id"
                                    id="fan_dastur_yonalish_id"
                                    className={`${
                                        warnTurSel && "select-error"
                                    } select select-bordered w-full max-w-xs`}
                                    value={
                                        formik_tur.values.fan_dastur_yonalish_id
                                    }
                                    onChange={formik_tur.handleChange}
                                >
                                    <option value="0">
                                        Yo'nalishni tanlang!
                                    </option>
                                    {dataYon?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name_uz}
                                        </option>
                                    ))}
                                </select>
                                <TextWarn
                                    className={`${
                                        warnTurSel ? "inline-block" : "hidden"
                                    } font-medium`}
                                >
                                    Iltimos yo'nailshni tanlang!
                                </TextWarn>
                            </div>
                            {/* Lavozim */}
                            <div className="w-full flex gap-2">
                                <label className="w-[33.33%]" htmlFor="">
                                    Nomi uz
                                    <textarea
                                        type="text"
                                        id="name_uz"
                                        className={`${
                                            formik_tur.errors.name_uz &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_tur.values.name_uz}
                                        onChange={formik_tur.handleChange}
                                    />
                                </label>

                                <label className="w-[33.33%]" htmlFor="">
                                    Nomi ru
                                    <textarea
                                        type="text"
                                        id="name_ru"
                                        className={`${
                                            formik_tur.errors.name_ru &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_tur.values.name_ru}
                                        onChange={formik_tur.handleChange}
                                    />
                                </label>

                                <label className="w-[33.33%]" htmlFor="">
                                    Nomi en
                                    <textarea
                                        type="text"
                                        id="name_en"
                                        className={`${
                                            formik_tur.errors.name_en &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_tur.values.name_en}
                                        onChange={formik_tur.handleChange}
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
                        {/* Turi */}
                        <div className="my-10">
                            <div className="collapse collapse-arrow">
                                <input type="checkbox" name="my-accordion-2" />
                                <div className="collapse-title text-xl font-medium bg-gray-200">
                                    Magistr fan dastur Tur ma'lumotlari
                                </div>
                                <div className="collapse-content">
                                    <ol className="list-decimal flex flex-col gap-3 ps-4 my-4">
                                        {dataTur?.length !== 0 && dataTur ? (
                                            dataTur?.map((item) => (
                                                <li
                                                    className="w-full border bg-gray-50 shadow-md p-2"
                                                    key={item.id}
                                                >
                                                    <div className="flex flex-col items-start gap-4">
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
                                                                        {/* Turi */}
                                                                        <tr>
                                                                            <th>
                                                                                Turi
                                                                            </th>
                                                                            <td>
                                                                                {isEditTur?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="name_uz"
                                                                                        id="name_uz"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            onChangeEditTur
                                                                                        }
                                                                                        value={
                                                                                            isEditTur.name_uz
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.name_uz
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditTur?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="name_ru"
                                                                                        id="name_ru"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            onChangeEditTur
                                                                                        }
                                                                                        value={
                                                                                            isEditTur.name_ru
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.name_ru
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditTur?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="name_en"
                                                                                        id="name_en"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            onChangeEditTur
                                                                                        }
                                                                                        value={
                                                                                            isEditTur.name_en
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.name_en
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                        {/* Kurs */}
                                                                        <tr>
                                                                            <th>
                                                                                Yo'nalish
                                                                            </th>
                                                                            <td>
                                                                                {isEditTur?.id ===
                                                                                item.id ? (
                                                                                    <select
                                                                                        className="select select-bordered w-full max-w-xs"
                                                                                        onChange={
                                                                                            handleChangeSelecEditTur
                                                                                        }
                                                                                    >
                                                                                        {dataYon.map(
                                                                                            (
                                                                                                item
                                                                                            ) => (
                                                                                                <option
                                                                                                    key={
                                                                                                        item.id
                                                                                                    }
                                                                                                    value={
                                                                                                        item.id
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        item.name_uz
                                                                                                    }
                                                                                                </option>
                                                                                            )
                                                                                        )}
                                                                                    </select>
                                                                                ) : (
                                                                                    dataYon?.filter(
                                                                                        (
                                                                                            yonalish
                                                                                        ) =>
                                                                                            Number(
                                                                                                yonalish.id
                                                                                            ) ===
                                                                                            Number(
                                                                                                item.fan_dastur_yonalish_id
                                                                                            )
                                                                                    )[0]
                                                                                        ?.name_uz
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
                                                                        onEditTur(
                                                                            item,
                                                                            isEditTur?.id ===
                                                                                item.id
                                                                        )
                                                                    }
                                                                    className={` ${
                                                                        isEditTur?.id ===
                                                                        item.id
                                                                            ? "bg-blue-400 hover:bg-blue-600"
                                                                            : "bg-gray-400 hover:bg-gray-600"
                                                                    } flex items-center gap-2  rounded-md py-1 px-4 text-white font-medium active:scale-95`}
                                                                >
                                                                    {isEditTur?.id ===
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
                                                                        onDelTur(
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

                {/* File */}
                <div className="my-10">
                    <h1 className="text-[1.4rem] font-medium mb-2">
                        Magistr fan dastur File
                    </h1>
                    <div className="flex flex-col gap-4">
                        <form
                            className="w-full flex flex-col gap-2"
                            onSubmit={formik_file.handleSubmit}
                        >
                            <div className="flex items-center gap-4">
                                <select
                                    name="fan_dastur_turi_id"
                                    id="fan_dastur_turi_id"
                                    className={`${
                                        warnFileSel && "select-error"
                                    } select select-bordered w-full max-w-xs`}
                                    value={
                                        formik_file.values.fan_dastur_turi_id
                                    }
                                    onChange={formik_file.handleChange}
                                >
                                    <option value="0">Turni tanlang!</option>
                                    {dataTur?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name_uz}
                                        </option>
                                    ))}
                                </select>
                                <TextWarn
                                    className={`${
                                        warnFileSel ? "inline-block" : "hidden"
                                    } font-medium`}
                                >
                                    Iltimos turni tanlang!
                                </TextWarn>
                            </div>
                            {/* name */}
                            <div className="w-full flex gap-2">
                                <label className="w-[33.33%]" htmlFor="">
                                    Nomi uz
                                    <textarea
                                        type="text"
                                        id="name_uz"
                                        className={`${
                                            formik_file.errors.name_uz &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_file.values.name_uz}
                                        onChange={formik_file.handleChange}
                                    />
                                </label>

                                <label className="w-[33.33%]" htmlFor="">
                                    Nomi ru
                                    <textarea
                                        type="text"
                                        id="name_ru"
                                        className={`${
                                            formik_file.errors.name_ru &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_file.values.name_ru}
                                        onChange={formik_file.handleChange}
                                    />
                                </label>

                                <label className="w-[33.33%]" htmlFor="">
                                    Nomi en
                                    <textarea
                                        type="text"
                                        id="name_en"
                                        className={`${
                                            formik_file.errors.name_en &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
                                        value={formik_file.values.name_en}
                                        onChange={formik_file.handleChange}
                                    />
                                </label>
                            </div>
                            <div className="flex gap-2">
                                <label className="w-[33.33%]" htmlFor="rasm">
                                    Fayl
                                    <input
                                        ref={fayl}
                                        onChange={handleChange}
                                        type="file"
                                        id="fayl"
                                        name="fayl"
                                        className={`${
                                            !fileItem &&
                                            "file-input-error text-red-600"
                                        } w-full file-input file-input-bordered`}
                                    />
                                </label>
                                <label className="w-[33.33%]" htmlFor="fayl">
                                    Sana
                                    <input
                                        type="date"
                                        id="sana"
                                        name="sana"
                                        value={formik_file.values.sana}
                                        onChange={formik_file.handleChange}
                                        className={`${
                                            formik_file.errors.sana &&
                                            "input-error"
                                        } w-full input input-bordered px-[7px]`}
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
                                    Magistr fan dastur File ma'lumotlari
                                </div>
                                <div className="collapse-content">
                                    <ol className="list-decimal flex flex-col gap-3 ps-4 my-4">
                                        {dataFile?.length !== 0 && dataFile ? (
                                            dataFile?.map((item) => (
                                                <li
                                                    className="w-full border bg-gray-50 shadow-md p-2"
                                                    key={item.id}
                                                >
                                                    <div className="flex flex-col items-start gap-4">
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
                                                                        {/* Yo'nalish */}
                                                                        <tr>
                                                                            <th>
                                                                                Fayl
                                                                                nomi
                                                                            </th>
                                                                            <td>
                                                                                {isEditFile?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="name_uz"
                                                                                        id="name_uz"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            onChangeEditFile
                                                                                        }
                                                                                        value={
                                                                                            isEditFile.name_uz
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.name_uz
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditFile?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="name_ru"
                                                                                        id="name_ru"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            onChangeEditFile
                                                                                        }
                                                                                        value={
                                                                                            isEditFile.name_ru
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.name_ru
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditFile?.id ===
                                                                                item.id ? (
                                                                                    <textarea
                                                                                        type="text"
                                                                                        name="name_en"
                                                                                        id="name_en"
                                                                                        className="w-[300px] border border-black rounded-sm py-[2px] px-[5px]"
                                                                                        onChange={
                                                                                            onChangeEditFile
                                                                                        }
                                                                                        value={
                                                                                            isEditFile.name_en
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.name_en
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                        {/* Turi */}
                                                                        <tr>
                                                                            <th>
                                                                                Turi
                                                                            </th>
                                                                            <td>
                                                                                {isEditFile?.id ===
                                                                                item.id ? (
                                                                                    <select
                                                                                        className="select select-bordered w-full max-w-xs"
                                                                                        onChange={
                                                                                            handleChangeSelecEditFile
                                                                                        }
                                                                                    >
                                                                                        {dataTur.map(
                                                                                            (
                                                                                                item
                                                                                            ) => (
                                                                                                <option
                                                                                                    key={
                                                                                                        item.id
                                                                                                    }
                                                                                                    value={
                                                                                                        item.id
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        item.name_uz
                                                                                                    }
                                                                                                </option>
                                                                                            )
                                                                                        )}
                                                                                    </select>
                                                                                ) : (
                                                                                    dataTur?.filter(
                                                                                        (
                                                                                            tur
                                                                                        ) =>
                                                                                            Number(
                                                                                                tur.id
                                                                                            ) ===
                                                                                            Number(
                                                                                                item.fan_dastur_turi_id
                                                                                            )
                                                                                    )[0]
                                                                                        ?.name_uz
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>
                                                                                Sana
                                                                            </th>
                                                                            <td>
                                                                                {
                                                                                    item.sana
                                                                                }
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
                                                                        onEditFile(
                                                                            item,
                                                                            isEditFile?.id ===
                                                                                item.id
                                                                        )
                                                                    }
                                                                    className={` ${
                                                                        isEditFile?.id ===
                                                                        item.id
                                                                            ? "bg-blue-400 hover:bg-blue-600"
                                                                            : "bg-gray-400 hover:bg-gray-600"
                                                                    } flex items-center gap-2  rounded-md py-1 px-4 text-white font-medium active:scale-95`}
                                                                >
                                                                    {isEditFile?.id ===
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
                                                                        onDelFile(
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

export default MFanDasturlari;
