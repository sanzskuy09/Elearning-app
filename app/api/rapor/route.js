import { API, URL } from "@/config/api";

export async function POST(request) {
  try {
    const body = await request.json();

    const res = await API.post(URL.ADD_RAPOR, body);

    return new Response(JSON.stringify(res.data));
  } catch (error) {
    console.error(error);
  }
}
