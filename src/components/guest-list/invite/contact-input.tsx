"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone } from "lucide-react";

export function ContactInput() {
  const t = useTranslations("InviteGuest");

  return (
    <div className="space-y-6 max-w-[500px]">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900">{t("emailOrPhone")}</h2>
        <p className="text-sm text-gray-500">{t("emailOrPhoneSubtitle")}</p>
      </div>

      <div className="space-y-5">
        {/* Email Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
            {t("emailLabel")}
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#EAB308]">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#EAB308]" />
            </div>
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="w-full h-14 pl-12 pr-4 bg-[#FFFEF0] border border-[#EBECC0] rounded-2xl focus:outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]/20 text-gray-800 placeholder:text-gray-400 transition-all font-medium"
            />
          </div>
        </div>

        {/* Phone Input */}
        <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                {t("phoneLabel")}
            </label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#EAB308]">
                <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-[#EAB308]" />
                </div>
                <input
                type="tel"
                placeholder={t("phonePlaceholder")}
                className="w-full h-14 pl-12 pr-4 bg-[#FFFEF0] border border-[#EBECC0] rounded-2xl focus:outline-none focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308]/20 text-gray-800 placeholder:text-gray-400 transition-all font-medium"
                />
            </div>
        </div>
      </div>
    </div>
  );
}
