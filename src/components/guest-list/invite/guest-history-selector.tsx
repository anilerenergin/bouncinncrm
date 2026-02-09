"use client";

import { useTranslations } from "next-intl";
import { History } from "lucide-react";

interface GuestHistorySelectorProps {
  firstTime: boolean;
  returning: boolean;
  onChange: (field: "firstTime" | "returning", val: boolean) => void;
}

export function GuestHistorySelector({ firstTime, returning, onChange }: GuestHistorySelectorProps) {
  const t = useTranslations("Segmentation");

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
      <div className="flex items-center gap-2">
        <History className="w-5 h-5 text-gray-900" />
        <h3 className="font-bold text-gray-900">{t("guestHistory")}</h3>
      </div>

      <div className="space-y-4">
        {/* First-time Guests */}
        <label className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl cursor-pointer group hover:bg-gray-100 transition-all border border-transparent has-[:checked]:border-[#F2FD0A] has-[:checked]:bg-white">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:bg-gray-50 transition-colors">
              <span className="text-xl">👤+</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm leading-tight">{t("firstTimeGuests")}</p>
              <p className="text-[11px] text-gray-400 font-medium">{t("firstTimeGuestsDesc")}</p>
            </div>
          </div>
          <input 
            type="checkbox" 
            checked={firstTime} 
            onChange={(e) => onChange("firstTime", e.target.checked)}
            className="w-5 h-5 accent-[#F2FD0A] rounded cursor-pointer"
          />
        </label>

        {/* Returning Guests */}
        <label className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl cursor-pointer group hover:bg-gray-100 transition-all border border-transparent has-[:checked]:border-[#F2FD0A] has-[:checked]:bg-white">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:bg-gray-50 transition-colors">
              <span className="text-xl">🔄</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm leading-tight">{t("returningGuests")}</p>
              <p className="text-[11px] text-gray-400 font-medium">{t("returningGuestsDesc")}</p>
            </div>
          </div>
          <input 
            type="checkbox" 
            checked={returning} 
            onChange={(e) => onChange("returning", e.target.checked)}
            className="w-5 h-5 accent-[#F2FD0A] rounded cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
}
