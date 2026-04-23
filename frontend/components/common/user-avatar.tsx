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
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            style={{ width: size, height: size }}
            className={cn(
                "group relative flex items-center justify-center overflow-hidden rounded-2xl border border-secondary/30",
                "bg-secondary/20 text-secondary-foreground transition-all duration-300 shadow-sm",
                "hover:border-secondary/50 hover:bg-secondary/30",
                className,
            )}
        >
            {image ? (
                <img
                    src={image}
                    alt={firstName || "User"}
                    className="h-full w-full object-cover"
                />
            ) : (
                <span className="relative z-10 font-black tracking-tight text-secondary-foreground leading-none">
                    {initials || "??"}
                </span>
            )}

            {/* Micro-glow effect */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none" />
        </motion.button>
    );
}
