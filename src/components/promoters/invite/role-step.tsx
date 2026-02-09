"use client";

import { useTranslations } from "next-intl";
import { Mail, Shield, UserCog, Megaphone, Eye, Info } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/core/utils/cn";

interface RoleStepProps {
  email: string;
  role: string | null;
  onRoleChange: (role: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const ROLES = [
  { id: "admin", icon: Shield, titleKey: "admin", descKey: "adminDesc" },
  { id: "manager", icon: UserCog, titleKey: "manager", descKey: "managerDesc" },
  { id: "promoter", icon: Megaphone, titleKey: "promoter", descKey: "promoterDesc" },
  { id: "viewer", icon: Eye, titleKey: "viewer", descKey: "viewerDesc" },
];

export function RoleStep({ email, role, onRoleChange, onBack, onSubmit }: RoleStepProps) {
  const t = useTranslations("PromoterInvite");

  return (
    <div className="bg-[#FFFFF7] rounded-3xl p-8 border border-[#FAFAEA] shadow-sm">
      {/* Email Summary Card */}
      <div className="bg-[#FAFAEA] rounded-xl p-4 flex items-center justify-between mb-8 border border-[#EBEBE0]">
        <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-[#EBEBE0] flex items-center justify-center">
                <Mail className="w-5 h-5 text-gray-600" />
            </div>
            <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{t("inviting")}</p>
                <p className="font-bold text-gray-900">{email}</p>
            </div>
        </div>
        <button onClick={onBack} className="text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">
            {t("editEmail")}
        </button>
      </div>

      <h3 className="font-bold text-gray-900 mb-4">{t("selectAccess")}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ROLES.map((item) => (
            <div 
                key={item.id}
                onClick={() => onRoleChange(item.id)}
                className={cn(
                    "relative p-6 rounded-2xl border-2 cursor-pointer transition-all hover:bg-[#FAFAEA]",
                    role === item.id 
                        ? "border-[#F2FD0A] bg-[#FAFAEA]" 
                        : "border-gray-100 bg-white"
                )}
            >
                <div className="flex justify-between items-start mb-3">
                    <div className="h-10 w-10 rounded-lg bg-[#F2FD0A]/20 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-gray-900" />
                    </div>
                    <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        role === item.id ? "border-black" : "border-gray-200"
                    )}>
                        {role === item.id && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                    </div>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{t(item.titleKey)}</h4>
                <p className="text-xs font-medium text-gray-500 leading-relaxed">{t(item.descKey)}</p>
            </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs font-bold text-gray-500">
        <Info className="w-4 h-4" />
        {t("permissionsMatrix")}
      </div>

      <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100">
        <button onClick={onBack} className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">
            {t("back")}
        </button>
        <Button 
            onClick={onSubmit}
            disabled={!role}
            className="bg-[#F2FD0A] text-black hover:bg-[#F2FD0A]/90 font-bold h-12 px-8 rounded-xl text-sm shadow-sm transition-all"
        >
            {t("sendInvite")}
        </Button>
      </div>
    </div>
  );
}
