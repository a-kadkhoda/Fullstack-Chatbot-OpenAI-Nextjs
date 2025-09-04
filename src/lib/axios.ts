import axios from "axios";
import queryString from "query-string";

export const instance = axios.create({
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "text/plain",
    "Cache-Control": "no-cache",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
