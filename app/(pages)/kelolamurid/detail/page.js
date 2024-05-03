"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import { Input, Select } from "antd";
const { Option } = Select;

import ButtonAdd from "@/components/Button/ButtonAdd";

const DetailMuridPage = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const update = searchParams.get("update");

  const disableForm = update === "true" ? false : true;

  return (
    <div className="flex flex-col h-full">
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Kelola Murid</h1>
        <h1>Hallo, Kak Nanda</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4">
        <div className="bg-white shadow-md col-span-2 rounded-lg ">
          <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
            Tambah Murid
            {update === "true" ? "Edit Murid" : "Data Murid"}
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
                    disabled={disableForm}
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
                    disabled={disableForm}
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
                    disabled={disableForm}
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
                  <Input
                    disabled={disableForm}
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="umur" className="block text-sm mb-1">
                    Umur <span className="text-red-600">*</span>
                  </label>
                  <Input
                    disabled={disableForm}
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="kelas" className="block text-sm mb-1">
                    Kelas <span className="text-red-600">*</span>
                  </label>
                  <Select
                    disabled={disableForm}
                    placeholder="Pilih Kelas"
                    defaultValue="1"
                    // onChange={(value) =>
                    //   formik.setFieldValue("tingkat_pendidikan", value)
                    // }
                    // onBlur={formik.handleBlur("tingkat_pendidikan")}
                    className="my-2 w-full"
                  >
                    <Option value="1">SD</Option>
                    <Option value="2">SMP</Option>
                    <Option value="3">SMA</Option>
                  </Select>
                </div>

                <div className="mb-4">
                  <label htmlFor="nik" className="block text-sm mb-1">
                    NIK <span className="text-red-600">*</span>
                  </label>
                  <Input
                    disabled={disableForm}
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="kaetogri" className="block text-sm mb-1">
                    Kategori Kelompok Rentan{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <Select
                    disabled={disableForm}
                    placeholder="Pilih kategori"
                    defaultValue="1"
                    // onChange={(value) =>
                    //   formik.setFieldValue("tingkat_pendidikan", value)
                    // }
                    // onBlur={formik.handleBlur("tingkat_pendidikan")}
                    className="my-2 w-full"
                  >
                    <Option value="1">OCD</Option>
                    <Option value="2">Autis</Option>
                  </Select>
                </div>
              </div>

              <div>
                <h1 className="mb-2 text-xl font-semibold">
                  Biodata Orang Tua
                </h1>

                <div className="mb-4">
                  <label htmlFor="namaortu" className="block text-sm mb-1">
                    Nama Orang Tua <span className="text-red-600">*</span>
                  </label>
                  <Input
                    disabled={disableForm}
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="nohp" className="block text-sm mb-1">
                    No. Kontak Orang Tua <span className="text-red-600">*</span>
                  </label>
                  <Input
                    disabled={disableForm}
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
                    // onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <h1 className="mb-2 text-xl font-semibold">
                  Alamat dan Tempat Tinggal
                </h1>

                <div className="mb-4">
                  <label htmlFor="alamat" className="block text-sm mb-1">
                    Alamat <span className="text-red-600">*</span>
                  </label>
                  <Input
                    disabled={disableForm}
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
                    disabled={disableForm}
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
                    disabled={disableForm}
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
                    disabled={disableForm}
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
                    disabled={disableForm}
                    required
                    placeholder=""
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    allowClear
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

export default DetailMuridPage;
