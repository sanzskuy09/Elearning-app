"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ConfigProvider, Pagination, Space, Table, Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";

import IconDetail from "@/public/Icons/icon_detail.svg";
import IconEdit from "@/public/Icons/icon_edit.svg";
import IconDelete from "@/public/Icons/icon-delete.svg";

import { API, URL } from "@/config/api";

import dayjs from "dayjs";

import SearchBar from "@/components/SearchBar";

import { toastSuccess } from "@/utils/toastify";

const options = [];

const KelolaMuridPage = () => {
  const columns = [
    {
      title: "No.",
      key: "index",
      render: (value, item, index) => index + 1,
      width: 70,
    },
    {
      title: "Nama Lengkap",
      dataIndex: "nama_lengkap",
      key: "nama_lengkap",
    },
    {
      title: "Tanggal",
      render: (_, record) => (
        <p>{dayjs(record.tanggal).format("DD-MM-YYYY")}</p>
      ),
    },
    {
      title: "Hari",
      dataIndex: "hari",
      key: "hari",
      width: 100,
    },
    {
      title: "Kelas / Mata Pelajaran",
      render: (_, record) => (
        <p className="bg-red-400 w-fit px-2 py-1 rounded-lg text-white font-medium">
          {record.kelas} / {record.mapel}
        </p>
      ),
    },
    {
      title: "Jam Pelajaran",
      dataIndex: "jam_mapel",
      key: "jam_mapel",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
    {
      title: "keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      render: (text) => <p>{text ? text : "-"}</p>,
    },
  ];

  const nama = localStorage.getItem("nama_panggilan");

  const router = useRouter();
  const [data, setData] = useState("");
  const [dataKelas, setDataKelas] = useState([]);
  const [dataKategori, setDataKategori] = useState([]);

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // handle pagination
  const pageSize = 10;
  const start = (currentPage - 1) * pageSize;
  const end = currentPage * pageSize;

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  // filter data
  const [filters, setFilters] = useState(
    options.length > 0
      ? Object.fromEntries(options.map((option) => [option.name, [""]]))
      : { kelas: ["", ""], kategori: ["", ""] }
  );

  const handleSearchChange = (e) => {
    setValue(e.target.value);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await API.get(URL.GET_LOGS);
      const data = res.data.data;
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(data);

  useEffect(() => {
    const bounceTimer = setTimeout(() => {
      // console.log("Value changed:", value);
    }, 1000);

    return () => clearTimeout(bounceTimer);
  }, [value]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Logs</h1>
        <h1>Hallo, Kak {nama}</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4">
        <div className="bg-white shadow-md col-span-2 rounded-lg">
          <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
            Data Logs Relawan
          </h1>

          {/* <SearchBar
            value={value}
            setValue={setValue}
            filters={filters}
            setFilters={setFilters}
            options={options}
            // onSearch={getData}
            handleSearch={handleSearchChange}
            showButton={true}
            text={"Tambah Murid"}
            onButtonClick={() => router.push("/kelolamurid/tambah")}
            widthSelect={200}
          /> */}

          <div className="py-4 px-6">
            <div className="overflow-auto shadow-md rounded-md">
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
                <Table
                  loading={loading}
                  columns={columns}
                  dataSource={data?.slice(start, end)}
                  pagination={false}
                  scroll={{
                    x: 1300,
                  }}
                />
                <Pagination
                  total={data?.length}
                  current={currentPage}
                  pageSize={pageSize}
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                  }
                  onChange={handleChangePage}
                  showSizeChanger={false}
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    marginRight: "20px",
                    textAlign: "right",
                  }}
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KelolaMuridPage;
