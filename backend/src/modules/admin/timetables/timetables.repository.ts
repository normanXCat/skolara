import { prisma } from "../../../prisma/client";
import { Prisma } from "../../../generated/prisma";

export interface TimetableFilters {
  classId?: number;
  teacherId?: number;
  schoolYear?: string;
  dayOfWeek?: number;
}

export class TimetablesRepository {
  async findMany(filters: TimetableFilters) {
    const { classId, teacherId, schoolYear, dayOfWeek } = filters;
    const where: Prisma.TimetableWhereInput = {};

    if (classId) where.classId = classId;
    if (teacherId) where.teacherId = teacherId;
    if (schoolYear) where.schoolYear = schoolYear;
    if (dayOfWeek) where.dayOfWeek = dayOfWeek;

    return prisma.timetable.findMany({
      where,
      include: {
        class: true,
        subject: true,
        teacher: {
          include: {
            user: {
              select: {
                firstName: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: [
        { dayOfWeek: "asc" },
        { startTime: "asc" },
      ],
    });
  }

  async findById(id: number) {
    return prisma.timetable.findUnique({
      where: { id },
      include: {
        class: true,
        subject: true,
        teacher: {
          include: {
            user: {
              select: {
                firstName: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async create(data: Prisma.TimetableUncheckedCreateInput) {
    return prisma.timetable.create({ data });
  }

  async update(id: number, data: Prisma.TimetableUncheckedUpdateInput) {
    return prisma.timetable.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.timetable.delete({
      where: { id },
    });
  }

  /**
   * Finds overlapping slots for a class or teacher.
   */
  async findOverlappingSlots(params: {
    classId?: number;
    teacherId?: number;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    schoolYear: string;
    excludeId?: number;
  }) {
    const { classId, teacherId, dayOfWeek, startTime, endTime, schoolYear, excludeId } = params;

    const where: Prisma.TimetableWhereInput = {
      dayOfWeek,
      schoolYear,
      AND: [
        { startTime: { lt: endTime } },
        { endTime: { gt: startTime } },
      ],
    };

    if (excludeId) {
      where.id = { not: excludeId };
    }

    const classConflict = classId
      ? await prisma.timetable.findFirst({
          where: { ...where, classId },
          include: { class: true, subject: true },
        })
      : null;

    const teacherConflict = teacherId
      ? await prisma.timetable.findFirst({
          where: { ...where, teacherId },
          include: { teacher: { include: { user: true } }, subject: true },
        })
      : null;

    return { classConflict, teacherConflict };
  }
}

export default new TimetablesRepository();
