import { Router } from "express";
import { getKeyFigures } from "./public.controller";

const router = Router();

router.get("/key-figures", getKeyFigures);

export default router;
