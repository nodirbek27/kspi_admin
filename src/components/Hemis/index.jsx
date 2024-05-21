import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useFormik } from "formik";
import APIHemis from "../../services/hemis";

const Hemis = () => {
  const [data, setData] = useState(null);

  // Post
  const formik = useFormik({
    initialValues: {
      link: "",
    },
    onSubmit: async (values, { resetForm }) => {
      await APIHemis.post(values.link);
      resetForm();
      getData();
    },
  });
  // GET qilish
  const getData = async () => {
    await APIHemis.get().then((res) => setData(res.data));
  };
  // Delete qilish
  const handleDelete = async (id) => {
    await APIHemis.del(id);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-5 p-3">Hemis tizimi</h2>
      <div>
        {/* Post */}
        <div className="max-w-7xl mx-auto mb-5">
          <form
            onSubmit={formik.handleSubmit}
            className={`${data?.length >= 1 ? "hidden" : ""}`}
          >
            <table className="table">
              <tbody>
                {/* row 1 */}
                <tr className="grid grid-cols-3">
                  <td className="font-bold">Hemis tizimi</td>
                  <td className="text-center">
                    <input
                      id="link"
                      name="link"
                      type="text"
                      placeholder="https://kspi.uz"
                      className="input input-bordered w-full max-w-xs"
                      onChange={formik.handleChange}
                      value={formik.values.link}
                    />
                  </td>
                  <td className="text-center">
                    <button
                      type="submit"
                      className="btn btn-success text-white"
                    >
                      Saqlash
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>

        {/* Get */}
        <div className="max-w-7xl mx-auto">
          {data &&
            data.map((item) => (
              <table className="table border-separate">
                {/* head */}
                <thead>
                  <tr>
                    <th className="text-lg font-bold">Nomi</th>
                    <th className="text-center text-lg font-bold">Link</th>
                    <th className="text-center text-lg font-bold">O'chirish</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-base-200">
                    <td className="font-bold">Hemis tizimi</td>
                    <td className="text-center text-blue-400">{item.link}</td>
                    <td>
                      <RiDeleteBin5Line
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 cursor-pointer h-5 w-5 mx-auto"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Hemis;
