"use client";

import { useTranslations } from "next-intl";
import { Plus, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function PromotionsHeader() {
    const t = useTranslations("Promotions");
    const router = useRouter();

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 w-full">
            <div className="space-y-6">
                {/* Breadcrumb style */}
                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                    <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => router.push("/")}>Home</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-foreground">{t("title")}</span>
                </div>

                <div>
                    <h1 className="text-4xl font-black tracking-tight text-foreground mb-3">
                        {t("title")}
                    </h1>
                    <p className="text-lg font-medium text-muted-foreground max-w-2xl leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>
            </div>

            <Link href="/promotions/create">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-black h-14 px-8 rounded-2xl gap-3 text-sm shadow-lg shadow-primary/20 transition-all uppercase tracking-widest">
                    <Plus className="w-5 h-5" />
                    {t("createPromotion")}
                </Button>
            </Link>
        </div>
    );
}
