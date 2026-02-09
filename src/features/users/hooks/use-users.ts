import { createCrudHooks } from "@/src/hooks/use-crud";
import { userSchema } from "@/src/schemas";

// Types
export type CreateUserDto = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type UpdateUserDto = Partial<Omit<CreateUserDto, "password">>;

// Hooks - Generated from factory
export const {
  useList: useUsers,
  usePaginated: useUsersPaginated,
  useDetail: useUser,
  useCreate: useCreateUser,
  useUpdate: useUpdateUser,
  useDelete: useDeleteUser,
} = createCrudHooks<typeof userSchema, CreateUserDto, UpdateUserDto>({
  baseUrl: "/users",
  queryKey: ["users"],
  itemSchema: userSchema,
});
