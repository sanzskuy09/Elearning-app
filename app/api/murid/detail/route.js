import { API, URL } from "@/config/api";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  try {
    const id = searchParams.get("id");
    const res = await API.get(URL.GET_MURID + "/" + id);

    return new Response(JSON.stringify(res.data));
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    throw new Error("Failed to fetch data");
  }
}
