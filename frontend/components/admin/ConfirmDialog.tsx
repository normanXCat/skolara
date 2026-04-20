"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconAlertTriangle, IconX } from "@tabler/icons-react";
import { ButtonReusable } from "@/components/ui/button-reusable";

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "default" | "destructive" | "warning";
    isLoading?: boolean;
}

export const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel = "Confirmer",
    cancelLabel = "Annuler",
    variant = "default",
    isLoading = false,
}: ConfirmDialogProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                        }}
                        className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-border/50 bg-background p-10 shadow-2xl"
                    >
                        {/* Motif décoratif en fond */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                        <button
                            onClick={onClose}
                            className="absolute right-8 top-8 text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full"
                        >
                            <IconX size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center relative z-10">
                            <div
                                className={cn(
                                    "flex h-20 w-20 items-center justify-center rounded-[2rem] mb-8 shadow-inner border border-border/50",
                                    variant === "destructive"
                                        ? "bg-rose-500/10 text-rose-500"
                                        : variant === "warning"
                                          ? "bg-amber-500/10 text-amber-500"
                                          : "bg-primary/10 text-primary",
                                )}
                            >
                                <IconAlertTriangle
                                    size={40}
                                    strokeWidth={1.5}
                                />
                            </div>

                            <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight">
                                {title}
                            </h3>
                            <p className="text-muted-foreground font-medium mb-10 max-w-[280px] leading-relaxed">
                                {description}
                            </p>

                            <div className="flex w-full flex-col gap-4 sm:flex-row">
                                <ButtonReusable
                                    onClick={onClose}
                                    variant="outline"
                                    className="flex-1 rounded-2xl h-14"
                                    disabled={isLoading}
                                >
                                    {cancelLabel}
                                </ButtonReusable>
                                <ButtonReusable
                                    onClick={onConfirm}
                                    variant={
                                        variant === "destructive"
                                            ? "destructive"
                                            : "default"
                                    }
                                    className="flex-1 rounded-2xl h-14 shadow-lg shadow-primary/20"
                                    isLoading={isLoading}
                                    loadingText={confirmLabel}
                                >
                                    {confirmLabel}
                                </ButtonReusable>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
