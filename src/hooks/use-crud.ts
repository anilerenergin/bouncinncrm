import { apiClient } from "@/src/lib/api/fetcher";
import { apiResponseSchema, paginatedSchema, type PaginatedResponse } from "@/src/schemas";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { z } from "zod";

interface CrudConfig<TItem extends z.ZodTypeAny> {
  baseUrl: string;
  queryKey: readonly string[];
  itemSchema: TItem;
}

export function createCrudHooks<TItem extends z.ZodTypeAny, TCreate, TUpdate>(
  config: CrudConfig<TItem>
) {
  const { baseUrl, queryKey, itemSchema } = config;

  type Item = z.infer<TItem>;

  const useList = (
    params?: Record<string, unknown>,
    options?: Omit<UseQueryOptions<Item[]>, "queryKey" | "queryFn">
  ) =>
    useQuery({
      queryKey: [...queryKey, "list", params],
      queryFn: async () => {
        const response = await apiClient.get(
          baseUrl,
          apiResponseSchema(z.array(itemSchema)),
          { params }
        );
        return response.data;
      },
      ...options,
    });

  const usePaginated = (
    params?: Record<string, unknown>,
    options?: Omit<
      UseQueryOptions<PaginatedResponse<Item>>,
      "queryKey" | "queryFn"
    >
  ) =>
    useQuery({
      queryKey: [...queryKey, "paginated", params],
      queryFn: () =>
        apiClient.get(baseUrl, paginatedSchema(itemSchema), { params }),
      ...options,
    });

  const useDetail = (
    id: string,
    options?: Omit<UseQueryOptions<Item>, "queryKey" | "queryFn">
  ) =>
    useQuery({
      queryKey: [...queryKey, "detail", id],
      queryFn: async () => {
        const response = await apiClient.get(
          `${baseUrl}/${id}`,
          apiResponseSchema(itemSchema)
        );
        return response.data;
      },
      enabled: !!id,
      ...options,
    });

  const useCreate = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (data: TCreate) => {
        const response = await apiClient.post(
          baseUrl,
          data,
          apiResponseSchema(itemSchema)
        );
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    });
  };

  const useUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({ id, data }: { id: string; data: TUpdate }) => {
        const response = await apiClient.put(
          `${baseUrl}/${id}`,
          data,
          apiResponseSchema(itemSchema)
        );
        return response.data;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: [...queryKey, "detail", variables.id],
        });
        queryClient.invalidateQueries({ queryKey: [...queryKey, "list"] });
      },
    });
  };

  const useDelete = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: string) => apiClient.delete(`${baseUrl}/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    });
  };

  return {
    useList,
    usePaginated,
    useDetail,
    useCreate,
    useUpdate,
    useDelete,
  };
}
