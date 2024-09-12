import { d as defineEventHandler, u as useRuntimeConfig } from '../../../runtime.mjs';
import axios from 'axios';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';

const _id_ = defineEventHandler(async (e) => {
  const { id } = e.context.params;
  console.log("Received ID:", id);
  const { token } = useRuntimeConfig();
  const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
