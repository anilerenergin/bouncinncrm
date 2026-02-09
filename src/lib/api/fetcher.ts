import type { AxiosRequestConfig } from "axios";
import { z } from "zod";
import api from "./axios";

interface FetcherOptions<T extends z.ZodTypeAny> extends AxiosRequestConfig {
  schema?: T;
}

export async function fetcher<T extends z.ZodTypeAny>(
  url: string,
  options?: FetcherOptions<T>
): Promise<z.infer<T>> {
  const { schema, ...axiosConfig } = options || {};

  const response = await api(url, axiosConfig);

  if (schema) {
    const parsed = schema.safeParse(response.data);
    if (!parsed.success) {
      console.error("API Response validation failed:", parsed.error);
      throw new Error("Invalid API response format");
    }
    return parsed.data;
  }

  return response.data;
}

// HTTP method helpers
export const apiClient = {
  get: <T extends z.ZodTypeAny>(
    url: string,
    schema?: T,
    config?: AxiosRequestConfig
  ) => fetcher(url, { ...config, method: "GET", schema }),

  post: <T extends z.ZodTypeAny, D = unknown>(
    url: string,
    data?: D,
    schema?: T,
    config?: AxiosRequestConfig
  ) => fetcher(url, { ...config, method: "POST", data, schema }),

  put: <T extends z.ZodTypeAny, D = unknown>(
    url: string,
    data?: D,
    schema?: T,
    config?: AxiosRequestConfig
  ) => fetcher(url, { ...config, method: "PUT", data, schema }),

  patch: <T extends z.ZodTypeAny, D = unknown>(
    url: string,
    data?: D,
    schema?: T,
    config?: AxiosRequestConfig
  ) => fetcher(url, { ...config, method: "PATCH", data, schema }),

  delete: <T extends z.ZodTypeAny>(
    url: string,
    schema?: T,
    config?: AxiosRequestConfig
  ) => fetcher(url, { ...config, method: "DELETE", schema }),
};
