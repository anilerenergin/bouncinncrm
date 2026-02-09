"use client";

import { useTranslations } from "next-intl";
import { Clock, MapPin, Share2, Users, Receipt, Calendar } from "lucide-react";
import { Card } from "@/src/components/ui/card";

export function SelectedEventCard({ date }: { date: Date | undefined }) {
    const t = useTranslations("InviteGuest");

    const event = {
        title: "Neon Retro Night",
        date: "Sat, Nov 18",
        time: "22:00 - 04:00",
        venue: "Main Room",
        capacity: "850 Guests",
        guestlist: "Open",
    };

    return (
        <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[32px] overflow-hidden shadow-xl border-none flex flex-col h-fit">
            <div className="flex items-center justify-between px-8 py-6">
                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t("selectedEvent")}</h3>
                <button className="text-sm font-bold text-primary hover:opacity-80 transition-all">
                    {t("editEvent")}
                </button>
            </div>

            <div className="mx-6 h-44 bg-gradient-to-br from-primary/20 to-indigo-500/20 rounded-2xl relative overflow-hidden group border border-primary/10">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 rounded-full bg-white/20 backdrop-blur-md">
                        <Calendar className="w-8 h-8 text-primary" />
                    </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{t("confirmedFeature")}</span>
                </div>
            </div>

            <div className="p-8 space-y-8">
                <div className="flex items-start justify-between">
                    <h2 className="text-2xl font-black text-foreground leading-tight tracking-tight">{event.title}</h2>
                    <button className="p-2 hover:bg-muted rounded-full transition-colors border border-border">
                        <Share2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-y-8">
                    <div className="space-y-1">
                        <span className="text-[9px] uppercase font-black text-muted-foreground tracking-[0.2em]">Date</span>
                        <p className="font-bold text-primary text-sm">
                            {date ? date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : event.date}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <span className="text-[9px] uppercase font-black text-muted-foreground tracking-[0.2em]">{t("time")}</span>
                        <p className="font-bold text-sm text-foreground">{event.time}</p>
                    </div>

                    <div className="space-y-1">
                        <span className="text-[9px] uppercase font-black text-muted-foreground tracking-[0.2em]">{t("venue")}</span>
                        <p className="font-bold text-sm text-foreground">{event.venue}</p>
                    </div>

                    <div className="space-y-1">
                        <span className="text-[9px] uppercase font-black text-muted-foreground tracking-[0.2em]">{t("capacity")}</span>
                        <p className="font-bold text-sm text-foreground">{event.capacity}</p>
                    </div>
                </div>
            </div>

            <div className="px-8 py-5 bg-primary/5 border-t border-primary/10 flex items-center justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                <div>{t("invitesSent")}: <span className="text-primary ml-1">0</span></div>
                <div>{t("rsvp")}: <span className="text-primary ml-1">0</span></div>
            </div>
        </Card>
    );
}
