"use client";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Calendar as CalendarIcon, ChevronDown, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function DashboardHeader() {
  const t = useTranslations("Dashboard");
  const [period, setPeriod] = useState("Last 30 Days");

  const periods = [
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "Last 12 Months",
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t("subtitle")}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 h-10 px-4 rounded-full border-border bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-all shadow-sm"
            >
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{period}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 p-1 rounded-xl shadow-xl border-border/50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md">
            {periods.map((p) => (
              <DropdownMenuItem
                key={p}
                onClick={() => setPeriod(p)}
                className="cursor-pointer rounded-lg focus:bg-primary/5 focus:text-primary font-medium"
              >
                {p}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          className="h-10 px-4 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all gap-2"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export Report</span>
        </Button>
      </div>
    </div>
  );
}
