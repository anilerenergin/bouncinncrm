"use client";

import { cn } from "@/src/core/utils/cn";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import {
    DayPicker,
    useNavigation,
} from "react-day-picker";

function CustomMonthCaption(props: any) {
    const displayMonth = props.calendarMonth?.date || new Date();
    const { goToMonth, nextMonth, previousMonth } = useNavigation();

    return (
        <div className="flex items-center justify-between w-full mb-6 px-1">
            <h2 className="text-lg font-bold text-foreground capitalize">
                {format(displayMonth, "MMMM yyyy")}
            </h2>
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => previousMonth && goToMonth(previousMonth)}
                    disabled={!previousMonth}
                    className="p-2 hover:bg-muted rounded-full disabled:opacity-30 transition-colors"
                >
                    <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                    type="button"
                    onClick={() => nextMonth && goToMonth(nextMonth)}
                    disabled={!nextMonth}
                    className="p-2 hover:bg-muted rounded-full disabled:opacity-30 transition-colors"
                >
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t("selectDate")}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 rounded-full border border-border bg-white/50 dark:bg-zinc-900/50 text-xs font-bold text-foreground hover:bg-muted flex items-center gap-2 transition-all shadow-sm">
                    <CalendarIcon className="w-3.5 h-3.5 text-primary" /> {t("today")}
                </button>
                <button className="px-4 py-2 rounded-full border border-border bg-white/50 dark:bg-zinc-900/50 text-xs font-bold text-foreground hover:bg-muted transition-all shadow-sm">
                    {t("nextFriday")}
                </button>
                <button className="px-4 py-2 rounded-full border border-border bg-white/50 dark:bg-zinc-900/50 text-xs font-bold text-foreground hover:bg-muted transition-all shadow-sm">
                    {t("nextSaturday")}
                </button>
            </div>

            <div className="p-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[32px] border border-border shadow-lg w-full max-w-[400px]">
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
                        weekday: "text-muted-foreground w-full font-bold text-[10px] uppercase tracking-widest text-center",
                        week: "flex w-full mt-2",
                        day: cn(
                            "h-9 w-full p-0 font-bold text-sm rounded-xl text-foreground hover:bg-muted transition-all flex items-center justify-center relative",
                        ),
                        selected: "!bg-primary !text-primary-foreground !no-underline shadow-md shadow-primary/20",
                        today: "text-primary font-black",
                        outside: "text-muted-foreground opacity-30",
                        disabled: "text-muted-foreground opacity-20",
                        hidden: "invisible",
                    }}
                />
            </div>
        </div>
    );
}
