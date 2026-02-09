"use client";

import { Card } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Users, Filter, Star } from "lucide-react";

export function TargetAudience() {
    return (
        <Card className="p-8 rounded-[32px] border-none shadow-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm space-y-8">
            <div className="space-y-2 pb-5 border-b border-border">
                <h2 className="text-xl font-black tracking-tight text-foreground flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    Target Audience
                </h2>
            </div>

            <div className="space-y-6">
                <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                        Gender Preference
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                        {['All', 'Female', 'Male'].map((gender) => (
                            <button key={gender} className="h-12 rounded-xl bg-muted/30 hover:bg-primary hover:text-white transition-all text-xs font-black uppercase tracking-widest border border-transparent shadow-sm">
                                {gender}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                        Age Group
                    </Label>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="h-2 w-full bg-muted rounded-full relative overflow-hidden mt-4">
                            <div className="absolute inset-y-0 left-1/4 right-1/4 bg-primary shadow-lg shadow-primary/20" />
                        </div>
                        <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest pt-2">
                            <span>18 YEARS</span>
                            <span>55+ YEARS</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 pt-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                        Member Tier
                    </Label>
                    <div className="space-y-2">
                        {[
                            { label: 'High Spenders', icon: Star, color: 'text-amber-500' },
                            { label: 'Active This Month', icon: Filter, color: 'text-blue-500' }
                        ].map((tier) => (
                            <div key={tier.label} className="flex items-center justify-between p-4 rounded-2xl bg-muted/10 border border-border group hover:border-primary/30 transition-all cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <tier.icon className={`w-4 h-4 ${tier.color}`} />
                                    <span className="text-xs font-bold">{tier.label}</span>
                                </div>
                                <div className="h-5 w-5 rounded-full border-2 border-muted group-hover:border-primary transition-all" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}
