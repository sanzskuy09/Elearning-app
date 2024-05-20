"use client";
import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { Pie } from "react-chartjs-2";

import TableDashboard from "@/components/TableDashboard";
import { dataUpcomingClass, dataRelawan } from "../dashboard/data";

const data = {
  labels: [
    "Matematika : 62",
    "Pend. Karakter : 90",
    "Bhs. Inggris : 30",
    "Kreasi: 50",
  ],
  datasets: [
    {
      label: "# Nilai :",
      data: [62, 90, 30, 50],
      backgroundColor: ["#b6c154", "#fae477", "#fca034", "#d0671c"],
      borderColor: ["#b6c154", "#fae477", "#fca034", "green"],
      borderWidth: 1,
    },
  ],
};

const options = {
  // Add options here
};

const columnsRelawan = [
  {
    title: "Nama",
    dataIndex: "name",
  },
  {
    title: "Point",
    dataIndex: "point",
  },
];

const PerformaReportPage = () => {
  const nama = localStorage.getItem("nama_panggilan");

  const filterDataRelawan = dataRelawan
    .sort((a, b) => b.point - a.point)
    .slice(0, 5);

  return (
    <div>
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Performa Report</h1>
        <h1>Hallo, Kak {nama}</h1>
      </div>

      {/* content */}
      <div className="py-6 px-10 flex flex-col gap-10">
        <h1 className="font-bold text-2xl">Performance Report HOME Depok</h1>

        {/* penerima manfaat */}
        <div className="grid grid-cols-3 gap-10">
          <div className="bg-white shadow-xl col-span-2 py-4 px-6 rounded-xl min-h-56">
            <h1 className="mb-4">Kategori Penerima Manfaat</h1>

            {/* Chart */}
            <div className="flex justify-center">
              <div className="w-[60%] flex justify-center">
                <Pie options={options} data={data} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 flex flex-col">
              <p className="text-lg">Total Penerima Manfaat</p>
              <div className="flex-1 flex items-center justify-center">
                <h1 className="text-6xl font-bold">45</h1>
              </div>
            </div>
            <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 flex flex-col">
              <p className="text-lg">Rata Rata Usia</p>
              <div className="flex-1 flex items-center justify-center">
                <h1 className="text-6xl font-bold">18</h1>
              </div>
            </div>
          </div>
        </div>

        {/* rentang pendidikan */}
        <div className="grid grid-cols-3 gap-10">
          <div className="bg-white shadow-xl col-span-2 py-4 px-6 rounded-xl min-h-56">
            <h1 className="mb-4">Rentang pendidikan</h1>

            {/* Chart */}
            <div className="flex justify-center">
              <div className="w-[60%] flex justify-center">
                <Pie options={options} data={data} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 flex flex-col">
              <p className="text-lg">Total Laki Laki</p>
              <div className="flex-1 flex items-center justify-center">
                <h1 className="text-6xl font-bold">45</h1>
              </div>
            </div>
            <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 flex flex-col">
              <p className="text-lg">Total Perempuan</p>
              <div className="flex-1 flex items-center justify-center">
                <h1 className="text-6xl font-bold">18</h1>
              </div>
            </div>
          </div>
        </div>

        {/* kegiatan belajar mengajar */}
        <h1 className="font-bold text-2xl">Kegiatan Belajar Mengajar</h1>

        <div className="bg-white shadow-xl col-span-2 py-4 px-6 rounded-xl min-h-56">
          <h1 className="mb-4">Tingkat kehadiran</h1>

          {/* Chart */}
          <div className="flex justify-center">
            <div className="w-[50%] flex justify-center">
              <Pie options={options} data={data} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-10">
          <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 flex flex-col justify-between">
            <p className="text-lg min-h-14 flex items-center ">
              Jumlah murid kehadiran rendah (&lt;50%)
            </p>
            <div className="flex-1 flex items-center justify-center">
              <h1 className="text-6xl font-bold">45</h1>
            </div>
          </div>
          <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 flex flex-col justify-between">
            <p className="text-lg min-h-14 flex items-center ">
              Rata rata kehadiran
            </p>
            <div className="flex-1 flex items-center justify-center">
              <h1 className="text-6xl font-bold">18</h1>
            </div>
          </div>
          <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 flex flex-col justify-between">
            <p className="text-lg min-h-14 flex items-center ">
              Tingkat Capaian belajar
            </p>
            <div className="flex-1 flex items-center justify-center">
              <h1 className="text-6xl font-bold">18</h1>
            </div>
          </div>
        </div>

        {/* Program Relawan */}
        <h1 className="font-bold text-2xl">Program Relawan</h1>

        <div className="grid grid-cols-3 gap-10">
          <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-56">
            <h1 className="mb-4">Kategori Relawan</h1>

            {/* Chart */}
            <div className="flex justify-center">
              <div className="w-[80%] flex justify-center">
                <Pie options={options} data={data} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 col-span-2">
            <div className="flex gap-10">
              <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 flex flex-col w-full">
                <p className="text-lg">Total Relawan</p>
                <div className="flex-1 flex items-center justify-center">
                  <h1 className="text-6xl font-bold">45</h1>
                </div>
              </div>
              <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 flex flex-col w-full">
                <p className="text-lg">Tingkat Kehadiran tertinggi</p>
                <div className="flex-1 flex items-center justify-center">
                  <h1 className="text-6xl font-bold">18%</h1>
                </div>
              </div>
            </div>

            <div className="flex gap-10">
              <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 w-full">
                <p className="text-lg">Relawan Teraktif</p>

                <TableDashboard
                  columns={columnsRelawan}
                  data={filterDataRelawan}
                  showHead={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* tingkat kehadiran relawan */}
        <div className="bg-white shadow-xl col-span-2 py-4 px-6 rounded-xl min-h-56">
          <h1 className="mb-4">Tingkat kehadiran relawan</h1>

          {/* Chart */}
          <div className="flex justify-center">
            <div className="w-[50%] flex justify-center">
              <Pie options={options} data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformaReportPage;
