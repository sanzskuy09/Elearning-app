"use client";
import React, { Suspense, useEffect, useState } from "react";

import { ConfigProvider, Radio, Checkbox } from "antd";

import Image from "next/image";
import Link from "next/link";

import IconToga from "@/public/Icons/icon-toga.svg";
import IconDownload from "@/public/Icons/icon-download-2.svg";

import { API, URL } from "@/config/api";

const DetailAbsenPage = ({ params: { id } }) => {
  const nama = localStorage.getItem("nama_panggilan");

  // const { id } = params;
  // console.log(id);

  const colors = ["bg-red-300", "bg-blue-300", "bg-green-300"];

  const [data, setData] = useState();
  const [silabus, setSilabus] = useState([]);
  const [murid, setMurid] = useState([]);
  const [relawan, setRelawan] = useState([]);
  const [value, setValue] = useState(1);

  const getDataAbsen = async () => {
    try {
      const res = await fetch(`/api/absen/detail?id=${id}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setData(data.data);
      setSilabus(data.data.silabus);
      setMurid(data.data.murid);
      setRelawan(data.data.relawan);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataAbsen();
  }, []);

  // console.log(data);
  // console.log(silabus);
  // console.log(murid);

  return (
    <div>
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>
          Kelas {data?.kelas} - {data?.mapel}
        </h1>
        <h1>Hallo, Kak {nama}</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4">
        {/* Silabus */}
        <div className="">
          <div className="flex justify-between mb-3">
            <h4>Silabus</h4>
          </div>

          <div className="bg-[#D9D9D9] p-4 flex justify-between items-center rounded-md">
            <p>{silabus?.name}</p>

            <div className="flex gap-4">
              <ConfigProvider
                theme={{
                  token: {
                    borderRadiusSM: 4,
                    controlInteractiveSize: 24,
                    colorPrimary: "#0FA958",
                    colorPrimaryBorder: "#0FA958",
                  },
                }}
              >
                <Checkbox checked={silabus?.isChecked}></Checkbox>
              </ConfigProvider>

              {/* <button>
                <Image
                  src={IconDownload}
                  alt="img-button"
                  className="inline-block"
                  width={24}
                  height={24}
                />
              </button> */}
            </div>
          </div>
        </div>

        <div className="flex justify-start items-center gap-24">
          <h4 className="">Pengajar</h4>
          <div className="flex gap-2 p-1 bg-white shadow-sm flex-1 w-full rounded-md">
            {relawan.map((item, i) => (
              <p
                className={`p-1 px-3 font-medium rounded-md ${
                  colors[i % colors.length]
                }`}
                key={i}
              >
                {item.nama_lengkap}
              </p>
            ))}
          </div>
        </div>

        <div className="bg-white w-full min-h-[400px] shadow-xl rounded-lg">
          <table className="w-full ">
            <thead>
              <tr className="text-left bg-[#F7F7F7]">
                <th className="w-[80%] border-b border-slate-600 p-2 px-4">
                  Nama
                </th>
                <th className="border-b border-slate-600">Hadir</th>
                <th className="border-b border-slate-600">Alfa</th>
                <th className="border-b border-slate-600">Sakit</th>
                <th className="border-b border-slate-600">Izin</th>
              </tr>
            </thead>
            <tbody>
              {murid.map((student) => (
                <tr key={student.id}>
                  <td className="p-4  border-b border-gray-400">
                    {student.nama_lengkap}
                  </td>
                  <td className="border-b border-gray-400">
                    <Radio
                      disabled
                      value="hadir"
                      defaultChecked={true}
                      checked={student?.status === "Hadir"}
                    ></Radio>
                  </td>
                  <td className="border-b border-gray-400">
                    <Radio
                      disabled
                      value="alfa"
                      checked={student?.status === "Alfa"}
                    ></Radio>
                  </td>
                  <td className="border-b border-gray-400">
                    <Radio
                      disabled
                      value="sakit"
                      checked={student?.status === "Sakit"}
                    ></Radio>
                  </td>
                  <td className="border-b border-gray-400">
                    <Radio
                      disabled
                      value="izin"
                      checked={student?.status === "Izin"}
                    ></Radio>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 w-full justify-end">
          <Link href={`/rapor`}>
            <button className="bg-white rounded-md px-4 py-2 uppercase text-[#0FA958] flex items-center gap-2">
              <Image
                src={IconToga}
                alt="img-button"
                className="inline-block"
                width={24}
                height={24}
              />
              Beri Nilai
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailAbsenPage;
