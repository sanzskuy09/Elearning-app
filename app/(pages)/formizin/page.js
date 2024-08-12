"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  ConfigProvider,
  Pagination,
  Space,
  Table,
  Modal,
  Select,
  Input,
  DatePicker,
} from "antd";
const { Option } = Select;
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";

import IconDetail from "@/public/Icons/icon_detail.svg";
import IconEdit from "@/public/Icons/icon_edit.svg";
import IconDelete from "@/public/Icons/icon-delete.svg";

import { API, URL } from "@/config/api";

import dayjs from "dayjs";

import { toastSuccess, toastFailed } from "@/utils/toastify";
import ButtonAdd from "@/components/Button/ButtonAdd";

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
    {
      title: "Diterima",
      render: (_, record) =>
        !record.isAccept ? (
          <p className="bg-blue-400 w-fit px-2 py-1 rounded-lg text-white font-medium">
            Process
          </p>
        ) : (
          <p className="bg-green-500 w-fit px-2 py-1 rounded-lg text-white font-medium">
            Accepted
          </p>
        ),
    },
    {
      title: "Action",
      fixed: "right",
      align: "center",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => handleAccept(record.id)}>
            <Image src={IconEdit} alt="" />
          </button>

          <button onClick={() => handleDelete(record.id)}>
            <Image src={IconDelete} alt="" />
          </button>
        </Space>
      ),
    },
  ];

  const dateFormat = "DD-MM-YYYY";

  const nama = localStorage.getItem("nama_panggilan");

  const router = useRouter();
  const [data, setData] = useState("");
  const [mapel, setMapel] = useState([]);
  const [selectedMapel, setSelectedMapel] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

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

  const getData = async () => {
    setLoading(true);
    try {
      const res = await API.get(URL.GET_FORM_IZIN);
      const data = res.data.data;
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = async (mapelValue, dateValue) => {
    try {
      if (mapelValue || dateValue) {
        const res = await API.get(
          `${URL.GET_FORM_IZIN}?id_mapel=${mapelValue}&tgl_izin=${dateValue}`
        );
        setData(res.data.data);
      } else {
        const res = await API.get(URL.GET_FORM_IZIN);
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching filtered data: ", error);
    }
  };

  const handleMapelChange = (value) => {
    setSelectedMapel(value);
    handleChange(value, selectedDate);
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    handleChange(selectedMapel, dateString);
  };

  const getDataMapel = async () => {
    try {
      const res = await API.get(`/mapel`);
      const newOptions = res?.data?.data?.map((subject) => ({
        value: subject.name,
        label: subject.name,
        id: subject.id.toString(),
      }));

      setMapel((e) => {
        return [
          { value: "", label: "Pilih Mata Pelajaran", id: "" },
          ...newOptions,
        ];
      });
    } catch (error) {
      console.error(error);
    }
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
          await API.delete(`${URL.GET_FORM_IZIN}/${e}`);
          await getData();

          toastSuccess(`Form Berhasil dihapus`);

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

  const handleAccept = async (e) => {
    confirm({
      title: "Kamu yakin ingin terima data ini?",
      icon: <ExclamationCircleFilled />,
      centered: true,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          setLoading(true);

          await API.put(`${URL.ACC_FORM_IZIN}/${e}`);
          await getData();

          toastSuccess("Form izin telah diterima");
          setLoading(false);
        } catch (error) {
          console.log(error);
          toastFailed("Operasi Gagal dilakukan");
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  useEffect(() => {
    const bounceTimer = setTimeout(() => {
      // console.log("Value changed:", value);
    }, 1000);

    return () => clearTimeout(bounceTimer);
  }, [value]);

  useEffect(() => {
    getData();
    getDataMapel();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Form Izin</h1>
        <h1>Hallo, Kak {nama}</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4">
        <div className="bg-white shadow-md col-span-2 rounded-lg">
          <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
            Daftar Izin Relawan
          </h1>

          <div className={`py-4 px-6 flex justify-between items-center gap-8`}>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <label htmlFor="">Tanggal</label>
                <DatePicker
                  required
                  format={dateFormat}
                  className="my-2 w-full"
                  placeholder="Pilih Tanggal"
                  onChange={handleDateChange}
                />
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="">Mata Pelajaran</label>
                <Select
                  // value={f}
                  onChange={handleMapelChange}
                  defaultValue=""
                  style={{ width: 200 }}
                  allowClear
                  placeholder="Pilih Mata Pelajaran"
                >
                  {mapel.map((e, i) => (
                    <Option key={e.id} value={e.id}>
                      {e.label}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <ButtonAdd
                text={"Tambah Form"}
                onChange={() => router.push("/formizin/tambah")}
              />
            </div>
          </div>

          <hr className="my-2 border-gray-400" />

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
