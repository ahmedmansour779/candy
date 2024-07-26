import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) throw new Error("API_URL is not defined");

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.response.use((value) => value.data);
// axiosInstance.defaults.headers.common[
//   "Authorization"
// ] = `Bearer 1|Y89PyCRJ14M4gxrmhH3enAmOKXFjuhGRKH58CPHBacd15d18`;

export default axiosInstance;
