import axiosInstance from "./axiosInstance";
import { refreshToken } from "./authService";
import { encrypt } from "../utils/crypto";

type AxiosMethod = "GET" | "POST" | "DELETE" | "PUT";

export const jwtApiRequest = async (
  url: string,
  method: AxiosMethod,
  data: any
) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data,
    });
    return response.data;
  } catch (error: any) {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "jwt expired"
    ) {
      try {
        const currentRt = localStorage.getItem("rt");
        // 리프레시 토큰을 가져와서 새로운 액세스 토큰을 발급
        const { at, rt } = await refreshToken(currentRt);
        window.localStorage.setItem("at", at);
        window.localStorage.setItem("rt", rt);
        data = { at: at };
        // 새로운 액세스 토큰을 헤더에 설정
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${at}`;
        // 원래의 API 요청을 다시 시도
        const retryResponse = await axiosInstance({
          url,
          method,
          data,
        });
        console.log(retryResponse.data, "zz");
        return retryResponse.data;
      } catch (refreshError: any) {
        localStorage.clear();
        alert("세션이 만료되었습니다.\n다시 로그인해주세요.");
        window.location.reload();
        console.error("Error refreshing token:", refreshError);
        throw refreshError;
      }
    }
    console.error("Error making API request:", error);
    throw error;
  }
};
