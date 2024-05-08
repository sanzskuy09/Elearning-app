import React, { useEffect, useState } from "react";

import { Select, Input } from "antd";
const { Option } = Select;
import { SearchOutlined } from "@ant-design/icons";
import ButtonAdd from "../Button/ButtonAdd";

const SearchBar = ({
  filters,
  setFilters,
  options,
  onSearch,
  handleSearch,
  value,
  setValue,
  text,
  onButtonClick,
  showButton,
  widthSelect,
}) => {
  const handleChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    const bounceTimer = setTimeout(() => {
      // console.log("Value changed:", value);
    }, 1000);

    return () => clearTimeout(bounceTimer);
  }, [value]);

  return (
    <div>
      <div className="py-4 px-6 flex justify-start items-center gap-8">
        {options?.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <label htmlFor="">{option.label}</label>
            <Select
              value={filters[option.name]}
              onChange={(value) => handleChange(option.name, value)}
              style={{ width: widthSelect ? widthSelect : 150 }}
            >
              {option.values.map((value) => (
                <Option key={value.value} value={value.value}>
                  {value.label}
                </Option>
              ))}
            </Select>
          </div>
        ))}

        <div>
          <button
            type="button"
            className="w-full my-2 border border-gray-400 bg-[#D8FFCB] text-black font-semibold px-4 py-1 rounded-md min-w-[8rem]"
            onClick={onSearch}
          >
            <SearchOutlined className="mr-2" />
            Cari
          </button>
        </div>
      </div>

      <hr className="my-2 border-gray-400" />

      <div className="py-4 px-6 flex justify-between">
        <div className="flex gap-2 items-center">
          <label htmlFor="">Search :</label>
          <Input
            placeholder=""
            className="flex-1 max-w-64"
            value={value}
            allowClear
            onChange={handleSearch}
          />
        </div>

        {showButton && (
          <div>
            <ButtonAdd text={text} onChange={onButtonClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
