"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconUser, IconEye, IconEyeOff } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface InputReusableProps {
    label: string;
    id: string;
    type?: string;
    placeholder?: string;
    error?: string;
    register?: any;
    icon?: React.ElementType;
    iconSize?: number;
    forgot?: boolean;
    className?: string;
    showPasswordToggle?: boolean;
    disabled?: boolean;
}

/**
 * Composant Input réutilisable avec un design Premium (UI/UX Pro Max).
 * Caractéristiques :
 * - Effet de focus avec "Laser Border" animé.
 * - Glassmorphism de base.
 * - Support des icônes et toggle mot de passe.
 * - Animation d'erreur (shake).
 */
export default function InputReusable({
    label,
    id,
    type = "text",
    placeholder,
    error,
    register,
    icon: IconProp,
    iconSize = 20,
    forgot = false,
    className,
    showPasswordToggle = true,
    disabled = false,
}: InputReusableProps) {
    const Icon = IconProp ?? IconUser;
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPassword = type === "password";

    return (
        <div className={cn("flex flex-col gap-2 w-full", className)}>
            {/* Header: Label + Forgot Password */}
            <div className="flex items-center justify-between px-1">
                <Label
                    htmlFor={id}
                    className={cn(
                        "transition-colors duration-300",
                        isFocused ? "text-primary" : "text-foreground/70",
                        error && "text-destructive",
                        disabled && "opacity-50 cursor-not-allowed",
                    )}
                >
                    {label}
                </Label>
                {isPassword && forgot && (
                    <motion.a
                        whileHover={{ scale: 1.05, x: -2 }}
                        href="#"
                        className="text-xs font-semibold text-primary/80 hover:text-primary transition-colors"
                    >
                        Mot de passe oublié ?
                    </motion.a>
                )}
            </div>

            {/* Input Container */}
            <div className="relative group">
                {/* Background & Glass effect */}
                <div
                    className={cn(
                        "absolute inset-0 rounded-full transition-all duration-300 -z-10",
                        "bg-muted/30 border border-border/40 backdrop-blur-sm",
                        isFocused &&
                            "bg-background border-primary/30 ring-4 ring-primary/5",
                        error && "border-destructive/50 bg-destructive/5",
                        disabled &&
                            "opacity-50 grayscale-[0.5] cursor-not-allowed",
                    )}
                />

                {/* Focus "Laser Border" Effect */}
                <AnimatePresence>
                    {isFocused && !error && !disabled && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute -inset-[1px] -z-10 rounded-full overflow-hidden pointer-events-none"
                        >
                            <motion.div
                                className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,var(--primary)_40deg,transparent_80deg)]"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            {/* Mask to keep only the border */}
                            <div className="absolute inset-[1.5px] bg-background rounded-full" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Left Icon */}
                <div
                    className={cn(
                        "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors",
                        disabled && "opacity-50",
                    )}
                >
                    <Icon size={iconSize} stroke={1.5} />
                </div>

                {/* Base Input Component */}
                <motion.div
                    animate={error ? { x: [-2, 2, -2, 2, 0] } : {}}
                    transition={{ duration: 0.4 }}
                >
                    <Input
                        id={id}
                        type={
                            isPassword && !showPassword
                                ? "password"
                                : type === "password"
                                  ? "text"
                                  : type
                        }
                        placeholder={placeholder}
                        {...register}
                        disabled={disabled}
                        onFocus={(e) => {
                            setIsFocused(true);
                            if (register?.onFocus) register.onFocus(e);
                        }}
                        onBlur={(e) => {
                            setIsFocused(false);
                            if (register?.onBlur) register.onBlur(e);
                        }}
                        onChange={(e) => {
                            if (register?.onChange) register.onChange(e);
                        }}
                        className={cn(
                            "pl-12 pr-12 !h-14 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full !py-0",
                            "text-base placeholder:text-muted-foreground/40 font-medium",
                            error && "text-destructive",
                        )}
                    />
                </motion.div>

                {/* Right Action (Password Toggle) */}
                {isPassword && showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-primary transition-colors p-1"
                    >
                        {showPassword ? (
                            <IconEyeOff size={20} stroke={1.5} />
                        ) : (
                            <IconEye size={20} stroke={1.5} />
                        )}
                    </button>
                )}
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="px-1 text-xs font-bold text-destructive"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
