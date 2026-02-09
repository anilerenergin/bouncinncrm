"use client";

import { useTranslations } from "next-intl";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { Users, Edit, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const AGE_DATA = [
  { name: '18-20', value: 30 },
  { name: '21-25', value: 80 },
  { name: '26-30', value: 45 },
  { name: '30+', value: 95 },
];

const GENDER_DATA = [
  { name: 'Female', value: 65, color: '#F2FD0A' },
  { name: 'Male', value: 35, color: '#18181B' },
];

export function PromoterAnalytics() {
  const t = useTranslations("Promoters");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 pb-6 px-10">
       
        {/* Attendance Rate Card */}
        <div className="bg-[#F9FAFB] p-6 rounded-3xl flex flex-col justify-between">
            <div>
                <h3 className="text-4xl font-extrabold text-gray-900 mb-1">67%</h3>
                <p className="text-xs font-semibold text-gray-400">{t("guestsAttended")}</p>
                
                <div className="mt-8 mb-2 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>{t("invited")}: 142</span>
                    <span>{t("checkedIn")}: 95</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F2FD0A] w-[67%]" />
                </div>
            </div>

            <div className="flex gap-4 mt-8">
                <button className="flex items-center gap-2 text-xs font-bold text-gray-900 hover:text-gray-700 transition-colors">
                    <Users className="w-4 h-4" />
                    {t("editRole")}
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-700 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    {t("deleteUser")}
                </button>
            </div>
        </div>

        {/* Demographics Circular Chart */}
        <div className="bg-[#F9FAFB] p-6 rounded-3xl flex flex-col items-center justify-center relative">
             <h4 className="absolute top-6 left-6 text-xs font-bold text-gray-400">{t("demographics")}</h4>
             <div className="w-32 h-32 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={GENDER_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={55}
                            startAngle={90}
                            endAngle={-270}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {GENDER_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="mt-6 space-y-2 w-full max-w-[120px]">
                <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#F2FD0A]" />
                        <span className="text-gray-600">{t("female")}</span>
                    </div>
                    <span className="text-gray-900">65%</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-[#18181B]" />
                        <span className="text-gray-600">{t("male")}</span>
                    </div>
                    <span className="text-gray-900">35%</span>
                </div>
             </div>
        </div>

        {/* Age Distribution Bar Chart */}
        <div className="bg-[#F9FAFB] p-6 rounded-3xl relative">
             <h4 className="absolute top-6 left-6 text-xs font-bold text-gray-400">{t("ageDistribution")}</h4>
             <div className="mt-8 h-[160px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={AGE_DATA} margin={{ top: 20, right: 0, left: -25, bottom: 0 }}>
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 700 }} 
                            dy={10}
                        />
                         <YAxis 
                            hide 
                        />
                        <Bar 
                            dataKey="value" 
                            radius={[10, 10, 10, 10]} 
                            barSize={32}
                            fill="#E5E7EB"
                        >
                             {
                                AGE_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 3 ? '#F2FD0A' : '#E5E7EB'} />
                                ))
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
             </div>
        </div>

    </div>
  );
}
