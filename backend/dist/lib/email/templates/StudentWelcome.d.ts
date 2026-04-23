interface StudentWelcomeEmailOptions {
    firstName: string;
    email: string;
    password?: string;
}
/**
 * Template d'email de bienvenue pour les élèves.
 */
export declare function StudentWelcomeEmail({ firstName, email, password }: StudentWelcomeEmailOptions): string;
export {};
//# sourceMappingURL=StudentWelcome.d.ts.map