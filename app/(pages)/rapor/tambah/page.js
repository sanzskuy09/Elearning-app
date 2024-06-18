"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import ButtonAdd from "@/components/Button/ButtonAdd";

import { Input, Select } from "antd";
const { TextArea } = Input;
const { Option } = Select;

// hook form
import { Formik, FieldArray, Field } from "formik";
import dayjs from "dayjs";
import * as Yup from "yup";

import { API, URL } from "@/config/api";

import { toastFailed, toastSuccess } from "@/utils/toastify";

const semesterOption = [
  { value: "ganjil", label: "Ganjil" },
  { value: "genap", label: "Genap" },
];

const TambahRaporPage = () => {
  const [nama, setNama] = useState("");

  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const id_kelas = searchParams.get("id_kelas");
  const update = searchParams.get("update");
  const disableForm = update === "true" ? false : true;

  const router = useRouter();
  const [data, setData] = useState([]);
  const [mapel, setMapel] = useState([]);
  const [nilai, setNilai] = useState([]);
  const [loading, setLoading] = useState(false);

  // hook form
  const initialValues = {
    nama_lengkap: data?.nama_lengkap,
    nama_ortu: data?.nama_ortu,
    semester: "",
    catatan_wali_kelas: "",
    kegiatan: [{ name: "", desc: "" }],
    lomba: [{ name: "", tingkat_prestasi: "", desc: "" }],
  };

  // handle input change nilai
  const handleChangeNilai = (id_mapel, field, value) => {
    setNilai((prevState) =>
      prevState.map((item) =>
        item.id_mapel === id_mapel ? { ...item, [field]: value } : item
      )
    );
  };

  const resetNilai = () => {
    setNilai(
      mapel.map((item) => ({ id_mapel: item.id_mapel, uts: "", uas: "" }))
    );
  };

  const getDataMurid = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/murid/detail?id=${id}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setData(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getDataMapel = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/jadwal-mapel?kelas=${id_kelas}`);
      const mapel = res.data.data;

      setMapel(mapel);

      setNilai(
        mapel.map((item) => ({ id_mapel: item.id_mapel, uts: "", uas: "" }))
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const nameData =
      typeof window !== "undefined"
        ? window.localStorage.getItem("nama_panggilan")
        : false;
    setNama(nameData);

    getDataMurid();
    getDataMapel();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      // validationSchema={Yup.object({
      //   nama_lengkap: Yup.string()
      //     .min(3, "Must be 3 characters or then")
      //     .required("Nama is Required"),
      //   nama_ortu: Yup.string()
      //     .min(3, "Must be 3 characters or then")
      //     .required("Nama orang tua is Required"),
      //   semester: Yup.string().required("Semester is Required"),
      // })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          // const newValues = {
          //   id_murid: id,
          //   semester: values.semester,
          //   catatan_wali_kelas: values.catatan_wali_kelas,
          //   nilai: nilai.map((item) => ({
          //     id_mapel: item.id_mapel,
          //     uts: item.uts,
          //     uas: item.uas,
          //   })),
          // };
          // const response = await fetch(`/api/rapor`, {
          //   method: "POST",
          //   body: JSON.stringify(newValues),
          // });

          // if (!response.ok) {
          //   throw new Error("Failed to Tambah Rapor Gagal");
          // }

          console.log(values, ">> value");

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            resetNilai();
            // toastSuccess("Tambah Rapor Berhasil");
            // router.push("/rapor");
          }, 400);
        } catch (error) {
          toastFailed("Tambah Rapor Gagal");
          console.log(error);
        }
      }}
    >
      {(formik) => (
        <div className="flex flex-col h-full">
          <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
            <h1>Rapor</h1>
            <h1>Hallo, Kak {nama}</h1>
          </div>

          <div className="py-6 px-10 flex flex-col gap-4">
            <div className="bg-white shadow-md col-span-2 rounded-lg">
              <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
                Rapor Murid
              </h1>

              <div className="py-8 px-12">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-8 w-[80%]">
                    <h1 className="mb-2 text-xl font-semibold">
                      Biodata Murid
                    </h1>

                    <div className="mb-4">
                      <label htmlFor="nama" className="block text-sm mb-1">
                        Nama Murid <span className="text-red-600">*</span>
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
                      <label htmlFor="wali" className="block text-sm mb-1">
                        Nama Orangtua / Wali{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <Input
                        disabled
                        placeholder=""
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        allowClear
                        {...formik.getFieldProps("nama_ortu")}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="wali" className="block text-sm mb-1">
                        Semester
                      </label>
                      <Select
                        disabled={disableForm}
                        placeholder="Pilih tingkat pendidikan"
                        defaultValue={formik.values.semester}
                        value={formik.values.semester}
                        onChange={(value) =>
                          formik.setFieldValue("semester", value)
                        }
                        onBlur={formik.handleBlur("semester")}
                        className="my-2 w-full"
                      >
                        {semesterOption?.map((e) => (
                          <Option value={e.value} key={e.value}>
                            {e.label}
                          </Option>
                        ))}
                      </Select>
                      {formik.touched.semester && formik.errors.semester ? (
                        <div className="text-red-600 text-sm">
                          {formik.errors.semester}
                        </div>
                      ) : null}
                    </div>

                    {/* <div className="flex justify-end mt-8">
                        <ButtonAdd type="submit" text="Simpan" />
                      </div> */}
                  </div>

                  <div className="grid grid-cols-2 gap-24">
                    <div>
                      <h1 className="mb-6 text-xl font-semibold">
                        A. Penilaian Akademis
                      </h1>

                      {mapel.map((item, i) => (
                        <div className="mb-4 flex flex-col gap-2" key={i}>
                          <h1 className="text-xl font-semibold">
                            {item.mapel}
                          </h1>

                          <div className="mb-4">
                            <label htmlFor="uts" className="block text-sm mb-1">
                              Ujian Tengah Semester{" "}
                              <span className="text-red-600">*</span>
                            </label>
                            <Input
                              required
                              disabled={disableForm}
                              className="w-full border border-gray-300 rounded-md px-3 py-2"
                              allowClear
                              type="number"
                              max={100}
                              min={0}
                              onChange={(e) =>
                                handleChangeNilai(
                                  item.id_mapel,
                                  "uts",
                                  e.target.value
                                )
                              }
                              value={
                                nilai.find((n) => n.id_mapel === item.id_mapel)
                                  ?.uts || ""
                              }
                            />
                          </div>

                          <div className="mb-4">
                            <label htmlFor="uas" className="block text-sm mb-1">
                              Ujian Akhir Semester{" "}
                              <span className="text-red-600">*</span>
                            </label>
                            <Input
                              required
                              disabled={disableForm}
                              className="w-full border border-gray-300 rounded-md px-3 py-2"
                              allowClear
                              max={100}
                              min={0}
                              onChange={(e) =>
                                handleChangeNilai(
                                  item.id_mapel,
                                  "uas",
                                  e.target.value
                                )
                              }
                              value={
                                nilai.find((n) => n.id_mapel === item.id_mapel)
                                  ?.uas || ""
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form tambah kegiatan */}
                  <FieldArray
                    name="kegiatan"
                    render={(arrayHelpers) => (
                      <div className="w-[80%]">
                        <h1 className="mb-6 text-xl font-semibold">
                          B. Keaktifan Mengikuti Kegiatan
                        </h1>

                        {formik.values.kegiatan.map((kegiatan, index) => (
                          <div key={index} className="flex gap-4 mb-6">
                            <div className="flex-1">
                              <div className="mb-4">
                                <label
                                  htmlFor="name"
                                  className="block text-sm mb-1"
                                >
                                  Nama Kegiatan{" "}
                                  <span className="text-red-600">*</span>
                                </label>
                                <Input
                                  required
                                  name={`kegiatan[${index}].name`}
                                  placeholder=""
                                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                                  allowClear
                                  {...formik.getFieldProps(
                                    `kegiatan[${index}].name`
                                  )}
                                />
                              </div>

                              <div className="mb-4">
                                <label
                                  htmlFor="desc"
                                  className="block text-sm mb-1"
                                >
                                  Deskripsi Kegiatan{" "}
                                  <span className="text-red-600">*</span>
                                </label>
                                {/* <Input
                                  required
                                  name={`kegiatan.${index}.desc`}
                                  placeholder=""
                                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                                  allowClear
                                  {...formik.getFieldProps(
                                    `kegiatan.${index}.desc`
                                  )}
                                /> */}
                                <TextArea
                                  required
                                  name={`kegiatan.${index}.desc`}
                                  rows={2}
                                  allowClear
                                  {...formik.getFieldProps(
                                    `kegiatan.${index}.desc`
                                  )}
                                />
                              </div>
                            </div>

                            {formik.values.kegiatan.length > 1 && (
                              <div>
                                <label className="text-sm mb-1 invisible">
                                  hapus
                                </label>
                                <button
                                  className="h-min flex items-center gap-2 rounded-sm px-4 py-1 bg-[#ffafaf] border border-gray-400 font-medium"
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  {/* <Image
                                  src={IconPlus}
                                  alt="img-button"
                                  className="inline-block"
                                  width={16}
                                  height={16}
                                /> */}
                                  Hapus
                                </button>
                              </div>
                            )}
                          </div>
                        ))}

                        <div className="flex justify-end mt-8">
                          <ButtonAdd
                            type="button"
                            onChange={() =>
                              arrayHelpers.push({ name: "", desc: "" })
                            }
                            text="Tambah Kegiatan"
                          />
                        </div>
                      </div>
                    )}
                  />

                  {/* Form tambah lomab */}
                  <FieldArray
                    name="lomba"
                    render={(arrayHelpers) => (
                      <div className="w-[80%]">
                        <h1 className="mb-6 text-xl font-semibold">
                          C. Prestasi Membanggakan
                        </h1>

                        {formik.values.lomba.map((lomba, index) => (
                          <div key={index} className="flex gap-4 mb-6">
                            <div className="flex-1">
                              <div className="mb-4">
                                <label
                                  htmlFor="name"
                                  className="block text-sm mb-1"
                                >
                                  Nama Lomba{" "}
                                  <span className="text-red-600">*</span>
                                </label>
                                <Input
                                  required
                                  name={`lomba[${index}].name`}
                                  placeholder=""
                                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                                  allowClear
                                  {...formik.getFieldProps(
                                    `lomba[${index}].name`
                                  )}
                                />
                              </div>

                              <div className="mb-4">
                                <label
                                  htmlFor="tingkat_prestasi"
                                  className="block text-sm mb-1"
                                >
                                  Tingkatan Prestasi{" "}
                                  <span className="text-red-600">*</span>
                                </label>
                                <Input
                                  required
                                  name={`lomba[${index}].name`}
                                  placeholder=""
                                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                                  allowClear
                                  {...formik.getFieldProps(
                                    `lomba[${index}].tingkat_prestasi`
                                  )}
                                />
                              </div>

                              <div className="mb-4">
                                <label
                                  htmlFor="desc"
                                  className="block text-sm mb-1"
                                >
                                  Deskripsi Lomba{" "}
                                  <span className="text-red-600">*</span>
                                </label>
                                <TextArea
                                  required
                                  name={`lomba.${index}.desc`}
                                  rows={2}
                                  allowClear
                                  {...formik.getFieldProps(
                                    `lomba.${index}.desc`
                                  )}
                                />
                              </div>
                            </div>

                            {formik.values.lomba.length > 1 && (
                              <div>
                                <label className="text-sm mb-1 invisible">
                                  hapus
                                </label>
                                <button
                                  className="h-min flex items-center gap-2 rounded-sm px-4 py-1 bg-[#ffafaf] border border-gray-400 font-medium"
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  {/* <Image
                                  src={IconPlus}
                                  alt="img-button"
                                  className="inline-block"
                                  width={16}
                                  height={16}
                                /> */}
                                  Hapus
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                        <div className="flex justify-end mt-8">
                          <ButtonAdd
                            type="button"
                            onChange={() =>
                              arrayHelpers.push({ name: "", desc: "" })
                            }
                            text="Tambah Lomba"
                          />
                        </div>
                      </div>
                    )}
                  />

                  {/* KetidakHadiran */}
                  <div className="mb-8">
                    <h1 className="mb-6 text-xl font-semibold">
                      D. Ketidakhadiran
                    </h1>

                    <div className="mb-4 flex items-center justify-center gap-4 w-[50%]">
                      <label htmlFor="alfa" className="block text-sm mb-1 w-20">
                        Alfa <span className="text-red-600">*</span>
                      </label>
                      <Input
                        placeholder=""
                        className="border border-gray-300 rounded-md px-3 py-2 w-40 flex-1"
                        allowClear
                        {...formik.getFieldProps("alfa")}
                      />
                      <p>Hari</p>
                    </div>

                    <div className="mb-4 flex items-center justify-center gap-4 w-[50%]">
                      <label htmlFor="izin" className="block text-sm mb-1 w-20">
                        izin <span className="text-red-600">*</span>
                      </label>
                      <Input
                        placeholder=""
                        className="border border-gray-300 rounded-md px-3 py-2 w-40 flex-1"
                        allowClear
                        {...formik.getFieldProps("izin")}
                      />
                      <p>Hari</p>
                    </div>

                    <div className="mb-4 flex items-center justify-center gap-4 w-[50%]">
                      <label
                        htmlFor="sakit"
                        className="block text-sm mb-1 w-20"
                      >
                        Sakit <span className="text-red-600">*</span>
                      </label>
                      <Input
                        placeholder=""
                        className="border border-gray-300 rounded-md px-3 py-2 w-40 flex-1"
                        allowClear
                        {...formik.getFieldProps("sakit")}
                      />
                      <p>Hari</p>
                    </div>
                  </div>

                  <div className="mb-4 w-[80%]">
                    <h1 className="mb-1 text-xl font-semibold">
                      Catatan Wali Kelas
                    </h1>

                    <TextArea
                      disabled={disableForm}
                      rows={4}
                      placeholder="catatan wali kelas.."
                      allowClear
                      {...formik.getFieldProps("catatan_wali_kelas")}
                    />
                  </div>

                  <div className="flex justify-end mt-8 w-[80%]">
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

const Page = () => {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <TambahRaporPage />
    </Suspense>
  );
};

export default Page;
