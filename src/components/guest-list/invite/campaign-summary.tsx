"use client";

import { useTranslations } from "next-intl";
import { Calendar, MapPin, Users, RefreshCw } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Switch } from "@/src/components/ui/switch";

interface CampaignSummaryProps {
  repeat: boolean;
  onRepeatChange: (val: boolean) => void;
}

export function CampaignSummary({ repeat, onRepeatChange }: CampaignSummaryProps) {
  const t = useTranslations("Review");

  return (
    <div className="space-y-8 w-full max-w-[500px]">
      {/* Event Details Card */}
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col">
        <div className="h-48 bg-gray-200 relative flex items-center justify-center overflow-hidden">
            <span className="text-gray-400 font-bold text-sm tracking-widest uppercase">Nightclub Crowd with Neon Lights</span>
            <div className="absolute top-4 left-4">
                <Badge className="bg-[#F2FD0A] text-black hover:bg-[#F2FD0A]/90 font-extrabold uppercase text-[10px] px-3 py-1 rounded-lg">
                    {t("upcoming")}
                </Badge>
            </div>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">Neon Nights Opening Party</h2>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-bold">Oct 24, 2023 • 10:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-semibold italic">The Grand Hall, Downtown</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-50 space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400">{t("campaignName")}</span>
                <span className="text-sm font-extrabold text-gray-900 uppercase">VIP Blast - Group A</span>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400">{t("guestTier")}</span>
                <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-none font-bold text-[10px] px-3 py-1 rounded-lg">
                   VIP Tier 1
                </Badge>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400">{t("totalRecipients")}</span>
                <div className="flex items-center gap-2 text-[#F59E0B]">
                    <Users className="w-4 h-4 fill-current" />
                    <span className="text-sm font-extrabold">450 {t("guests")}</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Repeat Toggle Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-gray-900" />
          </div>
          <div>
            <p className="font-bold text-gray-900">{t("repeat")}</p>
            <p className="text-xs text-gray-400 font-medium">{t("repeatDesc")}</p>
          </div>
        </div>
        <Switch 
          checked={repeat} 
          onCheckedChange={onRepeatChange} 
          className="data-[state=checked]:bg-[#F2FD0A] data-[state=unchecked]:bg-gray-200"
        />
      </div>
    </div>
  );
}
