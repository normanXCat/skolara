import timetablesRepository, { TimetableFilters } from "./timetables.repository";

export class TimetablesService {
  async getTimetables(filters: TimetableFilters) {
    return timetablesRepository.findMany(filters);
  }

  async getTimetableById(id: number) {
    const timetable = await timetablesRepository.findById(id);
    if (!timetable) {
      throw { status: 404, message: "Timetable slot not found" };
    }
    return timetable;
  }

  async checkConflicts(data: {
    classId?: number;
    teacherId?: number;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    schoolYear: string;
    excludeId?: number;
  }) {
    if (data.startTime >= data.endTime) {
      throw { status: 400, message: "End time must be after start time" };
    }

    const { classConflict, teacherConflict } = await timetablesRepository.findOverlappingSlots(data);

    if (classConflict && data.classId === classConflict.classId) {
      return { 
        conflict: true, 
        reason: `La classe a déjà un cours (${classConflict.subject.name}) à ce créneau.`,
        type: 'CLASS'
      };
    }

    if (teacherConflict && data.teacherId === teacherConflict.teacherId) {
      const teacherName = `${teacherConflict.teacher.user.firstName} ${teacherConflict.teacher.user.name}`;
      return { 
        conflict: true, 
        reason: `L'enseignant ${teacherName} a déjà un cours (${teacherConflict.subject.name}) à ce créneau.`,
        type: 'TEACHER'
      };
    }

    return { conflict: false };
  }

  async createTimetableSlot(data: any) {
    const conflictCheck = await this.checkConflicts({
      classId: data.classId,
      teacherId: data.teacherId,
      dayOfWeek: data.dayOfWeek,
      startTime: data.startTime,
      endTime: data.endTime,
      schoolYear: data.schoolYear,
    });

    if (conflictCheck.conflict) {
      throw { status: 409, message: conflictCheck.reason! };
    }

    return timetablesRepository.create(data);
  }

  async updateTimetableSlot(id: number, data: any) {
    const slot = await this.getTimetableById(id);

    const conflictCheck = await this.checkConflicts({
      classId: data.classId ?? slot.classId,
      teacherId: data.teacherId ?? slot.teacherId,
      dayOfWeek: data.dayOfWeek ?? slot.dayOfWeek,
      startTime: data.startTime ?? slot.startTime,
      endTime: data.endTime ?? slot.endTime,
      schoolYear: data.schoolYear ?? slot.schoolYear,
      excludeId: id,
    });

    if (conflictCheck.conflict) {
      throw { status: 409, message: conflictCheck.reason! };
    }

    return timetablesRepository.update(id, data);
  }

  async deleteTimetableSlot(id: number) {
    await this.getTimetableById(id);
    return timetablesRepository.delete(id);
  }
}

export default new TimetablesService();
