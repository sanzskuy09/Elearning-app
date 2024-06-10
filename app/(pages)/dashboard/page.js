"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Table } from "antd";
import { dataUpcomingClass, dataRelawan } from "./data";
import TableDashboard from "@/components/TableDashboard";

// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
ChartJS.register(...registerables);

import { Pie, Bar } from "react-chartjs-2";

import { API, URL } from "@/config/api";

const columnsClass = [
  {
    title: "Hari",
    dataIndex: "hari",
  },
  {
    title: "Jam",
    dataIndex: "jam_mapel",
  },
  {
    title: "Kelas",
    dataIndex: "kelas",
  },
  {
    title: "Mata Pelajaran",
    dataIndex: "mapel",
  },
];

const columnsRelawan = [
  {
    title: "Nama",
    dataIndex: "nama_lengkap",
  },
  {
    title: "Point",
    dataIndex: "point",
  },
];

const DashboardPage = () => {
  const nama = localStorage.getItem("nama_panggilan");

  const [totals, setTotals] = useState({ relawan: 0, murid: 0, mapel: 0 });
  const [pointRelawan, setPointRelawan] = useState([]);
  const [dataJadwal, setDataJadwal] = useState([]);

  const [loading, setLoading] = useState(false);

  const getJadwal = async () => {
    setLoading(true);
    try {
      const daysMap = {
        0: "Minggu",
        1: "Senin",
        2: "Selasa",
        3: "Rabu",
        4: "Kamis",
        5: "Jumat",
        6: "Sabtu",
      };

      const currentDay = new Date().getDay();
      const currentDayName = daysMap[currentDay];

      const res = await API.get(`${URL.GET_JADWAL}?hari=${currentDayName}`);

      setDataJadwal(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getTotalData = async () => {
    try {
      const res = await API.get(URL.TOTAL);
      setTotals(res.data.data);
    } catch (error) {
      console.error("Error fetching totals:", error);
    }
  };

  const getRelawanTeraktif = async () => {
    try {
      const res = await API.get(URL.RELAWAN_TERAKTIF);

      const data = res.data.data.slice(0, 5);
      setPointRelawan(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    getTotalData();
    getRelawanTeraktif();
    getJadwal();
  }, []);

  // Chart data
  const options = {
    // Add options here
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const dataKelas = {
    labels: ["1 SD", "2 SD", "3 SD", "4 SD", "5 SD", "6 SD"],
    datasets: [
      {
        // label: "# Nilai :",
        data: [62, 90, 30, 50, 44, 33],
        backgroundColor: [
          "#b6c154",
          "#fae477",
          "#fca034",
          "#d0671c",
          "#83B4FF",
          "#BC5A94",
        ],
        borderColor: [
          "#b6c154",
          "#fae477",
          "#fca034",
          "#d0671c",
          "#83B4FF",
          "#BC5A94",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  function truncateLabel(label, maxLength) {
    if (label.length > maxLength) {
      return label.slice(0, maxLength) + "...";
    }
    return label;
  }

  // function splitLabel(label) {
  //   return label.split(" ").join(" + <br/> +");
  // }

  const maxLength = 10; // Panjang maksimum label sebelum dipotong
  const originalLabels = [
    "Umum",
    "Disabilitas",
    "Yatim",
    "Piatu",
    "Kelompok Marginal",
    "Dhuafa",
    "Pengungsi",
    // "Orang tua bercerai"
  ];

  // const truncatedLabels = originalLabels.map((label) => splitLabel(label));
  const truncatedLabels = originalLabels.map((label) =>
    truncateLabel(label, maxLength)
  );

  const dataKategori = {
    labels: truncatedLabels,
    datasets: [
      {
        label: "Kategori :",
        data: [62, 90, 30, 50, 44, 33, 22],
        backgroundColor: ["#3572EF", "#3ABEF9"],
        borderColor: ["#3572EF", "#3ABEF9"],
        borderWidth: 1,
        minBarLength: 2,
      },
    ],
  };

  return (
    <div>
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Dashboard</h1>
        <h1>Hallo, Kak {nama}</h1>
      </div>

      {/* content */}
      <div className="py-6 px-10 flex flex-col gap-4">
        {/* upcoming class & relawan */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white shadow-xl col-span-2 py-4 px-6 rounded-xl min-h-56">
            <h1 className="mb-4">Upcoming Class</h1>

            {dataJadwal == "" ? (
              <h1 className="font-bold text-lg">Tidak Ada Jadwal Hari Ini!</h1>
            ) : (
              <TableDashboard
                columns={columnsClass}
                data={dataJadwal}
                showHead={true}
              />
            )}
          </div>

          <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-56 relative">
            <h1 className="mb-4">Relawan Ter-aktif</h1>

            <TableDashboard columns={columnsRelawan} data={pointRelawan} />

            {/* {pointRelawan.length > 5 && (
              <div className="absolute bottom-0 right-0 mb-4 mr-8">
                <button className=" text-title text-base font-light">
                  Lihat Lainnya
                </button>
              </div>
            )} */}
          </div>
        </div>

        <Link href={"/kelashariini"}>
          <div className="rounded-xl bg-tersier py-3 text-center shadow-xl text-white">
            <h1>Mulai Mengajar Hari ini</h1>
          </div>
        </Link>

        {/* Chart */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-56">
            <h1 className="mb-4">Jumlah Murid</h1>

            <div className="flex justify-center">
              <div className="w-[60%] flex justify-center">
                <Pie data={dataKelas} />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-56 flex flex-col justify-between pb-20">
            <h1 className="mb-4">Kelompok Perhatian Khusus</h1>

            <div className="flex justify-center">
              <div className="w-[100%] flex justify-center">
                <Bar options={options} data={dataKategori} />
              </div>
            </div>
          </div>
        </div>

        {/* jumlah mapel, murid, relawan */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white shadow-xl py-4 px-6 rounded-xl">
            <p>Jumlah Mata Pelajaran</p>
            <h1 className="text-6xl font-medium mt-5">{totals?.mapel || 0}</h1>
          </div>
          <div className="bg-white shadow-xl py-4 px-6 rounded-xl">
            <p>Jumlah Murid</p>
            <h1 className="text-6xl font-medium mt-5">{totals?.murid || 0}</h1>
          </div>
          <div className="bg-white shadow-xl py-4 px-6 rounded-xl">
            <p>Jumlah Relawan</p>
            <h1 className="text-6xl font-medium mt-5">
              {totals?.relawan || 0}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
