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
export const validate = (schemas: ValidationSchemas) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }
            if (schemas.query) {
                req.query = schemas.query.parse(req.query) as any;
            }
            if (schemas.params) {
                req.params = schemas.params.parse(req.params) as any;
            }
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                next({
                    status: 400,
                    message: "Données de validation invalides",
                    details: error.issues,
                });
            } else {
                next(error);
            }
        }
    };
};
