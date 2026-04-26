interface TeacherWelcomeEmailOptions {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}
/**
 * Template d'email de bienvenue pour les nouveaux enseignants.
 */
export declare function TeacherWelcomeEmail({ firstName, lastName, email, password }: TeacherWelcomeEmailOptions): string;
export {};
//# sourceMappingURL=TeacherWelcome.d.ts.map