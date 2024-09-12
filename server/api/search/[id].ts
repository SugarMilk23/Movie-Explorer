import axios from "axios";
import { useRoute } from "nuxt/app";

export default defineEventHandler(async (e) => {
  const { token } = useRuntimeConfig();
  const { title, page } = getQuery(e);
  const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${page}`;
  console.log("title: ", title);
  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
});
