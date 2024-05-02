"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Select, Input, Checkbox, ConfigProvider } from "antd";
const { Search } = Input;

import { SearchOutlined } from "@ant-design/icons";

import { useSpring, animated } from "react-spring";
import Image from "next/image";
import ButtonAdd from "@/components/Button/ButtonAdd";
import { useRouter } from "next/navigation";

const SilabusPage = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(true);

  const [kelas, setKelas] = useState("");
  const [mapel, setMapel] = useState("");

  const optionsKelas = [
    {
      value: "",
      label: "Pilih Kelas",
    },
    {
      value: "SD",
      label: "SD",
    },
    {
      value: "SMP",
      label: "SMP",
    },
    {
      value: "SMA",
      label: "SMA",
    },
  ];

  const optionsMapel = [
    {
      value: "",
      label: "Pilih Mapel",
    },
    {
      value: "IPA",
      label: "IPA",
    },
    {
      value: "IPS",
      label: "IPS",
    },
  ];

  const handleChangeKelas = (value) => {
    setKelas(value);
  };
  const handleChangeMapel = (value) => {
    setMapel(value);
  };

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const onChange = (e) => {
    // console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  useEffect(() => {
    const bounceTimer = setTimeout(() => {
      // console.log("Value changed:", value);
    }, 1000);

    return () => clearTimeout(bounceTimer);
  }, [value]);

  return (
    <div className="flex flex-col h-full">
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Kelola Silabus</h1>
        <h1>Hallo, Kak Nanda</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4 h-full">
        <div className="bg-white shadow-md col-span-2 rounded-lg min-h-max h-full">
          <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
            Silabus Pembelajaran
          </h1>

          <div className="py-4 px-6 flex justify-start items-center gap-8">
            <div className="flex gap-2 items-center">
              <label htmlFor="">Kelas</label>
              <Select
                value={kelas}
                onChange={handleChangeKelas}
                style={{
                  width: 150,
                }}
                options={optionsKelas}
              />
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="">Mata Pelajaran</label>
              <Select
                value={mapel}
                onChange={handleChangeMapel}
                style={{
                  width: 150,
                }}
                options={optionsMapel}
              />
            </div>

            <div>
              <button
                type="button"
                className="w-full my-2 border border-gray-400 bg-[#D8FFCB] text-black font-semibold px-4 py-1 rounded-md min-w-[8rem]"
              >
                <SearchOutlined className="mr-2" />
                Cari
              </button>
            </div>
          </div>

          <hr className="my-2 border-gray-400" />

          <div className="py-4 px-6">
            <div className="flex gap-2 items-center">
              <label htmlFor="">Search :</label>
              <Input
                placeholder=""
                className="flex-1 max-w-64"
                value={value}
                allowClear
                // onChange={handleChangeSearch}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>

          <div className="py-4 px-6">
            {kelas == "" || mapel == "" ? (
              <p>
                Harap pilih <strong>Kelas</strong> dan{" "}
                <strong>Mata Pelajarannya</strong> terlebih dahulu.
              </p>
            ) : (
              <>
                <h1 className="font-bold text-2xl">Matematika - SMP</h1>

                {/* silabus list */}
                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex gap-4 items-center">
                    <Checkbox checked={checked} onChange={onChange} />

                    <div className="flex-1 px-4 py-1 border border-black rounded-md">
                      <p className="text-sm">
                        Menjelaskan dan menentukan urutan bilangan bulat
                        (negatif - positif) dan pecahan
                      </p>
                    </div>

                    <div className="flex gap-4 ml-8">
                      <button>+</button>
                      <button>+</button>
                      <button>+</button>
                    </div>
                  </div>

                  {/* conoth stat */}
                  <div className="flex gap-4 items-center">
                    <Checkbox checked={checked} onChange={onChange} />

                    <div className="flex-1 px-4 py-1 border border-black rounded-md">
                      <p className="text-sm">
                        Menjelaskan dan menentukan urutan bilangan bulat
                        (negatif - positif) dan pecahan
                      </p>
                    </div>

                    <div className="flex gap-4 ml-8">
                      <button>+</button>
                      <button>+</button>
                      <button>+</button>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Checkbox checked={checked} onChange={onChange} />

                    <div className="flex-1 px-4 py-1 border border-black rounded-md">
                      <p className="text-sm">
                        Menjelaskan dan menentukan urutan bilangan bulat
                        (negatif - positif) dan pecahan
                      </p>
                    </div>

                    <div className="flex gap-4 ml-8">
                      <button>+</button>
                      <button>+</button>
                      <button>+</button>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Checkbox checked={checked} onChange={onChange} />

                    <div className="flex-1 px-4 py-1 border border-black rounded-md">
                      <p className="text-sm">
                        Menjelaskan dan menentukan urutan bilangan bulat
                        (negatif - positif) dan pecahan
                      </p>
                    </div>

                    <div className="flex gap-4 ml-8">
                      <button>+</button>
                      <button>+</button>
                      <button>+</button>
                    </div>
                  </div>
                  {/* conoth end */}
                </div>

                <div className="flex gap-4 w-full justify-end mt-8">
                  <ButtonAdd
                    text="Buat Silabus"
                    onChange={() => router.push("/silabus/tambahsilabus")}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SilabusPage;
