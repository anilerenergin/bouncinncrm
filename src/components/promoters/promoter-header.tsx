"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export function PromoterHeader() {
  const t = useTranslations("Promoters");

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 leading-tight">
          {t("title")}
        </h1>
        <p className="text-sm font-semibold text-gray-400 mt-1">
          {t("subtitle")}
        </p>
      </div>
      <Link href="/promoters/invite">
        <Button className="bg-[#F2FD0A] text-black hover:bg-[#F2FD0A]/90 font-bold px-6 py-6 rounded-2xl gap-2 text-sm shadow-sm hover:shadow-md transition-all">
            <Plus className="w-5 h-5" />
            {t("addPromoter")}
        </Button>
      </Link>
    </div>
  );
}
