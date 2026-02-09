"use client";

import { cn } from "@/src/core/utils/cn";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { 
  DayPicker, 
  useNavigation,
} from "react-day-picker";

/**
 * Custom Header for the Calendar to achieve:
 * Title (Month Year) on the Left
 * Arrows (Prev, Next) on the Right
 */
function CustomMonthCaption(props: any) {
  // In RDP v9, props contains 'calendarMonth'
  const displayMonth = props.calendarMonth?.date || new Date();
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  return (
    <div className="flex items-center justify-between w-full mb-8 px-1">
      <h2 className="text-xl font-bold text-gray-900 capitalize">
        {format(displayMonth, "MMMM yyyy")}
      </h2>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => previousMonth && goToMonth(previousMonth)}
          disabled={!previousMonth}
          className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <button
          type="button"
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}

interface DateSelectionProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

export function DateSelection({ selectedDate, onDateSelect }: DateSelectionProps) {
  const t = useTranslations("InviteGuest");

  return (
    <div className="space-y-6 mb-12">
      <div className="flex items-center justify-between pr-2">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("selectDate")}</h3>
        <button className="text-xs font-semibold text-gray-300 hover:text-gray-500 transition-colors uppercase tracking-widest">
            {t("cancel")}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-all">
          <span className="text-base">📅</span> {t("today")}
        </button>
        <button className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
          {t("nextFriday")}
        </button>
        <button className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
          {t("nextSaturday")}
        </button>
      </div>

      {/* Calendar Container - Focused Width for Professional Look */}
      <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] w-full max-w-[420px]">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          showOutsideDays
          components={{
            MonthCaption: CustomMonthCaption,
            Nav: () => <></>
          }}
          classNames={{
            months: "w-full",
            month: "w-full space-y-4",
            month_grid: "w-full border-collapse",
            weekdays: "flex w-full mb-4",
            weekday: "text-gray-400 w-full font-bold text-[10px] uppercase tracking-widest text-center",
            week: "flex w-full mt-2",
            day: cn(
              "h-10 w-full p-0 font-bold text-sm rounded-xl text-gray-700 hover:bg-gray-100 transition-all flex items-center justify-center relative",
            ),
            selected: "!bg-[#F2FD0A] !text-black !no-underline shadow-sm",
            today: "text-[#EAB308] font-bold",
            outside: "text-gray-300 opacity-40",
            disabled: "text-gray-200",
            hidden: "invisible",
          }}
        />
      </div>
    </div>
  );
}
