"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pre_registration_controller_1 = require("./pre-registration.controller");
const validate_1 = require("../../middlewares/validate");
const pre_registration_schema_1 = require("./pre-registration.schema");
/**
 * Routeur Express pour les pré-inscriptions.
 * Définit les endpoints CRUD avec validation Zod en amont.
 */
const router = (0, express_1.Router)();
/**
 * POST /api/pre-registrations
 * Crée une nouvelle pré-inscription (accès public).
 */
router.post("/", (0, validate_1.validate)({ body: pre_registration_schema_1.createPreRegistrationSchema }), pre_registration_controller_1.PreRegistrationController.create);
/**
 * GET /api/pre-registrations
 * Liste les pré-inscriptions avec pagination et filtre par statut (accès admin).
 */
router.get("/", (0, validate_1.validate)({ query: pre_registration_schema_1.listQuerySchema }), pre_registration_controller_1.PreRegistrationController.findAll);
/**
 * GET /api/pre-registrations/:id
 * Récupère le détail d'une pré-inscription par son identifiant (accès admin).
 */
router.get("/:id", (0, validate_1.validate)({ params: pre_registration_schema_1.idParamSchema }), pre_registration_controller_1.PreRegistrationController.findById);
/**
 * PATCH /api/pre-registrations/:id
 * Met à jour le statut d'une pré-inscription (accès admin).
 */
router.patch("/:id", (0, validate_1.validate)({ params: pre_registration_schema_1.idParamSchema, body: pre_registration_schema_1.updatePreRegistrationSchema }), pre_registration_controller_1.PreRegistrationController.update);
/**
 * DELETE /api/pre-registrations/:id
 * Supprime une pré-inscription (accès admin).
 */
router.delete("/:id", (0, validate_1.validate)({ params: pre_registration_schema_1.idParamSchema }), pre_registration_controller_1.PreRegistrationController.delete);
exports.default = router;
//# sourceMappingURL=pre-registration.routes.js.map