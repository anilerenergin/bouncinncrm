"use client";

import { useTranslations } from "next-intl";
import { Mail, Shield, UserCog, Megaphone, Eye, Info } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { cn } from "@/src/core/utils/cn";

interface RoleStepProps {
    email: string;
    role: string | null;
    onRoleChange: (role: string) => void;
    onBack: () => void;
    onSubmit: () => void;
}

const ROLES = [
    { id: "admin", icon: Shield, titleKey: "admin", descKey: "adminDesc", gradient: "from-rose-500 to-pink-600" },
    { id: "manager", icon: UserCog, titleKey: "manager", descKey: "managerDesc", gradient: "from-blue-500 to-indigo-600" },
    { id: "promoter", icon: Megaphone, titleKey: "promoter", descKey: "promoterDesc", gradient: "from-primary to-emerald-500" },
    { id: "viewer", icon: Eye, titleKey: "viewer", descKey: "viewerDesc", gradient: "from-muted-foreground to-zinc-500" },
];

export function RoleStep({ email, role, onRoleChange, onBack, onSubmit }: RoleStepProps) {
    const t = useTranslations("PromoterInvite");

    return (
        <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[32px] p-8 border-none shadow-xl">
            {/* Email Summary Card */}
            <div className="bg-muted/50 rounded-2xl p-4 flex items-center justify-between mb-8 border border-border">
                <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 rounded-xl shadow-sm border border-border">
                        <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-bold text-xs uppercase">
                            {email.substring(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">{t("inviting")}</p>
                        <p className="font-bold text-foreground text-sm">{email}</p>
                    </div>
                </div>
                <button onClick={onBack} className="text-[10px] font-black text-primary hover:opacity-80 transition-colors uppercase tracking-widest px-3 py-1.5 rounded-lg hover:bg-primary/10">
                    {t("editEmail")}
                </button>
            </div>

            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-6 pl-1">{t("selectAccess")}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ROLES.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onRoleChange(item.id)}
                        className={cn(
                            "relative p-6 rounded-2xl border-2 cursor-pointer transition-all hover:bg-muted/30 group",
                            role === item.id
                                ? "border-primary bg-primary/5 shadow-lg shadow-primary/5"
                                : "border-border bg-white/50 dark:bg-zinc-900/50"
                        )}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn(
                                "h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-lg",
                                item.gradient && `bg-gradient-to-br ${item.gradient}`
                            )}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                role === item.id ? "border-primary" : "border-border group-hover:border-muted-foreground"
                            )}>
                                {role === item.id && <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_5px_rgba(242,253,10,0.8)]" />}
                            </div>
                        </div>
                        <h4 className="font-black text-foreground text-xs uppercase tracking-widest mb-1.5">{t(item.titleKey)}</h4>
                        <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">
                <Info className="w-3.5 h-3.5" />
                {t("permissionsMatrix")}
            </div>

            <div className="mt-10 flex items-center justify-between pt-8 border-t border-border/50">
                <button onClick={onBack} className="text-xs font-black text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.2em]">
                    {t("back")}
                </button>
                <Button
                    onClick={onSubmit}
                    disabled={!role}
                    className="bg-primary text-primary-foreground hover:opacity-90 font-black h-14 px-10 rounded-2xl text-sm shadow-lg shadow-primary/20 transition-all uppercase tracking-widest"
                >
                    {t("sendInvite")}
                </Button>
            </div>
        </Card>
    );
}
