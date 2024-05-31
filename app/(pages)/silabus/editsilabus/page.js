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
import { API, URL } from "@/config/api";

const EditSilabusPage = () => {
  const nama = localStorage.getItem("nama_panggilan");

  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState("");
  const [kelas, setKelas] = useState("");
  const [mapel, setMapel] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(kelas);

  const idSilabus = searchParams.get("id");
  const idKelas = searchParams.get("kelas");
  const idMapel = searchParams.get("mapel");

  const initialValues = {
    name: data ? data.name : "",
    file: "",
  };

  const props = {
    name: "file",
    listType: "picture",
    multiple: false,
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    // onChange(info) {
    //   if (info.file.status !== "uploading") {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (info.file.status === "done") {
    //     message.success(`${info.file.name} file uploaded successfully`);
    //   } else if (info.file.status === "error") {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
  };

  const handleFileChange = (e, formik) => {
    // e.preventDefault();
    let reader = new FileReader();
    let file = e.fileList[0].originFileObj;
    if (file) {
      reader.onloadend = () => {
        formik.setFieldValue("file", file);
        formik.setFieldValue("filePreview", reader.result); // Set file preview
      };
      reader.readAsDataURL(file);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/silabus?id=${idSilabus}&mapel=&kelas=`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      setData(data.data[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getDataKelas = async () => {
    try {
      const res = await API.get(`/kelas?id=${idKelas}`);

      setKelas(res.data.data[0].name);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataMapel = async () => {
    try {
      const res = await API.get(`/mapel?id=${idMapel}`);

      setMapel(res.data.data[0].name);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
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
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          console.log(values);
          const formData = new FormData();
          formData.append("name", values.name);
          {
            values.file !== null && formData.append("file", values.file);
          }

          const response = await fetch(`/api/silabus?id=${idSilabus}`, {
            method: "PUT",
            body: formData,
          });
          if (!response.ok) {
            throw new Error("Failed to update silabus");
          }
          await response.json();

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            toastSuccess("Update Silabus Berhasil");
            router.push("/silabus");
          }, 400);
        } catch (error) {
          toastFailed("Update Silabus Gagal");
          // console.log(error);
        }
      }}
    >
      {(formik) => (
        <div className="flex flex-col h-full">
          <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
            <h1>Kelola Silabus</h1>
            <h1>Hallo, Kak {nama}</h1>
          </div>

          <div className="py-6 px-10 flex flex-col gap-4 h-full">
            <div className="bg-white shadow-md col-span-2 rounded-lg min-h-max h-full">
              <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
                Edit Silabus Pembelajaran
              </h1>

              <div className="py-8 px-12 max-w-[50%]">
                <form onSubmit={formik.handleSubmit}>
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
                    <Input
                      value={kelas}
                      disabled
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="mapel"
                      className="block text-sm font-semibold mb-1"
                    >
                      Mata Pelajaran <span className="text-red-600">*</span>
                    </label>
                    <Input
                      value={mapel}
                      disabled
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
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
                      {...formik.getFieldProps("name")}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="mapel"
                      className="block text-sm font-semibold mb-1"
                    >
                      Dokumen Pendukung <br />
                      <span className="text-red-600 text-[9px]">
                        * Upload hanya jika ingin mengubah file
                      </span>
                    </label>
                    <Upload
                      accept=".pdf, image/*"
                      onChange={(e) => handleFileChange(e, formik)}
                      {...props}
                    >
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
                    <ButtonAdd type="submit" text="Update" />
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

export default EditSilabusPage;
