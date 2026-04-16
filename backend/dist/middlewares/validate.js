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
                req.body = schemas.body.parse(req.body);
            }
            if (schemas.query) {
                req.query = schemas.query.parse(req.query);
            }
            if (schemas.params) {
                req.params = schemas.params.parse(req.params);
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