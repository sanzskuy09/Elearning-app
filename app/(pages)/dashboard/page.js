import React from "react";

import { Table } from "antd";

const columnsClass = [
  {
    title: "Hari",
    dataIndex: "hari",
  },
  {
    title: "Jam",
    dataIndex: "jam",
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
    dataIndex: "name",
  },
  {
    title: "Point",
    dataIndex: "point",
  },
];

import { dataUpcomingClass, dataRelawan } from "./data";
import TableDashboard from "@/components/TableDashboard";

const DashboardPage = () => {
  // filter data relawan
  const filterDataRelawan = dataRelawan
    .sort((a, b) => b.point - a.point)
    .slice(0, 5);

  return (
    <div>
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Dashboard</h1>
        <h1>Hallo, Kak Nanda</h1>
      </div>

      {/* content */}
      <div className="py-6 px-10 flex flex-col gap-4">
        {/* upcoming class & relawan */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white shadow-xl col-span-2 py-4 px-6 rounded-xl min-h-56">
            <h1 className="mb-4">Upcoming Class</h1>

            <TableDashboard
              columns={columnsClass}
              data={dataUpcomingClass}
              showHead={true}
            />
          </div>

          <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-56 relative">
            <h1 className="mb-4">Relawan Ter-aktif</h1>

            <TableDashboard columns={columnsRelawan} data={filterDataRelawan} />

            {dataRelawan.length > 5 && (
              <div className="absolute bottom-0 right-0 mb-4 mr-8">
                <button className=" text-title text-base font-light">
                  Lihat Lainnya
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl bg-tersier py-3 text-center shadow-xl text-white">
          <h1>Mulai Mengajar Hari ini</h1>
        </div>

        {/* rata-rata nilai & absensi */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white shadow-xl col-span-2 py-4 px-6 rounded-xl min-h-56">
            <h1 className="mb-4">Rata-rata Nilai</h1>

            <TableDashboard
              columns={columnsClass}
              data={dataUpcomingClass}
              showHead={true}
            />
          </div>

          <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-56 relative">
            <h1 className="mb-4">Murid dengan presensi &lt; 70%</h1>

            <TableDashboard columns={columnsRelawan} data={filterDataRelawan} />

            {dataRelawan.length > 5 && (
              <div className="absolute bottom-0 right-0 mb-4 mr-8">
                <button className=" text-title text-base font-light">
                  Lihat Lainnya
                </button>
              </div>
            )}
          </div>
        </div>

        {/* jumlah mapel, murid, relawan */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white shadow-xl py-4 px-6 rounded-xl">
            <p>Jumlah Mata Pelajaran</p>
            <h1 className="text-6xl font-medium mt-5">45</h1>
          </div>
          <div className="bg-white shadow-xl py-4 px-6 rounded-xl">
            <p>Jumlah Siswa</p>
            <h1 className="text-6xl font-medium mt-5">45</h1>
          </div>
          <div className="bg-white shadow-xl py-4 px-6 rounded-xl">
            <p>Jumlah Relawan</p>
            <h1 className="text-6xl font-medium mt-5">45</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
