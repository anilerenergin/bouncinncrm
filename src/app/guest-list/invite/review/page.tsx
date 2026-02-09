"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import { MoveLeft, Send } from "lucide-react";
import { SidebarInset, SidebarTrigger } from "@/src/components/ui/sidebar";
import { Button } from "@/src/components/ui/button";
import { CampaignSummary } from "@/src/components/guest-list/invite/campaign-summary";
import { DeliveryChannels } from "@/src/components/guest-list/invite/delivery-channels";
import { TimingSelection } from "@/src/components/guest-list/invite/timing-selection";

export default function ReviewPage() {
  const t = useTranslations("Review");
  
  const [repeat, setRepeat] = useState(false);
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(true);
  const [timing, setTiming] = useState("immediately");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  return (
    <SidebarInset className="bg-[#EBEBEB]">
      <div className="flex-1 overflow-y-auto">
        {/* Mobile Sidebar Trigger */}
        <div className="flex items-center gap-2 p-4 lg:hidden border-b border-border">
          <SidebarTrigger />
          <h1 className="text-lg font-bold">{t("title")}</h1>
        </div>

        <div className="w-full max-w-[1400px] px-8 pt-10 pb-8">
          {/* Top Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
                {t("title")}
              </h1>
              <p className="text-sm font-semibold text-gray-400">
                {t("subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-6">
                <Link 
                  href="/guest-list/invite/segmentation" 
                  className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
                >
                  <MoveLeft className="w-4 h-4" />
                  {t("back")}
                </Link>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-20 items-start pt-8">
            {/* Left Column: Campaign Details */}
            <div className="w-full lg:w-[500px]">
              <CampaignSummary 
                 repeat={repeat} 
                 onRepeatChange={setRepeat} 
              />
            </div>

            {/* Right Column: Actions & Configuration */}
            <div className="flex-1 space-y-12 w-full max-w-[600px]">
                <DeliveryChannels 
                   email={email}
                   push={push}
                   onEmailChange={setEmail}
                   onPushChange={setPush}
                />

                <TimingSelection 
                   value={timing}
                   onChange={setTiming}
                   date={scheduledDate}
                   onDateChange={setScheduledDate}
                   time={scheduledTime}
                   onTimeChange={setScheduledTime}
                />

                {/* Final Actions */}
                <div className="flex items-center justify-end gap-6 pt-8 border-t border-gray-100 pb-12">
                    <Link href="/guest-list" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">
                        {t("cancel")}
                    </Link>
                    <Button className="bg-[#F2FD0A] text-black hover:bg-[#F2FD0A]/90 font-bold h-14 px-10 rounded-2xl gap-3 text-base shadow-sm hover:shadow-md transition-all">
                        <Send className="w-5 h-5" />
                        {t("sendInvites", { count: 450 })}
                    </Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
