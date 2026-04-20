/**
 * Centralisation des routes de l'application.
 */
export const ROUTES = {
    HOME: "/",
    BLOG: "/blog",
    CALENDAR: "/calendrier",
    PRE_REGISTRATION: "/pre-registration",
    CONTACT: "/contact",
    LOGIN: "/login",
    DASHBOARD: "/dashboard",
    ADMIN: {
        DASHBOARD: "/admin/dashboard",
        STUDENTS: "/admin/students",
        STUDENTS_NEW: "/admin/students/new",
        STUDENTS_EDIT: (id: string | number) => `/admin/students/${id}/edit`,
        STUDENTS_DETAIL: (id: string | number) => `/admin/students/${id}`,
        PRE_REGISTRATIONS: "/admin/pre-registrations",
        PRE_REGISTRATIONS_DETAIL: (id: string | number) =>
            `/admin/pre-registrations/${id}`,
        TEACHERS: "/admin/teachers",
        CLASSES: "/admin/classes",
        TIMETABLES: "/admin/timetables",
        GRADES: "/admin/grades",
        ABSENCES: "/admin/absences",
        REPORTS: "/admin/reports",
        PAYMENTS: "/admin/payments",
        MESSAGES: "/admin/messages",
        SETTINGS: "/admin/settings",
    },
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
