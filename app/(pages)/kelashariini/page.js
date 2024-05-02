"use client";

import TableDashboard from "@/components/TableDashboard";

import React from "react";
import { useRouter } from "next/navigation";

import { dataUpcomingClass, dataRelawan, dataKelas } from "../dashboard/data";

import { ConfigProvider, Space, Table, Modal } from "antd";
const { confirm } = Modal;

const KelasHariIniPage = () => {
  const router = useRouter();

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Jam Pelajaran",
      dataIndex: "jam_pelajaran",
      key: "jam_pelajaran",
    },
    {
      title: "Kelas",
      dataIndex: "kelas",
      key: "kelas",
    },
    {
      title: "PIC",
      dataIndex: "pic",
      key: "pic",
    },
    {
      title: "Mata Pelajaran",
      dataIndex: "mapel",
      key: "mapel",
    },
    {
      title: "Aksi",
      key: "aksi",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          {/* <button
            onClick={() => navigate(`/daftar-mapel/detail/${record.id_mapel}`)}
          >
            Detail
          </button> */}

          <button
            // onClick={() => navigate(`/kelashariini/detail/${record.kelas}`)}
            onClick={() => router.push(`/kelashariini/detail/${record.kelas}`)}
            className="bg-blue-500 px-2 rounded-md font-medium text-white"
          >
            Mulai
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Kelas Hari Ini</h1>
        <h1>Hallo, Kak Nanda</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4">
        <div className="bg-white shadow-xl col-span-2 py-4 px-6 rounded-xl min-h-56">
          <h1 className="mb-4">Jadwal Hari Ini</h1>

          <div className="overflow-auto mt-8">
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    colorPrimary: "#000",
                    headerColor: "#fff",
                    headerBg: "#000",
                    headerBorderRadius: 6,
                    algorithm: true,
                    // borderColor: "#000",
                  },
                  Pagination: {
                    colorPrimary: "#000",
                    colorPrimaryHover: "#000",
                    colorPrimaryBorder: "#000",
                    algorithm: true,
                  },
                },
              }}
            >
              <Table columns={columns} dataSource={dataKelas} />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KelasHariIniPage;
