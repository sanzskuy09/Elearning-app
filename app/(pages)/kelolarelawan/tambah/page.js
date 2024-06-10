"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Input, Select, DatePicker } from "antd";
const { Option } = Select;

import ButtonAdd from "@/components/Button/ButtonAdd";

// hook form
import { Formik } from "formik";
import dayjs from "dayjs";
import * as Yup from "yup";
import { API, URL } from "@/config/api";

import { toastFailed, toastSuccess } from "@/utils/toastify";

const TambahRelawanPage = () => {
  const nama = localStorage.getItem("nama_panggilan");

  const router = useRouter();

  const [kelas, setKelas] = useState([]);
  const [mapel, setMapel] = useState([]);

  const dateFormat = "DD/MM/YY";

  // hook form
  const initialValues = {
    nama_lengkap: "",
    nama_panggilan: "",
    jkelamin: "Laki-laki",
    tgl_lahir: "",
    umur: "",
    nik: "",
    no_hp: "",
    alamat: "",
    kelurahan: "",
    kecamatan: "",
    kota: "",
    provinsi: "",
    kelas: "",
    mapel: "",
    username: "",
    password: "12345678",
    point: "0",
  };

  const getDataKelas = async () => {
    try {
      const res = await API.get(`/kelas`);

      setKelas(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataMapel = async () => {
    try {
      const res = await API.get(`/mapel`);

      setMapel(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataMapel();
    getDataKelas();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        nama_lengkap: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        nama_panggilan: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        jkelamin: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        tgl_lahir: Yup.string().required("Required"),
        umur: Yup.string().required("Required"),
        nik: Yup.string()
          .min(16, "Must be 16 characters")
          .max(16)
          .required("Required"),
        no_hp: Yup.string()
          .min(10, "Must be 10 characters or then")
          .max(13)
          .required("Required"),
        alamat: Yup.string(),
        kelurahan: Yup.string(),
        kecamatan: Yup.string(),
        kota: Yup.string(),
        provinsi: Yup.string(),
        kelas: Yup.string().required(),
        mapel: Yup.string().required(),
        username: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        password: Yup.string()
          .min(8, "Must be 8 characters or then")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          console.log(values);
          const response = await fetch(`/api/relawan`, {
            method: "POST",
            body: JSON.stringify(values),
          });

          if (!response.ok) {
            throw new Error("Failed to Tambah Relawan Gagal");
          }

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            toastSuccess("Tambah Relawan Berhasil");
            router.push("/kelolarelawan");
          }, 400);
        } catch (error) {
          toastFailed("Tambah Relawan Gagal");
          console.log(error);
        }
      }}
    >
      {(formik) => (
        <div className="flex flex-col h-full">
          <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
            <h1>Kelola Relawan</h1>
            <h1>Hallo, Kak {nama}</h1>
          </div>

          <div className="py-6 px-10 flex flex-col gap-4">
            <div className="bg-white shadow-md col-span-2 rounded-lg ">
              <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
                Tambah Relawan
              </h1>

              <div className="py-8 px-12">
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid grid-cols-2 gap-x-24 gap-y-8"
                >
                  <div>
                    <h1 className="mb-2 text-xl font-semibold">Biodata Diri</h1>

                    <div className="mb-4">
                      <label
                        htmlFor="namalengkap"
                        className="block text-sm mb-1"
                      >
                        Nama Lengkap <span className="text-red-600">*</span>
                      </label>
                      <Input
                        required
                        placeholder=""
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        {...formik.getFieldProps("nama_lengkap")}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="namapanggilan"
                        className="block text-sm mb-1"
                      >
                        Nama Panggilan <span className="text-red-600">*</span>
                      </label>
                      <Input
                        required
                        placeholder=""
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        {...formik.getFieldProps("nama_panggilan")}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="gender" className="block text-sm mb-1">
                        Jenis Kelamin <span className="text-red-600">*</span>
                      </label>
                      <Select
                        placeholder="Pilih Jenis Kelamin"
                        defaultValue="Laki-laki"
                        name="jkelamin"
                        value={formik.values.jkelamin}
                        onChange={(value) =>
                          formik.setFieldValue("jkelamin", value)
                        }
                        onBlur={formik.handleBlur("jkelamin")}
                        className="my-2 w-full"
                      >
                        <Option value="Laki-laki">Laki-laki</Option>
                        <Option value="Perempuan">Perempuan</Option>
                      </Select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="tgllahir" className="block text-sm mb-1">
                        Tanggal Lahir <span className="text-red-600">*</span>
                      </label>
                      <DatePicker
                        required
                        onChange={(e) => formik.setFieldValue("tgl_lahir", e)}
                        value={
                          formik.values.tgl_lahir
                            ? dayjs(formik.values.tgl_lahir)
                            : ""
                        }
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
                        {...formik.getFieldProps("umur")}
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
                        {...formik.getFieldProps("nik")}
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
                        {...formik.getFieldProps("no_hp")}
                      />
                    </div>

                    <h1 className="mb-2 text-xl font-semibold">
                      Peminatan Pelajaran
                    </h1>
                    <div className="mb-4">
                      <label htmlFor="kelas" className="block text-sm mb-1">
                        Kelas <span className="text-red-600">*</span>
                      </label>
                      <Select
                        mode="multiple"
                        placeholder="Pilih Kelas"
                        name="kelas"
                        // value={formik.values.kelas}
                        onChange={(value) =>
                          formik.setFieldValue("kelas", value.join(","))
                        }
                        onBlur={formik.handleBlur("kelas")}
                        className="my-2 w-full"
                      >
                        {kelas?.map((item) => (
                          <Option value={item.name} key={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="mapel" className="block text-sm mb-1">
                        Mata Pelajaran <span className="text-red-600">*</span>
                      </label>
                      <Select
                        mode="multiple"
                        placeholder="Pilih Mata Pelajaran"
                        name="mapel"
                        onChange={(value) =>
                          formik.setFieldValue("mapel", value.join(","))
                        }
                        onBlur={formik.handleBlur("mapel")}
                        className="my-2 w-full"
                      >
                        {mapel?.map((item) => (
                          <Option value={item.name} key={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div>
                    <h1 className="mb-2 text-xl font-semibold">
                      Alamat dan Tempat Tinggal
                    </h1>

                    <div className="mb-4">
                      <label htmlFor="alamat" className="block text-sm mb-1">
                        Alamat
                      </label>
                      <Input
                        placeholder=""
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        {...formik.getFieldProps("alamat")}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="kelurahan" className="block text-sm mb-1">
                        Kelurahan
                      </label>
                      <Input
                        placeholder=""
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        {...formik.getFieldProps("kelurahan")}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="kecamatan" className="block text-sm mb-1">
                        Kecamatan
                      </label>
                      <Input
                        placeholder=""
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        {...formik.getFieldProps("kecamatan")}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="kota" className="block text-sm mb-1">
                        Kabupaten/ Kota
                      </label>
                      <Input
                        placeholder=""
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        {...formik.getFieldProps("kota")}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="provinsi" className="block text-sm mb-1">
                        Provinsi
                      </label>
                      <Input
                        placeholder=""
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        {...formik.getFieldProps("provinsi")}
                      />
                    </div>

                    <h1 className="mb-2 text-xl font-semibold">
                      Informasi Akun
                    </h1>
                    <div className="mb-4">
                      <label htmlFor="username" className="block text-sm mb-1">
                        Username <span className="text-red-600">*</span>
                      </label>
                      <Input
                        required
                        placeholder=""
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        {...formik.getFieldProps("username")}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="block text-sm mb-1">
                        Password <span className="text-red-600">*</span>
                      </label>
                      <Input
                        disabled
                        type="password"
                        placeholder=""
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                        {...formik.getFieldProps("password")}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center col-span-2">
                    <ButtonAdd
                      type="submit"
                      text="Simpan"
                      // onChange={() => console.log("simpan")}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default TambahRelawanPage;
