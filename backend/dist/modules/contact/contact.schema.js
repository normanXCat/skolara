"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactFiltersSchema = exports.contactFormSchema = void 0;
const zod_1 = require("zod");
exports.contactFormSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2, "Le nom doit faire au moins 2 caractères"),
    email: zod_1.z.string().email("Email invalide"),
    subject: zod_1.z.string().min(3, "Le sujet doit faire au moins 3 caractères"),
    message: zod_1.z.string().min(10, "Le message doit faire au moins 10 caractères").max(2000, "Le message est trop long"),
});
exports.contactFiltersSchema = zod_1.z.object({
    page: zod_1.z.string().optional().transform((val) => (val ? parseInt(val) : 1)),
    limit: zod_1.z.string().optional().transform((val) => (val ? parseInt(val) : 20)),
});
//# sourceMappingURL=contact.schema.js.map