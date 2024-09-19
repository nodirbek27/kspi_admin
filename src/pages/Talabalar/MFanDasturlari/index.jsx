import React, { useEffect, useState } from "react";

import { RxArrowTopRight } from "react-icons/rx";
import { MdEdit, MdDelete } from "react-icons/md";
import APIFanDasKurs from "../../../services/mFanDasturKurs";
import Loader from "../../../components/Loader";

const MFanDasturlari = () => {
    const [selectedValueKurs, setSelectedValueKurs] = useState("");
    const [warnKursSelect, setWarnKursSelect] = useState("");

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

    // const dataOne = [
    //     { id: 1, name: "A" },
    //     { id: 2, name: "B" },
    //     { id: 3, name: "C" },
    // ];

    // const dataTwo = [
    //     { parentId: 1, id: 1, name: "A1" },
    //     { parentId: 1, id: 2, name: "A2" },
    //     { parentId: 1, id: 3, name: "A3" },

    //     { parentId: 2, id: 4, name: "B2" },
    //     { parentId: 2, id: 5, name: "B3" },
    //     { parentId: 2, id: 6, name: "B4" },

    //     { parentId: 3, id: 7, name: "C5" },
    //     { parentId: 3, id: 8, name: "C6" },
    //     { parentId: 3, id: 9, name: "C7" },
    // ];

    // const dataThree = [
    //     { parentId: 1, id: 1, name: "A1-1" },
    //     { parentId: 2, id: 2, name: "A1-2" },
    //     { parentId: 3, id: 3, name: "A1-3" },

    //     { parentId: 4, id: 4, name: "B1-4" },
    //     { parentId: 5, id: 5, name: "B2-5" },
    //     { parentId: 6, id: 6, name: "B2-6" },

    //     { parentId: 7, id: 7, name: "C1-7" },
    //     { parentId: 8, id: 8, name: "C2-8" },
    //     { parentId: 9, id: 9, name: "C3-9" },
    // ];

    // const dataFour = [
    //     { parentId: 1, id: 1, name: "A1-1-1" },
    //     { parentId: 2, id: 2, name: "A2-2-1" },
    //     { parentId: 3, id: 3, name: "B3-1-1" },

    //     { parentId: 4, id: 4, name: "A4-1-1" },
    //     { parentId: 5, id: 5, name: "A5-2-1" },
    //     { parentId: 6, id: 6, name: "B6-1-1" },

    //     { parentId: 7, id: 7, name: "A8-1-1" },
    //     { parentId: 8, id: 8, name: "A9-2-1" },
    //     { parentId: 9, id: 9, name: "B7-1-1" },
    // ];

    // const [selectedOne, setSelectedOne] = useState(null);
    // const [selectedTwo, setSelectedTwo] = useState(null);
    // const [selectedThree, setSelectedThree] = useState(null);

    // const handleSelectOneChange = (e) => {
    //     const selectedId = parseInt(e.target.value);
    //     setSelectedOne(selectedId);
    //     setSelectedTwo(null);
    //     setSelectedThree(null);
    // };

    // const handleSelectTwoChange = (e) => {
    //     const selectedId = parseInt(e.target.value);
    //     setSelectedTwo(selectedId);
    //     setSelectedThree(null);
    // };

    // const handleSelectThreeChange = (e) => {
    //     const selectedId = parseInt(e.target.value);
    //     setSelectedThree(selectedId);
    // };

    const [data, setData] = useState([]);

    const [isEditKurs, setIsEditKurs] = useState(null);

    // load
    const [load, setLoad] = useState(true);

    const getData = () => {
        APIFanDasKurs.get()
            .then((res) => {
                setData(res.data);
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

    const handleClickSubmit = () => {
        if (selectedValueKurs) {
            const data = {
                name_uz: selectedValueKurs === "1" ? "1-kurs" : "2-kurs",
                name_ru: "",
                name_en: "",
            };
            APIFanDasKurs.post(data)
                .then(() => getData())
                .catch((err) => console.log(err));
        } else {
            setWarnKursSelect(true);
            setTimeout(() => {
                setWarnKursSelect(false);
            }, 2000);
        }
    };

    // onDelN
    const onDelN = (id) => {
        if (isEditKurs) {
            alert("Siz tahrirlash jarayonidasiz!");
        } else {
            const res = window.confirm("Ishonchingiz komilmi?");
            if (res) {
                setLoad(true);
                APIFanDasKurs.del(id)
                    .then(() => {
                        getData();
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
                    getData();
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

    const handleChangeSelectKursEdit = (e) => {
        setIsEditKurs({
            ...isEditKurs,
            name_uz: e.target.value,
        });
    };

    useEffect(() => {
        setLoad(true);
        getData();
    }, []);

    return (
        // <div>
        //     <select onChange={handleSelectOneChange}>
        //         <option value="">Select One</option>
        //         {dataOne.map((item) => (
        //             <option key={item.id} value={item.id}>
        //                 {item.name}
        //             </option>
        //         ))}
        //     </select>

        //     <select onChange={handleSelectTwoChange} disabled={!selectedOne}>
        //         <option value="">Select Two</option>
        //         {dataTwo
        //             .filter((item) => item.parentId === selectedOne)
        //             .map((item) => (
        //                 <option key={item.id} value={item.id}>
        //                     {item.name}
        //                 </option>
        //             ))}
        //     </select>

        //     <select onChange={handleSelectThreeChange} disabled={!selectedTwo}>
        //         <option value="">Select Three</option>
        //         {dataThree
        //             .filter((item) => item.parentId === selectedTwo)
        //             .map((item) => (
        //                 <option key={item.id} value={item.id}>
        //                     {item.name}
        //                 </option>
        //             ))}
        //     </select>

        //     <select disabled={!selectedThree}>
        //         <option value="">Select Four</option>
        //         {dataFour
        //             .filter((item) => item.parentId === selectedThree)
        //             .map((item) => (
        //                 <option key={item.id} value={item.id}>
        //                     {item.name}
        //                 </option>
        //             ))}
        //     </select>
        // </div>
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
                                        Birini tanlang!
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
                                    Rektorat rahbarlari:
                                </div>
                                <div className="collapse-content">
                                    <ol className="list-decimal flex flex-col gap-3 ps-4 my-4">
                                        {data?.length !== 0 && data ? (
                                            data?.map((item) => (
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
                                                                    handleChangeSelectKursEdit
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
                                                </li>
                                            ))
                                        ) : (
                                            <div className="text-red-600">
                                                Ma'lumot mavjud emas!
                                            </div>
                                        )}
                                    </ol>

                                    {/* <ol className="list-decimal flex flex-col gap-3 ps-4 my-4">
                                        {data?.length !== 0 && data ? (
                                            data?.map((item) => (
                                                <li
                                                    className="w-full border bg-gray-50 shadow-md p-2"
                                                    key={item.id}
                                                >
                                                    <div className="flex flex-col items-start gap-4">
                                                        <div>
                                                            <div className="overflow-x-auto">
                                                                <table className="table">
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
                                                                        <tr>
                                                                            <th>
                                                                                Nomi
                                                                            </th>
                                                                            <td>
                                                                                {isEditKurs?.id ===
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
                                                                                            isEditKurs.name_uz
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.name_uz
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditKurs?.id ===
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
                                                                                            isEditKurs.name_ru
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item.name_ru
                                                                                )}
                                                                            </td>
                                                                            <td>
                                                                                {isEditKurs?.id ===
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
                                                                                            isEditKurs.name_en
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
                                                                    // onClick={() =>
                                                                    //     onEditN(
                                                                    //         item,
                                                                    //         isEditKurs?.id ===
                                                                    //             item.id
                                                                    //     )
                                                                    // }
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
                                    </ol> */}
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
