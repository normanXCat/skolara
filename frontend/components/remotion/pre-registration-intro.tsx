"use client";

import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
    Series,
} from "remotion";
import { IconUser, IconUsers, IconFileCheck } from "@tabler/icons-react";
import { HexagonPattern } from "@/components/ui/hexagon-pattern";
import { cn } from "@/lib/utils";
import Logo from "@/components/common/logo";
import { Typography } from "@/components/ui/typography";

/**
 * Creative & Dynamic Intro with Theme Support (Light/Dark)
 */

interface IntroProps {
    theme?: "light" | "dark";
}

// --- Scene 1: Logo ---
const LogoScene: React.FC<{ theme: string }> = ({ theme }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        config: { stiffness: 60, damping: 10 },
    });

    const opacity = interpolate(frame, [0, 20 * (fps / 30)], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill className="flex items-center justify-center">
            <div
                style={{ transform: `scale(${scale})`, opacity }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 blur-3xl opacity-30 rounded-full scale-150",
                        theme === "dark" ? "bg-primary" : "bg-primary/40",
                    )}
                />
                <Logo className="relative z-10" size={160} showText={false} />
            </div>
        </AbsoluteFill>
    );
};

// --- Scene 2: Title Stagger (Creative Disorganized Style) ---
const TitleScene: React.FC<{ theme: string }> = ({ theme }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const currentYear = new Date().getFullYear();
    const text = `Pré-inscription ${currentYear}`;
    const words = text.split(" ");

    const settings = [
        { rotate: -3, y: -10, x: -20 },
        { rotate: 2, y: 15, x: 0 },
        { rotate: -1, y: -5, x: 20 },
    ];

    return (
        <AbsoluteFill className="flex flex-col items-center justify-center p-12">
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 w-full">
                {words.map((word, i) => {
                    const start = i * 10;
                    const wordSpring = spring({
                        frame: frame - start,
                        fps,
                        config: { stiffness: 60, damping: 12 },
                    });

                    const opacity = interpolate(
                        frame - start,
                        [0, 15],
                        [0, 1],
                        {
                            extrapolateRight: "clamp",
                        },
                    );

                    const config = settings[i % settings.length];
                    const rotate = interpolate(
                        wordSpring,
                        [0, 1],
                        [config.rotate * 3, config.rotate],
                    );
                    const translateY = interpolate(
                        wordSpring,
                        [0, 1],
                        [40, config.y],
                    );
                    const translateX = interpolate(
                        wordSpring,
                        [0, 1],
                        [0, config.x],
                    );

                    return (
                        <div
                            key={i}
                            style={{
                                opacity,
                                transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
                                filter: `blur(${interpolate(frame - start, [0, 15], [10, 0])}px)`,
                            }}
                        >
                            <Typography
                                variant="display"
                                className={cn(
                                    "drop-shadow-2xl",
                                    theme === "dark"
                                        ? "text-white"
                                        : "text-slate-900",
                                    word === String(currentYear)
                                        ? "text-primary font-black not-italic"
                                        : "font-black",
                                )}
                            >
                                {word}
                            </Typography>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

// --- Scene 3: Steps Slide ---
const StepsScene: React.FC<{ theme: string }> = ({ theme }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const steps = [
        {
            icon: IconUser,
            label: "L'enfant",
            color: theme === "dark" ? "text-white" : "text-slate-800",
        },
        {
            icon: IconUsers,
            label: "Le Parent",
            color: theme === "dark" ? "text-white" : "text-slate-800",
        },
        { icon: IconFileCheck, label: "Le Dossier", color: "text-primary" },
    ];

    return (
        <AbsoluteFill className="flex flex-col items-center justify-center gap-16">
            <div className="space-y-12">
                {steps.map((step, i) => {
                    const start = i * 12;
                    const progress = spring({
                        frame: frame - start,
                        fps,
                        config: { stiffness: 80 },
                    });
                    const opacity = interpolate(frame - start, [0, 10], [0, 1]);
                    const x = interpolate(progress, [0, 1], [100, 0]);

                    return (
                        <div
                            key={i}
                            style={{
                                opacity,
                                transform: `translateX(${x}px)`,
                            }}
                            className="flex items-center gap-10"
                        >
                            <div
                                className={`${step.color} drop-shadow-[0_0_15px_currentColor]`}
                            >
                                <step.icon size={64} stroke={1.5} />
                            </div>
                            <Typography
                                variant="h1"
                                className={cn(
                                    "font-black tracking-tight",
                                    theme === "dark"
                                        ? "text-white"
                                        : "text-slate-900",
                                )}
                            >
                                {step.label}
                            </Typography>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

// --- Scene 4: CTA Pulse ---
const CTAScene: React.FC<{ theme: string }> = ({ theme }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const currentYear = new Date().getFullYear();

    const opacity = interpolate(frame, [0, 20], [0, 1]);
    const scale = spring({
        frame,
        fps,
        config: { stiffness: 40 },
    });

    return (
        <AbsoluteFill className="flex flex-col items-center justify-center gap-16">
            <div
                style={{ opacity, transform: `scale(${scale})` }}
                className="flex flex-col items-center gap-10"
            >
                <div className="relative group">
                    <div
                        className={cn(
                            "absolute inset-0 bg-primary blur-3xl opacity-20 animate-pulse",
                            theme === "light" && "opacity-10",
                        )}
                    />
                    <Logo
                        className="relative z-10"
                        size={180}
                        showText={false}
                    />
                </div>

                <div className="text-center space-y-4 px-12">
                    <Typography
                        variant="display"
                        className={cn(
                            "leading-none",
                            theme === "dark" ? "text-white" : "text-slate-900",
                        )}
                    >
                        Rejoignez <br />{" "}
                        <span className="text-primary font-black">
                            l'excellence
                        </span>
                    </Typography>
                    <Typography
                        variant="h3"
                        className={cn(
                            "font-bold tracking-[0.2em]",
                            theme === "dark"
                                ? "text-slate-400"
                                : "text-slate-500",
                        )}
                    >
                        Skolara Academy {currentYear}
                    </Typography>
                </div>
            </div>
        </AbsoluteFill>
    );
};

// --- Main Intro Component ---
export const PreRegistrationIntro: React.FC<IntroProps> = ({
    theme = "dark",
}) => {
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill className="font-sans overflow-hidden bg-transparent">
            {/* Brightened Hexagon Background */}
            <HexagonPattern
                radius={50}
                x={-1}
                y={-1}
                className={cn(
                    theme === "dark"
                        ? "stroke-white/40"
                        : "stroke-slate-900/10",
                    "[mask-image:radial-gradient(circle_at_center,white,transparent)]",
                )}
            />

            <Series>
                <Series.Sequence durationInFrames={1.5 * fps}>
                    <LogoScene theme={theme} />
                </Series.Sequence>
                <Series.Sequence
                    durationInFrames={2.5 * fps}
                    offset={-0.4 * fps}
                >
                    <TitleScene theme={theme} />
                </Series.Sequence>
                <Series.Sequence
                    durationInFrames={3.5 * fps}
                    offset={-0.4 * fps}
                >
                    <StepsScene theme={theme} />
                </Series.Sequence>
                <Series.Sequence
                    durationInFrames={2.5 * fps}
                    offset={-0.4 * fps}
                >
                    <CTAScene theme={theme} />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};

export default PreRegistrationIntro;
