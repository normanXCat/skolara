"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const grade_controller_1 = __importDefault(require("./grade.controller"));
const router = (0, express_1.Router)();
/**
 * @route GET /api/grades
 * @desc Récupérer tous les grades
 * @access Public
 */
router.get("/", grade_controller_1.default.getAll);
exports.default = router;
//# sourceMappingURL=grade.routes.js.map