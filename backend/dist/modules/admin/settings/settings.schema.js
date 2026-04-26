"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettingsSchema = void 0;
const zod_1 = require("zod");
const optionalUrl = zod_1.z
    .string()
    .url("URL invalide")
    .or(zod_1.z.literal(""))
    .optional()
    .default("");
exports.updateSettingsSchema = zod_1.z.object({
    school_name: zod_1.z.string().min(1, "Le nom de l'établissement est requis"),
    phone: zod_1.z.string().optional().default(""),
    email: zod_1.z
        .string()
        .email("Format d'email invalide")
        .or(zod_1.z.literal(""))
        .optional()
        .default(""),
    address: zod_1.z.string().optional().default(""),
    city: zod_1.z.string().optional().default(""),
    google_maps_url: optionalUrl,
    facebook_url: optionalUrl,
    instagram_url: optionalUrl,
    twitter_url: optionalUrl,
    linkedin_url: optionalUrl,
    mentions_legales: zod_1.z.string().optional().default(""),
    cgu: zod_1.z.string().optional().default(""),
});
//# sourceMappingURL=settings.schema.js.map