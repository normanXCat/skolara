"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconLoader2, IconSearch, IconChevronDown } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface MultiSelectOption {
    value: string | number;
    label: string;
}

export interface MultiSelectReusableProps {
    label: string;
    id: string;
    placeholder?: string;
    error?: string;
    options: MultiSelectOption[];
    value: string[];
    onValueChange: (value: string[]) => void;
    icon?: React.ElementType;
    iconSize?: number;
    className?: string;
    onSearchChange?: (search: string) => void;
    searchTerm?: string;
    isLoading?: boolean;
    disabled?: boolean;
    name?: string;
}

/**
 * Composant Multi-Select réutilisable avec un design Premium (UI/UX Pro Max).
 * Calqué sur le design de SelectReusable.
 */
export const MultiSelectReusable = React.forwardRef<
    HTMLButtonElement,
    MultiSelectReusableProps
>(function MultiSelectReusable(props, ref) {
    const {
        label,
        id,
        placeholder = "Sélectionner...",
        error,
        options,
        value = [],
        onValueChange,
        icon: IconProp,
        iconSize = 20,
        className,
        onSearchChange,
        searchTerm,
        isLoading,
        disabled = false,
        name,
        ...rest
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const toggleValue = (val: string) => {
        const newValues = value.includes(val)
            ? value.filter((v) => v !== val)
            : [...value, val];
        onValueChange(newValues);
    };

    const selectedOptions = options.filter((opt) => 
        value.includes(opt.value.toString())
    );

    return (
        <div className={cn("flex flex-col gap-2 w-full", className)}>
            <Label
                htmlFor={id}
                className={cn(
                    "px-1 transition-colors duration-300",
                    isOpen || isFocused ? "text-primary" : "text-foreground/70",
                    error && "text-destructive",
                    disabled && "opacity-50 cursor-not-allowed",
                )}
            >
                {label}
            </Label>

            <div className="relative group">
                <div
                    className={cn(
                        "absolute inset-0 rounded-full transition-all duration-300 -z-10",
                        "bg-muted/30 border border-border/40 backdrop-blur-sm",
                        (isOpen || isFocused) &&
                            "bg-background border-primary/30 ring-4 ring-primary/5",
                        error && "border-destructive/50 bg-destructive/5",
                        disabled &&
                            "opacity-50 grayscale-[0.5] cursor-not-allowed",
                    )}
                />

                <AnimatePresence>
                    {(isOpen || isFocused) && !error && !disabled && (
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
                            <div className="absolute inset-[1.5px] bg-background rounded-full" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isLoading && IconProp && (
                    <div
                        className={cn(
                            "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 z-10 pointer-events-none transition-colors",
                            isOpen || isFocused ? "text-primary" : "",
                        )}
                    >
                        <IconProp size={iconSize} stroke={1.5} />
                    </div>
                )}

                <DropdownMenu onOpenChange={setIsOpen}>
                    <motion.div
                        animate={error ? { x: [-2, 2, -2, 2, 0] } : {}}
                        transition={{ duration: 0.4 }}
                    >
                        <DropdownMenuTrigger asChild>
                            <button
                                id={id}
                                name={name || id}
                                ref={ref}
                                disabled={disabled || isLoading}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className={cn(
                                    "flex items-center justify-between w-full min-h-14 px-4 py-2.5",
                                    "bg-transparent border-none outline-none focus:ring-0",
                                    "text-base font-medium transition-all shadow-none",
                                    IconProp || isLoading ? "pl-12" : "pl-6",
                                    error && "text-destructive",
                                    !value.length && "text-muted-foreground/40"
                                )}
                                {...rest}
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    {isLoading && (
                                        <IconLoader2
                                            size={iconSize}
                                            className="animate-spin text-primary shrink-0"
                                        />
                                    )}
                                    
                                    <div className="flex flex-wrap gap-1.5 overflow-hidden pointer-events-none pr-4 capitalize">
                                        {selectedOptions.length > 0 ? (
                                            selectedOptions.map((opt) => (
                                                <Badge 
                                                    key={opt.value} 
                                                    variant="secondary" 
                                                    className="rounded-full bg-primary/10 text-primary border-none font-bold text-[10px] uppercase px-2 py-0.5"
                                                >
                                                    {opt.label}
                                                </Badge>
                                            ))
                                        ) : (
                                            <span className="truncate text-sm opacity-60">
                                                {isLoading ? "Chargement..." : placeholder}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <IconChevronDown size={20} className={cn("text-muted-foreground/40 shrink-0 transition-transform duration-300", isOpen && "rotate-180")} />
                            </button>
                        </DropdownMenuTrigger>
                    </motion.div>

                    <DropdownMenuContent 
                        align="start" 
                        className="w-[300px] max-h-80 overflow-y-auto rounded-3xl p-2 bg-background/91 backdrop-blur-3xl border-border/40 shadow-2xl custom-scrollbar"
                    >
                        {onSearchChange && (
                            <div className="relative mb-1 p-2">
                                <IconSearch className="absolute left-6 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
                                <input
                                    className="w-full h-11 rounded-2xl bg-muted/50 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 border-transparent transition-all"
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        onSearchChange(e.target.value)
                                    }
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        )}

                        <div className="space-y-0.5">
                            {options.map((option) => (
                                <DropdownMenuCheckboxItem
                                    key={option.value}
                                    checked={value.includes(option.value.toString())}
                                    onCheckedChange={() => toggleValue(option.value.toString())}
                                    className="rounded-xl py-3 pl-10 pr-4 cursor-pointer focus:bg-primary/10 focus:text-primary transition-colors transition-all"
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <span className="font-semibold truncate">{option.label}</span>
                                </DropdownMenuCheckboxItem>
                            ))}
                            {options.length === 0 && !isLoading && (
                                <div className="py-8 text-center text-sm text-muted-foreground italic">
                                    Aucun résultat trouvé
                                </div>
                            )}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

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
});

MultiSelectReusable.displayName = "MultiSelectReusable";

export default MultiSelectReusable;
