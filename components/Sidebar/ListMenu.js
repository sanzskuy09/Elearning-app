"use client";
import { useContext, useEffect, useState } from "react";
import {
  BeakerIcon,
  HomeIcon,
  UserGroupIcon,
  ClipboardListIcon,
  IdentificationIcon,
  LibraryIcon,
  DocumentReportIcon,
  UsersIcon,
} from "@heroicons/react/outline";

import IconAbsensi from "../../public/Icons/ic_absensi.svg";
import IconDashboard from "../../public/Icons//ic_dashboard.svg";
import IconJadwal from "../../public/Icons/ic_jadwal.svg";
import IconKelas from "../../public/Icons/ic_kelas.svg";
import IconRapor from "../../public/Icons/ic_rapor.svg";
import IconReport from "../../public/Icons/ic_report.svg";
import IconSilabus from "../../public/Icons/ic_silabus.svg";
import IconUser from "../../public/Icons/ic_user.svg";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ListMenu({ sidebar }) {
  const [active, setActive] = useState(false);
  const pathname = usePathname();

  const { expanded } = useContext(sidebar);

  const [role, setRole] = useState(null);

  useEffect(() => {
    // Retrieve role from localStorage
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const list = [
    {
      title: "Dashboard",
      icon: "dashboard",
      link: "/dashboard",
    },
    {
      title: "Kelas Hari Ini",
      icon: "kelas",
      link: "/kelashariini",
    },
    {
      title: "Jadwal Kelas",
      icon: "jadwal",
      link: "/jadwalkelas",
    },
    {
      title: "Silabus Pembelajaran",
      icon: "silabus",
      link: "/silabus",
    },
    {
      title: "Data Abesnsi",
      icon: "absensi",
      link: "/dataabsensi",
      role: "admin",
    },
    {
      title: "Kelola Relawan",
      icon: "relawan",
      link: "/kelolarelawan",
      role: "admin",
    },
    {
      title: "Kelola Murid",
      icon: "murid",
      link: "/kelolamurid",
      role: "admin",
    },
    {
      title: "Rapor",
      icon: "rapor",
      link: "/rapor",
    },
    {
      title: "Performa Report",
      icon: "report",
      link: "/performareport",
      role: "admin",
    },
  ];

  // Filter list based on role
  const filteredList = list.filter((item) => !item.role || item.role === role);

  return (
    <div>
      {filteredList.map((item, index) => (
        <Link
          href={item.link}
          key={index}
          className={`${
            pathname === item.link ? "bg-secondary" : "bg-red-500"
          }`}
        >
          {index == 2 && <hr className="my-4 border-gray-200" />}
          <li
            className={`relative flex items-center justify-center py-2 px-3 my-4
          font-medium rounded-md cursor-pointer transition-colors group
          ${
            pathname.includes(item.link)
              ? "bg-secondary text-white"
              : "hover:bg-secondary text-white"
          }`}
          >
            {iconList(item.icon)}
            <span
              className={`overflow-hidden transition-all truncate text-white font-medium ${
                expanded ? "w-56 ml-3" : "w-0"
              }`}
            >
              {item.title}
            </span>

            {!expanded && (
              <div
                className={`absolute left-full rounded-md px-2 py-1 ml-6 w-max
              bg-secondary text-white text-sm
              invisible opacity-20 -translate-x-3 transition-all
              group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 group-hover:z-10`}
              >
                {item.title}
              </div>
            )}
          </li>
        </Link>
      ))}
    </div>
    // <div>
    //   {list.map((item, index) => (
    //     <Link
    //       href={item.link}
    //       key={index}
    //       className={`${
    //         pathname === item.link ? "bg-secondary" : "bg-red-500"
    //       }`}
    //     >
    //       {index == 2 && <hr className="my-4 border-gray-200" />}
    //       <li
    //         className={`relative flex items-center justify-center py-2 px-3 my-4
    //       font-medium rounded-md cursor-pointer transition-colors group
    //       ${
    //         active || pathname.includes(item.link)
    //           ? "bg-secondary  text-white"
    //           : "hover:bg-secondary text-white"
    //       }`}
    //       >
    //         {iconList(item.icon)}
    //         <span
    //           className={`overflow-hidden transition-all truncate text-white font-medium ${
    //             expanded ? "w-56 ml-3" : "w-0"
    //           }`}
    //         >
    //           {item.title}
    //         </span>

    //         {!expanded && (
    //           <div
    //             className={`absolute left-full rounded-md px-2 py-1 ml-6 w-max
    //           bg-secondary text-white text-sm
    //           invisible opacity-20 -translate-x-3 transition-all
    //           group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 group-hover:z-10`}
    //           >
    //             {item.title}
    //           </div>
    //         )}
    //       </li>
    //     </Link>
    //   ))}
    // </div>
  );
}

// const list = [
//   {
//     title: "Dashboard",
//     icon: "dashboard",
//     link: "/dashboard",
//   },
//   {
//     title: "Kelas Hari Ini",
//     icon: "kelas",
//     link: "/kelashariini",
//   },
//   {
//     title: "Jadwal Kelas",
//     icon: "jadwal",
//     link: "/jadwalkelas",
//   },
//   {
//     title: "Silabus Pembelajaran",
//     icon: "silabus",
//     link: "/silabus",
//   },
//   {
//     title: "Data Abesnsi",
//     icon: "absensi",
//     link: "/dataabsensi",
//     role: "admin",
//   },
//   {
//     title: "Kelola Relawan",
//     icon: "relawan",
//     link: "/kelolarelawan",
//     role: "admin",
//   },
//   {
//     title: "Kelola Murid",
//     icon: "murid",
//     link: "/kelolamurid",
//     role: "admin",
//   },
//   {
//     title: "Rapor",
//     icon: "rapor",
//     link: "/rapor",
//   },
//   {
//     title: "Performa Report",
//     icon: "report",
//     link: "/performareport",
//     role: "admin",
//   },
// ];

const iconList = (e) => {
  return (
    <>
      {e == "dashboard" && (
        <Image src={IconDashboard} alt="" className="h-6 w-6" />
      )}
      {e == "kelas" && <Image src={IconKelas} alt="" className="h-6 w-6" />}
      {e == "jadwal" && <Image src={IconJadwal} alt="" className="h-6 w-6" />}
      {e == "silabus" && <Image src={IconSilabus} alt="" className="h-6 w-6" />}
      {e == "absensi" && <Image src={IconAbsensi} alt="" className="h-6 w-6" />}
      {e == "relawan" && <Image src={IconUser} alt="" className="h-6 w-6" />}
      {e == "murid" && <Image src={IconUser} alt="" className="h-6 w-6" />}
      {e == "rapor" && <Image src={IconRapor} alt="" className="h-6 w-6" />}
      {e == "report" && <Image src={IconReport} alt="" className="h-6 w-6" />}
    </>
  );
};
