import { API, URL } from "@/config/api";

export async function GET() {
  try {
    const res = await API.get(URL.GET_MURID);

    return new Response(JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    const res = await API.put(`${URL.GET_MURID}/${id}`, body);

    return new Response(JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
}
