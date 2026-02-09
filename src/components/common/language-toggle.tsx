"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function LanguageToggle() {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState("en");

  const setLocale = useCallback(
    (locale: string) => {
      // Set cookie for 1 year
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${
        365 * 24 * 60 * 60
      }`;
      setCurrentLocale(locale);
      router.refresh();
    },
    [router]
  );

  useEffect(() => {
    // Get language from cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1];

    if (cookieValue && cookieValue !== currentLocale) {
      setCurrentLocale(cookieValue);
    } else if (!cookieValue) {
      // If no cookie, detect browser language
      const browserLang = navigator.language.split("-")[0];
      const supportedLangs = ["en", "tr"];
      const defaultLang = supportedLangs.includes(browserLang)
        ? browserLang
        : "en";

      setLocale(defaultLang);
    }
  }, [setLocale]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-auth-card-border bg-auth-card-bg hover:bg-auth-input-bg transition-colors text-sm font-medium text-auth-title">
          <Globe className="h-4 w-4" />
          <span className="uppercase">{currentLocale}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-auth-card-bg border-auth-card-border"
      >
        <DropdownMenuItem
          onClick={() => setLocale("en")}
          className="text-auth-title focus:bg-auth-input-bg focus:text-auth-title cursor-pointer"
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale("tr")}
          className="text-auth-title focus:bg-auth-input-bg focus:text-auth-title cursor-pointer"
        >
          Türkçe
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
