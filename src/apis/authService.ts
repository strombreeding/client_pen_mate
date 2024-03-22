import axiosInstance from "./axiosInstance";

export const refreshToken = async (rt: string | null) => {
  if (rt == null) throw new Error("토큰 미기재");

  try {
    const response = await axiosInstance.post("/user/refresh-token", { rt });
    const result = { ...response.data };
    console.log("토큰 재발급", response.data);
    return result;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
