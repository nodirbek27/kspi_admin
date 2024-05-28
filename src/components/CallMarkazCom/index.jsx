import React, { useState } from "react";

import ReactQuill from "react-quill";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import "react-quill/dist/quill.snow.css";

const CallMarkazCom = () => {
  const [value, setValue] = useState("");

  const convertDeltaToHtml = (delta) => {
    const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
    return converter.convert();
  };

  const getHtmlOutput = (value) => {
    try {
      const delta = JSON.parse(value);
      return convertDeltaToHtml(delta);
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="mx-2 lg:mx-5 xl:mx-10">
      <h1 className="text-3xl font-bold text-center mb-5 pt-3">Call markaz</h1>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <div className="mt-5">
        <h2 className="text-xl font-semibold">HTML Output:</h2>
        <pre className="p-4 border rounded bg-gray-100">{getHtmlOutput(value)}</pre>
      </div>
    </div>
  );
};

export default CallMarkazCom;
