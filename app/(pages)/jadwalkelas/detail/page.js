"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import ButtonAdd from "@/components/Button/ButtonAdd";

import { Input, Select } from "antd";
const { TextArea } = Input;
const { Option } = Select;

const kelasOption = [
  // { value: "", label: "Pilih Kelas" },
  { value: "SD", label: "SD" },
  { value: "SMP", label: "SMP" },
  { value: "SMA", label: "SMA" },
];

const mapelOption = [
  // { value: "", label: "Pilih Mata Pelajaran" },
  { value: "IPA", label: "IPA" },
  { value: "IPS", label: "IPS" },
  { value: "Bahasa", label: "Bahasa" },
];

const hariOption = [
  // { value: "", label: "Pilih Hari" },
  { value: "Senin", label: "Senin" },
  { value: "Selasa", label: "Selasa" },
  { value: "Rabu", label: "Rabu" },
  { value: "Kamis", label: "Kamis" },
  { value: "Jumat", label: "Jumat" },
  { value: "Sabtu", label: "Sabtu" },
  { value: "Minggu", label: "Minggu" },
];

const jamMapelOption = [
  // { value: "", label: "Pilih Jam Pelajaran" },
  { value: "09.00 - 10.00", label: "09.00 - 10.00" },
  { value: "10.00 - 11.00", label: "10.00 - 11.00" },
  { value: "11.00 - 12.00", label: "11.00 - 12.00" },
];

const relawanOption = [
  // { value: "", label: "Pilih Relawan" },
  { value: "Ihsan", label: "Ihsan" },
  { value: "Nanda", label: "Nanda" },
  { value: "Raza", label: "Raza" },
];
const DetailJadwalKelasPage = () => {
  const nama = localStorage.getItem("nama_panggilan");

  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const update = searchParams.get("update");

  const disableForm = update === "true" ? false : true;

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Kelola Jadwal</h1>
        <h1>Hallo, Kak {nama}</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4">
        <div className="bg-white shadow-md col-span-2 rounded-lg">
          <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
            {update === "true" ? "Edit Jadwal Kelas" : "Jadwal Kelas"}
          </h1>

          <div className="py-8 px-12 max-w-[50%]">
            <form action="">
              <h1 className="mb-2 text-xl font-semibold">Kelompok Jadwal</h1>

              <div className="mb-4">
                <label htmlFor="kelas" className="block text-sm mb-1">
                  Kelas
                </label>
                <Select
                  disabled={disableForm}
                  placeholder="Pilih kelas"
                  allowClear
                  // onChange={(value) =>
                  //   formik.setFieldValue("tingkat_pendidikan", value)
                  // }
                  // onBlur={formik.handleBlur("tingkat_pendidikan")}
                  className="my-2 w-full"
                >
                  {kelasOption?.map((e) => (
                    <Option value={e.value} key={e.value}>
                      {e.label}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="mb-4">
                <label htmlFor="mapel" className="block text-sm mb-1">
                  Mata Pelajaran
                </label>
                <Select
                  disabled={disableForm}
                  placeholder="Pilih mata pelajaran"
                  allowClear
                  className="my-2 w-full"
                >
                  {mapelOption?.map((e) => (
                    <Option value={e.value} key={e.value}>
                      {e.label}
                    </Option>
                  ))}
                </Select>
              </div>

              <h1 className="mb-2 text-xl font-semibold">Detail Jadwal</h1>

              <div className="mb-4">
                <label htmlFor="hari" className="block text-sm mb-1">
                  Hari
                </label>
                <Select
                  disabled={disableForm}
                  placeholder="Pilih hari"
                  allowClear
                  className="my-2 w-full"
                >
                  {hariOption?.map((e) => (
                    <Option value={e.value} key={e.value}>
                      {e.label}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="mb-4">
                <label htmlFor="jammapel" className="block text-sm mb-1">
                  Jam Pelajaran
                </label>
                <Select
                  disabled={disableForm}
                  placeholder="Pilih jam pelajaran"
                  allowClear
                  className="my-2 w-full"
                >
                  {jamMapelOption?.map((e) => (
                    <Option value={e.value} key={e.value}>
                      {e.label}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="mb-4">
                <label htmlFor="relawan" className="block text-sm mb-1">
                  Pelawan Pengajar
                </label>
                <Select
                  disabled={disableForm}
                  mode="multiple"
                  allowClear
                  placeholder="Pilih relawan"
                  // defaultValue={["a10", "c12"]}
                  className="my-2 w-full"
                  onChange={handleChange}
                  options={relawanOption}
                />
              </div>

              {update === "true" && (
                <div className="flex justify-end mt-8">
                  <ButtonAdd text="Simpan" />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <DetailJadwalKelasPage />
    </Suspense>
  );
};

export default Page;
