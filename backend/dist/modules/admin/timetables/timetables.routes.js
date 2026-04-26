"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timetables_controller_1 = __importDefault(require("./timetables.controller"));
const authenticate_1 = require("../../../middlewares/authenticate");
const router = (0, express_1.Router)();
// Toutes les routes admin nécessitent le rôle ADMIN
router.use((0, authenticate_1.authorize)("ADMIN"));
router.get("/", timetables_controller_1.default.getAll);
router.get("/conflicts", timetables_controller_1.default.getConflicts);
router.post("/", timetables_controller_1.default.create);
router.put("/:id", timetables_controller_1.default.update);
router.delete("/:id", timetables_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=timetables.routes.js.map