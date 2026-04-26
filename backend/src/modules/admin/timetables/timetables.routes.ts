import { Router } from "express";
import timetablesController from "./timetables.controller";
import { authorize } from "../../../middlewares/authenticate";
import { Role } from "../../../generated/prisma";

const router = Router();

// Toutes les routes admin nécessitent le rôle ADMIN
router.use(authorize("ADMIN"));

router.get("/", timetablesController.getAll);
router.get("/conflicts", timetablesController.getConflicts);
router.post("/", timetablesController.create);
router.put("/:id", timetablesController.update);
router.delete("/:id", timetablesController.delete);

export default router;
