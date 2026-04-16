"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IconLoader2, IconSearch, IconChevronDown } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SelectOption {
    value: string | number;
    label: string;
}

export interface SelectReusableProps {
    label: string;
    id: string;
    placeholder?: string;
    error?: string;
    options: SelectOption[];
    value: string;
    onValueChange: (value: string) => void;
    icon?: React.ElementType;
    iconSize?: number;
    className?: string;
    /** Callback quand le texte de recherche change */
    onSearchChange?: (search: string) => void;
    searchTerm?: string;
    /** Pagination UI */
    onLoadMore?: () => void;
    hasMore?: boolean;
    isLoadingMore?: boolean;
}

/**
 * Composant Select réutilisable avec un design Premium (UI/UX Pro Max).
 * Inclut la gestion des icônes, des erreurs, et optionnellement la recherche et pagination.
 */
export default function SelectReusable({
    label,
    id,
    placeholder,
    error,
    options,
    value,
    onValueChange,
    icon: IconProp,
    iconSize = 20,
    className,
    onSearchChange,
    searchTerm,
    onLoadMore,
    hasMore,
    isLoadingMore,
}: SelectReusableProps) {
    const Icon = IconProp;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cn("flex flex-col gap-2 w-full", className)}>
            {/* Label */}
            <Label
                htmlFor={id}
                className={cn(
                    "px-1 transition-colors duration-300",
                    isOpen ? "text-primary" : "text-foreground/70",
                    error && "text-destructive",
                )}
            >
                {label}
            </Label>

            {/* Select Container */}
            <div className="relative group">
                {/* Background & Glass effect */}
                <div
                    className={cn(
                        "absolute inset-0 rounded-full transition-all duration-300 -z-10",
                        "bg-muted/30 border border-border/40 backdrop-blur-sm",
                        isOpen &&
                            "bg-background border-primary/30 ring-4 ring-primary/5",
                        error && "border-destructive/50 bg-destructive/5",
                    )}
                />

                {/* Focus Border Effect (Simpler for Select) */}
                <AnimatePresence>
                    {isOpen && !error && (
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
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            <div className="absolute inset-[1.5px] bg-background rounded-full" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Left Icon (Absolute inside Trigger) */}
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary z-10 pointer-events-none transition-colors">
                        <Icon size={iconSize} stroke={1.5} />
                    </div>
                )}

                <Select
                    value={value}
                    onValueChange={onValueChange}
                    onOpenChange={setIsOpen}
                >
                    <motion.div
                        animate={error ? { x: [-2, 2, -2, 2, 0] } : {}}
                        transition={{ duration: 0.4 }}
                    >
                        <SelectTrigger
                            id={id}
                            className={cn(
                                "!h-14 w-full bg-transparent border-none focus:ring-0 focus:ring-offset-0 rounded-full !py-0",
                                "text-base font-medium transition-all shadow-none outline-none",
                                Icon ? "pl-12 pr-12" : "px-12",
                                error && "text-destructive",
                            )}
                        >
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                    </motion.div>

                    <SelectContent className="rounded-2xl border-border/40 bg-background/95 backdrop-blur-xl shadow-2xl p-1">
                        {onSearchChange && (
                            <div className="relative mb-1 p-2">
                                <IconSearch className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
                                <input
                                    className="w-full h-10 rounded-xl bg-muted/50 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 border-transparent transition-all"
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        onSearchChange(e.target.value)
                                    }
                                    onClick={(e) => e.stopPropagation()}
                                    onKeyDown={(e) => e.stopPropagation()}
                                />
                            </div>
                        )}

                        <div className="max-h-60 overflow-y-auto custom-scrollbar">
                            {options.length > 0 ? (
                                options.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value.toString()}
                                        className="rounded-xl py-3 px-4 focus:bg-primary/10 focus:text-primary transition-colors cursor-pointer"
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))
                            ) : (
                                <div className="py-8 text-center text-sm text-muted-foreground italic">
                                    Aucun résultat trouvé
                                </div>
                            )}
                        </div>

                        {hasMore && onLoadMore && (
                            <button
                                type="button"
                                className={cn(
                                    "flex w-[calc(100%-8px)] m-1 items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border/60 text-xs font-bold text-primary hover:bg-primary/5 transition-all",
                                    isLoadingMore && "opacity-70 cursor-wait",
                                )}
                                disabled={isLoadingMore}
                                onPointerDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (!isLoadingMore) onLoadMore();
                                }}
                            >
                                {isLoadingMore ? (
                                    <>
                                        <IconLoader2 className="h-4 w-4 animate-spin" />
                                        <span>Chargement...</span>
                                    </>
                                ) : (
                                    <span>Charger plus</span>
                                )}
                            </button>
                        )}
                    </SelectContent>
                </Select>
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
