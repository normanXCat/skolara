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
        disabled: true,
    },
    {
        label: "Classes",
        href: ROUTES.ADMIN.CLASSES,
        icon: "IconDoor",
        disabled: true,
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
        disabled: true,
    },
    {
        label: "Absences",
        href: ROUTES.ADMIN.ABSENCES,
        icon: "IconUserX",
        disabled: true,
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
        disabled: true,
    },
    {
        label: "Paramètres",
        href: ROUTES.ADMIN.SETTINGS,
        icon: "IconSettings",
        disabled: false,
        subLinks: [
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
