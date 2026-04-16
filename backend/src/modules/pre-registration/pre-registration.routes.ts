import { Router } from "express";
import { PreRegistrationController } from "./pre-registration.controller";
import { validate } from "../../middlewares/validate";
import {
    createPreRegistrationSchema,
    updatePreRegistrationSchema,
    idParamSchema,
    listQuerySchema,
} from "./pre-registration.schema";

/**
 * Routeur Express pour les pré-inscriptions.
 * Définit les endpoints CRUD avec validation Zod en amont.
 */
const router = Router();

/**
 * POST /api/pre-registrations
 * Crée une nouvelle pré-inscription (accès public).
 */
router.post(
    "/",
    validate({ body: createPreRegistrationSchema }),
    PreRegistrationController.create,
);

/**
 * GET /api/pre-registrations
 * Liste les pré-inscriptions avec pagination et filtre par statut (accès admin).
 */
router.get(
    "/",
    validate({ query: listQuerySchema }),
    PreRegistrationController.findAll,
);

/**
 * GET /api/pre-registrations/:id
 * Récupère le détail d'une pré-inscription par son identifiant (accès admin).
 */
router.get(
    "/:id",
    validate({ params: idParamSchema }),
    PreRegistrationController.findById,
);

/**
 * PATCH /api/pre-registrations/:id
 * Met à jour le statut d'une pré-inscription (accès admin).
 */
router.patch(
    "/:id",
    validate({ params: idParamSchema, body: updatePreRegistrationSchema }),
    PreRegistrationController.update,
);

/**
 * DELETE /api/pre-registrations/:id
 * Supprime une pré-inscription (accès admin).
 */
router.delete(
    "/:id",
    validate({ params: idParamSchema }),
    PreRegistrationController.delete,
);

export default router;
