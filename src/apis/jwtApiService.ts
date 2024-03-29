import axiosInstance from "./axiosInstance";
import { refreshToken } from "./authService";
import { setStorageCrypto } from "../utils/localStorage";

type AxiosMethod = "GET" | "POST" | "DELETE" | "PUT";

const refreshSession = (err: any) => {
  localStorage.clear();
  alert("세션이 만료되었습니다.\n다시 로그인해주세요.");
  // window.location.reload();
  console.error("Error refreshing token:", err);
  throw err;
};

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
    console.log(url, "이게 처음 시도한 url");
    console.log(response);
    return response.data;
  } catch (error: any) {
    const errMsg = error.response.data.message;
    console.log(error.response.data.message, "###");
    if (
      error.response &&
      error.response.status === 401 &&
      errMsg.includes("jwt expired")
    ) {
      try {
        const currentRt = localStorage.getItem("rt");
        // 리프레시 토큰을 가져와서 새로운 액세스 토큰을 발급
        const res = await refreshToken(currentRt);

        setStorageCrypto("atata_point", res.atata_point);
        setStorageCrypto("atata_stone", res.atata_stone);
        setStorageCrypto("energy", res.energy);
        window.localStorage.setItem("at", res.at);
        window.localStorage.setItem("rt", res.rt);
        data = { ...data, at: res.at };
        // 새로운 액세스 토큰을 헤더에 설정

        console.log("다시 시도", url);
        const retryResponse = await axiosInstance({
          url,
          method,
          data,
          headers: {
            Authorization: `Bearer ${res.at}`,
          },
        });
        console.log(retryResponse.data, "zz");
        return retryResponse.data;
      } catch (err: any) {
        console.log(err, "십탱구리");
        const errMsg = err.response.data.message;

        if (errMsg.includes("fail refresh rt")) {
          refreshSession(err);
        }
        alert("에러가 발생했습니다!");
        window.location.reload();
        throw err;
      }
    }
    alert("error발생");
    throw error;
  }
};
