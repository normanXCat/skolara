/**
 * Centralisation des routes de l'application.
 */
export const ROUTES = {
    HOME: "/",
    BLOG: "/blog",
    CALENDAR: "/calendar",
    PRE_REGISTRATION: "/pre-registration",
    CONTACT: "/contact",
    FAQ: "/legal/faq",
    LOGIN: "/login",
    DASHBOARD: "/",
    ADMIN: {
        DASHBOARD: "/admin/dashboard",
        STUDENTS: "/admin/students",
        STUDENTS_EDIT: (id: string | number) => `/admin/students/${id}/edit`,
        STUDENTS_DETAIL: (id: string | number) => `/admin/students/${id}`,
        PRE_REGISTRATIONS: "/admin/pre-registrations",
        PRE_REGISTRATIONS_DETAIL: (id: string | number) =>
            `/admin/pre-registrations/${id}`,
        TEACHERS: "/admin/teachers",
        CLASSES: "/admin/classes",
        TIMETABLES: "/admin/timetables",
        SUBJECTS: "/admin/subjects",
        GRADES: "/admin/grades",
        ABSENCES: "/admin/absences",
        REPORTS: "/admin/reports",
        PAYMENTS: "/admin/payments",
        MESSAGES: "/admin/messages",
        NEWS: "/admin/news",
        NEWS_NEW: "/admin/news/new",
        NEWS_EDIT: (id: string | number) => `/admin/news/${id}/edit`,
        NEWS_DETAIL: (id: string | number) => `/admin/news/${id}`,
        CALENDAR: "/admin/calendar",
        SETTINGS: "/admin/settings",
        LESSON_BOOK: "/admin/lesson-book",
        CONTACT: "/admin/contact",
    },
    TEACHER: {
        DASHBOARD: "/teacher/dashboard",
        GRADES: "/teacher/grades",
        ABSENCES: "/teacher/absences",
        MY_CLASSES: "/teacher/classes",
        PLANNING: "/teacher/planning",
        SETTINGS: "/teacher/settings",
        MESSAGES: "/teacher/messages",
        LESSON_BOOK: "/teacher/lesson-book",
    },
    STUDENT: {
        DASHBOARD: "/student/dashboard",
        TIMETABLE: "/student/timetable",
        REPORTS: "/student/report-cards",
        GRADES: "/student/grades",
        ABSENCES: "/student/absences",
        PAYMENTS: "/student/payments",
        SETTINGS: "/student/settings",
        LESSON_BOOK: "/student/lesson-book",
        MESSAGES: "/student/messages"
    },
    PARENT: {
        DASHBOARD: "/parent/dashboard",
        TIMETABLE: "/parent/timetable",
        REPORTS: "/parent/report-cards",
        PAYMENTS: "/parent/payments",
        SETTINGS: "/parent/settings",
        LESSON_BOOK: "/parent/lesson-book",
        MESSAGES: "/parent/messages"
    }
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
