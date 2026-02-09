"use client";

import { useTranslations } from "next-intl";
import { MoreVertical, Calendar, MapPin, Flame, Share2, Eye, Users } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/core/utils/cn";
import { Card } from "@/src/components/ui/card";

interface PromotionCardProps {
    status: "active" | "scheduled" | "completed";
    isHot?: boolean;
    title: string;
    description: string;
    date: string;
    location: string;
    color: string; // Background color for the image placeholder
    imageText?: string;
}

export function PromotionCard({ status, isHot, title, description, date, location, color, imageText }: PromotionCardProps) {
    const t = useTranslations("Promotions");

    return (
        <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[32px] overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all group flex flex-col">
            {/* Image / Header Area */}
            <div
                className="h-52 w-full relative p-6 flex flex-col justify-between overflow-hidden"
            >
                {/* Background Gradient & Pattern */}
                <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundColor: color }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Mock Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                <div className="flex justify-between items-start relative z-10">
                    <div className="flex gap-2">
                        <Badge
                            className={cn(
                                "rounded-xl px-4 py-1.5 font-black text-[9px] uppercase tracking-[0.2em] border-none shadow-lg",
                                status === "active" ? "bg-primary text-primary-foreground" : "bg-white/20 backdrop-blur-md text-white"
                            )}
                        >
                            {status === "active" ? t("active") : t("scheduled")}
                        </Badge>

                        {isHot && (
                            <Badge className="bg-rose-500 text-white rounded-xl px-3 py-1.5 flex items-center gap-1.5 font-black text-[9px] uppercase tracking-[0.2em] border-none shadow-lg animate-pulse">
                                <Flame className="w-3 h-3 fill-white" />
                                Hot
                            </Badge>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 flex items-center justify-center transition-all shadow-lg border border-white/10">
                            <Share2 className="w-4 h-4 text-white" />
                        </button>
                        <button className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 flex items-center justify-center transition-all shadow-lg border border-white/10">
                            <MoreVertical className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>

                <div className="relative z-10 flex items-end justify-between">
                    {imageText && (
                        <p className="text-white/90 text-[10px] font-bold max-w-[70%] leading-relaxed bg-black/20 backdrop-blur-sm p-2 rounded-lg border border-white/10 uppercase tracking-widest">
                            {imageText}
                        </p>
                    )}
                    <div className="flex items-center gap-1.5 text-white/80 font-black text-[10px] uppercase tracking-widest">
                        <Eye className="w-4 h-4" />
                        2.4k
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {date}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        {location}
                    </div>
                </div>

                <h3 className="text-xl font-black text-foreground mb-3 leading-tight tracking-tight group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <p className="text-sm font-medium text-muted-foreground leading-relaxed line-clamp-3 mb-8">
                    {description}
                </p>

                <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                            {t("claimedBy", { count: 124 })}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
