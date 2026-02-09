import { Button } from "@/src/components/ui/button";
import { Calendar, Download, Plus, Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function GuestListHeader() {
    const t = useTranslations("GuestList");

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
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-all text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{t("nextEvent", { name: "Neon Jungle", date: "Oct 14" })}</span>
                    </Button>
                    <Link href="/guest-list/invite">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-lg shadow-primary/20">
                            <Plus className="w-4 h-4" />
                            {t("addGuest")}
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder={t("searchPlaceholder")}
                        className="pl-9 bg-white/5 border-white/10 focus:border-primary/50 transition-colors"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white">
                        <Download className="w-4 h-4 mr-2" />
                        {t("export")} CSV
                    </Button>
                </div>
            </div>
        </div>
    );
}
