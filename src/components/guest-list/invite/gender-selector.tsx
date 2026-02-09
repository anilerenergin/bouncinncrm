"use client";

import { useTranslations } from "next-intl";
import { Mars, Venus, Users } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/src/components/ui/toggle-group";
import { cn } from "@/src/core/utils/cn";

export function GenderSelector({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const t = useTranslations("Segmentation");

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-gray-900" />
        <h3 className="font-bold text-gray-900">{t("gender")}</h3>
      </div>

      <div className="flex justify-center">
        <ToggleGroup
          type="single"
          value={value}
          onValueChange={(val) => val && onChange(val)}
          className="flex gap-4"
        >
          <ToggleGroupItem
            value="male"
            className={cn(
              "w-40 h-32 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-gray-100 bg-white hover:bg-gray-50 transition-all data-[state=on]:border-[#F2FD0A] data-[state=on]:bg-[#F2FD0A]/10",
            )}
          >
            <Mars className="w-6 h-6 text-gray-400 group-data-[state=on]:text-gray-900" />
            <span className="text-sm font-bold text-gray-500 group-data-[state=on]:text-gray-900">{t("male")}</span>
          </ToggleGroupItem>

          <ToggleGroupItem
            value="female"
            className={cn(
              "w-40 h-32 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-gray-100 bg-white hover:bg-gray-50 transition-all data-[state=on]:border-[#F2FD0A] data-[state=on]:bg-[#F2FD0A]/10",
            )}
          >
            <Venus className="w-6 h-6 text-gray-400 group-data-[state=on]:text-gray-900" />
            <span className="text-sm font-bold text-gray-500 group-data-[state=on]:text-gray-900">{t("female")}</span>
          </ToggleGroupItem>

          <ToggleGroupItem
            value="all"
            className={cn(
              "w-40 h-32 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-gray-100 bg-white hover:bg-gray-50 transition-all data-[state=on]:border-[#F2FD0A] data-[state=on]:bg-[#F2FD0A]/10",
            )}
          >
            <Users className="w-6 h-6 text-gray-900" />
            <span className="text-sm font-bold text-gray-900">{t("all")}</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
