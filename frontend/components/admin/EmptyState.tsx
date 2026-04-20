"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconSearchOff } from "@tabler/icons-react";

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: any;
    className?: string;
    action?: React.ReactNode;
}

export const EmptyState = ({
    title,
    description,
    icon: Icon = IconSearchOff,
    className,
    action,
}: EmptyStateProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
                "flex flex-col items-center justify-center py-20 px-6 text-center bg-background/50 border border-dashed border-border rounded-[2.5rem]",
                className,
            )}
        >
            <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-muted to-muted/20 text-muted-foreground/50 border border-border mb-8 shadow-inner">
                <Icon size={48} strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight">
                {title}
            </h3>
            <p className="text-muted-foreground font-medium max-w-sm mb-10 text-balance leading-relaxed">
                {description}
            </p>
            {action && (
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-foreground rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                    <div className="relative">{action}</div>
                </div>
            )}
        </motion.div>
    );
};
