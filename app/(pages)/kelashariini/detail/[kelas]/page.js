import Image from "next/image";
import Link from "next/link";
import React from "react";

const KelasDetailPage = ({ params: { kelas } }) => {
  const nama = localStorage.getItem("nama_panggilan");

  return (
    <div>
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Kelas Hari Ini / {kelas}</h1>
        <h1>Hallo, Kak {nama}</h1>
      </div>

      <div className="py-6 px-10 flex flex-col gap-4">
        {/* content */}
        <div className="">
          <div className="flex justify-between mb-3">
            <h4>Silabus Hari Ini</h4>
            <h2 className="text-title">
              &lt;&lt; <Link href="/silabus">Lihat Silabus Lengkap</Link>{" "}
              &gt;&gt;
            </h2>
          </div>

          <div className="bg-[#D9D9D9] p-4 flex justify-between items-center rounded-md">
            <p>
              Menjelaskan dan menentukan urutan bilangan bulat (negatif -
              positif) dan pecahan
            </p>

            <div className="flex gap-4">
              <button className="w-8 h-8 rounded-md bg-white">a</button>
              <button className="w-8 h-8 rounded-md bg-white">d</button>
            </div>
          </div>
        </div>

        <div className="flex justify-start items-center gap-24">
          <h4 className="">Pengajar Hari Ini</h4>
          <div className="flex gap-2 p-1 bg-white shadow-sm flex-1 w-full rounded-md">
            <p className="p-1 px-3 bg-red-300 font-medium rounded-md">
              Wawan Setiawan
            </p>
            <p className="p-1 px-3 bg-blue-300 font-medium rounded-md">
              Wawan Setiawan
            </p>
            <p className="p-1 px-3 bg-green-300 font-medium rounded-md">
              Wawan Setiawan
            </p>
          </div>
        </div>

        <div className="bg-white w-full h-[400px] p-4">table absen siswa</div>
        <div className="flex gap-4 w-full justify-end">
          <button className="bg-white rounded-md px-4 py-2 uppercase text-[#0FA958]">
            <Image
              src=""
              alt="img-button"
              className="inline-block"
              width={24}
              height={24}
            />
            Beri Nilai
          </button>
          <button className="bg-white rounded-md px-4 py-2 uppercase text-[#0FA958]">
            <Image
              src=""
              alt="img-button"
              className="inline-block"
              width={24}
              height={24}
            />
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default KelasDetailPage;
