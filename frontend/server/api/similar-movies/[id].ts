import axios from "axios";

export default defineEventHandler(async (e) => {
  const { id } = e.context.params as { id: string };
  console.log("Received ID:", id); // Check what ID is being received

  const config = useRuntimeConfig();
  const token = config.public.token;

  const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;

  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API response:", response.data); // Log the API response
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
});
