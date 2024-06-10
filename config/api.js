import axios from "axios";

// export const BASE_URL = "http://localhost:5500/api/v1";
export const BASE_URL = process.env.BASE_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const URL = {
  AUTH_LOGIN: "/auth/login",

  TOTAL: "/total",

  // MURID
  GET_MURID: "/murid",
  ADD_MURID: "/murid/add",

  // RELAWAN
  GET_RELAWAN: "/relawan",
  ADD_RELAWAN: "/relawan/add",
  RELAWAN_TERAKTIF: "/point-relawan",
  JADWAL_RELAWAN: "/jadwal-relawan",

  // Silabus
  GET_SILABUS: "/silabus",
  ADD_SILABUS: "/silabus/add",

  // jadwal
  GET_JADWAL: "/jadwal",
  ADD_JADWAL: "/jadwal/add",
};
