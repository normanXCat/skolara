import { PaymentStatus } from "../../generated/prisma";
/**
 * Calcule dynamiquement le statut d'un paiement en fonction
 * du montant dû, du montant payé et de la date d'échéance.
 *
 * @param amountDue Le montant total facturé (ex: 50000)
 * @param amountPaid Le montant déjà réglé (ex: 20000)
 * @param dueDate La date limite de paiement
 * @returns Le statut calculé (PAID, PARTIAL, LATE, PENDING)
 */
export declare function computePaymentStatus(amountDue: number, amountPaid: number, dueDate: Date | string): PaymentStatus;
//# sourceMappingURL=compute-status.d.ts.map