"use client";

import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { IconSchool, IconStarFilled, IconUsers } from "@tabler/icons-react";

export const RegistrationVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animations using seconds multiplied by fps
    const titleOpacity = interpolate(frame, [0, 0.7 * fps], [0, 1], {
        extrapolateRight: "clamp",
    });

    const scale = spring({
        frame,
        fps,
        config: {
            stiffness: 100,
        },
    });

    const logoY = interpolate(frame, [0, 1.3 * fps], [50, 0], {
        extrapolateRight: "clamp",
    });

    // Floating blobs
    const blob1X = Math.sin(frame / 30) * 20;
    const blob1Y = Math.cos(frame / 40) * 30;

    return (
        <AbsoluteFill className="bg-[#0f172a] overflow-hidden flex items-center justify-center p-20">
            {/* Background blobs */}
            <div
                className="absolute size-[600px] bg-primary/20 rounded-full blur-[120px]"
                style={{
                    transform: `translate(${blob1X}px, ${blob1Y}px)`,
                    top: "10%",
                    left: "-10%",
                }}
            />
            <div
                className="absolute size-[500px] bg-secondary/10 rounded-full blur-[100px]"
                style={{
                    transform: `translate(${-blob1X}px, ${blob1Y}px)`,
                    bottom: "10%",
                    right: "-5%",
                }}
            />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center gap-12 text-white">
                <div
                    style={{
                        transform: `scale(${scale}) translateY(${logoY}px)`,
                        opacity: titleOpacity,
                    }}
                    className="size-32 rounded-3xl bg-primary/20 border border-primary/30 flex items-center justify-center shadow-2xl backdrop-blur-xl"
                >
                    <IconSchool size={64} className="text-primary" />
                </div>

                <div
                    style={{
                        opacity: titleOpacity,
                        transform: `translateY(${logoY / 2}px)`,
                    }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-6xl font-black tracking-tight leading-none italic">
                        Skolara <br />
                        <span className="text-primary">Academy</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-medium">
                        L'excellence au service de l'avenir
                    </p>
                </div>

                {/* Badges */}
                <div className="flex gap-4 mt-8">
                    {[
                        { icon: IconUsers, label: "Communauté" },
                        { icon: IconStarFilled, label: "Excellence" },
                    ].map((badge, i) => {
                        const bScale = spring({
                            frame: frame - 40 - i * 10,
                            fps,
                            config: { stiffness: 100 },
                        });
                        return (
                            <div
                                key={i}
                                style={{
                                    transform: `scale(${Math.max(0, bScale)})`,
                                }}
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                            >
                                <badge.icon
                                    size={18}
                                    className="text-primary"
                                />
                                <span className="text-sm font-bold uppercase tracking-wider">
                                    {badge.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};