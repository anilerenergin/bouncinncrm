"use client";

import { useTranslations } from "next-intl";
import { UserRound } from "lucide-react";
import { useState } from "react";

export function AgeRangeSelector({ min = 18, max = 60, onChange }: { min?: number, max?: number, onChange: (min: number, max: number) => void }) {
  const t = useTranslations("Segmentation");
  const [range, setRange] = useState({ min: 21, max: 35 });

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), range.max - 1);
    setRange({ ...range, min: value });
    onChange(value, range.max);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), range.min + 1);
    setRange({ ...range, max: value });
    onChange(range.min, value);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserRound className="w-5 h-5 text-gray-900" />
          <h3 className="font-bold text-gray-900">{t("ageGroup")}</h3>
        </div>
        <div className="bg-[#F2FD0A] px-3 py-1 rounded-full text-xs font-bold text-gray-900">
          {range.min} - {range.max}
        </div>
      </div>

      <div className="relative h-1 w-full bg-gray-200 rounded-full mt-10">
        {/* Active Range Bar */}
        <div 
          className="absolute h-full bg-[#F2FD0A] rounded-full"
          style={{ 
            left: `${((range.min - 18) / (60 - 18)) * 100}%`, 
            right: `${100 - ((range.max - 18) / (60 - 18)) * 100}%` 
          }}
        />
        
        {/* Custom Range Inputs (Hidden, but interactive) */}
        <input
          type="range"
          min="18"
          max="60"
          value={range.min}
          onChange={handleMinChange}
          className="absolute w-full top-0 h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
        />
        <input
          type="range"
          min="18"
          max="60"
          value={range.max}
          onChange={handleMaxChange}
          className="absolute w-full top-0 h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
        />
      </div>

      {/* Labels - Now outside the h-1 container for proper margin spacing */}
      <div className="flex justify-between text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-8">
          <span>18</span>
          <span>25</span>
          <span>35</span>
          <span>45</span>
          <span>60+</span>
      </div>
    </div>
  );
}
