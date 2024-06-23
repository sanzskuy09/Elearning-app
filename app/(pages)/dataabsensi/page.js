"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";

import { ConfigProvider, Pagination, Space, Table, Modal } from "antd";
const { confirm } = Modal;

import IconDetail from "@/public/Icons/icon_detail.svg";
import IconEdit from "@/public/Icons/icon_edit.svg";
import IconDelete from "@/public/Icons/icon-delete.svg";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { API, URL } from "@/config/api";

import { toastSuccess } from "@/utils/toastify";

// const options = [
//   {
//     name: "kelas",
//     label: "Kelas",
//     values: [
//       { value: "", label: "Pilih Kelas" },
//       { value: "SD", label: "SD" },
//       { value: "SMP", label: "SMP" },
//       { value: "SMA", label: "SMA" },
//     ],
//   },
//   {
//     name: "mapel",
//     label: "Mata Pelajaran",
//     values: [
//       { value: "", label: "Pilih Mapel" },
//       { value: "IPA", label: "IPA" },
//       { value: "IPS", label: "IPS" },
//     ],
//   },
// ];

const options = [];

const DataAbsensiPage = () => {
  const nama = localStorage.getItem("nama_panggilan");

  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Column 1",
      dataIndex: "address",
      key: "1",
    },
    {
      title: "Column 2",
      dataIndex: "address",
      key: "2",
    },
    {
      title: "Column 3",
      dataIndex: "address",
      key: "3",
    },

    {
      title: "Action",
      fixed: "right",
      align: "center",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Link href={`kelashariini/detail/SMP`}>
            <Image src={IconDetail} alt="" />
          </Link>
          {/* <Link href={`/absensi/detail?id=${record.id_jadwalkelas}`}>
            <Image src={IconDetail} alt="" />
          </Link> */}
        </Space>
      ),
    },
  ];

  const router = useRouter();
  const [data, setData] = useState("");
  const [dataKelas, setDataKelas] = useState([]);
  const [dataMapel, setDataMapel] = useState([]);

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // handle pagination
  const pageSize = 10;
  const start = (currentPage - 1) * pageSize;
  const end = currentPage * pageSize;

  const [filters, setFilters] = useState(
    options.length > 0
      ? Object.fromEntries(options.map((option) => [option.name, [""]]))
      : { kelas: ["", ""], mapel: ["", ""] }
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
    setLoading(true);
    try {
      const res = await fetch(
        `/api/relawan?mapel=${filters?.mapel[0]}&kelas=${
          filters?.kelas[1] == undefined ? "" : filters?.kelas[1]
        }`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      // console.log(data.data);

      setData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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

      if (options.length < 2) {
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

  const getDataMapel = async () => {
    try {
      const res = await API.get(`/mapel`);
      setDataMapel(res.data.data);

      const newOptions = res?.data?.data?.map((subject) => ({
        value: subject.name,
        label: subject.name,
        id: subject.id.toString(),
      }));

      if (options.length < 2) {
        options.push({
          name: "mapel",
          label: "Mata Pelajaran",
          values: [{ value: "", label: "Pilih Mata Pelajaran" }, ...newOptions],
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
    getDataMapel();
  }, []);

  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <div className="flex flex-col h-full">
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Data Absensi</h1>
        <h1>Hallo, Kak {nama}</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4">
        <div className="bg-white shadow-md col-span-2 rounded-lg">
          <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
            Menunggu Persetujuan
          </h1>

          <SearchBar
            value={value}
            setValue={setValue}
            filters={filters}
            setFilters={setFilters}
            options={options}
            // onSearch={getData}
            // handleSearch={handleSearchChange}
            // showButton={true}
            // text={"Tambah Relawan"}
            // onButtonClick={() => router.push("/kelolarelawan/tambah")}
          />

          <div className="py-4 px-6">
            {filters.kelas == "" || filters.mapel == "" ? (
              <p>
                Harap pilih <strong>Kelas</strong> dan{" "}
                <strong>Mata Pelajarannya</strong> terlebih dahulu.
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

export default DataAbsensiPage;
