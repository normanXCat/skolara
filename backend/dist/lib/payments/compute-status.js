"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computePaymentStatus = computePaymentStatus;
/**
 * Calcule dynamiquement le statut d'un paiement en fonction
 * du montant dû, du montant payé et de la date d'échéance.
 *
 * @param amountDue Le montant total facturé (ex: 50000)
 * @param amountPaid Le montant déjà réglé (ex: 20000)
 * @param dueDate La date limite de paiement
 * @returns Le statut calculé (PAID, PARTIAL, LATE, PENDING)
 */
function computePaymentStatus(amountDue, amountPaid, dueDate) {
    if (amountPaid >= amountDue) {
        return "PAID";
    }
    if (amountPaid > 0 && amountPaid < amountDue) {
        return "PARTIAL";
    }
    const parsedDueDate = new Date(dueDate);
    const now = new Date();
    // On ignore l'heure pour comparer juste les dates si besoin,
    // ou on compare les ms de manière stricte.
    if (now.getTime() > parsedDueDate.getTime()) {
        return "LATE";
    }
    return "PENDING";
}
//# sourceMappingURL=compute-status.js.map