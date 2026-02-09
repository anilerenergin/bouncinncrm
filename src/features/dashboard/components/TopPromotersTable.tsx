"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { useDashboard } from "@/src/features/dashboard/hooks/use-dashboard";
import { Progress } from "@/src/components/ui/progress";
import { Trophy } from "lucide-react";

export function TopPromotersTable() {
    const { topPromoters, loading } = useDashboard();

    if (loading) {
        return (
            <Card className="mb-6 border-none shadow-md bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Top Promoters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 w-full bg-muted/50 dark:bg-zinc-800/50 animate-pulse rounded-xl" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mb-6 border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <Trophy className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold">Top Performance</CardTitle>
                        <CardDescription>Highest converting promoters this week</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {topPromoters.map((promoter, index) => (
                        <div
                            key={promoter.id}
                            className="flex items-center p-4 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-all group border border-transparent hover:border-border/50"
                        >
                            <div className="mr-4 flex-shrink-0 w-6 text-center font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                #{index + 1}
                            </div>

                            <Avatar className="h-10 w-10 ring-2 ring-offset-2 ring-offset-background ring-transparent group-hover:ring-primary/20 transition-all">
                                <AvatarImage src={promoter.avatar || ""} alt={promoter.name} />
                                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                    {promoter.initials}
                                </AvatarFallback>
                            </Avatar>

                            <div className="ml-4 space-y-1 w-48">
                                <p className="text-sm font-semibold leading-none">{promoter.name}</p>
                                <p className="text-xs text-muted-foreground">{promoter.role}</p>
                            </div>

                            <div className="flex-1 px-4 grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <p className="text-lg font-bold text-foreground">{promoter.invited}</p>
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Invited</p>
                                </div>
                                <div className="text-center relative">
                                    <div className="absolute inset-y-0 left-0 w-px bg-border/50" />
                                    <p className="text-lg font-bold text-emerald-600">{promoter.checkedIn}</p>
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">In</p>
                                    <div className="absolute inset-y-0 right-0 w-px bg-border/50" />
                                </div>
                                <div className="flex flex-col justify-center gap-1.5">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Conv.</span>
                                        <span className="text-xs font-bold">{promoter.conversionRate}%</span>
                                    </div>
                                    <Progress value={promoter.conversionRate} className="h-1.5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
