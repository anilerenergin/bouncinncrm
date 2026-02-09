import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Guest } from "../types/guest-list-types";
import { MoreHorizontal, ShieldCheck, Ticket } from "lucide-react";
import { cn } from "@/src/core/utils/cn";
import { useTranslations } from "next-intl";

interface GuestListTableProps {
    guests: Guest[];
    isLoading: boolean;
}

export function GuestListTable({ guests, isLoading }: GuestListTableProps) {
    const t = useTranslations("GuestList");

    if (isLoading) {
        return <div className="h-96 rounded-[32px] bg-white/5 dark:bg-zinc-900/10 animate-pulse border border-border" />;
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'checked-in': return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 border-emerald-500/20";
            case 'confirmed': return "bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-500/25 border-blue-500/20";
            case 'invited': return "bg-purple-500/15 text-purple-600 dark:text-purple-400 hover:bg-purple-500/25 border-purple-500/20";
            case 'no-show': return "bg-rose-500/15 text-rose-600 dark:text-rose-400 hover:bg-rose-500/25 border-rose-500/20";
            default: return "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-500/25 border-zinc-500/20";
        }
    };

    return (
        <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[32px] border-none shadow-xl overflow-hidden">
            <div className="p-8 border-b border-border/50 flex items-center justify-between">
                <h3 className="text-xl font-black flex items-center gap-3 text-foreground tracking-tight">
                    <Ticket className="w-6 h-6 text-primary" />
                    {t("latestGuests")}
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="border-b border-border/50 bg-muted/30">
                            <th className="h-14 px-8 text-left align-middle font-black text-muted-foreground uppercase text-[10px] tracking-[0.2em]">{t("guest")}</th>
                            <th className="h-14 px-8 text-left align-middle font-black text-muted-foreground uppercase text-[10px] tracking-[0.2em]">{t("status")}</th>
                            <th className="h-14 px-8 text-left align-middle font-black text-muted-foreground uppercase text-[10px] tracking-[0.2em]">{t("gender")}</th>
                            <th className="h-14 px-8 text-left align-middle font-black text-muted-foreground uppercase text-[10px] tracking-[0.2em]">{t("age")}</th>
                            <th className="h-14 px-8 text-left align-middle font-black text-muted-foreground uppercase text-[10px] tracking-[0.2em]">{t("promoter")}</th>
                            <th className="h-14 px-8 text-right align-middle font-black text-muted-foreground uppercase text-[10px] tracking-[0.2em]">{t("actions")}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {guests.map((guest) => (
                            <tr key={guest.id} className="group hover:bg-primary/[0.02] dark:hover:bg-primary/[0.05] transition-all duration-300">
                                <td className="p-8 align-middle">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-11 w-11 rounded-2xl border-2 border-white dark:border-zinc-800 shadow-sm">
                                            <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-xs font-black text-zinc-500 dark:text-zinc-400">
                                                {guest.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-foreground group-hover:text-primary transition-colors">{guest.name}</span>
                                            <span className="text-xs font-medium text-muted-foreground">{guest.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-8 align-middle">
                                    <Badge variant="outline" className={cn("rounded-xl px-3 py-1 font-black text-[9px] uppercase tracking-widest border-none shadow-sm", getStatusColor(guest.status))}>
                                        {guest.status.replace('-', ' ')}
                                    </Badge>
                                </td>
                                <td className="p-8 align-middle">
                                    <span className={cn(
                                        "text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border shadow-sm",
                                        guest.gender === 'Female'
                                            ? "border-pink-500/20 bg-pink-500/10 text-pink-500 dark:text-pink-400"
                                            : "border-blue-500/20 bg-blue-500/10 text-blue-500 dark:text-blue-400"
                                    )}>
                                        {guest.gender === 'Female' ? t("female") : t("male")}
                                    </span>
                                </td>
                                <td className="p-8 align-middle text-sm font-bold text-muted-foreground">
                                    {guest.ageGroup}
                                </td>
                                <td className="p-8 align-middle">
                                    <div className="flex items-center gap-2">
                                        {guest.promoter.type === 'vip' && <ShieldCheck className="w-4 h-4 text-amber-500" />}
                                        <span className={cn("text-xs font-black uppercase tracking-widest", guest.promoter.type === 'vip' ? "text-amber-500" : "text-muted-foreground")}>
                                            {guest.promoter.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-8 align-middle text-right">
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
