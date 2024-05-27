import React, { useState } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaLink,
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaListUl,
  FaListOl,
} from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";

const CallMarkazCom = () => {
  const [text, setText] = useState("");
  const [classes, setClasses] = useState([]);

  const handleCommand = (command) => {
    setClasses((prevClasses) => {
      if (prevClasses.includes(command)) {
        return prevClasses.filter((cls) => cls !== command);
      } else {
        return [...prevClasses, command];
      }
    });
  };

  const handleLink = () => {
    // Link handling logic
  };

  const handleImage = () => {
    // Image handling logic
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex py-5">
        <FaBold onClick={() => handleCommand("font-bold")} className="mr-3 cursor-pointer" />
        <FaItalic onClick={() => handleCommand("italic")} className="mr-3 cursor-pointer" />
        <FaUnderline
          onClick={() => handleCommand("underline")}
          className="mr-3 cursor-pointer"
        />
        <FaLink onClick={handleLink} className="mr-3 cursor-pointer" />
        <FaAlignLeft
          onClick={() => handleCommand("text-left")}
          className="mr-3 cursor-pointer"
        />
        <FaAlignCenter
          onClick={() => handleCommand("text-center")}
          className="mr-3 cursor-pointer" />
        <FaAlignRight
          onClick={() => handleCommand("text-right")}
          className="mr-3 cursor-pointer"
        />
        <FaListOl
          onClick={() => handleCommand("list-decimal")}
          className="mr-3 cursor-pointer"
        />
        <FaListUl
          onClick={() => handleCommand("list-disc")}
          className="mr-3 cursor-pointer"
        />
        <LuImagePlus onClick={handleImage} className="mr-3 cursor-pointer" />
      </div>
      <textarea
        className={`w-full h-64 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 ${classes.join(" ")}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Matn kiriting..."
      ></textarea>
      <div className="mt-4 p-4 border rounded bg-gray-100">
        {`<p className="${classes.join(" ")}">${text}</p>`}
      </div>
    </div>
  );
};

export default CallMarkazCom;
