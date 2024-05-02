import Image from "next/image";
import React from "react";

import IconPlus from "../../../public/Icons/icon-plus.svg";

const ButtonAdd = ({ text, onChange }) => {
  return (
    <div>
      <button
        className="flex items-center gap-2 rounded-sm px-4 py-1 bg-[#D8FFCB] border border-gray-400"
        onClick={onChange}
      >
        <Image
          src={IconPlus}
          alt="img-button"
          className="inline-block"
          width={16}
          height={16}
        />
        {text}
      </button>
    </div>
  );
};

export default ButtonAdd;
