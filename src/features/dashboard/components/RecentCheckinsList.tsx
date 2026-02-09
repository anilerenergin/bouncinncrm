"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { useDashboard } from "@/src/features/dashboard/hooks/use-dashboard";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";

export function RecentCheckinsList() {
    const { recentCheckins, loading } = useDashboard();

    if (loading) {
        return (
            <Card className="border-none shadow-md bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Recent Check-ins</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-muted/50 dark:bg-zinc-800/50 animate-pulse" />
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 w-1/3 bg-muted/50 dark:bg-zinc-800/50 animate-pulse rounded" />
                                    <div className="h-3 w-1/4 bg-muted/50 dark:bg-zinc-800/50 animate-pulse rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-xl font-bold">Recent Check-ins</CardTitle>
                    <CardDescription>Live feed of guest arrivals</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                    View All <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentCheckins.map((checkin) => (
                        <div
                            key={checkin.id}
                            className="flex items-center p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-border/50"
                        >
                            <Avatar className="h-10 w-10 ring-2 ring-background shadow-sm">
                                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-medium text-xs">
                                    {checkin.guestInitials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1 flex-1">
                                <p className="text-sm font-semibold leading-none text-foreground">{checkin.guestName}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>{checkin.age}yo • {checkin.gender}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        via <span className="font-medium text-foreground">{checkin.promoter}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20">
                                    {checkin.status}
                                </Badge>
                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                                    <Clock className="h-3 w-3" />
                                    {checkin.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
