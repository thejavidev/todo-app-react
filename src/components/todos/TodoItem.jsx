import React, { useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const TodoItem = ({ itemKey, name, deleteTodo, chc, tgl, itmCmpl }) => {
  return (
    <>
      <div
        className={`w-full li_item flex relative justify-between p-[10px] border-b-[1px] border-[--borderColor]  `}
      >
        <div className="flex items-center  gap-[10px]">
          <div className="">
            <input
              checked={chc}
              onChange={() => tgl(itemKey)}
              type="checkbox"
              className="rounded-full cursor-pointer li_input"
            />
          </div>
          <div
            className={`text-[--text] li_text font-medium ${
              chc ? "checked" : ""
            }`}
          >
            {name}
          </div>
        </div>
        <div className="">
          
          <button
            className={`cursor-pointer transition-all li_btn opacity-0 invisible ${
              itmCmpl ? "hidden" : ""
            }`}
            onClick={() => deleteTodo(itemKey)}
          >
            <AiFillDelete className="text-[20px] text-[--text]" />
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
