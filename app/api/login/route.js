// import { NextRequest, NextResponse } from "next/server";

import { API, URL } from "@/config/api";

export async function POST(request) {
  const body = await request.json();

  const res = await API.post(URL.AUTH_LOGIN, body);

  return new Response(JSON.stringify(res.data));

  // console.log(body);
  // const res = await fetch(`${BASE_URL}/${URL.AUTH_LOGIN}`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(body),
  // });

  // if (!res.ok) {
  //   throw new Error("Failed to log in");
  // }

  // const data = await res.json();

  // if (data.status === 401) {
  //   return throwError(data.message);
  // }

  // return new Response(data);
}
