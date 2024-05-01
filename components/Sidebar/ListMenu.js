import { useContext, useState } from "react";
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

import Link from "next/link";

export default function ListMenu({ sidebar }) {
  const [active, setActive] = useState(false);

  const { expanded } = useContext(sidebar);

  return (
    <div>
      {list.map((item, index) => (
        <Link href={item.link} key={index}>
          {index == 2 && <hr className="my-4 border-gray-200" />}
          <li
            className={`relative flex items-center justify-center py-2 px-3 my-4
          font-medium rounded-md cursor-pointer transition-colors group
          ${
            active
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100  text-indigo-800"
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
  );
}

const list = [
  {
    title: "Dashboard",
    icon: "dashboard",
    link: "/dashboard",
  },
  {
    title: "Kelas Hari Ini",
    icon: "program",
    link: "/kelashariini",
  },
  {
    title: "Jadwal Kelas",
    icon: "class",
    link: "/jadwalkelas",
  },
  {
    title: "Silabus",
    icon: "member",
    link: "/silabus",
  },
  {
    title: "Data Abesnsi",
    icon: "membership",
    link: "/dataabsensi",
  },
  {
    title: "Kelola Relawan",
    icon: "staff",
    link: "/kelolarelawan",
  },
  {
    title: "Kelola Murid",
    icon: "staff",
    link: "/kelolamurid",
  },
  {
    title: "Rapor",
    icon: "report",
    link: "/rapor",
  },
  {
    title: "Performa Report",
    icon: "report",
    link: "/performareport",
  },
];

const iconList = (e) => {
  return (
    <>
      {e == "dashboard" && <HomeIcon className="h-6 w-6 text-white" />}
      {e == "program" && <ClipboardListIcon className="h-6 w-6 text-white" />}
      {e == "class" && <LibraryIcon className="h-6 w-6 text-white" />}
      {e == "member" && <UsersIcon className="h-6 w-6 text-white" />}
      {e == "membership" && (
        <IdentificationIcon className="h-6 w-6 text-white" />
      )}
      {e == "staff" && <UserGroupIcon className="h-6 w-6 text-white" />}
      {e == "report" && <DocumentReportIcon className="h-6 w-6 text-white" />}
    </>
  );
};
