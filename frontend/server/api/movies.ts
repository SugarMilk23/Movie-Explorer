import axios from "axios";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = config.public.token; // Make sure this matches your nuxt.config.ts

  const query = getQuery(event);
  const page = query.page || "1"; // Default to page 1 if not provided

  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Token:", token);
    console.log("URL:", url);
    // Return the response data
    return response.data;
  } catch (error) {
    // Improved error handling
    console.error("Error fetching data:", error);
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500;
      const message =
        error.response?.data?.status_message || "Failed to fetch data";
      throw createError({ statusCode, message });
    }
    throw createError({
      statusCode: 500,
      message: "An unexpected error occurred",
    });
  }
});
