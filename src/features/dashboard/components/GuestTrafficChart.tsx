"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { useDashboard } from "@/src/features/dashboard/hooks/use-dashboard";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export function GuestTrafficChart() {
    const { guestTraffic, loading } = useDashboard();

    if (loading) {
        return (
            <Card className="col-span-1 border-none shadow-md bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Guest Traffic</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] animate-pulse bg-muted/50 dark:bg-zinc-800/50 rounded-xl" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="col-span-1 border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Guest Traffic</CardTitle>
                <CardDescription>Daily check-in volume for the past week</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={guestTraffic} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                </linearGradient>
                                <linearGradient id="barGradientToday" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.3} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                            <XAxis
                                dataKey="day"
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(0, 0, 0, 0.05)', radius: 8 }}
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                    color: '#1f2937',
                                    padding: '12px'
                                }}
                                itemStyle={{ color: '#1f2937', fontWeight: 600 }}
                                formatter={(value: number) => [`${value} Guests`, 'Check-ins']}
                            />
                            {/* Regular Bars */}
                            <Bar
                                dataKey="checkins"
                                fill="url(#barGradient)"
                                radius={[8, 8, 8, 8]}
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
