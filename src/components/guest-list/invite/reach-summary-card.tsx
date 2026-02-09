"use client";

import { useTranslations } from "next-intl";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ReachSummaryCardProps {
  count: number;
  total: number;
  matchRate: number;
}

export function ReachSummaryCard({ count, total, matchRate }: ReachSummaryCardProps) {
  const t = useTranslations("Segmentation");

  // Data for the radial gauge
  const data = [
    { value: count },
    { value: total - count }
  ];

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8 h-fit">
      <div>
        <h3 className="text-xl font-bold text-gray-900">{t("estimatedReach")}</h3>
        <p className="text-sm text-gray-500">{t("reachSubtitle")}</p>
      </div>

      <div className="relative h-64 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              startAngle={220}
              endAngle={-40}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              cornerRadius={10}
            >
              <Cell fill="#F2FD0A" />
              <Cell fill="#f3f4f6" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Inner Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
            <span className="text-4xl font-extrabold text-gray-900 leading-none">
                {count.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">{t("all")}</span>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-400">{t("totalDatabase")}</span>
          <span className="text-sm font-extrabold text-gray-900">{total.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-400">{t("matchRate")}</span>
          <span className="text-sm font-extrabold text-gray-900">{matchRate}%</span>
        </div>
      </div>
    </div>
  );
}
