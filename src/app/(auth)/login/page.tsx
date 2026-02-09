import { LanguageToggle } from "@/src/components/common/language-toggle";
import { ThemeToggle } from "@/src/components/common/theme-toggle";
import { LoginForm } from "@/src/features/auth/components/login-form";
import { GuestGuard } from "@/src/provider/auth-guard";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function LoginPage() {
  const t = useTranslations("Auth.login");

  return (
    <GuestGuard>
      <div className="min-h-screen w-full lg:grid lg:grid-cols-2 overflow-hidden">
        {/* Left Side - Branding (Hidden on mobile) */}
        <div className="hidden lg:flex relative flex-col justify-between bg-zinc-900 p-10 text-white dark:border-r border-zinc-800">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-neutral-900" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,#FF3332_0%,transparent_40%)] opacity-20" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(to_top,#000000_0%,transparent_100%)] opacity-80" />

          {/* Logo Area */}
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image
              src="/icon.png"
              alt="Bouncinn Logo"
              width={32}
              height={32}
              className="mr-4 rounded-lg"
            />
            Bouncinn Business
          </div>

          {/* Hero Content */}
          <div className="relative z-20 mt-auto mb-20">
            <blockquote className="space-y-2">
              <p className="text-3xl font-semibold leading-tight tracking-tight">
                "Experience the future of event management. streamlined, efficient, and built for professionals."
              </p>
              <footer className="text-sm text-zinc-400 mt-4">
                The Bouncinn Team
              </footer>
            </blockquote>
          </div>


        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col items-center justify-center p-6 lg:p-10 bg-background relative">
          <div className="absolute top-6 right-6 flex gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {t("welcome")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("details")}
              </p>
            </div>

            <div className="grid gap-6">
              <LoginForm />
            </div>

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <a href="#" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
