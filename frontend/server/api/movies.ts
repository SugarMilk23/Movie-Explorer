import axios from "axios";
import { useParams } from "react-router-dom";

export default defineEventHandler(async (e) => {
  const { token } = useRuntimeConfig();
  const { page } = getQuery(e);

  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

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
