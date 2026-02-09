"use client";

import { useTranslations } from "next-intl";

interface InviteProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function InviteProgress({ currentStep, totalSteps }: InviteProgressProps) {
  const t = useTranslations("PromoterInvite");
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {t("step", { current: currentStep, total: totalSteps })}
          </p>
          <h2 className="text-sm font-bold text-gray-900 mt-1">
            {currentStep === 1 ? t("step1Title") : t("step2Title")}
          </h2>
        </div>
        <span className="text-xs font-bold text-gray-900">{Math.round(progressPercentage)}%</span>
      </div>
      
      <div className="h-1.5 w-full bg-[#FAFAEA] rounded-full overflow-hidden">
        <div 
            className="h-full bg-[#F2FD0A] transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
