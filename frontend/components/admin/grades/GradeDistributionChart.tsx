"use client";

import { motion } from "framer-motion";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from "recharts";
import {
    IconChartBar,
    IconTrophy,
    IconAlertTriangle,
    IconChartPie,
    IconChartDots,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Typography } from "@/components/ui/typography";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { useEffect, useState } from "react";

interface GradeDistributionChartProps {
    stats: {
        totalGrades: number;
        average: number;
        highest: number;
        lowest: number;
        distribution: { range: string; count: number }[];
    };
    loading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="relative overflow-hidden bg-background/80 backdrop-blur-3xl border border-white/20 dark:border-white/10 p-6 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex flex-col gap-4 min-w-[240px] animate-in slide-in-from-top-2 fade-in zoom-in-95 duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/30 blur-3xl rounded-full" />

                <div className="flex items-center justify-between border-b border-border/10 pb-3">
                    <div className="flex flex-col">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 leading-none mb-1">
                            Tranche de note
                        </p>
                        <p className="text-sm font-black text-foreground">
                            {label} / 20
                        </p>
                    </div>
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                        <IconChartBar size={14} />
                    </div>
                </div>

                <div className="space-y-1">
                    <span className="text-[10px] font-heavy text-muted-foreground/50 uppercase tracking-widest">
                        Nombre d'élèves
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-foreground tabular-nums tracking-tighter drop-shadow-2xl">
                            {payload[0].value}
                        </span>
                        <span className="text-xs font-bold text-primary/60">
                            élèves
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const CHART_COLORS = [
    "oklch(0.65 0.2 15)",   // Sophisticated Rose (0-5)
    "oklch(0.75 0.18 70)",  // Refined Gold (5-10)
    "oklch(0.65 0.15 240)", // Professional Blue (10-15)
    "oklch(0.75 0.15 150)"  // Academic Green (15-20)
];

export function GradeDistributionChart({
    stats,
    loading,
}: GradeDistributionChartProps) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (loading || !stats) {
        return (
            <SkeletonReusable height={520} className="w-full rounded-3xl" />
        );
    }

    const chartData = stats.distribution.map((item) => ({
        range: item.range,
        count: item.count,
    }));

    return (
        <div className="space-y-8">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[520px]">
                {/* 1. Distribution Area Chart (Main) */}
                <div className="lg:col-span-7 h-[520px] text-foreground bg-black/[0.02] dark:bg-white/[0.02] rounded-3xl p-1 border border-white/10 dark:border-white/[0.05] relative group/chart overflow-hidden">
                    <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-50" />
                        <motion.div
                            className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,oklch(var(--primary))_180deg,transparent_210deg)] opacity-10"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                    <div className="h-full w-full bg-background/60 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.4rem] p-8 pb-2 relative overflow-hidden flex flex-col transition-all duration-500 group-hover/chart:bg-background/40">
                        <div className="flex items-center gap-2 mb-6">
                            <IconChartDots className="text-primary size-6" />
                            <span className="font-black text-muted-foreground tracking-tight">Courbe de Distribution</span>
                        </div>
                        {isClient && (
                            <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="oklch(var(--primary))" stopOpacity={0.4}/>
                                                <stop offset="95%" stopColor="oklch(var(--primary))" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid vertical={false} strokeDasharray="1 1" stroke="currentColor" opacity={0.05} />
                                        <XAxis
                                            dataKey="range"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: "currentColor", fontSize: 10, fontWeight: 800, opacity: 0.5 }}
                                        />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "currentColor", fontSize: 10, fontWeight: 800, opacity: 0.3 }} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="count"
                                            stroke="oklch(var(--primary))"
                                            strokeWidth={6}
                                            fillOpacity={1}
                                            fill="url(#colorCount)"
                                            animationDuration={2500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-5 grid grid-rows-2 gap-6 h-[520px]">
                    {/* 2. Proportion Donut Chart */}
                    <div className="h-full bg-black/[0.02] dark:bg-white/[0.02] rounded-3xl p-1 border border-white/10 dark:border-white/[0.05] relative group/pie overflow-hidden">
                        <div className="h-full w-full bg-background/60 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.3rem] p-6 relative overflow-hidden flex flex-col">
                            <div className="flex items-center gap-2 mb-2">
                                <IconChartPie className="text-primary size-6 underline-offset-4" />
                                <span className="font-black text-muted-foreground">Proportion Relative</span>
                            </div>
                            {isClient && (
                                <div className="flex-1 w-full min-h-0 flex items-center gap-4">
                                    <div className="w-[180px] h-full shrink-0">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={chartData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={50}
                                                    outerRadius={70}
                                                    paddingAngle={10}
                                                    dataKey="count"
                                                    nameKey="range"
                                                    animationDuration={2000}
                                                    strokeWidth={0}
                                                >
                                                    {chartData.map((entry, index) => (
                                                        <Cell 
                                                            key={`cell-${index}`} 
                                                            fill={CHART_COLORS[index % CHART_COLORS.length]} 
                                                        />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '1.5rem', border: '1px solid hsl(var(--border))', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                                    itemStyle={{ fontSize: '12px', fontWeight: 900 }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                        {chartData.map((item, i) => (
                                            <div key={item.range} className="flex items-center justify-between gap-3 group/item">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                                                    <span className="text-[11px] font-black text-muted-foreground/70 group-hover/item:text-foreground transition-colors">{item.range}</span>
                                                </div>
                                                <span className="text-[11px] font-black tabular-nums text-foreground">{Math.round((item.count / stats.totalGrades) * 100)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 3. Performance Bar Chart (Horizontal) */}
                    <div className="h-full bg-black/[0.02] dark:bg-white/[0.02] rounded-3xl p-1 border border-white/10 dark:border-white/[0.05] relative group/bars overflow-hidden">
                        <div className="h-full w-full bg-background/60 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.3rem] p-6 relative overflow-hidden flex flex-col">
                            <div className="flex items-center gap-2 mb-2">
                                <IconChartBar className="text-primary size-6" />
                                <span className="font-black text-muted-foreground">Densité par Tranche</span>
                            </div>
                            {isClient && (
                                <div className="flex-1 w-full min-h-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} layout="vertical" margin={{ left: -10, right: 30, top: 10, bottom: 10 }}>
                                            <XAxis type="number" hide />
                                            <YAxis 
                                                dataKey="range" 
                                                type="category" 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fontSize: 10, fontWeight: 900, fill: 'currentColor', opacity: 0.6 }} 
                                            />
                                            <Tooltip 
                                                cursor={{ fill: 'rgba(var(--primary), 0.05)' }}
                                                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '1.2rem', border: '1px solid hsl(var(--border))' }}
                                            />
                                            <Bar 
                                                dataKey="count" 
                                                radius={[0, 12, 12, 0]}
                                                animationDuration={2000}
                                                barSize={24}
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell 
                                                        key={`cell-${index}`} 
                                                        fill={CHART_COLORS[index % CHART_COLORS.length]} 
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
