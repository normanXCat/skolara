import { CalendarRepository } from "./calendar.repository";
import { CreateEventInput, UpdateEventInput, CalendarFilters } from "./calendar.schema";
export declare class CalendarService {
    private calendarRepository;
    constructor(calendarRepository: CalendarRepository);
    create(data: CreateEventInput): Promise<{
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
    findAll(filters: CalendarFilters, isPublicOnly?: boolean): Promise<{
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
    update(id: number, data: UpdateEventInput): Promise<{
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
//# sourceMappingURL=calendar.service.d.ts.map