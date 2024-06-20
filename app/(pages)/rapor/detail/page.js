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

const semesterOption = [
  // { value: "", label: "Pilih Hari" },
  { value: "1", label: "Semester 1" },
  { value: "2", label: "Semester 2" },
  { value: "3", label: "Semester 3" },
  { value: "4", label: "Semester 4" },
  { value: "5", label: "Semester 5" },
  { value: "6", label: "Semester 6" },
  { value: "7", label: " emester 7" },
];

const DetailRaporPage = () => {
  const [nama, setNama] = useState("");

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const update = searchParams.get("update");
  const disableForm = update === "true" ? false : true;

  const router = useRouter();
  const [data, setData] = useState([]);
  const [mapel, setMapel] = useState([]);
  const [loading, setLoading] = useState(false);

  // hook form
  const initialValues = {
    nama_lengkap: data?.nama_lengkap,
    nama_ortu: data?.nama_ortu,
    semester: data?.semester,
    catatan_wali_kelas: data?.catatan_wali_kelas,
  };

  const getData = async () => {
    try {
      setLoading(true);
      // get rapor
      const res = await API.get(`${URL.GET_RAPOR_BY_ID_MURID}/${id}`);
      const data = res.data.data;
      setData(data);

      // // get mapel
      // const res1 = await API.get(`/jadwal-mapel?kelas=${data?.id_kelas}`);
      // setMapel(res1.data.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      // if (update !== "true") {
      //   toastFailed("Data Belum ada. Silahkan Buat Rapor Terlebih Dahulu");

      //   setTimeout(() => {
      //     router.push("/rapor");
      //   }, 2000);
      // }
      setLoading(false);
    }
  };

  useEffect(() => {
    const nameData =
      typeof window !== "undefined"
        ? window.localStorage.getItem("nama_panggilan")
        : false;
    setNama(nameData);

    getData();
    // getDataMapel();
  }, []);

  // console.log(data, ">> data");
  // console.log(mapel, ">> mapel");

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      // validationSchema={Yup.object({
      //   pic: Yup.string()
      //     .min(3, "Must be 3 characters or then")
      //     .required("PIC is Required"),
      //   hari: Yup.string()
      //     .min(3, "Must be 3 characters or then")
      //     .required("Hari is Required"),
      //   id_mapel: Yup.string().required("Mata Pelajaran is Required"),
      //   id_kelas: Yup.string().required("Kelas is Required"),
      //   id_jam_mapel: Yup.string().required("Jam Pelajaran is Required"),
      // })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          console.log(values);
          // const newValues = {
          //   ...values,
          //   jadwal: values.jadwal.map((id_relawan) => ({
          //     id_relawan,
          //   })),
          // };

          // const response = await fetch(`/api/jadwal`, {
          //   method: "POST",
          //   body: JSON.stringify(newValues),
          // });

          // if (!response.ok) {
          //   throw new Error("Failed to Tambah Jadwal Gagal");
          // }

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            toastSuccess("Edit Rapor Berhasil");
            // router.push("/jadwalkelas");
          }, 400);
        } catch (error) {
          toastFailed("Edit Rapor Gagal");
          // console.log(error);
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
                Detail Rapor Murid
              </h1>

              <div className="py-8 px-12">
                <form
                  onSubmit={formik.handleSubmit}
                  className="grid grid-cols-2 gap-24"
                >
                  <div>
                    <h1 className="mb-2 text-xl font-semibold">
                      Pemberian Nilai
                    </h1>

                    {/* mapel start */}
                    {data?.rapor_detail?.map((item, i) => (
                      <div className="mb-4 flex flex-col gap-2" key={i}>
                        <h1 className="text-xl font-semibold">{item.mapel}</h1>
                        <div>
                          <label htmlFor="uts" className="block text-sm mb-1">
                            UTS <span className="text-red-600">*</span>
                          </label>
                          <Input
                            readOnly
                            placeholder=""
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            allowClear
                            // onChange={(e) => setValue(e.target.value)}
                            value={item.uts}
                          />
                        </div>

                        <div>
                          <label htmlFor="uas" className="block text-sm mb-1">
                            UAS <span className="text-red-600">*</span>
                          </label>
                          <Input
                            readOnly
                            placeholder=""
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            allowClear
                            value={item.uts}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* mapel end */}

                  <div>
                    <h1 className="mb-2 text-xl font-semibold">
                      Biodata Murid
                    </h1>

                    <div className="mb-4">
                      <label htmlFor="nama" className="block text-sm mb-1">
                        Nama Murid <span className="text-red-600">*</span>
                      </label>
                      <Input
                        readOnly
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
                        // defaultValue={"Ibu Nanda"}
                        readOnly
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
                    </div>

                    <div className="mb-4">
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

                    {/* <div className="flex justify-end mt-8">
                      <ButtonAdd text="Simpan" />
                    </div> */}
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
      <DetailRaporPage />
    </Suspense>
  );
};

export default Page;
