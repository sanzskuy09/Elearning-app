import axios from "axios";

// export const BASE_URL = "http://localhost:5500/api/v1";
export const BASE_URL = process.env.BASE_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
