"use client";

import { useTranslations } from "next-intl";

interface InviteProgressProps {
    currentStep: number;
    totalSteps: number;
}

export function InviteProgress({ currentStep, totalSteps }: InviteProgressProps) {
    const t = useTranslations("PromoterInvite");

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                <span>{t("step", { current: currentStep, total: totalSteps })}</span>
                <span className="text-primary">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(242,253,10,0.5)]"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
            </div>
        </div>
    );
}
