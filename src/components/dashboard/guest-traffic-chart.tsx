"use client";

import { Card } from "@/src/components/ui/card";
import { mockGuestTraffic } from "@/src/lib/mock/dashboard-data";
import { useTranslations } from "next-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function GuestTrafficChart() {
  const t = useTranslations("Dashboard");

  return (
    <Card className="p-5 bg-white border-border h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground mb-0.5">
          {t("guestTraffic")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("dailyCheckins")}
        </p>
      </div>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockGuestTraffic} barGap={16} margin={{ top: 25, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#999", fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#999", fontSize: 11 }}
              width={30}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.03)" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
                      <p className="text-sm font-semibold text-gray-900">
                        {payload[0].payload.label}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {t("checkins")}: <span className="font-bold">{payload[0].value}</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="checkins"
              radius={[10, 10, 0, 0]}
              fill="#E0E0E0"
              shape={(props: any) => {
                const { fill, x, y, width, height, payload } = props;
                const barFill = payload.isToday ? "#F2FD0A" : fill;
                return (
                  <g>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={barFill}
                      rx={10}
                      ry={10}
                    />
                    {payload.isToday && (
                      <g>
                        <rect
                          x={x + width / 2 - 22}
                          y={y - 26}
                          width={44}
                          height={20}
                          fill="#000"
                          rx={10}
                        />
                        <text
                          x={x + width / 2}
                          y={y - 11}
                          textAnchor="middle"
                          fill="#fff"
                          fontSize={11}
                          fontWeight="700"
                        >
                          Today
                        </text>
                      </g>
                    )}
                  </g>
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
