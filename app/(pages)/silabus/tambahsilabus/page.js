"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Input, Button, message, Upload, Select } from "antd";
const { TextArea } = Input;
const { Option } = Select;

import { UploadOutlined } from "@ant-design/icons";
import ButtonAdd from "@/components/Button/ButtonAdd";

import { toastFailed, toastSuccess } from "@/utils/toastify";

// hook form
import { Formik } from "formik";
import * as Yup from "yup";
import { API } from "@/config/api";

const TambahSilabusPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [kelas, setKelas] = useState([]);
  const [mapel, setMapel] = useState([]);

  // console.log(kelas);

  const idKelas = searchParams.get("kelas");
  const idMapel = searchParams.get("mapel");

  const initialValues = {
    name: "",
    id_kelas: Number(idKelas),
    id_mapel: Number(idMapel),
    isChecker: false,
    file: "",
  };

  // handle file upload
  const props = {
    name: "file",
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    listType: "picture",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
        name: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        id_mapel: Yup.string().required("Required"),
        id_kelas: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          // const response = await fetch("/api/login", {
          //   method: "POST",
          //   body: JSON.stringify(values),
          // });
          // if (!response.ok) {
          //   throw new Error("Failed to log in");
          // }
          // const data = await response.json();
          // setTimeout(() => {
          //   setSubmitting(false);
          //   resetForm();
          // toastSuccess("Tambah Silabus Berhasil");
          //   router.push("/silabus");
          // }, 400);
        } catch (error) {
          toastFailed("Tambah Silabus Gagal");
          // console.log(error);
        }
      }}
    >
      {(formik) => (
        <div className="flex flex-col h-full">
          <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
            <h1>Kelola Silabus</h1>
            <h1>Hallo, Kak Nanda</h1>
          </div>

          <div className="py-6 px-10 flex flex-col gap-4 h-full">
            <div className="bg-white shadow-md col-span-2 rounded-lg min-h-max h-full">
              <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
                Tambah Silabus Pembelajaran
              </h1>

              <div className="py-8 px-12 max-w-[50%]">
                <form action="">
                  <h1 className="mb-2 text-xl font-semibold">
                    Kelompok Silabus
                  </h1>

                  <div className="mb-4">
                    <label
                      htmlFor="kelas"
                      className="block text-sm font-semibold mb-1"
                    >
                      Kelas <span className="text-red-600">*</span>
                    </label>
                    <Select
                      disabled
                      placeholder="Pilih Kelas"
                      defaultValue={formik.values.id_kelas}
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
                    <label
                      htmlFor="mapel"
                      className="block text-sm font-semibold mb-1"
                    >
                      Mata Pelajaran <span className="text-red-600">*</span>
                    </label>
                    <Select
                      disabled
                      placeholder="Pilih Mata Pelajaran"
                      defaultValue={formik.values.id_mapel}
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
                  </div>

                  <h1 className="mb-2 text-xl font-semibold">Detail Silabus</h1>

                  <div className="mb-4">
                    <label
                      htmlFor="silabus"
                      className="block text-sm font-semibold mb-1"
                    >
                      Nama Silabus <span className="text-red-600">*</span>
                    </label>
                    <TextArea
                      rows={4}
                      placeholder=""
                      allowClear
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="mapel"
                      className="block text-sm font-semibold mb-1"
                    >
                      Dokumen Pendukung
                    </label>
                    <Upload {...props}>
                      <Button
                        icon={<UploadOutlined />}
                        style={{
                          color: "#000",
                          backgroundColor: "#D8FFCB",
                          borderColor: "#D8FFCB",
                          fontWeight: "600",
                        }}
                      >
                        Upload File
                      </Button>
                    </Upload>
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

export default TambahSilabusPage;
