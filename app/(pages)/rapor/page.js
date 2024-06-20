"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { ConfigProvider, Pagination, Space, Table } from "antd";

import IconDetail from "@/public/Icons/icon_detail.svg";
import IconEdit from "@/public/Icons/icon_edit.svg";
import IconDownload from "@/public/Icons/icon-download.svg";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { API } from "@/config/api";

const options = [];

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
    width: 150,
  },
  {
    title: "NIK",
    dataIndex: "nik",
    key: "nik",
    width: 170,
  },
  {
    title: "Jenis Kelamin",
    dataIndex: "jkelamin",
    key: "jkelamin",
    width: 150,
  },
  {
    title: "Nama Orang Tua",
    dataIndex: "nama_ortu",
    key: "nama_ortu",
    width: 150,
  },
  {
    title: "No. Handphone Wali",
    dataIndex: "no_hp_ortu",
    key: "no_hp_ortu",
    width: 150,
  },
  {
    title: "Kelas",
    dataIndex: "kelas",
    key: "kelas",
    render: (_, record) => (
      <p className="bg-red-400 w-fit px-2 py-1 rounded-lg text-white font-medium">
        {record.kelas.name}
      </p>
    ),
    width: 150,
  },
  {
    title: "Kategori",
    dataIndex: "kategori",
    key: "kategori",
    render: (_, record) => (
      <p className="bg-blue-400 w-fit px-2 py-1 rounded-lg text-white font-medium">
        {record.kategori.name}
      </p>
    ),
    width: 150,
  },
  {
    title: "Alamat",
    render: (_, record) => (
      <p>
        {record.alamat} Kel.{record.kelurahan} Kec.{record.kecamatan} kota.
        {record.kota} Prov.{record.provinsi}
      </p>
    ),
    width: 250,
  },

  {
    title: "Action",
    fixed: "right",
    align: "center",
    width: 150,
    render: (_, record) => (
      <Space size="middle">
        <Link href={`/rapor/cetak-rapor?id=${record.id}`}>
          <Image src={IconDetail} alt="" />
        </Link>

        <Link
          href={`/rapor/detail?id=${record.id}&id_kelas=${record.kelas.id}`}
        >
          <Image src={IconDetail} alt="" />
        </Link>

        <Link
          href={`/rapor/tambah?id=${record.id}&id_kelas=${record.kelas.id}&update=true`}
        >
          <Image src={IconEdit} alt="" />
        </Link>

        <Link href="">
          <Image src={IconDownload} alt="" />
        </Link>
      </Space>
    ),
  },
];

const RaporPage = () => {
  const nama = localStorage.getItem("nama_panggilan");

  // const router = useRouter();
  const [data, setData] = useState("");
  const [dataKelas, setDataKelas] = useState([]);

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

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/murid?kategori=&kelas=${filters?.kelas[1]}`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setData(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getDataKelas = async () => {
    try {
      const res = await API.get(`/kelas`);
      setDataKelas(res.data.data);

      const newOptions = res?.data?.data?.map((subject) => ({
        value: subject.name,
        label: subject.name,
        id: subject.id.toString(),
      }));

      if (options.length === 0) {
        options.push({
          name: "kelas",
          label: "Kelas",
          values: [{ value: "", label: "Pilih Kelas" }, ...newOptions],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const bounceTimer = setTimeout(() => {
      // console.log("Value changed:", value);
    }, 1000);

    return () => clearTimeout(bounceTimer);
  }, [value]);

  useEffect(() => {
    getDataKelas();
  }, []);

  useEffect(() => {
    getData();
  }, [filters]);

  // console.log(data, ">> data");

  return (
    <div className="flex flex-col h-full">
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Rapor Murid</h1>
        <h1>Hallo, Kak {nama}</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4">
        <div className="bg-white shadow-md col-span-2 rounded-lg">
          <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
            Rapor Murid
          </h1>

          <SearchBar
            value={value}
            setValue={setValue}
            filters={filters}
            setFilters={setFilters}
            options={options}
            // onSearch={() => console.log(filters)}
            // handleSearch={handleSearchChange}
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

export default RaporPage;
