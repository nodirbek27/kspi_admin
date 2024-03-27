import React from "react";
import { useFormik } from "formik";
import APIYangilik from "../../services/yangilik";

const Test = () => {
  // POST
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: async (values) => {
      await APIYangilik.post(values.text);
    },
  });

  return (
    <div className="mx-2 lg:mx-5 xl:mx-10">
      {/* POST */}
      <div className="mb-10">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <div>
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Text
            </label>
            <textarea
              id="text"
              name="text"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Text"
              onChange={formik.handleChange}
              value={formik.values.text}
            ></textarea>
          </div>
          <button
            className="btn bg-gray-800 hover:bg-gray-700 text-white"
            type="submit"
          >
            Qo'shish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Test;
