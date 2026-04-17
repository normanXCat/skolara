import { Router } from "express";
import { UploadController } from "./upload.controller";
import { upload } from "../../middlewares/upload";

const router = Router();

/**
 * @route   POST /upload/single
 * @desc    Uploader un fichier unique
 * @access  Public
 */
router.post("/single", upload.single("file"), UploadController.uploadSingle);

/**
 * @route   POST /upload/multiple
 * @desc    Uploader plusieurs fichiers
 * @access  Public
 */
router.post(
    "/multiple",
    upload.array("files", 5),
    UploadController.uploadMultiple,
);

export default router;
