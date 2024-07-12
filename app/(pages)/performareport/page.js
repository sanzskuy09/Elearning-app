"use client";
import React, { useEffect, useState } from "react";

// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// ChartJS.register(ArcElement, Tooltip, Legend);
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
ChartJS.register(...registerables);

import { Pie, Bar, Line } from "react-chartjs-2";

import { API, URL } from "@/config/api";

import TableDashboard from "@/components/TableDashboard";

import { Flex, Progress, Select, ConfigProvider } from "antd";

import { dataUpcomingClass, dataRelawan } from "../dashboard/data";

const data = {
  labels: [
    "Matematika : 62",
    "Pend. Karakter : 90",
    "Bhs. Inggris : 30",
    "Kreasi: 50",
  ],
  datasets: [
    {
      label: "# Nilai :",
      data: [62, 90, 30, 50],
      backgroundColor: ["#b6c154", "#fae477", "#fca034", "#d0671c"],
      borderColor: ["#b6c154", "#fae477", "#fca034", "green"],
      borderWidth: 1,
    },
  ],
};

const options = {
  // Add options here
};

const optionsGenderChart = {
  // Add options here
  responsive: true,
  maintainAspectRatio: false,
};

const columnsRelawan = [
  {
    title: "Nama",
    dataIndex: "nama_lengkap",
  },
  {
    title: "Point",
    dataIndex: "point",
  },
];
const PerformaReportPage = () => {
  const nama = localStorage.getItem("nama_panggilan");

  const [dataReportMurid, setDataReportMurid] = useState([]);
  const [dataReportRelawan, setDataReportRelawan] = useState([]);
  const [dataReportGenderRelawan, setDataReportGenderRelawan] = useState([]);

  const [totalMurid, setTotalMurid] = useState([]);
  const [totalMuridPerKategori, setTotalMuridPerKategori] = useState([]);
  const [dataSilabus, setDataSilabus] = useState([]);
  const [totalRelawan, setTotalRelawan] = useState({
    jml_relawan: 0,
    tanggal: [],
  });
  const [pointRelawan, setPointRelawan] = useState([]);

  const [loading, setLoading] = useState(false);

  const colors = [
    "#4ECB71",
    "#0D99FF",
    "#FFB930",
    "#C14ECB",
    "#0DFFA8",
    "#FF30B9",
  ];

  const bulanOptions = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const getMonthName = (monthIndex) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthIndex];
  };

  const currentMonthIndex = new Date().getMonth();
  const currentMonthName = getMonthName(currentMonthIndex);

  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);

  const handleChangeBulan = async (value) => {
    setSelectedMonth(value);
    try {
      // const currentMonthIndex = new Date().getMonth();
      // const currentMonthName = getMonthName(currentMonthIndex);

      const res = await API.get(
        `${URL.GET_TOTAL_RELAWAN}?bulan=${
          value !== undefined ? value : currentMonthName
        }`
      );
      const data = res.data.data;

      const tanggal = data.map((item) => item.tanggal);
      const jumlahRelawan = data.map((item) => item.jml_relawan);
      // const jumlahRelawan = data.reduce(
      //   (total, item) => total + item.jml_relawan,
      //   0
      // );

      setTotalRelawan((item) => ({
        ...item,
        tanggal: tanggal,
        jumlahRelawan: jumlahRelawan,
      }));
    } catch (error) {
      console.error("Error fetching totals:", error);
    }
  };

  const getDataReportMurid = async () => {
    try {
      const res = await API.get(URL.GET_REPORT_MURID);
      const data = res.data.data;

      setDataReportMurid(data);
    } catch (error) {
      console.error("Error fetching totals:", error);
    }
  };

  const getDataReportRelawan = async () => {
    try {
      const res = await API.get(URL.GET_REPORT_RELAWAN);
      const data = res.data.data;
      setDataReportGenderRelawan((prev) => [
        ...prev,
        data.jumlahLakiLaki,
        data.jumlahPerempuan,
      ]);

      setDataReportRelawan(data);
    } catch (error) {
      console.error("Error fetching totals:", error);
    }
  };

  const getBanyakMuridPerKelas = async () => {
    try {
      const res = await API.get(URL.TOTAL_MURID);

      const data = res.data.data;
      const muridLenght = Object.values(data);

      setTotalMurid(muridLenght);
    } catch (error) {
      console.error("Error fetching totals:", error);
    }
  };

  const getRelawanTeraktif = async () => {
    try {
      const res = await API.get(URL.RELAWAN_TERAKTIF);

      const data = res.data.data.slice(0, 5);
      setPointRelawan(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const getBanyakMuridPerKategori = async () => {
    try {
      const res = await API.get(URL.TOTAL_KATEGORI);

      const data = res.data.data;
      const muridLenght = Object.values(data);

      setTotalMuridPerKategori(muridLenght);
    } catch (error) {
      console.error("Error fetching totals:", error);
    }
  };

  const getDataSilabus = async () => {
    try {
      const res = await API.get(URL.GET_REPORT_SILABUS);
      const data = res.data.data;

      setDataSilabus(data);
    } catch (error) {
      console.error("Error fetching totals:", error);
    }
  };

  useEffect(() => {
    getDataReportMurid();
    getDataReportRelawan();
    getBanyakMuridPerKelas();
    getBanyakMuridPerKategori();
    getRelawanTeraktif();
    getDataSilabus();
    handleChangeBulan();
  }, []);

  // Chart Murid
  const dataKelas = {
    labels: ["1 SD", "2 SD", "3 SD", "4 SD", "5 SD", "6 SD"],
    datasets: [
      {
        // label: "# Nilai :",
        data: totalMurid,
        backgroundColor: [
          "#b6c154",
          "#fae477",
          "#fca034",
          "#d0671c",
          "#83B4FF",
          "#BC5A94",
        ],
        borderColor: [
          "#b6c154",
          "#fae477",
          "#fca034",
          "#d0671c",
          "#83B4FF",
          "#BC5A94",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  function truncateLabel(label, maxLength) {
    if (label.length > maxLength) {
      return label.slice(0, maxLength) + "...";
    }
    return label;
  }
  const maxLength = 10;

  // Chart Kategori
  const originalLabels = [
    "Umum",
    "Disabilitas",
    "Yatim",
    "Piatu",
    "Kelompok Marginal",
    "Dhuafa",
    "Pengungsi",
    // "Orang tua bercerai"
  ];

  const truncatedLabels = originalLabels.map((label) =>
    truncateLabel(label, maxLength)
  );

  const dataKategori = {
    labels: truncatedLabels,
    datasets: [
      {
        label: "Kategori :",
        data: totalMuridPerKategori,
        backgroundColor: ["#3572EF", "#3ABEF9"],
        borderColor: ["#3572EF", "#3ABEF9"],
        borderWidth: 1,
        minBarLength: 2,
      },
    ],
  };

  // Chart Tingkat Kehadiaran murid
  const kelasLabels = ["1 SD", "2 SD", "3 SD", "4 SD", "5 SD", "6 SD"];

  const kelasLabel = kelasLabels.map((label) =>
    truncateLabel(label, maxLength)
  );

  const dataKehadiranMurid = {
    labels: kelasLabel,
    datasets: [
      {
        label: "Matematika",
        data: [40, 57],
        backgroundColor: ["#3572EF"],
        borderColor: ["#3572EF"],
        borderWidth: 1,
        minBarLength: 2,
      },
      {
        label: "Pend. Karakter",
        data: [40, 57],
        backgroundColor: ["#3ABEF9"],
        borderColor: ["#3ABEF9"],
        borderWidth: 1,
        minBarLength: 2,
      },
      {
        label: "B. Indonesia",
        data: [40, 57],
        backgroundColor: ["#b6c154"],
        borderColor: ["#b6c154"],
        borderWidth: 1,
        minBarLength: 2,
      },
      {
        label: "IPAS",
        data: [40, 57],
        backgroundColor: ["#fca034"],
        borderColor: ["#fca034"],
        borderWidth: 1,
        minBarLength: 2,
      },
      {
        label: "B. Inggris",
        data: [40, 57],
        backgroundColor: ["#83B4FF"],
        borderColor: ["#83B4FF"],
        borderWidth: 1,
        minBarLength: 2,
      },
      {
        label: "Kreasi",
        data: [40, 57],
        backgroundColor: ["#BC5A94"],
        borderColor: ["#BC5A94"],
        borderWidth: 1,
        minBarLength: 2,
      },
    ],
  };

  // data gender relawan
  const labelGenderRelawan = ["Laki-laki", "Prempuan"];

  const labelGender = labelGenderRelawan.map((label) =>
    truncateLabel(label, maxLength)
  );

  const dataGenderRelawan = {
    labels: labelGender,
    datasets: [
      {
        label: "Jenis Kelamin :",
        data: dataReportGenderRelawan,
        backgroundColor: ["#3572EF", "#3ABEF9"],
        borderColor: ["#3572EF", "#3ABEF9"],
        borderWidth: 1,
        minBarLength: 2,
      },
    ],
  };

  // Chart Tingkat Kehadiaran relawan
  const tangglaLabels = totalRelawan?.tanggal;

  const tangglaLabel = tangglaLabels.map((label) =>
    truncateLabel(label, maxLength)
  );

  const dataKehadiranRelawan = {
    labels: tangglaLabel,
    datasets: [
      {
        label: "Kehadiran",
        data: totalRelawan?.jumlahRelawan,
        backgroundColor: ["#3572EF"],
        borderColor: ["#3572EF"],
        borderWidth: 1,
        minBarLength: 2,
      },
    ],
  };

  return (
    <div>
      <div className="py-6 px-10 text-xl flex justify-between border-b-2 border-black">
        <h1>Performa Report</h1>
        <h1>Hallo, Kak {nama}</h1>
      </div>

      {/* content */}
      <div className="py-6 px-10 flex flex-col gap-10">
        <h1 className="font-bold text-2xl">Performance Report HOME Depok</h1>

        {/* penerima manfaat */}
        <div className="grid grid-cols-3 gap-10">
          <div className="bg-white shadow-xl col-span-2 py-4 px-6 rounded-xl min-h-56">
            <h1 className="mb-4">Kategori Penerima Manfaat</h1>

            {/* Chart */}
            <div className="flex justify-center">
              <div className="w-[100%] flex justify-center">
                <Bar options={options} data={dataKategori} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 ">
            <div className="bg-white shadow-xl py-4 px-6 rounded-xl h-full min-h-48 flex flex-col">
              <p className="text-lg">Total Penerima Manfaat</p>
              <div className="flex-1 flex items-center justify-center">
                <h1 className="text-6xl font-bold">{dataReportMurid?.murid}</h1>
              </div>
            </div>
            <div className="bg-white shadow-xl py-4 px-6 rounded-xl h-full min-h-48 flex flex-col">
              <p className="text-lg">Rata Rata Usia</p>
              <div className="flex-1 flex items-center justify-center">
                <h1 className="text-6xl font-bold">
                  {dataReportMurid?.rataUmur}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* rentang pendidikan */}
        <div className="grid grid-cols-3 gap-10">
          <div className="bg-white shadow-xl col-span-2 py-4 px-6 rounded-xl min-h-56">
            <h1 className="mb-4">Rentang pendidikan</h1>

            {/* Chart */}
            <div className="flex justify-center">
              <div className="w-[50%] flex justify-center">
                <Pie data={dataKelas} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 h-full flex flex-col">
              <p className="text-lg">Total Laki Laki</p>
              <div className="flex-1 flex items-center justify-center">
                <h1 className="text-6xl font-bold">
                  {dataReportMurid?.jumlahLakiLaki}
                </h1>
              </div>
            </div>
            <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 h-full flex flex-col">
              <p className="text-lg">Total Perempuan</p>
              <div className="flex-1 flex items-center justify-center">
                <h1 className="text-6xl font-bold">
                  {dataReportMurid?.jumlahPerempuan}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* kegiatan belajar mengajar */}
        <h1 className="font-bold text-2xl">Kegiatan Belajar Mengajar</h1>

        {dataSilabus.length > 0
          ? dataSilabus.map((e, i) => (
              <div
                className="bg-white shadow-xl col-span-2 py-4 px-6 rounded-xl min-h-56"
                key={i}
              >
                <h1 className="mb-4 text-lg font-semibold">Kelas {e.kelas}</h1>

                <div>
                  {e.mapel.map((e, i) => (
                    <>
                      <div key={i} className="w-full flex justify-between">
                        <p>{e.nama}</p>
                        <p>
                          {e.totalSelesai} / {e.totalSilabus}
                        </p>
                      </div>
                      <ConfigProvider
                        theme={{
                          components: {
                            Progress: {
                              defaultColor: colors[i],
                            },
                          },
                        }}
                      >
                        <Progress
                          percent={(e.totalSelesai / e.totalSilabus) * 100}
                          showInfo={false}
                        />
                      </ConfigProvider>
                    </>
                  ))}
                </div>
              </div>
            ))
          : ""}
        {/* <div className="bg-white shadow-xl col-span-2 py-4 px-6 rounded-xl min-h-56">
          <h1 className="mb-4">kelas 1</h1>

          Chart
          <div className="flex justify-center">
            <div className="w-[50%] flex justify-center">
              <Pie options={options} data={data} />
            </div>
          </div>
          <div className="flex justify-center h-full max-h-[28rem]">
            <div className="w-[100%] flex justify-center">
              <Bar options={options} data={dataKehadiranMurid} />
            </div>
          </div>
        </div> */}

        {/* <div className="grid grid-cols-3 gap-10">
          <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 flex flex-col justify-between">
            <p className="text-lg min-h-14 flex items-center ">
              Jumlah murid kehadiran rendah (&lt;50%)
            </p>
            <div className="flex-1 flex items-center justify-center">
              <h1 className="text-6xl font-bold">45</h1>
            </div>
          </div>
          <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 flex flex-col justify-between">
            <p className="text-lg min-h-14 flex items-center ">
              Rata rata kehadiran
            </p>
            <div className="flex-1 flex items-center justify-center">
              <h1 className="text-6xl font-bold">18</h1>
            </div>
          </div>
          <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 flex flex-col justify-between">
            <p className="text-lg min-h-14 flex items-center ">
              Tingkat Capaian belajar
            </p>
            <div className="flex-1 flex items-center justify-center">
              <h1 className="text-6xl font-bold">18</h1>
            </div>
          </div>
        </div> */}

        {/* Program Relawan */}
        <h1 className="font-bold text-2xl">Program Relawan</h1>

        <div className="grid grid-cols-3 gap-10">
          <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-56 flex flex-col justify-between">
            <h1 className="mb-4">Kategori Relawan</h1>

            {/* Chart */}
            <div className="flex justify-center h-full max-h-[28rem]">
              <div className="w-[100%] flex justify-center">
                <Bar options={optionsGenderChart} data={dataGenderRelawan} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 col-span-2">
            <div className="flex gap-10">
              <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 flex flex-col w-full">
                <p className="text-lg">Total Relawan</p>
                <div className="flex-1 flex items-center justify-center">
                  <h1 className="text-6xl font-bold">
                    {dataReportRelawan?.relawan}
                  </h1>
                </div>
              </div>
              <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 flex flex-col w-full">
                <p className="text-lg">Tingkat Kehadiran tertinggi</p>
                <div className="flex-1 flex items-center justify-center">
                  <h1 className="text-6xl font-bold">85%</h1>
                </div>
              </div>
            </div>

            <div className="flex gap-10">
              <div className="bg-white shadow-xl py-4 px-6 rounded-xl min-h-48 w-full">
                <p className="text-lg mb-4">Relawan Teraktif</p>

                <TableDashboard
                  columns={columnsRelawan}
                  data={pointRelawan}
                  showHead={true}
                />
                {/* <TableDashboard
                  columns={columnsRelawan}
                  data={filterDataRelawan}
                  showHead={true}
                /> */}
              </div>
            </div>
          </div>
        </div>

        {/* tingkat kehadiran relawan */}
        <div className="bg-white shadow-xl col-span-2 py-4 px-6 rounded-xl min-h-56">
          <h1 className="mb-4">Tingkat kehadiran relawan</h1>

          <Select
            defaultValue={selectedMonth}
            // value={selectedMonth}
            style={{
              width: 150,
            }}
            onChange={handleChangeBulan}
            options={bulanOptions}
          />

          {/* Chart */}
          <div className="flex justify-center">
            <div className="w-[90%] flex justify-center">
              <Line options={options} data={dataKehadiranRelawan} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformaReportPage;
