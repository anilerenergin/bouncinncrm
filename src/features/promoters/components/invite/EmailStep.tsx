"use client";

import { useTranslations } from "next-intl";
import { Mail, ArrowRight, Info } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import Link from "next/link";

interface EmailStepProps {
    email: string;
    onEmailChange: (email: string) => void;
    onNext: () => void;
}

export function EmailStep({ email, onEmailChange, onNext }: EmailStepProps) {
    const t = useTranslations("PromoterInvite");

    return (
        <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[32px] p-8 border-none shadow-xl">
            <h1 className="text-3xl font-black text-foreground mb-2 tracking-tight">
                {t("emailHeadline")}
            </h1>
            <p className="text-muted-foreground font-medium mb-8 max-w-md leading-relaxed">
                {t("emailDesc")}
            </p>

            <div className="space-y-4">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] block pl-1">
                    {t("emailLabel")}
                </label>

                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                        placeholder={t("emailPlaceholder")}
                        className="pl-12 h-14 bg-white/50 dark:bg-zinc-900/50 border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground font-bold rounded-2xl text-lg transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest pl-1">
                    <Info className="w-3.5 h-3.5" />
                    {t("disclaimer")}
                </div>
            </div>

            <div className="mt-12 flex items-center justify-between pt-8 border-t border-border/50">
                <Link href="/promoters" className="text-xs font-black text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.2em]">
                    {t("cancel")}
                </Link>
                <Button
                    onClick={onNext}
                    disabled={!email}
                    className="bg-primary text-primary-foreground hover:opacity-90 font-black h-14 px-10 rounded-2xl gap-2 text-sm shadow-lg shadow-primary/20 transition-all uppercase tracking-widest"
                >
                    {t("continue")}
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </Card>
    );
}
