"use client";
import React, { Suspense, useEffect, useState } from "react";
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

// const kelasOption = [
//   // { value: "", label: "Pilih Kelas" },
//   { value: "SD", label: "SD" },
//   { value: "SMP", label: "SMP" },
//   { value: "SMA", label: "SMA" },
// ];

// const mapelOption = [
//   // { value: "", label: "Pilih Mata Pelajaran" },
//   { value: "IPA", label: "IPA" },
//   { value: "IPS", label: "IPS" },
//   { value: "Bahasa", label: "Bahasa" },
// ];

// const jamMapelOption = [
//   // { value: "", label: "Pilih Jam Pelajaran" },
//   { value: "09.00 - 10.00", label: "09.00 - 10.00" },
//   { value: "10.00 - 11.00", label: "10.00 - 11.00" },
//   { value: "11.00 - 12.00", label: "11.00 - 12.00" },
// ];

// const relawanOption = [
//   // { value: "", label: "Pilih Relawan" },
//   { value: "Ihsan", label: "Ihsan" },
//   { value: "Nanda", label: "Nanda" },
//   { value: "Raza", label: "Raza" },
// ];

const DetailJadwalKelasPage = () => {
  const router = useRouter();
  const nama = localStorage.getItem("nama_panggilan");

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const update = searchParams.get("update");

  const disableForm = update === "true" ? false : true;

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
  };

  const [data, setData] = useState();
  const [jamMapel, setJamMapel] = useState([]);
  const [listRelawan, setListRelawan] = useState([]);

  // hook form
  const initialValues = {
    pic: data?.pic,
    hari: data?.hari,
    kelas: data?.kelas,
    mapel: data?.mapel,
    id_kelas: data?.id_kelas,
    id_mapel: data?.id_mapel,
    id_jam_mapel: data?.id_jam_mapel,
    // jadwal: data?.relawan,
    jadwal: data?.relawan?.map((relawan) => relawan.id),
  };

  const getDataJadwalById = async () => {
    try {
      const res = await API.get(`/jadwal/${id}`);

      setData(res.data.data);
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

  const getListRelawan = async () => {
    try {
      const res = await API.get(`/list-relawan`);

      setListRelawan(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(listRelawan);

  useEffect(() => {
    getDataJamMapel();
    getListRelawan();
    getDataJadwalById();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
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
          const newValues = {
            pic: values.pic,
            hari: values.hari,
            id_kelas: values.id_kelas,
            id_mapel: values.id_mapel,
            id_jam_mapel: values.id_jam_mapel,
            jadwal: values.jadwal.map((id_relawan) => ({
              id_relawan,
            })),
          };

          // console.log(newValues);

          const response = await fetch(`/api/jadwal?id=${id}`, {
            method: "PUT",
            body: JSON.stringify(newValues),
          });

          if (!response.ok) {
            throw new Error("Failed to Tambah Jadwal Gagal");
          }

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            toastSuccess("Update Jadwal Berhasil");
            router.push("/jadwalkelas");
          }, 400);
        } catch (error) {
          toastFailed("Update Jadwal Gagal");
          console.log(error);
        }
      }}
    >
      {(formik) => (
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
                <form onSubmit={formik.handleSubmit}>
                  <h1 className="mb-2 text-xl font-semibold">
                    Kelompok Jadwal
                  </h1>

                  <div className="mb-4">
                    <label htmlFor="kelas" className="block text-sm mb-1">
                      Kelas
                    </label>
                    <Input
                      readOnly={true}
                      required
                      placeholder=""
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      {...formik.getFieldProps("kelas")}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="mapel" className="block text-sm mb-1">
                      Mata Pelajaran
                    </label>
                    <Input
                      readOnly={true}
                      required
                      placeholder=""
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      {...formik.getFieldProps("mapel")}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="mapel" className="block text-sm mb-1">
                      PIC
                    </label>
                    <Input
                      readOnly={disableForm}
                      required
                      placeholder=""
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
                      disabled={disableForm}
                      placeholder="Pilih hari"
                      allowClear
                      className="my-2 w-full"
                      defaultValue={formik.values.hari}
                      name="kelas"
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
                      defaultValue={formik.values.id_jam_mapel}
                      name="kelas"
                      value={formik.values.id_jam_mapel}
                      onChange={(value) =>
                        formik.setFieldValue("id_jam_mapel", value)
                      }
                    >
                      {jamMapel?.map((item) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
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
                      placeholder="Pilih relawan"
                      className="my-2 w-full"
                      // value={
                      //   formik.values.jadwal
                      //     ? formik.values.jadwal?.map((e) => e.id)
                      //     : []
                      // }
                      value={formik.values.jadwal}
                      onChange={(value) =>
                        formik.setFieldValue("jadwal", value)
                      }
                      onBlur={formik.handleBlur("jadwal")}
                    >
                      {listRelawan?.map((item) => (
                        <Option value={item.id} key={item.id}>
                          {item.nama_lengkap}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  {update === "true" && (
                    <div className="flex justify-end mt-8">
                      <ButtonAdd type="submit" text="Simpan" />
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
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
