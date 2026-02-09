"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";
import { SidebarInset, SidebarTrigger } from "@/src/components/ui/sidebar";
import { Button } from "@/src/components/ui/button";
import { GenderSelector } from "@/src/components/guest-list/invite/gender-selector";
import { AgeRangeSelector } from "@/src/components/guest-list/invite/age-range-selector";
import { GuestHistorySelector } from "@/src/components/guest-list/invite/guest-history-selector";
import { ReachSummaryCard } from "@/src/components/guest-list/invite/reach-summary-card";

export default function SegmentationPage() {
  const t = useTranslations("Segmentation");
  
  const [filters, setFilters] = useState({
    gender: "all",
    age: { min: 21, max: 35 },
    history: { firstTime: true, returning: true }
  });

  return (
    <SidebarInset>
      <div className="flex-1 overflow-y-auto bg-background">
        {/* Mobile Sidebar Trigger */}
        <div className="flex items-center gap-2 p-4 lg:hidden border-b border-border">
          <SidebarTrigger />
          <h1 className="text-lg font-bold">{t("title")}</h1>
        </div>

        <div className="w-full max-w-[1400px] px-8 pt-10 pb-8">
          {/* Top Header */}
          <div className="mb-12 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
                {t("title")}
              </h1>
              <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
                {t("subtitle")}
              </p>
            </div>
            <Link 
              href="/guest-list/invite?mode=bulk" 
              className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
            >
              {t("back")}
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left Column: Form Section */}
            <div className="flex-1 space-y-8 w-full max-w-[700px]">
              <GenderSelector 
                value={filters.gender} 
                onChange={(val) => setFilters({ ...filters, gender: val })} 
              />
              
              <AgeRangeSelector 
                min={filters.age.min} 
                max={filters.age.max} 
                onChange={(min, max) => setFilters({ ...filters, age: { min, max } })} 
              />

              <GuestHistorySelector 
                firstTime={filters.history.firstTime}
                returning={filters.history.returning}
                onChange={(field, val) => setFilters({ 
                  ...filters, 
                  history: { ...filters.history, [field]: val } 
                })}
              />

              {/* Footer Actions */}
              <div className="flex items-center justify-end pt-8 border-t border-gray-100 pb-12">
                  <Link href="/guest-list/invite/review">
                    <Button className="bg-[#F2FD0A] text-black hover:bg-[#F2FD0A]/90 font-bold h-14 px-10 rounded-2xl gap-3 text-base shadow-sm hover:shadow-md transition-all">
                        {t("nextReview")}
                        <MoveRight className="w-5 h-5" />
                    </Button>
                  </Link>
              </div>
            </div>

            {/* Right Column: Reach Summary - Sticky on desktop */}
            <div className="w-full lg:w-[400px] lg:sticky lg:top-8">
              <ReachSummaryCard 
                count={1240} 
                total={1950} 
                matchRate={64} 
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
