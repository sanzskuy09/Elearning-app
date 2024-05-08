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

const TambahMuridPage = () => {
  const router = useRouter();

  const [kelas, setKelas] = useState([]);
  const [kategori, setKategori] = useState([]);

  const dateFormat = "DD/MM/YY";
  // const onChangeDate = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  // hook form
  const initialValues = {
    nama_lengkap: "",
    jkelamin: "Laki-laki",
    tgl_lahir: "",
    umur: "",
    nik: "",
    nama_ortu: "",
    no_hp_ortu: "",
    alamat: "",
    kelurahan: "",
    kecamatan: "",
    kota: "",
    provinsi: "",
    id_kelas: kelas.length > 0 ? kelas[0].id : "",
    id_kategori: kategori.length > 0 ? kategori[0].id : "",
  };

  const getDataKelas = async () => {
    try {
      const res = await API.get(`/kelas`);

      setKelas(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataKategori = async () => {
    try {
      const res = await API.get(`/kategori`);

      setKategori(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataKategori();
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
        jkelamin: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        tgl_lahir: Yup.string().required("Required"),
        umur: Yup.string().required("Required"),
        nik: Yup.string()
          .min(16, "Must be 16 characters")
          .max(16)
          .required("Required"),
        nama_ortu: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        no_hp_ortu: Yup.string()
          .min(10, "Must be 10 characters or then")
          .max(13)
          .required("Required"),
        alamat: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        kelurahan: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        kecamatan: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        kota: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        provinsi: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        id_kategori: Yup.string().required("Required"),
        id_kelas: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const response = await fetch(`/api/murid`, {
            method: "POST",
            body: JSON.stringify(values),
          });

          if (!response.ok) {
            throw new Error("Failed to Tambah Murid Gagal");
          }

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            toastSuccess("Tambah Murid Berhasil");
            router.push("/kelolamurid");
          }, 400);
        } catch (error) {
          toastFailed("Tambah Murid Gagal");
          // console.log(error);
        }
      }}
    >
      {(formik) => (
        <div className="flex flex-col h-full">
          <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
            <h1>Kelola Murid</h1>
            <h1>Hallo, Kak Nanda</h1>
          </div>

          <div className="py-6 px-10 flex flex-col gap-4">
            <div className="bg-white shadow-md col-span-2 rounded-lg ">
              <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
                Tambah Murid
              </h1>

              <div className="py-8 px-12">
                <form
                  action=""
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
                        // onChange={onChangeDate}
                        // {...formik.getFieldProps("tgl_lahir")}
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
                      <label htmlFor="kelas" className="block text-sm mb-1">
                        Kelas <span className="text-red-600">*</span>
                      </label>
                      <Select
                        placeholder="Pilih Kelas"
                        defaultValue={formik.values.id_kelas}
                        name="kelas"
                        value={formik.values.id_kelas}
                        onChange={(value) =>
                          formik.setFieldValue("id_kelas", value)
                        }
                        onBlur={formik.handleBlur("id_kelas")}
                        className="my-2 w-full"
                      >
                        {kelas?.map((item) => (
                          <Option value={item.id} key={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
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
                      <label htmlFor="kaetogri" className="block text-sm mb-1">
                        Kategori Kelompok Rentan{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <Select
                        placeholder="Pilih kategori"
                        defaultValue={formik.values.id_kategori}
                        name="kelas"
                        value={formik.values.id_kategori}
                        onChange={(value) =>
                          formik.setFieldValue("id_kategori", value)
                        }
                        onBlur={formik.handleBlur("id_kategori")}
                        className="my-2 w-full"
                      >
                        {kategori?.map((item) => (
                          <Option value={item.id} key={item.id}>
                            {item.name}
                          </Option>
                        ))}
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
                        required
                        placeholder=""
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        {...formik.getFieldProps("nama_ortu")}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="nohp" className="block text-sm mb-1">
                        No. Kontak Orang Tua{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <Input
                        required
                        placeholder=""
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        {...formik.getFieldProps("no_hp_ortu")}
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
                        required
                        placeholder=""
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        {...formik.getFieldProps("alamat")}
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
                        {...formik.getFieldProps("kelurahan")}
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
                        {...formik.getFieldProps("kecamatan")}
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
                        {...formik.getFieldProps("kota")}
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
                        {...formik.getFieldProps("provinsi")}
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

export default TambahMuridPage;
