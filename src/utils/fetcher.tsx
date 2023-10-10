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
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const fetcher = async <T, D = any>(requestConfig: RawAxiosRequestConfig<D>) => {
  try {
    const { data } = await instance.request<Response<T>>(requestConfig);
    return Promise.resolve(data);
  } catch (err) {
    const error = err as AxiosError<ResponseError>;
    throw error;
  }
};

export default fetcher;
