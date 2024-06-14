"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";

import { ConfigProvider, Pagination, Space, Table, Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";

import IconDetail from "@/public/Icons/icon_detail.svg";
import IconEdit from "@/public/Icons/icon_edit.svg";
import IconDelete from "@/public/Icons/icon-delete.svg";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { API, URL } from "@/config/api";

const options = [];

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
      width: 250,
    },
    {
      title: "Kelas",
      dataIndex: "kelas",
      key: "kelas",
      width: 150,
    },
    {
      title: "Hari",
      dataIndex: "hari",
      key: "hari",
      width: 100,
    },
    {
      title: "Jam Pelajaran",
      dataIndex: "jam_mapel",
      key: "jam_mapel",
      width: 150,
    },
    {
      title: "Relawan",
      render: (_, record) => (
        <ul className="flex gap-2 flex-wrap">
          {record.relawan.map((item, index) => (
            <li
              key={index}
              className="bg-red-400 w-fit px-2 py-1 rounded-lg text-white font-medium whitespace-nowrap"
            >
              {item.nama_lengkap}
            </li>
          ))}
        </ul>
      ),
      width: 300,
    },
    {
      title: "Action",
      fixed: "right",
      align: "center",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/jadwalkelas/detail?id=${record.id}`}>
            <Image src={IconDetail} alt="" />
          </Link>

          <Link href={`/jadwalkelas/detail?id=${record.id}&update=true`}>
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
  const [dataKelas, setDataKelas] = useState([]);
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
      : { kelas: [""] }
  );

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setValue(e.target.value);
  };

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
          await API.delete(`${URL.GET_JADWAL}/${e}`);
          await getData();

          toastSuccess(`Jadwal Berhasil dihapus`);

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
      const res = await fetch(`/api/jadwal?hari=&kelas=${filters?.kelas[1]}`, {
        method: "GET",
      });

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

  // console.log(dataKelas, " >> data kelas");
  console.log(filters, " >> filters");

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

  // console.log(options);
  // console.log(filters);

  return (
    <div className="flex flex-col h-full">
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Jadwal Kelas</h1>
        <h1>Hallo, Kak {nama}</h1>
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
            // onSearch={getData}
            // onSearch={() => console.log(filters)}
            // handleSearch={handleSearchChange}
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
