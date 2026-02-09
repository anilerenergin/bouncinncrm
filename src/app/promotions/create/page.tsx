"use client";

import { SidebarInset, SidebarTrigger } from "@/src/components/ui/sidebar";
import { Button } from "@/src/components/ui/button";
import { OfferDetails } from "@/src/features/promotions/components/create/offer-details";
import { TargetAudience } from "@/src/features/promotions/components/create/target-audience";
import { DirectTargeting } from "@/src/features/promotions/components/create/direct-targeting";
import { useTranslations } from "next-intl";
import { Save, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CreatePromotionPage() {
  const t = useTranslations("PromotionCreate");

  return (
    <SidebarInset>
      <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-zinc-950/50 min-h-screen">
        {/* Mobile Sidebar Trigger */}
        <div className="flex items-center gap-2 p-4 lg:hidden border-b border-border bg-white dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-20">
          <SidebarTrigger />
          <h1 className="text-lg font-bold">New Promotion</h1>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-[1400px] mx-auto w-full px-8 pt-10 pb-20 space-y-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-6">
                {/* Breadcrumb style */}
                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                  <Link href="/promotions" className="hover:text-primary transition-colors">Promotions</Link>
                  <span className="opacity-20">/</span>
                  <span className="text-foreground">New Campaign</span>
                </div>

                <div>
                  <h1 className="text-4xl font-black tracking-tight text-foreground mb-3 flex items-center gap-3">
                    {t("title")}
                    <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                  </h1>
                  <p className="text-lg font-medium text-muted-foreground max-w-2xl leading-relaxed">
                    {t("subtitle")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/promotions">
                  <Button variant="outline" className="h-14 px-8 rounded-2xl border-border bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm font-black text-[10px] uppercase tracking-widest hover:bg-white dark:hover:bg-zinc-900 transition-all">
                    {t("cancel")}
                  </Button>
                </Link>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-black h-14 px-8 rounded-2xl gap-3 text-sm shadow-lg shadow-primary/20 transition-all uppercase tracking-widest">
                  <Save className="w-5 h-5" />
                  Launch Campaign
                </Button>
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Offer Details (7 cols) */}
              <div className="lg:col-span-7">
                <OfferDetails />
              </div>

              {/* Right Column: Targeting (5 cols) */}
              <div className="lg:col-span-5 space-y-8">
                <TargetAudience />
                <DirectTargeting />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
