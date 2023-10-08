import { getToken } from "next-auth/jwt";

import type { AxiosError, RawAxiosRequestConfig } from "axios";
import axios from "axios";

export interface PayloadList {
  page?: number;
  limit?: number;
}

export interface Response<T = any> {
  errors?: string[];
  message: string;
  code: number;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ResponseError {
  errors?: string[];
  message: string;
  error_code: number;
  code: number;
}

export interface ErrorResponse extends AxiosError<ResponseError> {}

export const instance = axios.create({
  baseURL: "http://localhost:8000/",
});

const fetcher = async <T, D = any>(requestConfig: RawAxiosRequestConfig<D>) => {
  console.log(requestConfig);
  try {
    instance.interceptors.request.use(
      async (config) => {
        try {
          // const session = await getSession();
          // const token = session?.accessToken;

          // if (token && config.headers) config.headers["Authorization"] = `Bearer ${token}`;
          return config;
        } catch (err) {
          console.log(err);
          return config;
        }
      },
      (error) => Promise.reject(error)
    );

    const { data } = await instance.request<Response<T>>(requestConfig);
    return Promise.resolve(data);
  } catch (err) {
    const error = err as AxiosError<ResponseError>;
    throw error;
  }
};

export default fetcher;
