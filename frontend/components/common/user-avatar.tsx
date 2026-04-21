"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
    firstName?: string;
    lastName?: string;
    image?: string;
    size?: number;
    className?: string;
    isLoading?: boolean;
    onClick?: () => void;
}

/**
 * UserAvatar Component
 * A modern, rounded-xl avatar with elegant glassmorphism and subtle animations.
 */
export default function UserAvatar({
    firstName,
    lastName,
    image,
    size = 40,
    className,
    isLoading = false,
    onClick,
}: UserAvatarProps) {
    const initials =
        `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();

    if (isLoading) {
        return (
            <div
                style={{ width: size, height: size }}
                className={cn(
                    "rounded-xl bg-muted/40 animate-pulse border-2 border-border/20",
                    className,
                )}
            />
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            style={{ width: size, height: size }}
            className={cn(
                "group relative flex items-center justify-center overflow-hidden rounded-xl border-2 border-primary/20",
                "bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm transition-all duration-300",
                "hover:border-primary/40 hover:shadow-primary/10",
                className,
            )}
        >
            {/* Ambient Background Glow (pulsing slightly) */}
            <motion.div
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-x-0 bottom-0 h-1/2 bg-primary/20 blur-xl pointer-events-none"
            />

            {image ? (
                <img
                    src={image}
                    alt={firstName || "User"}
                    className="h-full w-full object-cover"
                />
            ) : (
                <span className="relative z-10 font-black tracking-widest text-primary text-[clamp(10px,2.5vw,14px)]">
                    {initials || "??"}
                </span>
            )}

            {/* Premium Inner Border Light (Glass effect) */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />

            {/* Active state indicator (optional) */}
            <div className="absolute -inset-2 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 rounded-[2rem]" />
        </motion.button>
    );
}
