import { Button } from "@/src/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function PromoterHeader() {
    const t = useTranslations("Promoters");

    return (
        <div className="space-y-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        {t("title")}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {t("subtitle")}
                    </p>
                </div>
                <Link href="/promoters/invite">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4" />
                        {t("addPromoter")}
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder={t("searchPlaceholder")}
                        className="pl-9 bg-white/5 border-white/10 focus:border-primary/50 transition-colors"
                    />
                </div>
            </div>
        </div>
    );
}
