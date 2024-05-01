"use client";

import LoginPage from "./login/page";

import { useAppSelector } from "@/libs/hook";
import DashboardPage from "./(pages)/dashboard/page";
import "antd/dist/antd.css";

export default function Home({ children }) {
  const authUser = useAppSelector((state) => state?.auth?.isLogin ?? false);
  // console.log(authUser);

  return authUser ? <DashboardPage /> : <LoginPage />;
}
