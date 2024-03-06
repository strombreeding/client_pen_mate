import { useState, useEffect } from "react";
import axios, { AxiosError, Method } from "axios";
import { SERVER_URI } from "../configs/server";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setLoading } from "../store/slices/appState";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"; // 이러한 방식으로 가능한 모든 HTTP 메서드를 선언할 수 있습니다.
type HttpResponse = {
  result: any;
  error?: any;
  msg?: any;
  code?: number;
};

interface ApiResponse<T> {
  data: T;
  error: Error | null;
}

export function useAxiosRequest<T>(
  url: string,
  method: HttpMethod,
  data?: Record<string, any>
): ApiResponse<T> {
  let responseData: T = null as T;
  let error: Error | null = null;
  const dispatch = useDispatch<AppDispatch>();
  console.log(url, method, data);

  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      let response;

      switch (method) {
        case "GET":
          response = await axios.get<HttpResponse>(SERVER_URI + url);
          break;
        case "POST":
          response = await axios.post<HttpResponse>(SERVER_URI + url, data);
          break;
        case "PUT":
          response = await axios.put<HttpResponse>(SERVER_URI + url, data);
          break;
        case "DELETE":
          response = await axios.delete<HttpResponse>(SERVER_URI + url);
          break;
        default:
          throw new Error("Unsupported HTTP method");
      }
      responseData = response.data.result;
      setTimeout(() => dispatch(setLoading(false)), 300);
    } catch (error: any) {
      error = error;
      setTimeout(() => dispatch(setLoading(false)), 300);
    }
  };

  fetchData();

  return { data: responseData, error };
}
