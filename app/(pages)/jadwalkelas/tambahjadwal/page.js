"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import ButtonAdd from "@/components/Button/ButtonAdd";

import { Input, Select } from "antd";
const { TextArea } = Input;
const { Option } = Select;

// hook form
import { Formik } from "formik";
import dayjs from "dayjs";
import * as Yup from "yup";
import { API, URL } from "@/config/api";

import { toastFailed, toastSuccess } from "@/utils/toastify";

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

const TambahJadwalKelasPage = () => {
  const router = useRouter();

  const [kelas, setKelas] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [jamMapel, setJamMapel] = useState([]);

  // hook form
  const initialValues = {
    pic: "",
    hari: "",
    id_kelas: kelas.length > 0 ? kelas[0].id : [],
    id_kategori: kategori.length > 0 ? kategori[0].id : [],
    id_jam_mapel: jamMapel.length > 0 ? jamMapel[0].id : [],
  };

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
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
      // enableReinitialize={true}
      // validationSchema={Yup.object({
      //   nama_lengkap: Yup.string()
      //     .min(3, "Must be 3 characters or then")
      //     .required("Required"),
      //   jkelamin: Yup.string()
      //     .min(3, "Must be 3 characters or then")
      //     .required("Required"),
      //   id_kategori: Yup.string().required("Required"),
      //   id_kelas: Yup.string().required("Required"),
      // })}
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
            <h1>Kelola Jadwal</h1>
            <h1>Hallo, Kak Nanda</h1>
          </div>

          <div className="py-6 px-10 flex flex-col gap-4">
            <div className="bg-white shadow-md col-span-2 rounded-lg">
              <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
                Tambah Jadwal Kelas
              </h1>

              <div className="py-8 px-12 max-w-[50%]">
                <form action="">
                  <h1 className="mb-2 text-xl font-semibold">
                    Kelompok Jadwal
                  </h1>

                  <div className="mb-4">
                    <label htmlFor="kelas" className="block text-sm mb-1">
                      Kelas
                    </label>
                    <Select
                      placeholder="Pilih Kelas"
                      // defaultValue={formik.values.id_kelas}
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
                    <label htmlFor="mapel" className="block text-sm mb-1">
                      Mata Pelajaran
                    </label>
                    <Select
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

                  <div className="mb-4">
                    <label htmlFor="pic" className="block text-sm mb-1">
                      PIC <span className="text-red-600">*</span>
                    </label>
                    <Input
                      required
                      placeholder="masukan pic"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      {...formik.getFieldProps("pic")}
                    />
                  </div>

                  <h1 className="mb-2 text-xl font-semibold">Detail Jadwal</h1>

                  <div className="mb-4">
                    <label htmlFor="hari" className="block text-sm mb-1">
                      Hari
                    </label>
                    <Select
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
                      mode="multiple"
                      allowClear
                      placeholder="Pilih relawan"
                      // defaultValue={["a10", "c12"]}
                      className="my-2 w-full"
                      onChange={handleChange}
                      options={relawanOption}
                    />
                  </div>

                  <div className="flex justify-end mt-8">
                    <ButtonAdd text="Simpan" />
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

export default TambahJadwalKelasPage;
