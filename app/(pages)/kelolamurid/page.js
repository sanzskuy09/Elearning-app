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

import SearchBar from "@/components/SearchBar";

import { toastSuccess } from "@/utils/toastify";

const options = [
  {
    name: "kategori",
    label: "Kategori Kelompok Rentan",
    values: [
      { value: "", label: "Semua" },
      { value: "Umum", label: "Umum" },
      {
        value: "Disabilitas (Fisik/Mental)",
        label: "Disabilitas (Fisik/Mental)",
      },
      { value: "Anak-anak", label: "Anak-anak" },
      { value: "Ibu Hamil/Menyusui", label: "Ibu Hamil/Menyusui" },
      { value: "Manula", label: "Manula" },
      { value: "Anak Yatim", label: "Anak Yatim" },
      { value: "Kelompok Marginal", label: "Kelompok Marginal" },
      { value: "Dhuafa", label: "Dhuafa" },
      {
        value: "Pengungsi/Penyintas Bencana",
        label: "Pengungsi/Penyintas Bencana",
      },
    ],
  },
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

// const options = [];

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
          <Link href={`/kelolamurid/detail?id=${record.id}`}>
            <Image src={IconDetail} alt="" />
          </Link>

          <Link href={`/kelolamurid/detail?id=${record.id}&update=true`}>
            <Image src={IconEdit} alt="" />
          </Link>

          <button onClick={() => handleDelete(record.id)}>
            <Image src={IconDelete} alt="" />
          </button>
        </Space>
      ),
    },
  ];

  const nama = localStorage.getItem("nama_panggilan");

  const router = useRouter();
  const [data, setData] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // handle pagination
  const pageSize = 10;
  const start = (currentPage - 1) * pageSize;
  const end = currentPage * pageSize;

  // const handleLoadingChange = (enable) => {
  //   setLoading(enable);
  // };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  // filter data
  const [filters, setFilters] = useState(
    Object.fromEntries(options.map((option) => [option.name, ""]))
  );

  const handleSearchChange = (e) => {
    setValue(e.target.value);
  };

  // handle delete data
  const handleDelete = async (e) => {
    confirm({
      title: "Kamu yakin ingin menghapus data ini?",
      icon: <ExclamationCircleFilled />,
      centered: true,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          setLoading(true);
          await API.delete(`${URL.GET_MURID}/${e}`);
          await getData();

          toastSuccess(`Murid Berhasil dihapus`);

          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/murid?kategori=${filters?.kategori}&kelas=${filters?.kelas}`,
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
      console.log(error);
      setLoading(false);
    }
  };

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
        <h1>Kelola Murid</h1>
        <h1>Hallo, Kak {nama}</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4">
        <div className="bg-white shadow-md col-span-2 rounded-lg">
          <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
            Data Murid
          </h1>

          <SearchBar
            value={value}
            setValue={setValue}
            filters={filters}
            setFilters={setFilters}
            options={options}
            onSearch={getData}
            handleSearch={handleSearchChange}
            showButton={true}
            text={"Tambah Murid"}
            onButtonClick={() => router.push("/kelolamurid/tambah")}
            widthSelect={200}
          />

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default KelolaMuridPage;
