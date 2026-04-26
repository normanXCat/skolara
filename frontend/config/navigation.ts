import { ROUTES } from "./routes";

/**
 * Configuration des liens de navigation.
 */
export const NAVIGATION_LINKS = [
    { label: "Accueil", href: ROUTES.HOME },
    { label: "Actualités et Blog", href: ROUTES.BLOG },
    { label: "Calendrier Scolaire", href: ROUTES.CALENDAR },
    { label: "Pré-Inscription", href: ROUTES.PRE_REGISTRATION },
    { label: "Contact", href: ROUTES.CONTACT },
] as const;

export const ADMIN_NAVIGATION_LINKS = [
    {
        label: "Tableau de bord",
        href: ROUTES.ADMIN.DASHBOARD,
        icon: "IconDashboard",
        disabled: false,
    },
    {
        label: "Élèves",
        href: ROUTES.ADMIN.STUDENTS,
        icon: "IconSchool",
        disabled: false,
    },
    {
        label: "Enseignants",
        href: ROUTES.ADMIN.TEACHERS,
        icon: "IconUsers",
        disabled: false,
        subLinks: [
            {
                label: "Liste des enseignants",
                href: ROUTES.ADMIN.TEACHERS,
            },
            {
                label: "Nouveau profil",
                href: ROUTES.ADMIN.TEACHERS + "/new",
            },
        ],
    },
    {
        label: "Classes",
        href: ROUTES.ADMIN.CLASSES,
        icon: "IconDoor",
        disabled: false,
        subLinks: [
            {
                label: "Liste des classes",
                href: ROUTES.ADMIN.CLASSES,
            },
            {
                label: "Nouvelle classe",
                href: ROUTES.ADMIN.CLASSES + "/new",
            },
        ],
    },
    {
        label: "Matières",
        href: ROUTES.ADMIN.SUBJECTS,
        icon: "IconBook",
        disabled: false,
    },
    {
        label: "Emplois du temps",
        href: ROUTES.ADMIN.TIMETABLES,
        icon: "IconCalendarTime",
        disabled: true,
    },
    {
        label: "Notes",
        href: ROUTES.ADMIN.GRADES,
        icon: "IconFileCertificate",
        disabled: false,
    },
    {
        label: "Absences",
        href: ROUTES.ADMIN.ABSENCES,
        icon: "IconUserX",
        disabled: false,
    },
    {
        label: "Bulletins",
        href: ROUTES.ADMIN.REPORTS,
        icon: "IconFileAnalytics",
        disabled: true,
    },
    {
        label: "Paiements",
        href: ROUTES.ADMIN.PAYMENTS,
        icon: "IconCreditCard",
        disabled: true,
    },
    {
        label: "Pré-inscriptions",
        href: ROUTES.ADMIN.PRE_REGISTRATIONS,
        icon: "IconClipboardList",
        disabled: false,
        subLinks: [
            {
                label: "Liste des demandes",
                href: ROUTES.ADMIN.PRE_REGISTRATIONS,
            },
            {
                label: "Examiner",
                href: ROUTES.ADMIN.PRE_REGISTRATIONS + "/example",
            }, // Placeholder for dynamic detail
        ],
    },
    {
        label: "Messages",
        href: ROUTES.ADMIN.MESSAGES,
        icon: "IconMessages",
        disabled: false,
    },
    {
        label: "Actualités",
        href: ROUTES.ADMIN.NEWS,
        icon: "IconNews",
        disabled: false,
        subLinks: [
            {
                label: "Tous les articles",
                href: ROUTES.ADMIN.NEWS,
            },
            {
                label: "Nouvel article",
                href: ROUTES.ADMIN.NEWS_NEW,
            },
        ],
    },
    {
        label: "Calendrier",
        href: ROUTES.ADMIN.CALENDAR,
        icon: "IconCalendar",
        disabled: false,
    },
    {
        label: "Paramètres",
        href: ROUTES.ADMIN.SETTINGS,
        icon: "IconSettings",
        disabled: false,
        subLinks: [
            { label: "Paramètres du site", href: ROUTES.ADMIN.SETTINGS },
            { label: "Mon profil", href: ROUTES.ADMIN.SETTINGS + "/profile" },
            { label: "Sécurité", href: ROUTES.ADMIN.SETTINGS + "/security" },
            {
                label: "Notifications",
                href: ROUTES.ADMIN.SETTINGS + "/notifications",
            },
            { label: "Facturation", href: ROUTES.ADMIN.SETTINGS + "/billing" },
        ],
    },
] as const;
export const TEACHER_NAVIGATION_LINKS = [
    {
        label: "Tableau de bord",
        href: ROUTES.TEACHER.DASHBOARD,
        icon: "IconDashboard",
    },
    {
        label: "Mes Classes",
        href: ROUTES.TEACHER.MY_CLASSES,
        icon: "IconDoor",
    },
    {
        label: "Notes",
        href: ROUTES.TEACHER.GRADES,
        icon: "IconFileCertificate",
    },
    {
        label: "Absences",
        href: ROUTES.TEACHER.ABSENCES,
        icon: "IconUserX",
    },
    {
        label: "Planning",
        href: ROUTES.TEACHER.PLANNING,
        icon: "IconCalendarTime",
    },
    {
        label: "Paramètres",
        href: ROUTES.TEACHER.SETTINGS,
        icon: "IconSettings",
    },
] as const;
