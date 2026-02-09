"use client";

import { useTranslations } from "next-intl";
import { Mail, ArrowRight, Info } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

interface EmailStepProps {
  email: string;
  onEmailChange: (email: string) => void;
  onNext: () => void;
}

export function EmailStep({ email, onEmailChange, onNext }: EmailStepProps) {
  const t = useTranslations("PromoterInvite");

  return (
    <div className="bg-[#FFFFF7] rounded-3xl p-8 border border-[#FAFAEA] shadow-sm">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        {t("emailHeadline")}
      </h1>
      <p className="text-gray-500 font-medium mb-8 max-w-md leading-relaxed">
        {t("emailDesc")}
      </p>

      <div className="space-y-4">
        <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest block">
            {t("emailLabel")}
        </label>
        
        <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3A328]" />
            <Input 
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="pl-12 h-14 bg-[#FAFAEA] border-[#EBEBE0] focus-visible:ring-[#F2FD0A] focus-visible:border-[#F2FD0A] text-gray-900 placeholder:text-gray-400 font-medium rounded-xl text-lg transition-all"
            />
        </div>
        
        <div className="flex items-center gap-2 text-xs font-semibold text-[#A3A328]">
            <Info className="w-4 h-4 fill-[#A3A328] text-white" />
            {t("disclaimer")}
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between pt-6 border-t border-gray-100">
        <Link href="/promoters" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">
            {t("cancel")}
        </Link>
        <Button 
            onClick={onNext}
            disabled={!email}
            className="bg-[#F2FD0A] text-black hover:bg-[#F2FD0A]/90 font-bold h-12 px-8 rounded-xl gap-2 text-sm shadow-sm transition-all"
        >
            {t("continue")}
            <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
