"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone } from "lucide-react";
import { Input } from "@/src/components/ui/input";

export function ContactInput() {
    const t = useTranslations("InviteGuest");

    return (
        <div className="space-y-6 max-w-[500px]">
            <div className="space-y-1">
                <h2 className="text-xl font-bold text-foreground">{t("emailOrPhone")}</h2>
                <p className="text-sm text-muted-foreground">{t("emailOrPhoneSubtitle")}</p>
            </div>

            <div className="space-y-5">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
                        {t("emailLabel")}
                    </label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-primary">
                            <Mail className="h-5 w-5 text-muted-foreground group-focus-within:text-primary" />
                        </div>
                        <Input
                            type="email"
                            placeholder={t("emailPlaceholder")}
                            className="pl-12 h-14 bg-white/50 dark:bg-zinc-900/50 border-border focus:border-primary/50 transition-all font-medium rounded-2xl"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
                        {t("phoneLabel")}
                    </label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-primary">
                            <Phone className="h-5 w-5 text-muted-foreground group-focus-within:text-primary" />
                        </div>
                        <Input
                            type="tel"
                            placeholder={t("phonePlaceholder")}
                            className="pl-12 h-14 bg-white/50 dark:bg-zinc-900/50 border-border focus:border-primary/50 transition-all font-medium rounded-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
