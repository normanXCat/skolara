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
    IconClock,
    IconUserX,
    IconChartPie,
    IconChartDots,
    IconShieldCheck,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Typography } from "@/components/ui/typography";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { useEffect, useState } from "react";

interface AbsenceStatsChartsProps {
    stats: {
        totalAbsences: number;
        absentCount: number;
        lateCount: number;
        justifiedCount: number;
        unjustifiedCount: number;
        monthlyTrend: { month: string; count: number }[];
        topClasses: { name: string; count: number }[];
        distribution: { name: string; value: number }[];
    } | null;
    loading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="relative overflow-hidden bg-background/80 backdrop-blur-3xl border border-white/20 dark:border-white/10 p-6 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex flex-col gap-4 min-w-[200px] animate-in slide-in-from-top-2 fade-in zoom-in-95 duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-border/10 pb-3">
                    <p className="text-sm font-black text-foreground uppercase tracking-wider">
                        {label}
                    </p>
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <IconChartDots size={14} />
                    </div>
                </div>

                <div className="space-y-1">
                    <span className="text-[10px] font-heavy text-muted-foreground/50 uppercase tracking-widest">
                        Nombre
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-foreground tabular-nums tracking-tighter">
                            {payload[0].value}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const CHART_COLORS = [
    "oklch(0.65 0.2 15)",   // Rose (Absences)
    "oklch(0.75 0.18 70)",  // Gold (Lates)
    "oklch(0.65 0.15 240)", // Blue
    "oklch(0.75 0.15 150)", // Green
    "oklch(0.6 0.15 320)",  // Purple
];

export function AbsenceStatsCharts({
    stats,
    loading,
}: AbsenceStatsChartsProps) {
    const { resolvedTheme } = useTheme();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (loading || !stats) {
        return <SkeletonReusable height={520} className="w-full rounded-3xl" />;
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* 1. Monthly Trend Area Chart */}
                <div className="lg:col-span-8 h-[450px] bg-black/[0.02] dark:bg-white/[0.02] rounded-3xl p-1 border border-white/10 dark:border-white/[0.05] relative group/chart overflow-hidden">
                    <div className="h-full w-full bg-background/60 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.4rem] p-8 pb-2 relative overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                                    <IconChartDots className="size-5" />
                                </div>
                                <div>
                                    <span className="font-black text-foreground tracking-tight block">Tendance Mensuelle</span>
                                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Évolution des incidents</span>
                                </div>
                            </div>
                        </div>
                        {isClient && (
                            <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stats.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorCountAbs" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="oklch(var(--primary))" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="oklch(var(--primary))" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="currentColor" opacity={0.05} />
                                        <XAxis
                                            dataKey="month"
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
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorCountAbs)"
                                            animationDuration={2000}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Distribution Pie Chart */}
                <div className="lg:col-span-4 h-[450px] bg-black/[0.02] dark:bg-white/[0.02] rounded-3xl p-1 border border-white/10 dark:border-white/[0.05] relative group/pie overflow-hidden">
                    <div className="h-full w-full bg-background/60 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.3rem] p-8 relative overflow-hidden flex flex-col">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-2 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                <IconChartPie className="size-5" />
                            </div>
                            <div>
                                <span className="font-black text-foreground tracking-tight block">Répartition</span>
                                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Par type d'incident</span>
                            </div>
                        </div>
                        {isClient && (
                            <div className="flex-1 w-full min-h-0 flex flex-col items-center justify-center gap-8">
                                <div className="w-full h-48 relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={stats.distribution}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={85}
                                                paddingAngle={15}
                                                dataKey="value"
                                                nameKey="name"
                                                animationDuration={1500}
                                                strokeWidth={0}
                                            >
                                                {stats.distribution.map((entry, index) => (
                                                    <Cell 
                                                        key={`cell-${index}`} 
                                                        fill={CHART_COLORS[index % CHART_COLORS.length]} 
                                                        className="outline-none"
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '1.5rem', border: '1px solid hsl(var(--border))' }}
                                                itemStyle={{ fontSize: '12px', fontWeight: 900 }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-3xl font-black text-foreground tracking-tighter">{stats.totalAbsences}</span>
                                        <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Total</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    {stats.distribution.map((item, i) => (
                                        <div key={item.name} className="flex flex-col gap-1 p-3 rounded-2xl bg-background/40 border border-border/10">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">{item.name}</span>
                                            </div>
                                            <span className="text-xl font-black text-foreground tabular-nums">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. Top Classes Bar Chart */}
                <div className="lg:col-span-12 h-[350px] bg-black/[0.02] dark:bg-white/[0.02] rounded-3xl p-1 border border-white/10 dark:border-white/[0.05] relative group/bars overflow-hidden">
                    <div className="h-full w-full bg-background/60 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.3rem] p-8 relative overflow-hidden flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                                <IconChartBar className="size-5" />
                            </div>
                            <div>
                                <span className="font-black text-foreground tracking-tight block">Absences par Classes</span>
                                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Top 5 classes les plus impactées</span>
                            </div>
                        </div>
                        {isClient && (
                            <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.topClasses} layout="vertical" margin={{ left: 40, right: 30, top: 0, bottom: 0 }}>
                                        <XAxis type="number" hide />
                                        <YAxis 
                                            dataKey="name" 
                                            type="category" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fontSize: 11, fontWeight: 900, fill: 'currentColor', opacity: 0.7 }} 
                                        />
                                        <Tooltip 
                                            cursor={{ fill: 'rgba(var(--primary), 0.05)', radius: 10 }}
                                            contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '1.2rem', border: '1px solid hsl(var(--border))' }}
                                        />
                                        <Bar 
                                            dataKey="count" 
                                            radius={[0, 10, 10, 0]}
                                            animationDuration={1800}
                                            barSize={32}
                                        >
                                            {stats.topClasses.map((entry, index) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={`oklch(var(--primary) / ${1 - index * 0.15})`}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </div>

                {/* 4. Justification Stats (Bottom Grid) */}
                <div className="lg:col-span-6 grid grid-cols-2 gap-6">
                    <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col items-center justify-center text-center group transition-all duration-500 hover:bg-emerald-500/10">
                        <div className="size-16 rounded-3xl bg-emerald-500/10 text-emerald-500 mb-6 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                            <IconShieldCheck size={32} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-black text-emerald-600/60 dark:text-emerald-400/60 uppercase tracking-[0.2em] mb-2">Justifiées</span>
                        <div className="flex items-baseline gap-2">
                             <span className="text-5xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter">{stats.justifiedCount}</span>
                             <span className="text-sm font-bold text-emerald-600/40">{Math.round((stats.justifiedCount / stats.totalAbsences) * 100)}%</span>
                        </div>
                    </div>
                    <div className="p-8 rounded-3xl bg-rose-500/5 border border-rose-500/10 flex flex-col items-center justify-center text-center group transition-all duration-500 hover:bg-rose-500/10">
                        <div className="size-16 rounded-3xl bg-rose-500/10 text-rose-500 mb-6 flex items-center justify-center border border-rose-500/20 group-hover:scale-110 transition-transform duration-500">
                            <IconUserX size={32} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-black text-rose-600/60 dark:text-rose-400/60 uppercase tracking-[0.2em] mb-2">Non Justifiées</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-rose-600 dark:text-rose-400 tracking-tighter">{stats.unjustifiedCount}</span>
                            <span className="text-sm font-bold text-rose-600/40">{Math.round((stats.unjustifiedCount / stats.totalAbsences) * 100)}%</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-6 flex items-center justify-center p-8 rounded-3xl bg-muted/5 border border-dashed border-border/40 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
                    <div className="relative z-10 text-center">
                        <Typography variant="body" className="text-muted-foreground/60 font-black italic max-w-[300px] leading-relaxed">
                            "L'assiduité est le premier pas vers l'excellence académique."
                        </Typography>
                        <div className="h-px w-12 bg-primary/20 mx-auto mt-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}
