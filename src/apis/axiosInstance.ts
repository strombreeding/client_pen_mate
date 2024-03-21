import axios, { AxiosInstance } from "axios";
import { SERVER_URI } from "../configs/server";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: SERVER_URI,
  timeout: 5000, // Adjust timeout as needed
});

export default axiosInstance;
