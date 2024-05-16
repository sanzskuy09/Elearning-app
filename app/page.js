"use client";

import { useAppSelector } from "@/libs/hook";

import LoginPage from "./login/page";
import DashboardPage from "./(pages)/dashboard/page";
import { useRouter } from "next/navigation";
// import "antd/dist/antd.css";

export default function Home({ children }) {
  const router = useRouter();
  const authUser = useAppSelector((state) => state?.auth?.isLogin ?? false);
  // console.log(authUser);

  if (!authUser) {
    router.push("/login");
    return null;
  }

  router.push("/dashboard");
  return null;
}
