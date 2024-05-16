"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { ConfigProvider, Pagination, Space, Table } from "antd";

import IconDetail from "@/public/Icons/icon_detail.svg";
import IconEdit from "@/public/Icons/icon_edit.svg";
import IconDelete from "@/public/Icons/icon-delete.svg";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const options = [
  {
    name: "kelas",
    label: "Kelas",
    values: [
      { value: "", label: "Semua" },
      { value: "1 & 2 SD", label: "1 & 2 SD" },
      { value: "3 & 4 SD", label: "3 & 4 SD" },
      { value: "5 SD", label: "5 SD" },
      { value: "6 SD", label: "6 SD" },
    ],
  },
];

const JadwalKelasPage = () => {
  const columns = [
    {
      title: "No.",
      key: "index",
      render: (value, item, index) => index + 1,
      width: 70,
    },
    {
      title: "Mata Pelajaran",
      dataIndex: "mapel",
      key: "mapel",
    },
    {
      title: "Kelas",
      dataIndex: "kelas",
      key: "kelas",
    },
    {
      title: "Hari",
      dataIndex: "hari",
      key: "hari",
    },
    {
      title: "Jam Pelajaran",
      dataIndex: "jam_pelajaran",
      key: "jam_pelajaran",
    },
    {
      title: "Relawan",
      dataIndex: "relawan",
      key: "relawan",
    },
    {
      title: "Action",
      fixed: "right",
      align: "center",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/jadwalkelas/detail?id=${record.id_jadwalkelas}`}>
            <Image src={IconDetail} alt="" />
          </Link>

          <Link
            href={`/jadwalkelas/detail?id=${record.id_jadwalkelas}&update=true`}
          >
            <Image src={IconEdit} alt="" />
          </Link>

          <button onClick={() => handleDelete(record.id_jadwalkelas)}>
            <Image src={IconDelete} alt="" />
          </button>
        </Space>
      ),
    },
  ];

  const router = useRouter();
  const [data, setdata] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // handle pagination
  const pageSize = 10;
  const start = (currentPage - 1) * pageSize;
  const end = currentPage * pageSize;

  const [filters, setFilters] = useState(
    Object.fromEntries(options.map((option) => [option.name, ""]))
  );

  const handleSearchChange = (e) => {
    setValue(e.target.value);
  };

  const handleLoadingChange = (enable) => {
    setLoading(enable);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const bounceTimer = setTimeout(() => {
      // console.log("Value changed:", value);
    }, 1000);

    return () => clearTimeout(bounceTimer);
  }, [value]);

  return (
    <div className="flex flex-col h-full">
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Jadwal Kelas</h1>
        <h1>Hallo, Kak Nanda</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4">
        <div className="bg-white shadow-md col-span-2 rounded-lg">
          <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
            Jadwal Kelas
          </h1>

          <SearchBar
            value={value}
            setValue={setValue}
            filters={filters}
            setFilters={setFilters}
            options={options}
            // onSearch={() => console.log(filters)}
            handleSearch={handleSearchChange}
            showButton={true}
            text={"Buat Jadwal"}
            onButtonClick={() => router.push("/jadwalkelas/tambahjadwal")}
          />

          <div className="py-4 px-6">
            {filters.kelas == "" ? (
              <p>
                Harap pilih <strong>Kelas</strong> terlebih dahulu.
              </p>
            ) : (
              <>
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
                      dataSource={data.slice(start, end)}
                      pagination={false}
                      scroll={{
                        x: 1300,
                      }}
                    />
                    <Pagination
                      total={data.length}
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JadwalKelasPage;
