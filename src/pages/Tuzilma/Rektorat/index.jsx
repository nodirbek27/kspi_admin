import React from "react";
import { useFormik } from "formik";
import { RxArrowTopRight } from "react-icons/rx";
import { MdEdit, MdDelete } from "react-icons/md";

const Rektorat = () => {
    const faceData = [
        {
            id: 1,
            name_uz:
                "Rector asdczxczcxzcx bdfgbdgbfgbnfgb fd sdfsf fasdfaSD ASDASD S",
            name_ru: "вдлы овадлыв фывдлжфлыдлвфж лывды",
            name_en: "kds laksvb lda xcxc en",
        },
        {
            id: 2,
            name_uz:
                "Yoshlar masalalari va ma'naviy-ma'rifiy ishlar bo'yicha prorektor",
            name_ru: "вдлыовадлыв фывдлжфлы длвфж лывды",
            name_en: "kdslaa vksl da xcxc",
        },
        {
            id: 3,
            name_uz: "Ilmiy ishlar",
            name_ru: "вдлыовад лыв фывд лжфлыдлвфж лы вды",
            name_en: "kdslaksldxczxcza xcxc",
        },
    ];

    const formik = useFormik({
        initialValues: {
            name_uz: "",
            name_ru: "",
            name_en: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const formik_2 = useFormik({
        initialValues: {
            markaz_id: "",
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
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <div className="flex justify-center">
            <div className="w-full h-full">
                <h1 className="text-center text-[1.5rem] font-medium">
                    Reactarat
                </h1>
                <div>
                    <h1 className="text-[1.2rem] font-medium">
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
                            className="flex justify-center items-center w-[25%] h-[48px] bg-blue-400 text-white mt-[18px] font-bold rounded-lg hover:bg-blue-600 active:scale-95"
                            type="submit"
                        >
                            SUBMIT
                            <RxArrowTopRight className="font-bold text-[20px] mt-[2px]" />
                        </button>
                    </form>
                </div>
                <div>
                    <h1 className="text-[1.2rem] font-medium">
                        Rektarat lavozimlari:
                    </h1>
                    <ol className="list-decimal flex flex-col gap-2 ps-4">
                        {faceData?.length !== 0 && faceData ? (
                            faceData?.map(
                                ({ id, name_uz, name_ru, name_en }) => (
                                    <li
                                        className="border bg-gray-50 p-2"
                                        key={id}
                                    >
                                        <div className="flex justify-between items-center">
                                            <p className=" inline-block">
                                                {name_uz}
                                            </p>
                                            <div className="flex gap-2">
                                                <button className="flex items-center gap-2 bg-blue-400 rounded-md py-1 px-4 text-white font-medium hover:bg-blue-600 active:scale-95">
                                                    <span>Tahrirlash</span>
                                                    <MdEdit />
                                                </button>
                                                <button className="flex items-center gap-2 bg-red-500 rounded-md py-1 px-4 text-white font-medium hover:bg-red-600 active:scale-95">
                                                    <span>Delete</span>
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            )
                        ) : (
                            <div>Ma'lumot mavjud emas!</div>
                        )}
                    </ol>
                </div>

                <div>
                    <h1 className="text-[1.2rem] font-medium">
                        Rektarat lavozim nomzodlarini yaratish
                    </h1>
                    <div className="flex items-center gap-4">
                        <select
                            name="RectaratLavozim"
                            id="RectaratLavozim"
                            className="select select-bordered w-full max-w-xs"
                            value={formik_2.values.markaz_id}
                            onChange={formik_2.handleChange}
                        >
                            {faceData?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name_uz}
                                </option>
                            ))}
                        </select>
                        <h2 className="text-red-600">
                            Avval qaysi lavozimgaligini kiriting!
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rektorat;
