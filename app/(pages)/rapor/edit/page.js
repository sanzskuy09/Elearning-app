"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

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

  const router = useRouter();
  const [formPage, setFormPage] = useState(1);
  const [data, setData] = useState([]);
  const [mapel, setMapel] = useState([]);
  const [nilai, setNilai] = useState([]);
  const [totalAbsen, setTotalAbsen] = useState();

  const [rapor, setRapor] = useState([]);

  const [loading, setLoading] = useState(false);

  // hook form
  const initialValues = {
    nama_lengkap: data?.nama_lengkap,
    nama_ortu: data?.nama_ortu,
    semester: rapor?.semester,
    catatan_wali_kelas: rapor?.catatan_wali_kelas,
    kegiatan: rapor?.kegiatan == "" ? [] : rapor?.kegiatan,
    lomba: rapor?.lomba == "" ? [] : rapor?.lomba,
    sakit: totalAbsen?.Sakit || 0,
    izin: totalAbsen?.Izin || 0,
    alfa: totalAbsen?.Alfa || 0,
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
      rapor?.rapor_detail?.map((item) => ({
        id_mapel: item.id_mapel,
        uts: item.uts,
        uas: item.uas,
      }))
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

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotalAbsenMurid = async () => {
    try {
      setLoading(true);

      const res = await API.get(`${URL.TOTAL_ABSEN_SISWA}/${id}`);

      const data = res.data.data;

      setTotalAbsen(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      const res = await API.get(`${URL.GET_RAPOR_BY_ID_MURID}/${id}`);
      const data = res.data.data;
      setRapor(data);

      setNilai(
        data.rapor_detail?.map((item) => ({
          id_mapel: item.id_mapel,
          uts: item.uts,
          uas: item.uas,
        }))
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // console.log(nilai, ">> nilai");
  // console.log(rapor, ">> rapor");
  // console.log(rapor.kegiatan, ">> mapel");

  useEffect(() => {
    const nameData =
      typeof window !== "undefined"
        ? window.localStorage.getItem("nama_panggilan")
        : false;
    setNama(nameData);

    getData();
    getDataMurid();
    getDataMapel();
    getTotalAbsenMurid();
    // resetNilai();
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
          const newValues = {
            id_murid: id,
            semester: values.semester,
            catatan_wali_kelas: values.catatan_wali_kelas,
            sakit: values.sakit,
            izin: values.izin,
            alfa: values.alfa,
            kegiatan: values.kegiatan,
            lomba: values.lomba,
            nilai: nilai.map((item) => ({
              id_mapel: item.id_mapel,
              uts: item.uts,
              uas: item.uas,
            })),
          };

          console.log(newValues);

          const response = await fetch(`/api/rapor`, {
            method: "POST",
            body: JSON.stringify(newValues),
          });

          if (!response.ok) {
            throw new Error("Failed to Tambah Rapor ");
          }

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            resetNilai();
            toastSuccess("Edit Rapor Berhasil");
            router.push("/rapor");
          }, 400);
        } catch (error) {
          toastFailed("Tambah Rapor Gagal");
          console.log(error);
        }
      }}
    >
      {(formik) => (
        <div className="flex flex-col h-full">
          {rapor == "" ? (
            <>
              <div className="py-6 w-full flex flex-col gap-8 items-center">
                <p>Data Rapor Masih Kosong. Silahkan buat terlebih dahulu!</p>
                <Link
                  href={`/rapor/tambah?id=${id}&id_kelas=${id_kelas}`}
                  className="font-semibold text-lg underline"
                >
                  Buat Rapor
                </Link>
              </div>
            </>
          ) : (
            <>
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
                      <div className={formPage !== 1 && `hidden`}>
                        <div className="mb-8 w-[80%]">
                          <h1 className="mb-2 text-xl font-semibold">
                            Biodata Murid
                          </h1>

                          <div className="mb-4">
                            <label
                              htmlFor="nama"
                              className="block text-sm mb-1"
                            >
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
                            <label
                              htmlFor="wali"
                              className="block text-sm mb-1"
                            >
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
                            <label
                              htmlFor="wali"
                              className="block text-sm mb-1"
                            >
                              Semester
                            </label>
                            <Select
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
                            {formik.touched.semester &&
                            formik.errors.semester ? (
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

                            {rapor?.rapor_detail?.map((item, i) => (
                              <div className="mb-4 flex flex-col gap-2" key={i}>
                                <h1 className="text-xl font-semibold">
                                  {item.mapel}
                                </h1>

                                <div className="mb-4">
                                  <label
                                    htmlFor="uts"
                                    className="block text-sm mb-1"
                                  >
                                    Ujian Tengah Semester{" "}
                                    <span className="text-red-600">*</span>
                                  </label>
                                  <Input
                                    required
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
                                      nilai?.find(
                                        (n) => n.id_mapel === item.id_mapel
                                      )?.uts || ""
                                    }
                                  />
                                </div>

                                <div className="mb-4">
                                  <label
                                    htmlFor="uas"
                                    className="block text-sm mb-1"
                                  >
                                    Ujian Akhir Semester{" "}
                                    <span className="text-red-600">*</span>
                                  </label>
                                  <Input
                                    required
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
                                      nilai?.find(
                                        (n) => n.id_mapel === item.id_mapel
                                      )?.uas || ""
                                    }
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className={formPage !== 2 && `hidden`}>
                        {/* Form tambah kegiatan */}
                        <FieldArray
                          name="kegiatan"
                          render={(arrayHelpers) => (
                            <div className="w-[80%]">
                              <h1 className="mb-6 text-xl font-semibold">
                                B. Keaktifan Mengikuti Kegiatan
                              </h1>

                              {formik.values.kegiatan?.map(
                                (kegiatan, index) => (
                                  <div key={index} className="flex gap-4 mb-6">
                                    <div className="flex-1">
                                      <div className="mb-4">
                                        <label
                                          htmlFor="name"
                                          className="block text-sm mb-1"
                                        >
                                          Nama Kegiatan{" "}
                                          <span className="text-red-600">
                                            *
                                          </span>
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
                                          <span className="text-red-600">
                                            *
                                          </span>
                                        </label>
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

                                    {formik.values.kegiatan.length > 0 && (
                                      <div>
                                        <label className="text-sm mb-1 invisible">
                                          hapus
                                        </label>
                                        <button
                                          className="h-min flex items-center gap-2 rounded-sm px-4 py-1 bg-[#ffafaf] border border-gray-400 font-medium"
                                          type="button"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          Hapus
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )
                              )}

                              <div
                                className={`flex ${
                                  formik.values.kegiatan?.length > 0
                                    ? "justify-end"
                                    : "justify-start"
                                } mt-8 mb-8`}
                              >
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

                        {/* Form tambah lomba */}
                        <FieldArray
                          name="lomba"
                          render={(arrayHelpers) => (
                            <div className="w-[80%]">
                              <h1 className="mb-6 text-xl font-semibold">
                                C. Prestasi Membanggakan
                              </h1>

                              {formik.values.lomba?.map((lomba, index) => (
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

                                  {formik.values.lomba.length > 0 && (
                                    <div>
                                      <label className="text-sm mb-1 invisible">
                                        hapus
                                      </label>
                                      <button
                                        className="h-min flex items-center gap-2 rounded-sm px-4 py-1 bg-[#ffafaf] border border-gray-400 font-medium"
                                        type="button"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      >
                                        Hapus
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ))}
                              <div
                                className={`flex ${
                                  formik.values.lomba?.length > 0
                                    ? "justify-end"
                                    : "justify-start"
                                } mt-8`}
                              >
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
                      </div>

                      <div className={formPage !== 3 && `hidden`}>
                        {/* KetidakHadiran */}
                        <div className="mb-8">
                          <h1 className="mb-6 text-xl font-semibold">
                            D. Ketidakhadiran
                          </h1>

                          <div className="mb-4 flex items-center justify-center gap-4 w-[50%]">
                            <label
                              htmlFor="alfa"
                              className="block text-sm mb-1 w-20"
                            >
                              Alfa <span className="text-red-600">*</span>
                            </label>
                            <Input
                              placeholder=""
                              className="border border-gray-300 rounded-md px-3 py-2 w-20 flex-1"
                              readOnly
                              {...formik.getFieldProps("alfa")}
                            />
                            <p>Hari</p>
                          </div>

                          <div className="mb-4 flex items-center justify-center gap-4 w-[50%]">
                            <label
                              htmlFor="izin"
                              className="block text-sm mb-1 w-20"
                            >
                              izin <span className="text-red-600">*</span>
                            </label>
                            <Input
                              placeholder=""
                              className="border border-gray-300 rounded-md px-3 py-2 w-20 flex-1"
                              readOnly
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
                              className="border border-gray-300 rounded-md px-3 py-2 w-20 flex-1"
                              readOnly
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
                            rows={4}
                            placeholder="catatan wali kelas.."
                            allowClear
                            {...formik.getFieldProps("catatan_wali_kelas")}
                          />
                        </div>

                        <div className="flex justify-end mt-8 w-[80%]">
                          <ButtonAdd type="submit" text="Simpan" />
                        </div>
                      </div>

                      <div className="flex gap-4 justify-center mt-8 w-full">
                        <button
                          type="button"
                          onClick={() => setFormPage((prev) => prev - 1)}
                          className={formPage == 1 && `hidden`}
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormPage((prev) => prev + 1)}
                          className={formPage == 3 && `hidden`}
                        >
                          Next
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
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
