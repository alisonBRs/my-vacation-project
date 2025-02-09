import axios from "axios";

export const fetchAxios = axios.create({
  baseURL: "http://localhost:3080",
});
