import { API, URL } from "@/config/api";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const hari = searchParams.get("hari");
    const kelas = searchParams.get("kelas");

    const res = await API.get(`${URL.GET_JADWAL}?hari=${hari}&kelas=${kelas}`);

    return new Response(JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const res = await API.post(URL.ADD_JADWAL, body);

    return new Response(JSON.stringify(res.data));
  } catch (error) {
    console.error(error);
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    const res = await API.put(`${URL.GET_JADWAL}/${id}`, body);

    return new Response(JSON.stringify(res.data));
  } catch (error) {
    console.error(error);
  }
}
