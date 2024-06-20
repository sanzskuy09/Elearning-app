"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { API, URL } from "@/config/api";

const KelasDetailPage = ({ params: { id } }) => {
  const nama = localStorage.getItem("nama_panggilan");

  const colors = ["bg-red-300", "bg-blue-300", "bg-green-300"];

  const [jadwal, setJadwal] = useState();
  const [silabus, setSilabus] = useState([]);

  const getDataJadwal = async () => {
    try {
      const res = await API.get(`${URL.GET_JADWAL}/${id}`);

      const data = res.data.data;
      setJadwal(data);

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
    } catch (error) {
      console.log(error);
    }
  };

  console.log(jadwal);
  console.log(silabus, " >> silabus");

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
              <button className="w-8 h-8 rounded-md bg-white">a</button>
              <button className="w-8 h-8 rounded-md bg-white">d</button>
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

        <div className="bg-white w-full h-[400px] p-4">table absen siswa</div>
        <div className="flex gap-4 w-full justify-end">
          <button className="bg-white rounded-md px-4 py-2 uppercase text-[#0FA958]">
            <Image
              src=""
              alt="img-button"
              className="inline-block"
              width={24}
              height={24}
            />
            Beri Nilai
          </button>
          <button className="bg-white rounded-md px-4 py-2 uppercase text-[#0FA958]">
            <Image
              src=""
              alt="img-button"
              className="inline-block"
              width={24}
              height={24}
            />
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default KelasDetailPage;
