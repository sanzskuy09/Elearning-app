"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Input, Button, Select, DatePicker } from "antd";
const { TextArea } = Input;
const { Option } = Select;

import { UploadOutlined } from "@ant-design/icons";
import ButtonAdd from "@/components/Button/ButtonAdd";

import { toastFailed, toastSuccess } from "@/utils/toastify";

// hook form
import { Formik } from "formik";
import * as Yup from "yup";
import { API, URL } from "@/config/api";
import dayjs from "dayjs";

const TambahFormIzin = () => {
  const nama = localStorage.getItem("nama_panggilan");
  const nama_lengkap = localStorage.getItem("nama_lengkap");
  const id_relawan = localStorage.getItem("id_relawan");

  const dateFormat = "DD-MM-YYYY";

  const router = useRouter();
  const searchParams = useSearchParams();

  const [jadwal, setJadwal] = useState([]);

  const initialValues = {
    nama_lengkap: nama_lengkap,
    id_relawan: id_relawan,
    jadwal_kelas_id: null,
    status: "Izin",
    keterangan: "",
    tgl_izin: "",
    isAccept: false,
  };

  const getDataJadwal = async () => {
    try {
      const res = await API.get(`/jadwal-relawan/${id_relawan}`);
      const dataKelas = res.data.data;

      setJadwal(dataKelas);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataJadwal();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        nama_lengkap: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        id_relawan: Yup.string().required("Required"),
        jadwal_kelas_id: Yup.string().required("Required"),
        status: Yup.string().required("Required"),
        tgl_izin: Yup.string().required("Required"),
        keterangan: Yup.string(),
        isAccept: Yup.boolean(),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const newValues = {
            id_relawan: values.id_relawan,
            jadwal_kelas_id: values.jadwal_kelas_id,
            status: values.status,
            keterangan: values.keterangan,
            tgl_izin: values.tgl_izin,
            isAccept: false,
            // tgl_izin: dayjs(values.tgl_izin).format("YYYY-MM-DD"),
          };

          const res = await API.post(URL.ADD_FORM_IZIN, newValues);

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            toastSuccess("Tambah Form Berhasil");
            router.push(`/formizin`);
          }, 400);
        } catch (error) {
          toastFailed("Tambah Form Gagal");
          // console.log(error);
        }
      }}
    >
      {(formik) => (
        <div className="flex flex-col h-full">
          <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
            <h1>Form Izin</h1>
            <h1>Hallo, Kak {nama}</h1>
          </div>

          <div className="py-6 px-10 flex flex-col gap-4 h-full">
            <div className="bg-white shadow-md col-span-2 rounded-lg min-h-max h-full">
              <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
                Input Form Izin Relawan
              </h1>

              <div className="py-8 px-12 max-w-[50%]">
                <form onSubmit={formik.handleSubmit}>
                  <h1 className="mb-2 text-xl font-semibold">Form Data</h1>

                  <div className="mb-4">
                    <label
                      htmlFor="relawan"
                      className="block text-sm font-semibold mb-1"
                    >
                      Nama Relawan <span className="text-red-600">*</span>
                    </label>
                    <Input
                      disabled
                      placeholder=""
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      allowClear
                      {...formik.getFieldProps("nama_lengkap")}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="kelas"
                      className="block text-sm font-semibold mb-1"
                    >
                      Jadwal <span className="text-red-600">*</span>
                    </label>
                    <Select
                      placeholder="Pilih Jadwal"
                      defaultValue={formik.values.jadwal_kelas_id}
                      value={formik.values.jadwal_kelas_id}
                      onChange={(value) =>
                        formik.setFieldValue("jadwal_kelas_id", value)
                      }
                      onBlur={formik.handleBlur("jadwal_kelas_id")}
                      className="my-2 w-full"
                    >
                      {jadwal?.map((item) => (
                        <Option value={item.id_jadwal} key={item.id_jadwal}>
                          {item.kelas} / {item.mapel} / {item.jam_mapel}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  <h1 className="mb-2 text-xl font-semibold">Detail Izin</h1>

                  <div className="mb-4">
                    <label
                      htmlFor="tgl_izin"
                      className="block text-sm font-semibold mb-1"
                    >
                      Tanggal <span className="text-red-600">*</span>
                    </label>
                    <DatePicker
                      placeholder="Pilih Tanggal"
                      required
                      onChange={(e) => formik.setFieldValue("tgl_izin", e)}
                      value={
                        formik.values.tgl_izin
                          ? dayjs(formik.values.tgl_izin)
                          : ""
                      }
                      format={dateFormat}
                      className="my-2 w-full"
                      // onChange={onChangeDate}
                      // {...formik.getFieldProps("tgl_izin")}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="status"
                      className="block text-sm font-semibold mb-1"
                    >
                      Status <span className="text-red-600">*</span>
                    </label>
                    <Select
                      placeholder="Pilih Status Izin"
                      defaultValue={formik.values.status}
                      value={formik.values.status}
                      onChange={(value) =>
                        formik.setFieldValue("status", value)
                      }
                      onBlur={formik.handleBlur("status")}
                      className="my-2 w-full"
                    >
                      <Option value="Izin" key="Izin">
                        Izin
                      </Option>
                      <Option value="Alfa" key="Alfa">
                        Alfa
                      </Option>
                    </Select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="keterangan"
                      className="block text-sm font-semibold mb-1"
                    >
                      Keterangan <span className="text-red-600">*</span>
                    </label>
                    <TextArea
                      rows={4}
                      placeholder="Masukan keterangan izin"
                      allowClear
                      {...formik.getFieldProps("keterangan")}
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

export default TambahFormIzin;
