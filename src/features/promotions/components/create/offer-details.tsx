"use client";

import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { useTranslations } from "next-intl";
import { Tag, FileText, Image as ImageIcon } from "lucide-react";

export function OfferDetails() {
    const t = useTranslations("PromotionCreate");

    return (
        <Card className="p-10 rounded-[32px] border-none shadow-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm space-y-10">
            <div className="space-y-2 pb-6 border-b border-border">
                <h2 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-3">
                    <Tag className="w-6 h-6 text-primary" />
                    Offer Details
                </h2>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest bg-muted/5 w-fit px-2 py-1 rounded">
                    GENERAL CAMPAIGN INFORMATION
                </p>
            </div>

            <div className="space-y-8">
                <div className="space-y-3">
                    <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                        Campaign Title
                    </Label>
                    <Input
                        id="title"
                        placeholder="e.g., Happy Hour 50% Off"
                        className="h-14 rounded-2xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20 text-sm font-bold placeholder:font-medium transition-all"
                    />
                </div>

                <div className="space-y-3">
                    <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        placeholder="Describe your offer in detail..."
                        className="min-h-[160px] rounded-2xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20 text-sm font-bold placeholder:font-medium transition-all resize-none p-4"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <Label htmlFor="startDate" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                            Start Date
                        </Label>
                        <div className="relative">
                            <Input
                                id="startDate"
                                type="date"
                                className="h-14 rounded-2xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20 text-sm font-bold transition-all pl-12"
                            />
                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="endDate" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                            End Date
                        </Label>
                        <div className="relative">
                            <Input
                                id="endDate"
                                type="date"
                                className="h-14 rounded-2xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20 text-sm font-bold transition-all pl-12"
                            />
                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        </div>
                    </div>
                </div>

                <div className="space-y-3 pt-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                        Campaign Banner
                    </Label>
                    <div className="group relative h-48 rounded-3xl border-2 border-dashed border-muted hover:border-primary/40 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer bg-muted/5 hover:bg-muted/10">
                        <div className="h-14 w-14 rounded-2xl bg-muted/20 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <ImageIcon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold">Click to upload or drag & drop</p>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">PNG, JPG up to 10MB</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
