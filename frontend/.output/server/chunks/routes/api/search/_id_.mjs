import { d as defineEventHandler, u as useRuntimeConfig, g as getQuery } from '../../../runtime.mjs';
import axios from 'axios';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';

const _id_ = defineEventHandler(async (e) => {
  const { token } = useRuntimeConfig();
  const { title, page } = getQuery(e);
  const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${page}`;
  console.log("title: ", title);
  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
