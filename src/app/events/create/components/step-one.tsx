"use client";

import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import { nextFriday, nextSaturday, nextSunday } from "date-fns";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface StepOneProps {
  onNext: (date: Date) => void;
  onCancel: () => void;
}

export function StepOne({ onNext, onCancel }: StepOneProps) {
  const t = useTranslations("CreateEvent");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleNext = () => {
    if (date) {
      onNext(date);
    }
  };

  const today = new Date();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-8 shadow-sm w-full max-w-3xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
            <p className="text-gray-500">{t("subtitle")}</p>
          </div>
          <Button
            variant="ghost"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-900"
          >
            {t("cancel")}
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            variant="outline"
            className="rounded-full border-gray-200"
            onClick={() => setDate(nextFriday(today))}
          >
            {t("nextFriday")}
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-gray-200"
            onClick={() => setDate(nextSaturday(today))}
          >
            {t("nextSaturday")}
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-gray-200"
            onClick={() => setDate(nextSunday(today))}
          >
            {t("nextSunday")}
          </Button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="border rounded-xl p-4 w-full max-w-md">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-4 rounded-2xl bg-[#eff1f3] border-none shadow-none w-fit mx-auto"
              classNames={{
                months: "w-full space-y-4 relative",
                caption:
                  "flex justify-center items-center pt-1 relative items-center",
                caption_label: "text-sm font-bold text-gray-800",
                nav: "flex items-center justify-between absolute inset-x-0 w-full z-10",
                nav_button:
                  "h-7 w-7 bg-transparent p-0 text-gray-600 hover:text-black hover:bg-transparent opacity-70 hover:opacity-100",
                table: "w-full border-collapse space-y-1",
                head_row: "flex mb-2",
                head_cell:
                  "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-200 rounded-md text-gray-700",
                day_selected:
                  "bg-[#FCEE21] text-black hover:bg-[#FCEE21] hover:text-black focus:bg-[#FCEE21] focus:text-black rounded-md font-semibold shadow-sm",
                day_today: "text-gray-900 font-bold",
                day_outside: "text-gray-400 opacity-40",
                day_disabled: "text-gray-300 opacity-50",
                day_hidden: "invisible",
              }}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleNext}
            disabled={!date}
            className="bg-[var(--brand-yellow)] text-black hover:bg-[var(--brand-yellow-hover)] font-semibold rounded-lg px-8 py-6"
          >
            {t("next")} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
