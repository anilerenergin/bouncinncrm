"use client";

import { useTranslations } from "next-intl";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DateSelection } from "@/src/features/guest-list/components/invite/DateSelection";
import { ContactInput } from "@/src/features/guest-list/components/invite/ContactInput";
import { SelectedEventCard } from "@/src/features/guest-list/components/invite/SelectedEventCard";
import { Button } from "@/src/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { SidebarInset, SidebarTrigger } from "@/src/components/ui/sidebar";

function InviteGuestContent() {
  const t = useTranslations("InviteGuest");
  const searchParams = useSearchParams();
  const isBulk = searchParams.get("mode") === "bulk";

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <SidebarInset>
      <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-zinc-950/50 min-h-screen">
        {/* Mobile Sidebar Trigger */}
        <div className="flex items-center gap-2 p-4 lg:hidden border-b border-border bg-white dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-20">
          <SidebarTrigger />
          <h1 className="text-lg font-bold">{isBulk ? t("bulkTitle") || t("title") : t("title")}</h1>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-[1400px] mx-auto w-full px-8 pt-10 pb-16">
            {/* Top Header with Back Button */}
            <div className="mb-12 flex flex-col gap-6">
              <Link
                href="/guest-list"
                className="flex items-center gap-2 text-xs font-black text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.2em]"
              >
                <MoveLeft className="w-4 h-4" />
                {t("backToGuestList")}
              </Link>
              <div>
                <h1 className="text-4xl font-black tracking-tight text-foreground mb-3">
                  {isBulk ? t("bulkTitle") || t("title") : t("title")}
                </h1>
                <p className="text-lg font-medium text-muted-foreground max-w-2xl">
                  {isBulk ? t("bulkSubtitle") || t("subtitle") : t("subtitle")}
                </p>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-16 items-start">
              {/* Left Column: Form Section */}
              <div className="flex-1 space-y-12 w-full max-w-[700px]">
                {/* Date Selection Section */}
                <DateSelection
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />

                {/* Contact Input Section - Hidden in Bulk Mode */}
                {!isBulk && <ContactInput />}

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-10 border-t border-border">
                  <Link href="/guest-list" className="text-xs font-black text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.2em]">
                    {t("cancel")}
                  </Link>

                  {isBulk ? (
                    <Link href="/guest-list/invite/segmentation">
                      <Button className="bg-primary text-primary-foreground hover:opacity-90 font-black h-16 px-12 rounded-2xl gap-3 text-base shadow-lg shadow-primary/20 transition-all uppercase tracking-widest">
                        {t("next") || "Next"}
                        <MoveRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  ) : (
                    <Button className="bg-primary text-primary-foreground hover:opacity-90 font-black h-16 px-12 rounded-2xl gap-3 text-base shadow-lg shadow-primary/20 transition-all uppercase tracking-widest">
                      {t("send")}
                      <MoveRight className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Right Column: Event Summary - Sticky on desktop */}
              <div className="w-full xl:w-[450px] xl:sticky xl:top-8">
                <SelectedEventCard date={selectedDate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}

export default function InviteGuestPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground font-bold">Loading Invitation Flow...</div>}>
      <InviteGuestContent />
    </Suspense>
  );
}
