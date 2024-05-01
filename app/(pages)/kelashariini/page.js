import TableDashboard from "@/components/TableDashboard";
import React from "react";

import { dataUpcomingClass, dataRelawan } from "../dashboard/data";

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

const KelasHariIniPage = () => {
  return (
    <div>
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Kelas Hari Ini</h1>
        <h1>Hallo, Kak Nanda</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4">
        <div className="bg-white shadow-xl col-span-2 py-4 px-6 rounded-xl min-h-56">
          <h1 className="mb-4">Jadwal Hari Ini</h1>

          <TableDashboard
            columns={columnsClass}
            data={dataUpcomingClass}
            showHead={true}
          />
        </div>
      </div>
    </div>
  );
};

export default KelasHariIniPage;
