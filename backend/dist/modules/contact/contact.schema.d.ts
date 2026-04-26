import { z } from "zod";
export declare const contactFormSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    subject: z.ZodString;
    message: z.ZodString;
}, z.core.$strip>;
export declare const contactFiltersSchema: z.ZodObject<{
    page: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
    limit: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
}, z.core.$strip>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type ContactFilters = z.infer<typeof contactFiltersSchema>;
//# sourceMappingURL=contact.schema.d.ts.map