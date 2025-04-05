import axios from "axios";
const token = localStorage.getItem("token");

export const fetchAxios = axios.create({
  baseURL: "http://localhost:3080",
  headers: { Authorization: token },
});
