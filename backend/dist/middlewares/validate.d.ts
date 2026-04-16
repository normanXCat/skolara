import { Request, Response, NextFunction } from "express";
import { z } from "zod";
/**
 * Options du middleware de validation.
 * Permet de valider le body, les query params et les params d'URL.
 */
interface ValidationSchemas {
    /** Schéma Zod pour le corps de la requête */
    body?: z.ZodType;
    /** Schéma Zod pour les paramètres de query string */
    query?: z.ZodType;
    /** Schéma Zod pour les paramètres d'URL */
    params?: z.ZodType;
}
/**
 * Middleware générique de validation Zod.
 * Valide le body, les query params et/ou les params d'URL d'une requête.
 *
 * @param schemas - Objet contenant les schémas Zod à appliquer
 * @returns Middleware Express
 *
 * @example
 * router.post("/", validate({ body: createSchema }), controller.create);
 */
export declare const validate: (schemas: ValidationSchemas) => (req: Request, _res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=validate.d.ts.map