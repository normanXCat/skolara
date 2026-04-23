interface ParentWelcomeEmailOptions {
    parentName: string;
    childName: string;
    email: string;
    password?: string;
}
/**
 * Template d'email de bienvenue pour les parents.
 */
export declare function ParentWelcomeEmail({ parentName, childName, email, password }: ParentWelcomeEmailOptions): string;
export {};
//# sourceMappingURL=ParentWelcome.d.ts.map