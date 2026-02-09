"use client";

import { useTranslations } from "next-intl";
import { Mail, Bell } from "lucide-react";
import { Switch } from "@/src/components/ui/switch";

interface DeliveryChannelsProps {
  email: boolean;
  push: boolean;
  onEmailChange: (val: boolean) => void;
  onPushChange: (val: boolean) => void;
}

export function DeliveryChannels({ email, push, onEmailChange, onPushChange }: DeliveryChannelsProps) {
  const t = useTranslations("Review");

  return (
    <div className="space-y-4">
      {/* Email Invite Card */}
      <div className="bg-[#F9FAFB] p-6 rounded-3xl border border-transparent shadow-sm flex items-center justify-between transition-all has-[:checked]:bg-white has-[:checked]:border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-50 shadow-sm">
            <Mail className="w-6 h-6 text-gray-900" />
          </div>
          <div>
            <p className="font-bold text-gray-900 leading-tight">{t("emailInvite")}</p>
            <p className="text-[11px] text-gray-400 font-medium">{t("emailSubject")}</p>
            <button className="text-[10px] font-extrabold text-gray-900 underline mt-1">{t("previewEmail")}</button>
          </div>
        </div>
        <Switch 
          checked={email} 
          onCheckedChange={onEmailChange} 
        />
      </div>

      {/* Mobile Push Card */}
      <div className="bg-[#F9FAFB] p-6 rounded-3xl border border-transparent shadow-sm flex items-center justify-between transition-all has-[:checked]:bg-white has-[:checked]:border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-50 shadow-sm">
            <Bell className="w-6 h-6 text-gray-900" />
          </div>
          <div>
            <p className="font-bold text-gray-900 leading-tight">{t("mobilePush")}</p>
            <p className="text-[11px] text-gray-400 font-medium">{t("pushMessage")}</p>
            <button className="text-[10px] font-extrabold text-gray-900 underline mt-1">{t("previewPush")}</button>
          </div>
        </div>
        <Switch 
          checked={push} 
          onCheckedChange={onPushChange} 
        />
      </div>
    </div>
  );
}
