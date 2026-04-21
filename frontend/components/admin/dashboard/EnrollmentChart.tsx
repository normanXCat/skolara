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
} from "recharts";
import { IconTrendingUp } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Typography } from "@/components/ui/typography";
import { useEffect, useState } from "react";

interface EnrollmentChartProps {
    data: any[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="relative overflow-hidden bg-background/80 backdrop-blur-3xl border border-white/20 dark:border-white/10 p-6 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex flex-col gap-4 min-w-[240px] animate-in slide-in-from-top-2 fade-in zoom-in-95 duration-500">
                {/* Background Sheen Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                {/* Glow background */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/30 blur-3xl rounded-full" />

                <div className="flex items-center justify-between border-b border-border/10 pb-3">
                    <div className="flex flex-col">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 leading-none mb-1">
                            Période
                        </p>
                        <p className="text-sm font-black text-foreground">
                            {label}
                        </p>
                    </div>
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                        <IconTrendingUp size={14} />
                    </div>
                </div>

                <div className="space-y-1">
                    <span className="text-[10px] font-heavy text-muted-foreground/50 uppercase tracking-widest">
                        Effectif Total
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-foreground tabular-nums tracking-tighter drop-shadow-2xl">
                            {payload[0].value}
                        </span>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                            <IconTrendingUp size={12} />
                            +12%
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary/5 border border-primary/10 w-full justify-between overflow-hidden relative">
                    <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
                    <span className="text-[9px] font-black text-primary tracking-widest uppercase">
                        Performance Optimale
                    </span>
                    <div className="flex gap-1">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="size-1 rounded-full bg-primary/40 animate-pulse"
                                style={{ animationDelay: `${i * 200}ms` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export function EnrollmentChart({ data }: EnrollmentChartProps) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <Typography
                        variant="h3"
                        className="font-black tracking-tight flex items-center gap-2"
                    >
                        <IconTrendingUp className="text-primary" />
                        Évolution des effectifs
                    </Typography>
                    <Typography
                        variant="body"
                        className="!text-sm text-muted-foreground font-medium"
                    >
                        Croissance des élèves sur les 6 derniers mois
                    </Typography>
                </div>
            </div>

            <div className="h-[520px] w-full text-foreground bg-black/[0.02] dark:bg-white/[0.02] rounded-3xl p-1 border border-white/10 dark:border-white/[0.05] relative group/chart overflow-hidden">
                {/* Animated Border Background */}
                <div className="absolute inset-0 rounded-[3.5rem] overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-50" />
                    <motion.div
                        className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,oklch(var(--primary))_180deg,transparent_210deg)] opacity-20"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </div>

                <div className="h-full w-full bg-background/60 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[3.4rem] p-10 pb-2 relative overflow-hidden">
                    {/* Grid Background Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                    {/* Decorative Glows */}
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

                    {isClient && (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={data || []}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    left: 0,
                                    bottom: 20,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorTotal"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="hsl(var(--primary))"
                                            stopOpacity={0.4}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="hsl(var(--primary))"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                    <filter id="shadow" height="200%">
                                        <feGaussianBlur
                                            in="SourceAlpha"
                                            stdDeviation="15"
                                        />
                                        <feOffset
                                            dx="0"
                                            dy="20"
                                            result="offsetblur"
                                        />
                                        <feComponentTransfer>
                                            <feFuncA
                                                type="linear"
                                                slope="0.3"
                                            />
                                        </feComponentTransfer>
                                        <feMerge>
                                            <feMergeNode />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                <CartesianGrid
                                    vertical={false}
                                    strokeDasharray="1 1"
                                    stroke="currentColor"
                                    opacity={0.1}
                                />

                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fill: "currentColor",
                                        fontSize: 11,
                                        fontWeight: 900,
                                        letterSpacing: "0.2em",
                                    }}
                                    height={70}
                                    dy={25}
                                    padding={{
                                        left: 30,
                                        right: 30,
                                    }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fill: "currentColor",
                                        fontSize: 10,
                                        fontWeight: 900,
                                    }}
                                    dx={-10}
                                />

                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{
                                        stroke: "hsl(var(--primary))",
                                        strokeWidth: 1,
                                        strokeDasharray: "8 8",
                                        opacity: 0.2,
                                    }}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={8}
                                    fillOpacity={1}
                                    fill="url(#colorTotal)"
                                    animationDuration={4000}
                                    animationEasing="ease-in-out"
                                    filter="url(#shadow)"
                                    activeDot={{
                                        r: 12,
                                        strokeWidth: 6,
                                        stroke: "hsl(var(--primary))",
                                        fill: isDark ? "white" : "black",
                                        className: "shadow-2xl",
                                    }}
                                    dot={false}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
}
