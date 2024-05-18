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

const relawanOption = [
  // { value: "", label: "Pilih Relawan" },
  { value: "Ihsan", label: "Ihsan" },
  { value: "Nanda", label: "Nanda" },
  { value: "Raza", label: "Raza" },
];

const TambahJadwalKelasPage = () => {
  const router = useRouter();

  const [kelas, setKelas] = useState([]);
  const [mapel, setMapel] = useState([]);
  const [jamMapel, setJamMapel] = useState([]);

  // hook form
  const initialValues = {
    pic: "",
    hari: "Senin",
    // id_kelas: kelas?.length > 0 ? kelas[0].id : "",
    id_kelas: kelas[0]?.id,
    id_mapel: mapel[0]?.id,
    id_jam_mapel: jamMapel[0]?.id,
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

  const getDataMapel = async () => {
    try {
      const res = await API.get(`/mapel`);

      setMapel(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataJamMapel = async () => {
    try {
      const res = await API.get(`/jam-pelajaran`);

      setJamMapel(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataMapel();
    getDataKelas();
    getDataJamMapel();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      // enableReinitialize={true}
      validationSchema={Yup.object({
        pic: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("PIC is Required"),
        hari: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Hari is Required"),
        id_mapel: Yup.string().required("Mata Pelajaran is Required"),
        id_kelas: Yup.string().required("Kelas is Required"),
        id_jam_mapel: Yup.string().required("Jam Pelajaran is Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          // const response = await fetch(`/api/murid`, {
          //   method: "POST",
          //   body: JSON.stringify(values),
          // });

          // if (!response.ok) {
          //   throw new Error("Failed to Tambah Jadwal Gagal");
          // }

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            toastSuccess("Tambah Jadwal Berhasil");
            // router.push("/kelolamurid");
          }, 400);
        } catch (error) {
          toastFailed("Tambah Jadwal Gagal");
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
                <form onSubmit={formik.handleSubmit}>
                  <h1 className="mb-2 text-xl font-semibold">
                    Kelompok Jadwal
                  </h1>

                  <div className="mb-4">
                    <label htmlFor="kelas" className="block text-sm mb-1">
                      Kelas <span className="text-red-600">*</span>
                    </label>
                    <Select
                      required
                      placeholder="Pilih Kelas"
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
                    {formik.touched.id_kelas && formik.errors.id_kelas && (
                      <p className="text-red-600 text-sm">
                        {formik.errors.id_kelas}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="mapel" className="block text-sm mb-1">
                      Mata Pelajaran <span className="text-red-600">*</span>
                    </label>
                    <Select
                      required
                      placeholder="Pilih Mata Pelajaran"
                      name="mapel"
                      value={formik.values.id_mapel}
                      onChange={(value) =>
                        formik.setFieldValue("id_mapel", value)
                      }
                      onBlur={formik.handleBlur("id_mapel")}
                      className="my-2 w-full"
                    >
                      {mapel?.map((item) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                    {formik.touched.id_mapel && formik.errors.id_mapel && (
                      <p className="text-red-600 text-sm">
                        {formik.errors.id_mapel}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="pic" className="block text-sm mb-1">
                      PIC <span className="text-red-600">*</span>
                    </label>
                    <Input
                      required
                      placeholder="Masukan nama pic"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      {...formik.getFieldProps("pic")}
                    />
                    {formik.touched.pic && formik.errors.pic && (
                      <p className="text-red-600 text-sm">
                        {formik.errors.pic}
                      </p>
                    )}
                  </div>

                  <h1 className="mb-2 text-xl font-semibold">Detail Jadwal</h1>

                  <div className="mb-4">
                    <label htmlFor="hari" className="block text-sm mb-1">
                      Hari <span className="text-red-600">*</span>
                    </label>
                    <Select
                      required
                      placeholder="Pilih hari"
                      className="my-2 w-full"
                      value={formik.values.hari}
                      onChange={(value) => formik.setFieldValue("hari", value)}
                      onBlur={formik.handleBlur("hari")}
                    >
                      {hariOption?.map((e) => (
                        <Option value={e.value} key={e.value}>
                          {e.label}
                        </Option>
                      ))}
                    </Select>
                    {formik.touched.hari && formik.errors.hari && (
                      <p className="text-red-600 text-sm">
                        {formik.errors.hari}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="jammapel" className="block text-sm mb-1">
                      Jam Pelajaran <span className="text-red-600">*</span>
                    </label>
                    <Select
                      required
                      placeholder="Pilih Jam Pelajaran"
                      name="jamMapel"
                      value={formik.values.id_jam_mapel}
                      onChange={(value) =>
                        formik.setFieldValue("id_jam_mapel", value)
                      }
                      onBlur={formik.handleBlur("id_jam_mapel")}
                      className="my-2 w-full"
                    >
                      {jamMapel?.map((item) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                    {formik.touched.id_jam_mapel &&
                      formik.errors.id_jam_mapel && (
                        <p className="text-red-600 text-sm">
                          {formik.errors.id_jam_mapel}
                        </p>
                      )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="relawan" className="block text-sm mb-1">
                      Pelawan Pengajar <span className="text-red-600">*</span>
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
                    <ButtonAdd type="submit" text="Simpan" />
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
