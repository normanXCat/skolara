"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
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
const validate = (schemas) => {
    return async (req, _res, next) => {
        try {
            if (schemas.body) {
                req.body = await schemas.body.parseAsync(req.body);
            }
            if (schemas.query) {
                const validatedQuery = await schemas.query.parseAsync(req.query);
                Object.defineProperty(req, "query", {
                    value: validatedQuery,
                    writable: true,
                    configurable: true,
                    enumerable: true,
                });
            }
            if (schemas.params) {
                const validatedParams = await schemas.params.parseAsync(req.params);
                Object.defineProperty(req, "params", {
                    value: validatedParams,
                    writable: true,
                    configurable: true,
                    enumerable: true,
                });
            }
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                next({
                    status: 400,
                    message: "Données de validation invalides",
                    details: error.issues,
                });
            }
            else {
                next(error);
            }
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map