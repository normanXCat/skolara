"use client";

import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { PaymentAlertItem } from "@/components/admin/PaymentAlertItem";
import { IconCheck } from "@tabler/icons-react";

interface PaymentAlertsProps {
    alerts: any[];
    loading?: boolean;
}

export function PaymentAlerts({ alerts, loading }: PaymentAlertsProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Typography
                    variant="h3"
                    className="text-xl font-black tracking-tight"
                >
                    Alertes paiements
                </Typography>
                <ButtonReusable
                    variant="ghost"
                    size="sm"
                    className="text-xs font-bold uppercase tracking-wider"
                >
                    Voir tout
                </ButtonReusable>
            </div>

            <div className="bg-white dark:bg-card border border-white/10 dark:border-white/5 rounded-3xl p-2 relative overflow-hidden h-full min-h-[300px]">
                {loading ? (
                    <div className="space-y-2 p-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="h-16 w-full bg-muted animate-pulse rounded-2xl"
                            />
                        ))}
                    </div>
                ) : alerts?.length > 0 ? (
                    <div className="space-y-1">
                        {alerts.map((alert: any, i: number) => (
                            <PaymentAlertItem
                                key={alert.id}
                                studentName={alert.studentName}
                                amount={alert.amount}
                                delay={0.1 * i}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center relative overflow-hidden h-full">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative mb-6"
                        >
                            <div className="h-20 w-20 rounded-[2.2rem] bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)] relative z-10">
                                <IconCheck size={36} strokeWidth={3} />
                            </div>
                            <div className="absolute inset-0 bg-emerald-500/30 blur-3xl rounded-full opacity-20" />
                        </motion.div>

                        <div className="space-y-1 relative z-10">
                            <Typography
                                variant="h4"
                                className="!text-lg font-black tracking-tight text-foreground"
                            >
                                Situation Saine
                            </Typography>
                            <Typography
                                variant="body"
                                className="!text-sm text-muted-foreground/70 max-w-[220px] mx-auto leading-relaxed font-medium"
                            >
                                Excellent ! Tous les comptes élèves sont
                                actuellement à jour.
                            </Typography>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
