"use client";

import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Label } from "@/src/components/ui/label";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/src/core/utils/cn";

interface TimingSelectionProps {
  value: string;
  onChange: (val: string) => void;
  date?: string;
  onDateChange?: (val: string) => void;
  time?: string;
  onTimeChange?: (val: string) => void;
}

export function TimingSelection({ 
  value, 
  onChange,
  date,
  onDateChange,
  time,
  onTimeChange
}: TimingSelectionProps) {
  const t = useTranslations("Review");

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("timing")}</h3>
      
      <div className="bg-white px-8 py-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6">
        <RadioGroup value={value} onValueChange={onChange} className="flex gap-8">
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="immediately" id="immediately" />
            <Label htmlFor="immediately" className="text-sm font-bold text-gray-900 cursor-pointer">{t("sendImmediately")}</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="schedule" id="schedule" />
            <Label htmlFor="schedule" className={cn(
                "text-sm font-bold cursor-pointer transition-colors",
                value === "schedule" ? "text-gray-900" : "text-gray-400"
            )}>{t("scheduleLater")}</Label>
          </div>
        </RadioGroup>

        {/* Conditional Date/Time Picker */}
        {value === "schedule" && (
            <div className="flex gap-4 pt-4 border-t border-gray-50 items-center animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="relative group flex-1">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                    <input 
                        type="date" 
                        value={date}
                        onChange={(e) => onDateChange?.(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-gray-200 outline-none transition-all"
                    />
                </div>
                <div className="relative group w-40">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                    <input 
                        type="time" 
                        value={time}
                        onChange={(e) => onTimeChange?.(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-gray-200 outline-none transition-all"
                    />
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
