"use client";

import { AppButton } from "@/src/core/components/AppButton";
import { AppFormField } from "@/src/core/components/AppFormField";
import { Form } from "@/src/components/ui/form";
import { type LoginSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "../hooks/use-auth";
import { AppTextStyles } from "@/src/core/themes/text-styles";
import { cn } from "@/src/core/utils/cn";

export function LoginForm() {
  const t = useTranslations("Auth.login");
  const vt = useTranslations("Auth.validation");
  const { mutate: login, isPending, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    ),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {
    login({
      email: data.email || "manager@bouncinn.com",
      password: data.password || "password123",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AppFormField
          control={form.control}
          name="email"
          label={t("emailLabel")}
          placeholder={t("emailPlaceholder")}
          icon={<Mail className="h-5 w-5" />}
        />

        <AppFormField
          control={form.control}
          name="password"
          label={t("passwordLabel")}
          type={showPassword ? "text" : "password"}
          placeholder={t("passwordPlaceholder")}
          icon={<Lock className="h-5 w-5" />}
          suffix={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          }
        />

        {error && <p className={cn(AppTextStyles.caption("text-destructive"))}>• {t("error")}</p>}

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className={cn(AppTextStyles.label("text-muted-foreground hover:text-foreground transition-colors"))}
          >
            {t("forgotPassword")}
          </Link>
        </div>

        <AppButton
          type="submit"
          className="w-full"
          size="lg"
          isLoading={isPending}
          disabled={isPending}
          text={isPending ? t("submitting") : t("submit")}
        />
      </form>
    </Form>
  );
}
