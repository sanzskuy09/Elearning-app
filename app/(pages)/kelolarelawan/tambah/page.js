"use client";
import React from "react";

import { Input, Select, DatePicker } from "antd";
const { Option } = Select;

import ButtonAdd from "@/components/Button/ButtonAdd";

const TambahRelawanPage = () => {
  const dateFormat = "DD/MM/YY";
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Kelola Relawan</h1>
        <h1>Hallo, Kak Nanda</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4">
        <div className="bg-white shadow-md col-span-2 rounded-lg ">
          <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
            Tambah Relawan
          </h1>

          <div className="py-8 px-12">
            <form action="" className="grid grid-cols-2 gap-x-24 gap-y-8">
              <div>
                <h1 className="mb-2 text-xl font-semibold">Biodata Diri</h1>

                <div className="mb-4">
                  <label htmlFor="namalengkap" className="block text-sm mb-1">
                    Nama Lengkap <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="namapanggilan" className="block text-sm mb-1">
                    Nama Panggilan <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="gender" className="block text-sm mb-1">
                    Jenis Kelamin <span className="text-red-600">*</span>
                  </label>
                  <Select
                    placeholder="Pilih Jenis Kelamin"
                    defaultValue="1"
                    // onChange={(value) =>
                    //   formik.setFieldValue("tingkat_pendidikan", value)
                    // }
                    // onBlur={formik.handleBlur("tingkat_pendidikan")}
                    className="my-2 w-full"
                  >
                    <Option value="1">Laki-laki</Option>
                    <Option value="2">Perempuan</Option>
                  </Select>
                </div>

                <div className="mb-4">
                  <label htmlFor="tgllahir" className="block text-sm mb-1">
                    Tanggal Lahir <span className="text-red-600">*</span>
                  </label>
                  <DatePicker
                    required
                    onChange={onChangeDate}
                    format={dateFormat}
                    className="my-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="umur" className="block text-sm mb-1">
                    Umur <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="nik" className="block text-sm mb-1">
                    NIK <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    type="number"
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="nohp" className="block text-sm mb-1">
                    No. Kontak <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <h1 className="mb-2 text-xl font-semibold">
                  Peminatan Pelajaran
                </h1>
                <div className="mb-4">
                  <label htmlFor="kelas" className="block text-sm mb-1">
                    Kelas <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="mapel" className="block text-sm mb-1">
                    Mata Pelajaran <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h1 className="mb-2 text-xl font-semibold">
                  Alamat dan Tempat Tinggal
                </h1>

                <div className="mb-4">
                  <label htmlFor="alamat" className="block text-sm mb-1">
                    Alamat <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="kelurahan" className="block text-sm mb-1">
                    Kelurahan <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="kecamatan" className="block text-sm mb-1">
                    Kecamatan <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="kota" className="block text-sm mb-1">
                    Kabupaten/ Kota <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="provinsi" className="block text-sm mb-1">
                    Provinsi <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <h1 className="mb-2 text-xl font-semibold">Informasi Akun</h1>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm mb-1">
                    Username <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm mb-1">
                    Password <span className="text-red-600">*</span>
                  </label>
                  <Input
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    type="password"
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-center col-span-2">
                <ButtonAdd
                  text="Simpan"
                  // onChange={() => console.log("simpan")}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahRelawanPage;