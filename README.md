# Even Match CRM

A modern, feature-rich CRM application built with Next.js, TypeScript, and a powerful set of modern libraries. This project serves as a boilerplate for building scalable and maintainable web applications.

## Core Technologies

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **API Layer:** [TanStack Query](https://tanstack.com/query/latest) + [Axios](https://axios-http.com/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Authentication:** Custom JWT-based (.NET)
- **Date Handling:** [Day.js](https://day.js.org/)
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/even-match-crm.git
    cd even-match-crm
    ```

2.  Install dependencies:
    ```bash
    yarn install
    ```

### Running the Development Server

1.  Create a `.env.local` file in the root of the project and add your environment variables:
    ```
    NEXT_PUBLIC_API_URL=http://your-api-url.com
    ```

2.  Start the development server:
    ```bash
    yarn dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows a feature-based architecture, which helps in organizing code by functionality rather than by file type. This makes it easier to locate and work on related files.

```
/src
├── app/                # Next.js App Router pages and layouts
├── components/         # Shared UI components (e.g., shadcn/ui)
│   ├── common/         # Common layout components (sidebar, nav, etc.)
│   └── ui/             # Generic UI components (Button, Input, etc.)
├── features/           # Feature-based modules
│   └── auth/           # Example: Authentication feature
│       ├── api/        # API requests related to auth
│       ├── components/ # React components for auth (e.g., LoginForm)
│       ├── hooks/      # Custom hooks for auth
│       └── store/      # Zustand store for auth state
├── hooks/              # Global custom hooks
├── i18n/               # Internationalization setup
├── lib/                # Core libraries and utilities
│   ├── api/            # Axios instance and fetcher
│   ├── query/          # TanStack Query client setup
│   └── utils/          # Utility functions
├── provider/           # Global providers (QueryProvider, AuthGuard, etc.)
├── schemas/            # Zod schemas for validation
├── store/              # Global Zustand stores
└── types/              # TypeScript types and interfaces
```

## Core Concepts & Examples

### Styling with shadcn/ui & Tailwind CSS

We use **shadcn/ui** for our component library, which is built on top of Tailwind CSS. Components are easily customizable and can be used throughout the application.

**Example: Using the Button component**

```tsx
// src/components/ui/button.tsx
import { Button } from "@/src/components/ui/button";

function MyComponent() {
  return (
    <div>
      <Button variant="primary" size="lg">
        Click me
      </Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
```

### State Management with Zustand

**Zustand** is used for global state management. It's simple, lightweight, and powerful. We use it for managing authentication state.

**Example: Auth Store**

The auth store manages the user's session, tokens, and authentication status.

```typescript
// src/features/auth/store/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ... (imports and type definitions)

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      login: (user, tokens) => set({ user, tokens, isAuthenticated: true }),
      logout: () => set({ user: null, tokens: null, isAuthenticated: false }),
      // ... other actions
    }),
    { name: "auth-storage" }
  )
);

// Selector hooks for optimized re-renders
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
```

### API Layer with TanStack Query & Axios

We use **TanStack Query** for data fetching, caching, and state synchronization, with **Axios** for making HTTP requests. A generic `createCrudHooks` factory abstracts away the boilerplate for CRUD operations.

**Example: `useCrud` Factory and `useUsers` Hook**

The `createCrudHooks` factory generates a set of hooks for a given API resource.

```typescript
// src/hooks/use-crud.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/src/lib/api/fetcher";
// ...

export function createCrudHooks<TItem, TCreate, TUpdate>(config) {
  // ... (implementation of useList, useDetail, useCreate, etc.)
}
```

This factory is then used to create feature-specific hooks like `useUsers`.

```typescript
// src/features/users/hooks/use-users.ts
import { createCrudHooks } from "@/src/hooks/use-crud";
import { userSchema } from "@/src/schemas";

export const {
  useList: useUsers,
  useDetail: useUser,
  useCreate: useCreateUser,
  useUpdate: useUpdateUser,
  useDelete: useDeleteUser,
} = createCrudHooks({
  baseUrl: "/users",
  queryKey: ["users"],
  itemSchema: userSchema,
});
```

### Form Handling with React Hook Form & Zod

**React Hook Form** and **Zod** provide a robust solution for form handling and validation.

**Example: Login Form**

```tsx
// src/features/auth/components/login-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/src/schemas";
import { useLogin } from "../hooks/use-auth";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

export function LoginForm() {
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginSchema) => {
    login(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="ornek@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ... password field ... */}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
```

### Internationalization (i18n) with next-intl

**next-intl** is used for handling translations. Message files are stored in the `messages` directory.

**Example: Adding and Using Translations**

1.  **Add translations** to the JSON file for the desired language:

    ```json
    // messages/en.json
    {
      "LoginPage": {
        "title": "Login",
        "emailLabel": "Email"
      }
    }
    ```

2.  **Use the `useTranslations` hook** in your components:

    ```tsx
    import { useTranslations } from "next-intl";

    export default function LoginPage() {
      const t = useTranslations("LoginPage");

      return (
        <div>
          <h1>{t("title")}</h1>
          {/* ... */}
        </div>
      );
    }
    ```