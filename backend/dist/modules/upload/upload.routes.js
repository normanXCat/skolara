"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("./upload.controller");
const upload_1 = require("../../middlewares/upload");
const router = (0, express_1.Router)();
/**
 * @route   POST /upload/single
 * @desc    Uploader un fichier unique
 * @access  Public
 */
router.post("/single", upload_1.upload.single("file"), upload_controller_1.UploadController.uploadSingle);
/**
 * @route   POST /upload/multiple
 * @desc    Uploader plusieurs fichiers
 * @access  Public
 */
router.post("/multiple", upload_1.upload.array("files", 5), upload_controller_1.UploadController.uploadMultiple);
exports.default = router;
//# sourceMappingURL=upload.routes.js.map