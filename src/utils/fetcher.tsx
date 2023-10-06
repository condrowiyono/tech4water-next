import type {
  AxiosError,
  AxiosRequestConfig,
  RawAxiosRequestConfig,
} from "axios";
import axios from "axios";
import { getCookie } from "./cookies";

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
  baseURL: "http://localhost:8000",
});

export const noInterceptorFetcher = async (
  requestConfig: AxiosRequestConfig
) => {
  try {
    instance.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );
    const { data } = await instance.request(requestConfig);
    return data;
  } catch (error) {
    throw (error as AxiosError).response;
  }
};

const fetcher = async <T, D = any>(requestConfig: RawAxiosRequestConfig<D>) => {
  try {
    instance.interceptors.request.use(
      (config) => {
        const token = getCookie("token");
        if (token && config.headers)
          config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
    const { data } = await instance.request<Response<T>>(requestConfig);
    return Promise.resolve(data);
  } catch (err) {
    const error = err as AxiosError<ResponseError>;
    console.log(error.response?.data);
    throw error;
  }
};

export default fetcher;
