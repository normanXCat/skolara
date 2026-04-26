interface PreRegistrationConfirmationEmailOptions {
    parentName: string;
    childName: string;
    desiredGrade: string;
    submissionDate: string;
}
/**
 * Template d'email de confirmation après soumission d'une pré-inscription.
 */
export declare function PreRegistrationConfirmationEmail({ parentName, childName, desiredGrade, submissionDate }: PreRegistrationConfirmationEmailOptions): string;
export {};
//# sourceMappingURL=PreRegistrationConfirmation.d.ts.map