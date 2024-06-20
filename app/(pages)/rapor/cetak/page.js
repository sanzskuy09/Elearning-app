"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { API, URL } from "@/config/api";

import Logo1svg from "@/public/Icons/logo-1.svg";
import Logo2svg from "@/public/Icons/logo-2.svg";

const MAX_HEIGHT = 1070;

const ContentChunk = ({ children }) => (
  <div className="w-[742px] h-[1070px] mx-auto bg-white px-[56px] py-[31px]">
    {children}
  </div>
);

const CetakRapor = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contentChunks, setContentChunks] = useState([]);

  const containerRef = useRef(null);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await API.get(`${URL.GET_RAPOR_BY_ID_MURID}/${id}`);
      const data = res.data.data;
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const childrenArray = Array.from(containerRef.current.children);
      const chunks = [];
      let currentChunk = [];
      let currentHeight = 0;

      childrenArray.forEach((child) => {
        const childHeight = child.offsetHeight;
        if (currentHeight + childHeight > MAX_HEIGHT) {
          chunks.push(currentChunk);
          currentChunk = [React.cloneElement(child)];
          currentHeight = childHeight;
        } else {
          currentChunk.push(React.cloneElement(child));
          currentHeight += childHeight;
        }
      });

      if (currentChunk.length > 0) {
        chunks.push(currentChunk);
      }

      setContentChunks(chunks);
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="py-6 w-full">
      <div ref={containerRef} className="hidden">
        {/* Static content */}
        <div className="flex justify-between items-center">
          <Image src={Logo1svg} alt="" />
          <div className="text-center">
            <h1 className="text-sm uppercase font-medium">
              Home Children Learning Center
            </h1>
            <p className="text-[10px] uppercase font-medium">
              Jl. Anggrek No.97, RT.001/RW.03, Cisalak Ps., Kec. Cimanggis, Kota
              Depok, Jawa Barat 16453
            </p>
          </div>
          <Image src={Logo2svg} alt="" />
        </div>

        <hr className="border-2 border-black rounded-xl my-4 bg-black" />

        <div>
          <table>
            <tbody>
              <tr>
                <td className="w-32">NAMA</td>
                <td className="w-8">:</td>
                <td>{data?.nama_lengkap}</td>
              </tr>
              <tr>
                <td className="w-32">KELAS</td>
                <td className="w-8">:</td>
                <td>{data?.kelas}</td>
              </tr>
              <tr>
                <td className="w-32">SEMESTER</td>
                <td className="w-8">:</td>
                <td>{data?.kelas}</td>
              </tr>
              <tr>
                <td className="w-32">WALI KELAS</td>
                <td className="w-8">:</td>
                <td>nanda</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h1 className="font-bold text-sm uppercase my-6">
            A. Penilaian Akademis
          </h1>

          <table className="w-full border-collapse border border-black text-sm">
            <thead>
              <tr>
                <th className="border border-black w-10">No.</th>
                <th className="border border-black w-40">Mata Pelajaran</th>
                <th className="border border-black w-16">Nilai</th>
                <th className="border border-black w-20">Predikat</th>
                <th className="border border-black">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {data?.rapor_detail?.map((item, index) => (
                <tr key={index} className="h-[65px]">
                  <td className="border border-black text-center">
                    {index + 1}.
                  </td>
                  <td className="border border-black text-center">
                    {item.mapel}
                  </td>
                  <td className="border border-black text-center">
                    {item.predikat.nilai}
                  </td>
                  <td className="border border-black text-center font-semibold">
                    {item.predikat.grade}
                  </td>
                  <td className="border border-black text-center">
                    {item.predikat.keterangan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h1 className="font-bold text-sm uppercase my-6">
            B. Keaktifan mengikuti kegiatan
          </h1>

          <table className="w-full border-collapse border border-black text-sm">
            <thead>
              <tr>
                <th className="border border-black w-10">No.</th>
                <th className="border border-black w-40">Nama Kegiatan</th>
                <th className="border border-black">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {data?.kegiatan?.map((item, index) => (
                <tr key={index} className="h-[65px]">
                  <td className="border border-black text-center">
                    {index + 1}.
                  </td>
                  <td className="border border-black text-center">
                    {item.name}
                  </td>
                  <td className="border border-black text-center">
                    {item.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {contentChunks.map((chunk, index) => (
        <ContentChunk key={index}>{chunk}</ContentChunk>
      ))}
    </div>
  );
};

export default CetakRapor;
