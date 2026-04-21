"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextareaReusableProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    id: string;
    error?: string;
    register?: any;
    icon?: React.ElementType;
    iconSize?: number;
    className?: string;
    disabled?: boolean;
}

/**
 * Composant Textarea réutilisable avec un design Premium (UI/UX Pro Max).
 * Adapté de InputReusable pour les blocs de texte multi-lignes.
 */
export default function TextareaReusable({
    label,
    id,
    placeholder,
    error,
    register,
    icon: Icon,
    iconSize = 20,
    className,
    disabled = false,
    value,
    onChange,
    ...props
}: TextareaReusableProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={cn("flex flex-col gap-2 w-full", className)}>
            {/* Label */}
            {label && (
                <div className="px-1">
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
                </div>
            )}

            {/* Content Container */}
            <div className="relative group flex-1 flex flex-col min-h-32">
                {/* Background & Glass effect */}
                <div
                    className={cn(
                        "absolute inset-0 rounded-[2rem] transition-all duration-300 -z-10",
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
                            className="absolute -inset-[1px] -z-10 rounded-[2rem] overflow-hidden pointer-events-none"
                        >
                            <motion.div
                                className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,var(--primary)_40deg,transparent_80deg)]"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            {/* Mask to keep only the border */}
                            <div className="absolute inset-[1.5px] bg-background rounded-[2rem]" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Top-Left Icon */}
                {Icon && (
                    <div
                        className={cn(
                            "absolute left-5 top-5 text-muted-foreground/60 group-focus-within:text-primary transition-colors",
                            disabled && "opacity-50",
                        )}
                    >
                        <Icon size={iconSize} stroke={1.5} />
                    </div>
                )}

                {/* Base Textarea Component */}
                <motion.div
                    animate={error ? { x: [-2, 2, -2, 2, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="flex-1 flex flex-col"
                >
                    <textarea
                        id={id}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        {...register}
                        {...props}
                        disabled={disabled}
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
                            "w-full h-full bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[2rem] p-6 outline-none",
                            Icon && "pl-14",
                            "text-base placeholder:text-muted-foreground/40 font-medium resize-none custom-scrollbar",
                            error && "text-destructive",
                        )}
                    />
                </motion.div>
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
