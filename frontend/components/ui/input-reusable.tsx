"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconUser, IconEye, IconEyeOff } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface InputReusableProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
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
    autoFocus?: boolean;
    success?: boolean;
    isLoading?: boolean;
    hideIcon?: boolean;
    compact?: boolean;
    inputClassName?: string;
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
    autoFocus = false,
    success = false,
    isLoading = false,
    hideIcon = false,
    compact = false,
    inputClassName,
    value,
    onChange,
    ...props
}: InputReusableProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPassword = type === "password";
    const Icon = IconProp ?? IconUser;

    return (
        <div className={cn("flex flex-col gap-2 w-full", className)}>
            {/* Header: Label + Forgot Password */}
            {(label || (isPassword && forgot)) && (
                <div className="flex items-center justify-between px-1">
                    {label && (
                        <Label
                            htmlFor={id}
                            className={cn(
                                "transition-colors duration-300",
                                isFocused
                                    ? "text-primary"
                                    : "text-foreground/70",
                                error && "text-destructive",
                                success && "text-emerald-500",
                                disabled && "opacity-50 cursor-not-allowed",
                            )}
                        >
                            {label}
                        </Label>
                    )}
                    {isPassword && forgot && (
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.05, x: -2 }}
                            className="text-sm font-semibold text-primary/80 hover:text-primary hover:underline transition-all"
                        >
                            Mot de passe oublié ?
                        </motion.a>
                    )}
                </div>
            )}

            {/* Input Container */}
            <div className="relative group">
                {/* Background & Glass effect */}
                <div
                    className={cn(
                        "absolute inset-0 transition-all duration-300 -z-10",
                        compact ? "rounded-full" : "rounded-full",
                        "bg-muted/30 border border-border/40 backdrop-blur-sm",
                        isFocused &&
                            "bg-background border-primary/30 ring-4 ring-primary/5",
                        error && "border-destructive/50 bg-destructive/5",
                        success && !error && "border-emerald-500/50 bg-emerald-500/5 ring-4 ring-emerald-500/5",
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
                            className={cn(
                                "absolute -inset-[1px] -z-10 overflow-hidden pointer-events-none",
                                compact ? "rounded-full" : "rounded-full"
                            )}
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
                            <div className={cn(
                                "absolute inset-[1.5px] bg-background",
                                compact ? "rounded-full" : "rounded-full"
                            )} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {!hideIcon && (
                    <div
                        className={cn(
                            "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors",
                            error && "text-destructive/80",
                            success && !error && "text-emerald-500/80",
                            disabled && "opacity-50",
                        )}
                    >
                        {isLoading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <Icon size={iconSize} stroke={1.5} className="opacity-40" />
                            </motion.div>
                        ) : (
                            <Icon size={iconSize} stroke={1.5} />
                        )}
                    </div>
                )}

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
                        value={value}
                        onChange={onChange}
                        {...register}
                        {...props}
                        disabled={disabled}
                        autoFocus={autoFocus}
                        onFocus={(e) => {
                            setIsFocused(true);
                            if (register?.onFocus) register.onFocus(e);
                            if (props.onFocus) props.onFocus(e);
                        }}
                        onBlur={(e) => {
                            setIsFocused(false);
                            if (register?.onBlur) register.onBlur(e);
                            if (props.onBlur) props.onBlur(e);
                        }}
                        className={cn(
                            !hideIcon ? (compact ? "pl-10" : "pl-12") : (compact ? "pl-4" : "pl-6"),
                            compact ? "pr-4" : "pr-12",
                            compact ? "!h-10 text-sm" : "!h-14 text-base",
                            "bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 !py-0",
                            compact ? "rounded-full" : "rounded-full",
                            "placeholder:text-muted-foreground/40 font-medium",
                            error && "text-destructive",
                            inputClassName
                        )}
                    />
                </motion.div>

                {/* Right Action (Password Toggle) */}
                {isPassword && showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-primary transition-colors p-1"
                        aria-label={
                            showPassword
                                ? "Masquer le mot de passe"
                                : "Afficher le mot de passe"
                        }
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
