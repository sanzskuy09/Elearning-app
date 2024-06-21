"use client";
import React, { Suspense, useEffect, useState } from "react";

import { ConfigProvider, Radio, Checkbox } from "antd";

import Image from "next/image";
import Link from "next/link";

import IconToga from "@/public/Icons/icon-toga.svg";
import IconDownload from "@/public/Icons/icon-download-2.svg";

import { API, URL } from "@/config/api";

const KelasDetailPage = ({ params: { id } }) => {
  const nama = localStorage.getItem("nama_panggilan");

  const colors = ["bg-red-300", "bg-blue-300", "bg-green-300"];

  const [jadwal, setJadwal] = useState();
  const [silabus, setSilabus] = useState([]);
  const [murid, setMurid] = useState([]);
  const [value, setValue] = useState(1);

  const [attendance, setAttendance] = useState(
    murid.reduce((acc, student) => {
      acc[student.id] = "";
      return acc;
    }, {})
  );

  const handleAttendanceChange = (studentId, value) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(attendance);
    // Perform further actions like submitting to API or other processing
  };

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onChangeCheckbox = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const getDataJadwal = async () => {
    try {
      // get jadwal
      const res = await API.get(`${URL.GET_JADWAL}/${id}`);
      const data = res.data.data;
      setJadwal(data);

      // get silabus
      const responseSilabus = await fetch(
        `/api/silabus?mapel=${data.id_mapel}&kelas=${data.id_kelas}&id=`,
        {
          method: "GET",
        }
      );

      if (!responseSilabus.ok) {
        throw new Error("Failed to fetch data");
      }

      const dataSilabus = await responseSilabus.json();

      setSilabus(
        dataSilabus.data.filter((e) => e.isChecked == false).slice(0)[0]
      );

      // get murid
      const responseMurid = await fetch(
        `/api/murid?kelas=${data.id_kelas}&kategori=`,
        {
          method: "GET",
        }
      );

      if (!responseMurid.ok) {
        throw new Error("Failed to fetch data");
      }

      const dataMurid = await responseMurid.json();

      setMurid(dataMurid.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(jadwal);
  // console.log(silabus, " >> silabus");
  console.log(murid, " >> murid");
  console.log(attendance, " >> attendance");

  useEffect(() => {
    getDataJadwal();
  }, []);

  return (
    <div>
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>
          Kelas Hari Ini / {jadwal?.kelas} - {jadwal?.mapel}
        </h1>
        <h1>Hallo, Kak {nama}</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4">
        {/* Silabus */}
        <div className="">
          <div className="flex justify-between mb-3">
            <h4>Silabus Hari Ini</h4>
            <h2 className="text-title">
              &lt;&lt;{" "}
              <Link
                href={`/silabus?mapel=${[
                  jadwal?.mapel,
                  jadwal?.id_mapel,
                ]}&kelas=${[jadwal?.kelas, jadwal?.id_kelas]}`}
              >
                Lihat Silabus Lengkap
              </Link>{" "}
              &gt;&gt;
            </h2>
          </div>

          <div className="bg-[#D9D9D9] p-4 flex justify-between items-center rounded-md">
            <p>{silabus?.name}</p>

            <div className="flex gap-4">
              <ConfigProvider
                theme={{
                  token: {
                    borderRadiusSM: 4,
                    controlInteractiveSize: 24,
                    colorPrimary: "#0FA958",
                    colorPrimaryBorder: "#0FA958",
                  },
                }}
              >
                <Checkbox onChange={onChange}></Checkbox>
              </ConfigProvider>

              <button>
                <Image
                  src={IconDownload}
                  alt="img-button"
                  className="inline-block"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-start items-center gap-24">
          <h4 className="">Pengajar Hari Ini</h4>
          <div className="flex gap-2 p-1 bg-white shadow-sm flex-1 w-full rounded-md">
            {jadwal?.relawan.map((item, i) => (
              <p
                className={`p-1 px-3 font-medium rounded-md ${
                  colors[i % colors.length]
                }`}
                key={i}
              >
                {item.nama_lengkap}
              </p>
            ))}
            {/* <p className="p-1 px-3 bg-blue-300 font-medium rounded-md">
              Wawan Setiawan
            </p>
            <p className="p-1 px-3 bg-green-300 font-medium rounded-md">
              Wawan Setiawan
            </p> */}
          </div>
        </div>

        <div className="bg-white w-full min-h-[400px] shadow-xl rounded-lg">
          <table className="w-full ">
            <thead>
              <tr className="text-left bg-[#F7F7F7]">
                <th className="w-[80%] border-b border-slate-600 p-2 px-4">
                  Nama
                </th>
                <th className="border-b border-slate-600">Hadir</th>
                <th className="border-b border-slate-600">Alfa</th>
                <th className="border-b border-slate-600">Sakit</th>
                <th className="border-b border-slate-600">Izin</th>
              </tr>
            </thead>
            <tbody>
              {murid.map((student) => (
                <tr key={student.id}>
                  <td className="p-4  border-b border-gray-400">
                    {student.nama_lengkap}
                  </td>
                  <td className="border-b border-gray-400">
                    <Radio
                      name={`absen-${student.id}`}
                      value="hadir"
                      defaultChecked={true}
                      checked={attendance[student.id] === "hadir"}
                      onChange={() =>
                        handleAttendanceChange(student.id, "hadir")
                      }
                    ></Radio>
                  </td>
                  <td className="border-b border-gray-400">
                    <Radio
                      name={`absen-${student.id}`}
                      value="alfa"
                      checked={attendance[student.id] === "alfa"}
                      onChange={() =>
                        handleAttendanceChange(student.id, "alfa")
                      }
                    ></Radio>
                  </td>
                  <td className="border-b border-gray-400">
                    <Radio
                      name={`absen-${student.id}`}
                      value="sakit"
                      checked={attendance[student.id] === "sakit"}
                      onChange={() =>
                        handleAttendanceChange(student.id, "sakit")
                      }
                    ></Radio>
                  </td>
                  <td className="border-b border-gray-400">
                    <Radio
                      name={`absen-${student.id}`}
                      value="izin"
                      checked={attendance[student.id] === "izin"}
                      onChange={() =>
                        handleAttendanceChange(student.id, "izin")
                      }
                    ></Radio>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 w-full justify-end">
          <Link href={`/rapor`}>
            <button className="bg-white rounded-md px-4 py-2 uppercase text-[#0FA958] flex items-center gap-2">
              <Image
                src={IconToga}
                alt="img-button"
                className="inline-block"
                width={24}
                height={24}
              />
              Beri Nilai
            </button>
          </Link>

          <Link href={"/kelashariini"}>
            <button className="bg-white rounded-md px-4 py-2 uppercase text-[#0FA958] flex items-center gap-2">
              <Image
                src={IconToga}
                alt="img-button"
                className="inline-block"
                width={24}
                height={24}
              />
              Simpan
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// const Page = () => {
//   return (
//     // You could have a loading skeleton as the `fallback` too
//     <Suspense>
//       <KelasDetailPage />
//     </Suspense>
//   );
// };

export default KelasDetailPage;
// export default Page;
