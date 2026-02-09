import { GuestListStats as IGuestListStats } from "../types/guest-list-types";
import { Card } from "@/src/components/ui/card";
import { CheckCircle2, Ticket, UserX, Users } from "lucide-react";

interface GuestListStatsProps {
    stats: IGuestListStats | null;
    isLoading: boolean;
}

export function GuestListStats({ stats, isLoading }: GuestListStatsProps) {
    if (isLoading || !stats) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-28 rounded-xl bg-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    const items = [
        {
            label: "Total Guests",
            value: stats.totalInvited.toLocaleString(),
            subValue: `Cap: ${stats.capacity.toLocaleString()}`,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
            gradient: "from-blue-500 to-indigo-600",
        },
        {
            label: "Checked In",
            value: stats.checkedIn.toLocaleString(),
            subValue: `${Math.round((stats.checkedIn / stats.totalInvited) * 100)}% Arrival`,
            icon: CheckCircle2,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            gradient: "from-emerald-500 to-teal-600",
        },
        {
            label: "Invited",
            value: (stats.totalInvited - stats.checkedIn - stats.noShows).toLocaleString(),
            subValue: "Pending Arrival",
            icon: Ticket,
            color: "text-purple-600",
            bg: "bg-purple-50",
            gradient: "from-violet-500 to-purple-600",
        },
        {
            label: "No Shows",
            value: stats.noShows.toString(),
            subValue: `${stats.noShowRate}% Rate`,
            icon: UserX,
            color: "text-rose-600",
            bg: "bg-rose-50",
            gradient: "from-rose-500 to-pink-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {items.map((item) => (
                <Card
                    key={item.label}
                    className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80"
                >
                    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${item.color}`}>
                        <item.icon className="w-24 h-24 transform translate-x-4 -translate-y-4" />
                    </div>

                    <div className="px-5 pt-5 pb-5 relative z-10">
                        <div className={`w-10 h-10 rounded-2xl shadow-sm ${item.bg} flex items-center justify-center mb-3`}>
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                        </div>

                        <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">{item.label}</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-bold tracking-tight text-foreground">
                                {item.value}
                            </h3>
                            <span className="text-sm font-medium text-muted-foreground">{item.subValue}</span>
                        </div>
                    </div>

                    <div className={`h-1 w-full absolute bottom-0 bg-gradient-to-r opacity-80 ${item.gradient}`} />
                </Card>
            ))}
        </div>
    );
}
