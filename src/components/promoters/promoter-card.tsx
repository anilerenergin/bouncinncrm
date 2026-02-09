"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/src/components/ui/collapsible";
import { PromoterAnalytics } from "./promoter-analytics";
import { cn } from "@/src/core/utils/cn";

interface PromoterCardProps {
  promoter: {
    id: string;
    name: string;
    email: string;
    role: string;
    initials: string;
    totalInvited: string;
    checkedIn: string;
    status: "active" | "pending";
    isVerified?: boolean;
  };
  defaultOpen?: boolean;
}

export function PromoterCard({ promoter, defaultOpen = false }: PromoterCardProps) {
  const t = useTranslations("Promoters");
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={cn(
        "group bg-white rounded-[32px] border border-transparent transition-all overflow-hidden",
        isOpen ? "shadow-md pb-4 relative" : "hover:border-gray-100"
    )}>
      {/* Active Indicator Bar */}
      {isOpen && <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-[#F2FD0A] rounded-r-full" />}

      {/* Main Row Header */}
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between p-4 cursor-pointer">
            <div className="flex items-center gap-6 pl-6"> 
                <Avatar className="h-14 w-14 rounded-2xl bg-gray-100 border-none">
                    <AvatarFallback className="bg-gray-200 text-gray-500 font-bold text-lg rounded-2xl">
                        {promoter.initials}
                    </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-gray-900 text-lg">{promoter.name}</h3>
                        {promoter.isVerified && <CheckCircle2 className="w-4 h-4 text-[#F2FD0A] fill-black" />}
                    </div>
                    <p className="text-xs font-semibold text-gray-400">{promoter.email}</p>
                </div>

                <Badge 
                    className={cn(
                        "ml-4 px-4 py-1.5 rounded-full font-bold text-xs pointer-events-none",
                        promoter.role === "Admin" ? "bg-black text-white hover:bg-black" : "bg-[#F3F4F6] text-gray-600 hover:bg-[#F3F4F6] border-none"
                    )}
                >
                    {promoter.role}
                </Badge>
            </div>

            <div className="flex items-center gap-12 pr-4">
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t("totalInvited")}</p>
                    <p className="text-xl font-extrabold text-gray-900">{promoter.totalInvited}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t("checkedIn")}</p>
                    <p className="text-xl font-extrabold text-gray-900">{promoter.checkedIn}</p>
                 </div>

                 <Badge variant="outline" className={cn(
                    "px-4 py-1.5 rounded-full font-bold text-xs border-2 ml-4",
                    promoter.status === "active" ? "bg-black text-white border-black" : "text-gray-400 border-gray-200"
                 )}>
                    {promoter.status === "active" ? t("active") : t("pending")}
                 </Badge>

                 <div className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center transition-transform duration-200 group-data-[state=open]:rotate-180">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                 </div>
            </div>
        </div>
      </CollapsibleTrigger>

      {/* Expanded Content */}
      <CollapsibleContent>
         <div className="px-10 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wide">
                <span className="w-4 h-4"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" /></svg></span>
                {t("performanceAnalytics")}
            </div>
            
            <Button variant="ghost" size="sm" className="bg-gray-50 rounded-full text-xs font-bold text-gray-900 hover:bg-gray-100 gap-2">
                {t("period")}: {t("last30Days")}
                <ChevronDown className="w-3 h-3" />
            </Button>
         </div>

         <PromoterAnalytics />
      </CollapsibleContent>
    </Collapsible>
  );
}
