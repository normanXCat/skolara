import { Prisma } from "../../generated/prisma";
export declare class CalendarRepository {
    create(data: Prisma.CalendarEventCreateInput): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        eventType: string;
        isPublic: boolean;
    }>;
    findMany(params: {
        where?: Prisma.CalendarEventWhereInput;
        orderBy?: Prisma.CalendarEventOrderByWithRelationInput;
        take?: number;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        eventType: string;
        isPublic: boolean;
    }[]>;
    findById(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        eventType: string;
        isPublic: boolean;
    } | null>;
    update(id: number, data: Prisma.CalendarEventUpdateInput): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        eventType: string;
        isPublic: boolean;
    }>;
    delete(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        eventType: string;
        isPublic: boolean;
    }>;
    findAllTypes(): Promise<{
        value: string;
        id: number;
        label: string;
        color: string | null;
    }[]>;
}
//# sourceMappingURL=calendar.repository.d.ts.map