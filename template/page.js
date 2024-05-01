"use client";
import React from "react";
import dayjs from "dayjs";
import { Button } from "antd";

import { useAppSelector, useAppDispatch } from "@/libs/hook";
import { increment, decrement } from "../libs/features/counter/counterSlice";
import { logoutUser } from "@/libs/features/authSlice";
import { toastSuccess } from "@/utils/toastify";

export default function Template() {
  const dispatch = useAppDispatch();

  // const d = new Date();
  const currentDate = dayjs().format("DD-MM-YYYY");

  const counter = useAppSelector((state) => state.counter.value);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-blue-700">{counter}</p>
      <h1 className="font-bold text-4xl text-center">Template Package</h1>
      <h1 className="text-xl text-center">Tanggal sekarang : {currentDate}</h1>
      <Button type="primary" onClick={() => dispatch(increment())}>
        Button increment
      </Button>
      <Button type="default" onClick={() => dispatch(decrement())}>
        Button decrement
      </Button>

      <button
        onClick={() => toastSuccess(`Sign in Success`)}
        className="border border-red-500 bg-red-500"
      >
        show toastify
      </button>

      <Button type="default" onClick={() => dispatch(logoutUser())}>
        Logout
      </Button>
    </div>
  );
}
