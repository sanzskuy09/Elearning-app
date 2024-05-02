"use client";
import React from "react";

import { Input, Button, message, Upload } from "antd";
const { TextArea } = Input;

import { UploadOutlined } from "@ant-design/icons";
import ButtonAdd from "@/components/Button/ButtonAdd";

const TambahSilabusPage = () => {
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

  return (
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
              <h1 className="mb-2 text-xl font-semibold">Kelompok Silabus</h1>

              <div className="mb-4">
                <label
                  htmlFor="kelas"
                  className="block text-sm font-semibold mb-1"
                >
                  Kelas <span className="text-red-600">*</span>
                </label>
                <Input
                  defaultValue={"SMP"}
                  disabled
                  placeholder=""
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  allowClear
                  onChange={(e) => setValue(e.target.value)}
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
                  defaultValue={"Matematika"}
                  disabled
                  placeholder=""
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  allowClear
                  onChange={(e) => setValue(e.target.value)}
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
  );
};

export default TambahSilabusPage;
