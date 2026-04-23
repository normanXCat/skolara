"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsencesService = void 0;
class AbsencesService {
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * Enregistre l'appel et notifie les parents si nécessaire.
     */
    async saveRollCall(teacherId, data) {
        const result = await this.repository.saveRollCall({
            ...data,
            teacherId,
        });
        // Logique de notification (Simulation)
        const absents = data.items.filter(i => i.status === "ABSENT");
        for (const item of absents) {
            // Dans un cas réel, on appellerait un service de mail/SMS ici
            console.log(`[NOTIFICATION] Student ID ${item.studentId} marked ABSENT on ${data.date}. Notifying parents...`);
            // On peut mettre à jour parentNotifiedAt plus tard via un worker ou ici
            // Pour l'instant on garde ça simple
        }
        return result;
    }
    /**
     * Historique des absences.
     */
    async getHistory(filters) {
        const where = {};
        if (filters.classId)
            where.classId = filters.classId;
        if (filters.studentId)
            where.studentId = filters.studentId;
        if (filters.date) {
            const d = new Date(filters.date);
            where.date = {
                gte: new Date(d.setHours(0, 0, 0, 0)),
                lt: new Date(d.setHours(23, 59, 59, 999)),
            };
        }
        return this.repository.findAbsences(where);
    }
}
exports.AbsencesService = AbsencesService;
//# sourceMappingURL=absences.service.js.map