import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import Editor from "./EditorWithUseQuill";
import APICallMarkaz from "../../services/callMarkaz";

import "./styles.css";

Quill.register("modules/imageResize", ImageResize);

const CallMarkazCom = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const [data, setData] = useState(null);

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const handlePost = async () => {
    try {
      await APICallMarkaz.post({ body_uz: editorHtml });
      getData();
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  const getData = async () => {
    try {
      const res = await APICallMarkaz.get();
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <ReactQuill
        theme="snow"
        onChange={handleChange}
        value={editorHtml}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds={"#root"}
        placeholder={"Write something ..."}
      />
      <button className="btn" onClick={handlePost}>
        Yuklash
      </button>

      {data && data.map((item) => (
        <div key={item.id}>
          {item.body_uz}
        </div>
      ))}
    </div>
  );
};

Editor.modules = {
  toolbar: [
    [{ header: [] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default CallMarkazCom;
