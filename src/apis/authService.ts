import axiosInstance from "./axiosInstance";

export const refreshToken = async (
  rt: string | null
): Promise<{
  at: string;
  rt: string;
}> => {
  if (rt == null) throw new Error("토큰 미기재");

  try {
    const response = await axiosInstance.post("/user/refresh-token", { rt });
    const result = {
      at: response.data.at,
      rt: response.data.rt,
    };
    return result;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
