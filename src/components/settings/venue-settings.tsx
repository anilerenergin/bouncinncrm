"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Card, CardContent } from "@/src/components/ui/card";
import { Slider } from "../ui/slider";
import { Users, Upload, Store, User, Phone, Mail, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/core/utils/cn";

export function VenueSettings() {
  const t = useTranslations("SettingsPage");
  const [personLimit, setPersonLimit] = useState([350]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Left Column */}
      <div className="space-y-8 lg:col-span-1">
        {/* Person Limit Card */}
        <Card className="border border-border/40 shadow-2xl bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl rounded-3xl overflow-hidden">
          <CardContent className="p-8 space-y-8">
            <div className="h-32 w-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/10">
              <Users className="w-12 h-12 text-primary/40" />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-black text-xs uppercase tracking-widest text-foreground">{t("personLimit")}</span>
                </div>
                <div className="bg-primary text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-lg shadow-primary/20">
                  {personLimit}
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <Slider
                  value={personLimit}
                  onValueChange={setPersonLimit}
                  max={10000}
                  step={10}
                  className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:bg-white [&_[role=slider]]:border-primary [&_[role=slider]]:border-4 [&_[role=slider]]:shadow-xl [&_.relative]:bg-muted [&_[data-orientation=horizontal]]:bg-primary"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-black uppercase tracking-tighter">
                  <span>0</span>
                  <span>10000+</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Card */}
        <Card className="border border-border/40 shadow-2xl bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl rounded-3xl overflow-hidden">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
              <span className="font-black text-xs uppercase tracking-widest text-foreground">{t("billingPlan")}</span>
            </div>

            <div className="bg-muted/50 dark:bg-zinc-900/50 border border-border/40 rounded-2xl p-5 flex justify-between items-center group transition-all hover:bg-muted dark:hover:bg-zinc-900">
              <span className="font-bold text-sm">{t("subscription")}</span>
              <span className="text-[9px] bg-green-500/10 text-green-500 font-black px-3 py-1 rounded-full border border-green-500/20 uppercase tracking-widest">
                {t("active")}
              </span>
            </div>

            <div className="text-[11px] space-y-2 text-muted-foreground font-semibold uppercase tracking-widest opacity-80 pl-1">
              <p>{t("nextBilling")} : <span className="text-foreground">{t("datePlaceholder") || "Nov 24, 2023"}</span></p>
              <p>{t("paymentMethod")} : <span className="text-foreground">Visa •••• 4242</span></p>
            </div>

            <Button variant="outline" className="w-full bg-transparent border-2 border-primary/20 text-primary hover:bg-primary hover:text-white font-black h-12 rounded-xl transition-all duration-300">
              {t("managePayment")}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Basic Setup */}
      <div className="lg:col-span-3">
        <Card className="border border-border/40 shadow-2xl bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl rounded-3xl overflow-hidden">
          <CardContent className="p-10 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-6 w-1.5 bg-primary rounded-full" />
                <h3 className="text-xl font-black text-foreground tracking-tight">{t("basicSetup")}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Brand Name */}
                <div className="space-y-3">
                  <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground pl-1">{t("brandName")}</Label>
                  <Input
                    placeholder="Bouncinn Club"
                    className="bg-muted/30 dark:bg-zinc-900/40 border-border/40 h-14 rounded-2xl text-base font-bold focus-visible:ring-primary/20 focus-visible:border-primary transition-all px-6"
                  />
                  <p className="text-[11px] text-muted-foreground/60 font-medium pl-1 italic">{t("brandNameHelp")}</p>
                </div>

                {/* Cover Photo */}
                <div className="space-y-3">
                  <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground pl-1">{t("coverPhoto")}</Label>
                  <div className="border-2 border-dashed border-border/40 rounded-2xl bg-muted/20 dark:bg-zinc-900/20 h-36 flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group overflow-hidden relative">
                    <Upload className="w-6 h-6 mb-2 text-muted-foreground group-hover:text-primary transition-all group-hover:-translate-y-1" />
                    <span className="text-sm font-bold text-foreground transition-all group-hover:scale-105">{t("dragDrop")}</span>
                    <span className="text-[10px] font-medium tracking-widest uppercase opacity-60">{t("rec")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent w-full" />

            {/* Contact Details */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-3">
                {t("contactDetails")}
                <div className="h-px flex-1 bg-primary/10" />
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">{t("managerName")}</Label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                      defaultValue="John Doe"
                      className="pl-14 bg-muted/30 dark:bg-zinc-900/40 border-border/40 h-12 rounded-xl text-sm font-bold focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">{t("phone")}</Label>
                  <div className="relative group">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                      defaultValue="+1 (555) 000-0000"
                      className="pl-14 bg-muted/30 dark:bg-zinc-900/40 border-border/40 h-12 rounded-xl text-sm font-bold focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">{t("email")}</Label>
                  <div className="relative opacity-60 grayscale-[0.5]">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      defaultValue="manager@venue.com"
                      className="pl-14 bg-muted/50 dark:bg-zinc-900/60 border-border/40 h-12 rounded-xl text-sm font-bold cursor-not-allowed"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Presence */}
            <div className="space-y-8 pt-4">
              <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-3">
                {t("social")}
                <div className="h-px flex-1 bg-primary/10" />
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-muted/30 dark:bg-zinc-900/40 border border-border/40 text-foreground h-12 rounded-xl flex items-center px-6 text-sm font-bold hover:bg-muted/50 transition-all cursor-pointer">
                  <span className="text-primary mr-2 italic">@</span> instagram_handle
                </div>
                <div className="bg-muted/30 dark:bg-zinc-900/40 border border-border/40 text-foreground h-12 rounded-xl flex items-center px-6 text-sm font-bold hover:bg-muted/50 transition-all cursor-pointer">
                  https://www.yourvenue.com
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-8 pt-8">
              <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-3">
                {t("location")}
                <div className="h-px flex-1 bg-primary/10" />
              </h4>
              <div className="h-64 bg-zinc-200 dark:bg-zinc-900 rounded-3xl relative overflow-hidden group border border-border/40 shadow-inner">
                {/* Placeholder for premium map */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950 flex items-center justify-center opacity-80">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                  <MapPin className="w-12 h-12 text-primary opacity-20 group-hover:scale-125 group-hover:opacity-40 transition-all duration-700 hover:rotate-12" />
                </div>

                <div className="absolute inset-x-6 bottom-6 group-hover:translate-y-[-4px] transition-transform duration-500">
                  <div className="relative filter drop-shadow-2xl">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary z-10" />
                    <Input
                      defaultValue="123 Nightclub Ave, New York, NY 10012"
                      className="pl-14 pr-14 bg-white/95 dark:bg-zinc-900/95 border-none shadow-2xl h-14 rounded-2xl text-sm font-black text-foreground focus-visible:ring-primary/20"
                    />
                    <div className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center bg-primary text-white rounded-xl shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                      <Search className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
