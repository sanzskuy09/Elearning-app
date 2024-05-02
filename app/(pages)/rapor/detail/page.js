"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import ButtonAdd from "@/components/Button/ButtonAdd";

import { Input, Select } from "antd";
const { TextArea } = Input;
const { Option } = Select;

const DetailRaporPage = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const update = searchParams.get("update");

  // console.log(id);
  // console.log(update);
  return (
    <div className="flex flex-col h-full">
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Rapor</h1>
        <h1>Hallo, Kak Nanda</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4">
        <div className="bg-white shadow-md col-span-2 rounded-lg">
          <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
            Rapor Murid
          </h1>

          <div className="py-8 px-12">
            <form action="" className="grid grid-cols-2 gap-24">
              <div>
                <h1 className="mb-2 text-xl font-semibold">Pemberian Nilai</h1>

                {/* mapel start */}
                <div className="mb-4 flex flex-col gap-2">
                  <h1 className="text-xl font-semibold">Matematika</h1>
                  <div>
                    <label htmlFor="pretest" className="block text-sm mb-1">
                      Pre-Test <span className="text-red-600">*</span>
                    </label>
                    <Input
                      placeholder=""
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      allowClear
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="posttest" className="block text-sm mb-1">
                      Post-test <span className="text-red-600">*</span>
                    </label>
                    <Input
                      placeholder=""
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      allowClear
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4 flex flex-col gap-2">
                  <h1 className="text-xl font-semibold">Bahasa Inggris</h1>
                  <div>
                    <label htmlFor="pretest" className="block text-sm mb-1">
                      Pre-Test <span className="text-red-600">*</span>
                    </label>
                    <Input
                      placeholder=""
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      allowClear
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="posttest" className="block text-sm mb-1">
                      Post-test <span className="text-red-600">*</span>
                    </label>
                    <Input
                      placeholder=""
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      allowClear
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4 flex flex-col gap-2">
                  <h1 className="text-xl font-semibold">Pendidikan Karakter</h1>
                  <div>
                    <label htmlFor="pretest" className="block text-sm mb-1">
                      Pre-Test <span className="text-red-600">*</span>
                    </label>
                    <Input
                      placeholder=""
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      allowClear
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="posttest" className="block text-sm mb-1">
                      Post-test <span className="text-red-600">*</span>
                    </label>
                    <Input
                      placeholder=""
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      allowClear
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4 flex flex-col gap-2">
                  <h1 className="text-xl font-semibold">Kreasi</h1>
                  <div>
                    <label htmlFor="pretest" className="block text-sm mb-1">
                      Pre-Test <span className="text-red-600">*</span>
                    </label>
                    <Input
                      placeholder=""
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      allowClear
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="posttest" className="block text-sm mb-1">
                      Post-test <span className="text-red-600">*</span>
                    </label>
                    <Input
                      placeholder=""
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      allowClear
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* mapel end */}

              <div>
                <h1 className="mb-2 text-xl font-semibold">Biodata Murid</h1>

                <div className="mb-4">
                  <label htmlFor="nama" className="block text-sm mb-1">
                    Nama Murid <span className="text-red-600">*</span>
                  </label>
                  <Input
                    defaultValue={"Nanda"}
                    disabled
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="wali" className="block text-sm mb-1">
                    Nama Orangtua / Wali <span className="text-red-600">*</span>
                  </label>
                  <Input
                    defaultValue={"Ibu Nanda"}
                    disabled
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="wali" className="block text-sm mb-1">
                    Semester
                  </label>
                  <Select
                    placeholder="Pilih tingkat pendidikan"
                    defaultValue="1"
                    // onChange={(value) =>
                    //   formik.setFieldValue("tingkat_pendidikan", value)
                    // }
                    // onBlur={formik.handleBlur("tingkat_pendidikan")}
                    className="my-2 w-full"
                  >
                    <Option value="1">Semester 1</Option>
                    <Option value="2">Semester 2</Option>
                    <Option value="3">Semester 3</Option>
                    <Option value="4">Semester 4</Option>
                    <Option value="5">Semester 5</Option>
                    <Option value="6">Semester 6</Option>
                    <Option value="7">Semester 7</Option>
                    <Option value="8">Semester 8</Option>
                  </Select>
                </div>

                <div className="mb-4">
                  <h1 className="mb-1 text-xl font-semibold">
                    Catatan Wali Kelas
                  </h1>

                  <TextArea
                    rows={4}
                    placeholder="catatan wali kelas.."
                    allowClear
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="flex justify-end mt-8">
                  <ButtonAdd text="Simpan" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRaporPage;
