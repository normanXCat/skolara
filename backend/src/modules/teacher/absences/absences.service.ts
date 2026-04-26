import { AbsencesRepository } from "./absences.repository";
import { RollCallInput, AbsenceFiltersInput, JustifyAbsenceInput } from "./absences.schema";
import { prisma } from "../../../prisma/client";
import { sendEmail } from "../../../lib/email/send";
import { getAbsenceNotificationEmail } from "../../../lib/email/templates/AbsenceNotification";

export class AbsencesService {
    private repository: AbsencesRepository;

    constructor(repository: AbsencesRepository) {
        this.repository = repository;
    }

    /**
     * Récupère les élèves d'une classe pour l'enseignant.
     */
    async getClassStudents(teacherId: number, classId: number) {
        const teacher = await prisma.teacher.findUnique({
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
    async saveRollCall(teacherId: number, classId: number, data: RollCallInput) {
        // 1. Vérifier que l'enseignant est assigné à cette classe
        const teacher = await prisma.teacher.findUnique({
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
    private async notifyParent(absence: { studentId: number; status: string; reason?: string | null; id: number }, teacherName: string, dateStr: string) {
        const student = await prisma.student.findUnique({
            where: { id: absence.studentId },
            include: { 
                user: true, 
                class: true,
                parent: { include: { user: true } } 
            }
        });

        if (!student || !student.parent?.user.email) return;

        const emailHtml = getAbsenceNotificationEmail({
            studentName: `${student.user.firstName} ${student.user.name}`,
            date: dateStr,
            status: absence.status as "ABSENT" | "LATE",
            className: student.class?.name || "Inconnue",
            teacherName,
            reason: absence.reason
        });

        try {
            await sendEmail({
                to: student.parent.user.email,
                subject: `Avis d'absence — ${student.user.firstName} ${student.user.name} — ${dateStr}`,
                html: emailHtml
            });

            // Mettre à jour parentNotifiedAt
            await this.repository.markNotified(absence.id);
        } catch (error) {
            // On ne bloque pas si l'email échoue
            throw error;
        }
    }

    /**
     * Historique des absences.
     */
    async getHistory(filters: AbsenceFiltersInput) {
        const where: any = {};
        if (filters.classId) where.classId = filters.classId;
        if (filters.studentId) where.studentId = filters.studentId;
        if (filters.status) where.status = filters.status;
        if (filters.isJustified !== undefined) where.isJustified = filters.isJustified;
        
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
    async getRollCall(classId: number, date: string) {
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
    async justifyAbsence(id: number, data: JustifyAbsenceInput) {
        return this.repository.justify(id, data);
    }
}
