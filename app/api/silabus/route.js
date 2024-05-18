import { API, URL } from "@/config/api";

// export async function GET(request) {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const mapel = searchParams.get("mapel");
//     const kelas = searchParams.get("kelas");

//     const res = await API.get(
//       `${URL.GET_RELAWAN}?mapel=${mapel}&kelas=${kelas}`
//     );

//     return new Response(JSON.stringify(res.data));
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function POST(request) {
  try {
    const body = await request.formData();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await API.post(URL.ADD_SILABUS, body, config);

    return new Response(JSON.stringify(res.data), { status: res.status });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
