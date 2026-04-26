import { z } from "zod";
export declare const updateSettingsSchema: z.ZodObject<{
    school_name: z.ZodString;
    phone: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    email: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<"">]>>>;
    address: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    city: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    google_maps_url: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<"">]>>>;
    facebook_url: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<"">]>>>;
    instagram_url: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<"">]>>>;
    twitter_url: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<"">]>>>;
    linkedin_url: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<"">]>>>;
    mentions_legales: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    cgu: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
//# sourceMappingURL=settings.schema.d.ts.map