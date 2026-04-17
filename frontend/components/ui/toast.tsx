"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconCheck,
    IconExclamationCircle,
    IconInfoCircle,
    IconAlertTriangle,
    IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Toast, toastManager } from "@/lib/toast-store";

const iconMap = {
    success: <IconCheck className="w-5 h-5 text-emerald-500" />,
    error: <IconExclamationCircle className="w-5 h-5 text-rose-500" />,
    info: <IconInfoCircle className="w-5 h-5 text-blue-500" />,
    warning: <IconAlertTriangle className="w-5 h-5 text-amber-500" />,
};

export function ToastItem({ toast }: { toast: Toast }) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [progress, setProgress] = React.useState(100);

    React.useEffect(() => {
        if (toast.duration === Infinity || isHovered) return;

        const interval = 10;
        const step = (interval / (toast.duration || 5000)) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => Math.max(0, prev - step));
        }, interval);

        return () => clearInterval(timer);
    }, [toast.duration, isHovered]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, y: 20, filter: "blur(10px)" }}
            transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                layout: { duration: 0.3 },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "relative overflow-hidden group px-6 py-3.5 rounded-full border shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-4 bg-white/70 dark:bg-black/40 backdrop-blur-2xl transition-all duration-300 pointer-events-auto",
                toast.type === "success" &&
                    "border-emerald-500/30 shadow-emerald-500/10",
                toast.type === "error" &&
                    "border-rose-500/30 shadow-rose-500/10",
                toast.type === "info" &&
                    "border-blue-500/30 shadow-blue-500/10",
                toast.type === "warning" &&
                    "border-amber-500/30 shadow-amber-500/10",
            )}
        >
            <div className="flex-shrink-0 flex items-center justify-center size-8 rounded-full bg-white dark:bg-white/10 shadow-sm border border-black/5 dark:border-white/10">
                {iconMap[toast.type]}
            </div>

            <div className="flex-grow pr-2">
                <p className="text-[14px] font-semibold tracking-tight text-foreground/90 leading-none whitespace-nowrap">
                    {toast.message}
                </p>
            </div>

            <button
                onClick={() => toastManager.removeToast(toast.id)}
                className="flex-shrink-0 text-muted-foreground/40 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-all p-1.5 rounded-full"
            >
                <IconX className="w-3.5 h-3.5" />
            </button>

            {/* Progress handle - elegant subtle line */}
            {toast.duration !== Infinity && (
                <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-black/5 dark:bg-white/5 overflow-hidden rounded-full">
                    <motion.div
                        className={cn(
                            "h-full rounded-full",
                            toast.type === "success" && "bg-emerald-500",
                            toast.type === "error" && "bg-rose-500",
                            toast.type === "info" && "bg-blue-500",
                            toast.type === "warning" && "bg-amber-500",
                        )}
                        initial={{ width: "100%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                    />
                </div>
            )}
        </motion.div>
    );
}

export function ToastContainer() {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    React.useEffect(() => {
        return toastManager.subscribe((newToasts) => {
            setToasts(newToasts);
        });
    }, []);

    return (
        <div className="fixed bottom-10 left-0 right-0 z-[9999] flex flex-col items-center pointer-events-none">
            <div className="flex flex-col items-center gap-4 px-6 max-w-full">
                <AnimatePresence mode="popLayout" initial={false}>
                    {toasts.map((toast) => (
                        <ToastItem key={toast.id} toast={toast} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
