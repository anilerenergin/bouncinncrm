"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, MoreHorizontal } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/src/components/ui/collapsible";
import { Card } from "@/src/components/ui/card";
import { Promoter } from "../types/promoter-types";
import { cn } from "@/src/core/utils/cn";

interface PromoterCardProps {
    promoter: Promoter;
    defaultOpen?: boolean;
}

export function PromoterCard({ promoter, defaultOpen = false }: PromoterCardProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-4">
            <Card className={cn(
                "relative overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80",
                isOpen && "ring-1 ring-primary/20"
            )}>
                <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-5 cursor-pointer select-none">
                        <div className="flex items-center gap-6">
                            <Avatar className="h-14 w-14 rounded-2xl shadow-sm border border-border">
                                <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-bold text-lg">
                                    {promoter.initials}
                                </AvatarFallback>
                            </Avatar>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-lg text-foreground">{promoter.name}</h3>
                                    {promoter.isVerified && <CheckCircle2 className="w-4 h-4 text-primary fill-primary/10" />}
                                </div>
                                <p className="text-xs font-medium text-muted-foreground">{promoter.email}</p>
                            </div>

                            <Badge variant="outline" className={cn(
                                "ml-4 border font-semibold",
                                promoter.role === "Admin" ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950" : "bg-muted text-muted-foreground"
                            )}>
                                {promoter.role}
                            </Badge>
                        </div>

                        <div className="flex items-center gap-12">
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Invited</p>
                                <p className="text-xl font-bold text-foreground">{promoter.totalInvited.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Checked In</p>
                                <p className="text-xl font-bold text-foreground">{promoter.checkedIn.toLocaleString()}</p>
                            </div>

                            <Badge variant="outline" className={cn(
                                "px-4 py-1 rounded-full font-bold text-xs border uppercase tracking-wider",
                                promoter.status === "active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            )}>
                                {promoter.status}
                            </Badge>

                            <div className={cn(
                                "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-muted",
                                isOpen && "rotate-180 bg-muted"
                            )}>
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <div className="px-5 pb-5 pt-0 border-t border-border/50">
                        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Simplified analytics for now to maintain focus on design consistency */}
                            <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                                <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Conversion Rate</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${promoter.conversionRate}%` }} />
                                    </div>
                                    <span className="text-sm font-bold text-foreground">{promoter.conversionRate}%</span>
                                </div>
                            </div>
                            {/* Placeholder for more analytics */}
                            <div className="p-4 rounded-2xl bg-muted/50 border border-border flex items-center justify-center">
                                <p className="text-xs font-medium text-muted-foreground italic">Charts coming soon...</p>
                            </div>
                            <div className="flex justify-end items-end p-2 px-4">
                                <Button variant="ghost" className="text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 gap-2 font-bold text-xs uppercase tracking-wider">
                                    Suspend Promoter
                                </Button>
                            </div>
                        </div>
                    </div>
                </CollapsibleContent>
            </Card>
        </Collapsible>
    );
}
