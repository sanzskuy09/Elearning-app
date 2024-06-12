"use client";

import TableDashboard from "@/components/TableDashboard";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { dataUpcomingClass, dataRelawan, dataKelas } from "../dashboard/data";

import { ConfigProvider, Space, Table, Modal } from "antd";
import { API, URL } from "@/config/api";
const { confirm } = Modal;

const KelasHariIniPage = () => {
  const nama = localStorage.getItem("nama_panggilan");
  const id_relawan = localStorage.getItem("id_relawan");

  const router = useRouter();

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Jam Pelajaran",
      dataIndex: "jam_mapel",
      key: "jam_mapel",
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
            onClick={() =>
              router.push(`/kelashariini/detail/${record.id_jadwal}`)
            }
            className="bg-blue-500 px-2 rounded-md font-medium text-white"
          >
            Mulai
          </button>
        </Space>
      ),
    },
  ];

  const [jadwal, setJadwal] = useState([]);

  const getDataJadwal = async () => {
    try {
      const res = await API.get(`${URL.JADWAL_RELAWAN}/${id_relawan}`);

      const data = res.data.data;
      setJadwal(data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(jadwal);

  useEffect(() => {
    getDataJadwal();
  }, []);

  return (
    <div>
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Kelas Hari Ini</h1>
        <h1>Hallo, Kak {nama}</h1>
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
              <Table columns={columns} dataSource={jadwal} />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KelasHariIniPage;
