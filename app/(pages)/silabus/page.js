"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button, Form, Select, Input, Checkbox, ConfigProvider } from "antd";
const { Search } = Input;

import { SearchOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";

import ButtonAdd from "@/components/Button/ButtonAdd";
import SearchBar from "@/components/SearchBar";

import IconDetele from "@/public/Icons/icon-delete.svg";
import IconEdit from "@/public/Icons/icon_edit.svg";
import IconDownload from "@/public/Icons/icon-download.svg";
import Link from "next/link";

const options = [
  {
    name: "kelas",
    label: "Kelas",
    values: [
      { value: "", label: "Pilih Kelas" },
      { value: "1 & 2 SD", label: "1 & 2 SD", id: "1" },
      { value: "3 & 4 SD", label: "3 & 4 SD", id: "2" },
      { value: "5 SD", label: "5 SD", id: "3" },
      { value: "6 SD", label: "6 SD", id: "4" },
    ],
  },
  {
    name: "mapel",
    label: "Mata Pelajaran",
    values: [
      { value: "", label: "Pilih Mata Pelajaran" },
      { value: "Baca Tulis", label: "Baca Tulis", id: "1" },
      { value: "Matematika", label: "Matematika", id: "2" },
      { value: "Bahasa Inggris", label: "Bahasa Inggris", id: "3" },
      { value: "Pendidikan Karakter", label: "Pendidikan Karakter", id: "4" },
      { value: "Kreasi", label: "Kreasi", id: "5" },
    ],
  },
];

const SilabusPage = () => {
  const router = useRouter();

  const [data, setData] = useState("");

  const [checked, setChecked] = useState(true);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // handle pagination
  const pageSize = 10;
  const start = (currentPage - 1) * pageSize;
  const end = currentPage * pageSize;

  const [filters, setFilters] = useState(
    Object.fromEntries(options.map((option) => [option.name, [""]]))
  );

  // console.log(filters.kelas[0]);

  const handleSearchChange = (e) => {
    setValue(e.target.value);
  };

  const handleLoadingChange = (enable) => {
    setLoading(enable);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const onChange = (e) => {
    // console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
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
          await API.delete(`${URL.GET_RELAWAN}/${e}`);
          await getData();

          toastSuccess(`Relawan Berhasil dihapus`);

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
        `/api/relawan?mapel=${filters?.mapel}&kelas=${filters?.kelas}`,
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
        <h1>Kelola Silabus</h1>
        <h1>Hallo, Kak Nanda</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4 ">
        <div className="bg-white shadow-md col-span-2 rounded-lg ">
          <h1 className="mb-0 font-bold text-2xl bg-[#D9D9D9] py-4 px-6 overflow-hidden rounded-t-lg">
            Silabus Pembelajaran
          </h1>

          <SearchBar
            value={value}
            setValue={setValue}
            filters={filters}
            setFilters={setFilters}
            options={options}
            // onSearch={handleGetId}
            handleSearch={handleSearchChange}
          />

          <div className="py-4 px-6">
            {filters.kelas[0] == "" || filters.mapel[0] == "" ? (
              <p>
                Harap pilih <strong>Kelas</strong> dan{" "}
                <strong>Mata Pelajarannya</strong> terlebih dahulu.
              </p>
            ) : (
              <>
                <h1 className="font-bold text-2xl">
                  {filters.mapel[0]} - {filters.kelas[0]}
                </h1>

                {/* silabus list */}
                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex gap-4 items-center">
                    <Checkbox checked={checked} onChange={onChange} />

                    <div className="flex-1 px-4 py-1 border border-black rounded-md">
                      <p className="text-sm">
                        Menjelaskan dan menentukan urutan bilangan bulat
                        (negatif - positif) dan pecahan
                      </p>
                    </div>

                    <div className="flex gap-4 ml-8">
                      <button>
                        <Image src={IconDownload} alt="" />
                      </button>
                      <Link href={`/silabus/editsilabus?id=1`}>
                        <Image src={IconEdit} alt="" />
                      </Link>
                      <button>
                        <Image src={IconDetele} alt="" />
                      </button>
                    </div>
                  </div>

                  {/* conoth stat */}
                  <div className="flex gap-4 items-center">
                    <Checkbox checked={checked} onChange={onChange} />

                    <div className="flex-1 px-4 py-1 border border-black rounded-md">
                      <p className="text-sm">
                        Menjelaskan dan menentukan urutan bilangan bulat
                        (negatif - positif) dan pecahan
                      </p>
                    </div>

                    <div className="flex gap-4 ml-8">
                      <button>
                        <Image src={IconDownload} alt="" />
                      </button>
                      <Link href={`/silabus/editsilabus?id=1`}>
                        <Image src={IconEdit} alt="" />
                      </Link>
                      <button>
                        <Image src={IconDetele} alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Checkbox checked={checked} onChange={onChange} />

                    <div className="flex-1 px-4 py-1 border border-black rounded-md">
                      <p className="text-sm">
                        Menjelaskan dan menentukan urutan bilangan bulat
                        (negatif - positif) dan pecahan
                      </p>
                    </div>

                    <div className="flex gap-4 ml-8">
                      <button>
                        <Image src={IconDownload} alt="" />
                      </button>
                      <Link href={`/silabus/editsilabus?id=1`}>
                        <Image src={IconEdit} alt="" />
                      </Link>
                      <button>
                        <Image src={IconDetele} alt="" />
                      </button>
                    </div>
                  </div>
                  {/* conoth end */}
                </div>

                <div className="flex gap-4 w-full justify-end mt-8">
                  <ButtonAdd
                    text="Tambah Silabus"
                    onChange={
                      () =>
                        router.push(
                          `/silabus/tambahsilabus?kelas=${filters.kelas[1]}&mapel=${filters.mapel[1]}`
                        )
                      // router.push(
                      //   `/silabus/tambahsilabus?kelas=${encodeURIComponent(
                      //     filters.kelas
                      //   )}&mapel=${encodeURIComponent(filters.mapel)}`
                      // )
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SilabusPage;
