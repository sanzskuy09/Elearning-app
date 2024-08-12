"use client";
import React, { Suspense, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

import { API, URL } from "@/config/api";

// import Logo1 from "@/public/Icons/icon_logo_1.png";
import Logo1svg from "@/public/Icons/logo-1.svg";
import Logo2svg from "@/public/Icons/logo-2.svg";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CetakRapor = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const id_kelas = searchParams.get("id_kelas");

  const [data, setData] = useState([]);
  const [totalAbsen, setTotalAbsen] = useState();
  const [loading, setLoading] = useState(true);

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

  const getTotalAbsenMurid = async () => {
    try {
      setLoading(true);

      const res = await API.get(`${URL.TOTAL_ABSEN_SISWA}/${id}`);

      const data = res.data.data;

      setTotalAbsen(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    getTotalAbsenMurid();
  }, []);

  // console.log(data, " >> data");

  const downloadPDF = () => {
    const capture = document.querySelector(".rapor");
    const capture1 = document.querySelector(".rapor1");

    const options = {
      scale: 2, // Increase the scale for higher resolution
    };

    html2canvas(capture, options).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", "a4");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Capture the second element and add to a new page
      html2canvas(capture1, options).then((canvas2) => {
        const imgData2 = canvas2.toDataURL("image/png");
        pdf.addPage();
        const imgProps2 = pdf.getImageProperties(imgData2);
        const pdfHeight2 = (imgProps2.height * pdfWidth) / imgProps2.width;

        pdf.addImage(imgData2, "PNG", 0, 0, pdfWidth, pdfHeight2);
        pdf.save(`Rapor-${data?.nama_lengkap}.pdf`);
      });
    });
  };

  return (
    <div className="py-6 w-full flex flex-col gap-8 items-center">
      {loading ? (
        <>
          <p>Mohon Tunggu...</p>
        </>
      ) : (
        <>
          {data == "" ? (
            <>
              <p>Data Rapor Masih Kosong. Silahkan buat terlebih dahulu!</p>
              <Link
                href={`/rapor/tambah?id=${id}&id_kelas=${id_kelas}`}
                className="font-semibold text-lg underline"
              >
                Buat Rapor
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={downloadPDF}
                className="bg-primary p-2 rounded-md text-white font-semibold"
              >
                Download PDF
              </button>
              {/* lembar 1 */}
              <div className="w-[742px] h-[1070px] mx-auto bg-white px-[56px] py-[31px] rapor">
                <div className="flex justify-between items-center">
                  <Image src={Logo1svg} alt="" />
                  <div className="text-center">
                    <h1 className="text-sm uppercase font-medium">
                      Home Children Learning Center
                    </h1>
                    <p className="text-[10px] uppercase font-medium">
                      Jl. Anggrek No.97, RT.001/RW.03, Cisalak Ps., Kec.
                      Cimanggis, Kota Depok, Jawa Barat 16453
                    </p>
                  </div>
                  <Image src={Logo2svg} alt="" />
                </div>

                <hr class="border-2 border-black rounded-xl my-4 bg-black" />

                <div>
                  <table>
                    <tbody>
                      <tr>
                        <td className="w-32">NAMA</td>
                        <td className="w-8">:</td>
                        <td className="capitalize">{data?.nama_lengkap}</td>
                      </tr>
                      <tr>
                        <td className="w-32">KELAS</td>
                        <td className="w-8">:</td>
                        <td>{data?.kelas}</td>
                      </tr>
                      <tr>
                        <td className="w-32">SEMESTER</td>
                        <td className="w-8">:</td>
                        <td className="capitalize">{data?.semester}</td>
                      </tr>
                      <tr>
                        <td className="w-32">WALI KELAS</td>
                        <td className="w-8">:</td>
                        <td>{data?.walikelas}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Penilaian akademis */}
                <div>
                  <h1 className="font-bold text-sm uppercase my-6">
                    A. Penilaian Akademis
                  </h1>

                  <table className="w-full border-collapse border border-black text-sm">
                    <thead>
                      <tr>
                        <th className="border border-black w-10 pb-4">No.</th>
                        <th className="border border-black w-40 pb-4">
                          Mata Pelajaran
                        </th>
                        <th className="border border-black w-16 pb-4">Nilai</th>
                        <th className="border border-black w-20 pb-4">
                          Predikat
                        </th>
                        <th className="border border-black pb-4">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.rapor_detail?.map((item, index) => (
                        <tr key={index} className="h-[65px]">
                          <td className="border border-black text-center pb-4">
                            {index + 1}.
                          </td>
                          <td className="border border-black text-center pb-4">
                            {item.mapel}
                          </td>
                          <td className="border border-black text-center pb-4">
                            {item.predikat.nilai}
                          </td>
                          <td className="border border-black text-center font-semibold pb-4">
                            {item.predikat.grade}
                          </td>
                          <td className="border border-black text-center pb-4">
                            {item.predikat.keterangan}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* B. Keaktifan mengikuti kegiatan */}
                <div>
                  <h1 className="font-bold text-sm uppercase my-6">
                    B. Keaktifan mengikuti kegiatan
                  </h1>

                  <table className="w-full border-collapse border border-black text-sm">
                    <thead>
                      <tr>
                        <th className="border border-black w-10 pb-4">No.</th>
                        <th className="border border-black w-40 pb-4">
                          Nama Kegiatan
                        </th>
                        <th className="border border-black pb-4">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.kegiatan?.length > 0 ? (
                        data?.kegiatan?.map((item, index) => (
                          <tr key={index} className="h-[65px]">
                            <td className="border border-black text-center pb-4">
                              {index + 1}.
                            </td>
                            <td className="border border-black text-center pb-4">
                              {item.name}
                            </td>
                            <td className="border border-black text-center pb-4">
                              {item.desc}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="h-20">
                          <td colSpan={4} className="text-center">
                            Tidak Ada Kegiatan
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* lembar 2 */}
              <div className="w-[742px] h-[1070px] mx-auto bg-white px-[56px] py-[31px] rapor1">
                <div className="flex justify-between items-center">
                  <Image src={Logo1svg} alt="" />
                  <div className="text-center">
                    <h1 className="text-sm uppercase font-medium">
                      Home Children Learning Center
                    </h1>
                    <p className="text-[10px] uppercase font-medium">
                      Jl. Anggrek No.97, RT.001/RW.03, Cisalak Ps., Kec.
                      Cimanggis, Kota Depok, Jawa Barat 16453
                    </p>
                  </div>
                  <Image src={Logo2svg} alt="" />
                </div>

                <hr class="border-2 border-black rounded-xl my-4 bg-black" />

                {/* C. Prestasi Membanggakan */}
                <div>
                  <h1 className="font-bold text-sm uppercase my-6">
                    C. Prestasi Membanggakan
                  </h1>

                  <table className="w-full border-collapse border border-black text-sm">
                    <thead>
                      <tr>
                        <th className="border border-black w-10 pb-4">No.</th>
                        <th className="border border-black w-40 pb-4">
                          Nama Kegiatan
                        </th>
                        <th className="border border-black w-36 pb-4">
                          Tingkat Prestasi
                        </th>
                        <th className="border border-black pb-4">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.lomba?.length > 0 ? (
                        data?.lomba?.map((item, index) => (
                          <tr key={index} className="h-[65px]">
                            <td className="border border-black text-center pb-4">
                              {index + 1}.
                            </td>
                            <td className="border border-black text-center pb-4">
                              {item.name}
                            </td>
                            <td className="border border-black text-center pb-4">
                              {item.tingkat_prestasi}
                            </td>
                            <td className="border border-black text-center pb-4">
                              {item.desc}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="h-20">
                          <td colSpan={4} className="text-center">
                            Tidak Ada Lomba
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* D. Ketidakhadiran */}
                <div>
                  <h1 className="font-bold text-sm uppercase my-6">
                    D. Ketidakhadiran
                  </h1>

                  <table className="w-full border-collapse border border-black text-sm">
                    <tbody>
                      <tr>
                        <td className="border border-black w-[12.5rem] font-medium px-2 pb-4">
                          Hadir
                        </td>
                        <td className="border border-black text-center font-medium pb-4">
                          {totalAbsen?.Hadir || 0}
                        </td>
                        <td className="border border-black font-medium px-2 pb-4">
                          Hari
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black w-[12.5rem] font-medium px-2 pb-4">
                          Izin
                        </td>
                        <td className="border border-black text-center font-medium pb-4">
                          {totalAbsen?.Izin || 0}
                        </td>
                        <td className="border border-black font-medium px-2 pb-4">
                          Hari
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black w-[12.5rem] font-medium px-2 pb-4">
                          Sakit
                        </td>
                        <td className="border border-black text-center font-medium pb-4">
                          {totalAbsen?.Sakit || 0}
                        </td>
                        <td className="border border-black font-medium px-2 pb-4">
                          Hari
                        </td>
                      </tr>{" "}
                      <tr>
                        <td className="border border-black w-[12.5rem] font-medium px-2 pb-4">
                          Alfa
                        </td>
                        <td className="border border-black text-center font-medium pb-4">
                          {totalAbsen?.Alfa || 0}
                        </td>
                        <td className="border border-black font-medium px-2 pb-4">
                          Hari
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Catatan wali kelas */}
                <div className="mt-6">
                  <table className="w-full border-collapse border border-black text-sm">
                    <thead>
                      <tr>
                        <th className="border border-black w-10 uppercase text-start px-2 pb-4">
                          Catatan wali kelas
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="h-[100px]">
                        <td className="border border-black p-2 pb-4">
                          {data?.catatan_wali_kelas}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* TTD */}
                <div className="flex justify-between mt-10">
                  <div className="h-40 flex flex-col justify-between items-center w-44 font-semibold">
                    <h1 className="uppercase text-sm">Orang tua / wali</h1>
                    <h1 className="uppercase text-sm">{data?.nama_ortu}</h1>
                  </div>

                  <div className="h-40 flex flex-col justify-between items-center w-44 font-semibold">
                    <h1 className="uppercase text-sm">wali kelas</h1>
                    <h1 className="uppercase text-sm text-center">
                      {data?.walikelas}
                    </h1>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CetakRapor;
