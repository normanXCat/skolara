"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsencesService = void 0;
const client_1 = require("../../../prisma/client");
const send_1 = require("../../../lib/email/send");
const AbsenceNotification_1 = require("../../../lib/email/templates/AbsenceNotification");
class AbsencesService {
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * Récupère les élèves d'une classe pour l'enseignant.
     */
    async getClassStudents(teacherId, classId) {
        const teacher = await client_1.prisma.teacher.findUnique({
            where: { id: teacherId },
            include: { assignments: { where: { classId } } }
        });
        if (!teacher || teacher.assignments.length === 0) {
            throw { status: 403, message: "Vous n'êtes pas assigné à cette classe" };
        }
        return this.repository.findStudentsByClass(classId);
    }
    /**
     * Enregistre l'appel et notifie les parents si nécessaire.
     */
    async saveRollCall(teacherId, classId, data) {
        // 1. Vérifier que l'enseignant est assigné à cette classe
        const teacher = await client_1.prisma.teacher.findUnique({
            where: { id: teacherId },
            include: { user: true, assignments: { where: { classId } } }
        });
        if (!teacher || teacher.assignments.length === 0) {
            throw { status: 403, message: "Vous n'êtes pas autorisé à faire l'appel pour cette classe" };
        }
        // 2. Enregistrer l'appel
        const date = new Date(data.date);
        const results = await this.repository.saveRollCall({
            classId,
            teacherId,
            date,
            records: data.records,
        });
        // 3. Notifier les parents (en arrière-plan ou après transaction)
        // On récupère les records qui nécessitent une notification (ABSENT ou LATE)
        const toNotify = results.filter(r => r.status === "ABSENT" || r.status === "LATE");
        for (const record of toNotify) {
            this.notifyParent(record, teacher.user.firstName + " " + teacher.user.name, data.date).catch(err => {
                console.error(`[ERROR] Failed to notify parent for student ${record.studentId}:`, err);
            });
        }
        return results;
    }
    /**
     * Envoie l'email de notification au parent.
     */
    async notifyParent(absence, teacherName, dateStr) {
        const student = await client_1.prisma.student.findUnique({
            where: { id: absence.studentId },
            include: {
                user: true,
                class: true,
                parent: { include: { user: true } }
            }
        });
        if (!student || !student.parent?.user.email)
            return;
        const emailHtml = (0, AbsenceNotification_1.getAbsenceNotificationEmail)({
            studentName: `${student.user.firstName} ${student.user.name}`,
            date: dateStr,
            status: absence.status,
            className: student.class?.name || "Inconnue",
            teacherName,
            reason: absence.reason
        });
        try {
            await (0, send_1.sendEmail)({
                to: student.parent.user.email,
                subject: `Avis d'absence — ${student.user.firstName} ${student.user.name} — ${dateStr}`,
                html: emailHtml
            });
            // Mettre à jour parentNotifiedAt
            await this.repository.markNotified(absence.id);
        }
        catch (error) {
            // On ne bloque pas si l'email échoue
            throw error;
        }
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
        if (filters.status)
            where.status = filters.status;
        if (filters.isJustified !== undefined)
            where.isJustified = filters.isJustified;
        if (filters.date) {
            const d = new Date(filters.date);
            where.date = {
                gte: new Date(d.setHours(0, 0, 0, 0)),
                lte: new Date(d.setHours(23, 59, 59, 999)),
            };
        }
        return this.repository.findAbsences(where);
    }
    /**
     * Récupère l'appel pour une date donnée.
     */
    async getRollCall(classId, date) {
        const d = new Date(date);
        const startOfDay = new Date(d.setHours(0, 0, 0, 0));
        const endOfDay = new Date(d.setHours(23, 59, 59, 999));
        const absences = await this.repository.findAbsences({
            classId,
            date: { gte: startOfDay, lte: endOfDay }
        });
        return absences;
    }
    /**
     * Justifie une absence.
     */
    async justifyAbsence(id, data) {
        return this.repository.justify(id, data);
    }
}
exports.AbsencesService = AbsencesService;
//# sourceMappingURL=absences.service.js.map