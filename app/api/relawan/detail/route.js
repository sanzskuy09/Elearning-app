import { API, URL } from "@/config/api";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const res = await API.get(URL.GET_RELAWAN + "/" + id);

    return new Response(JSON.stringify(res.data));
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    throw new Error("Failed to fetch data");
  }
}
