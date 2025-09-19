import { Router } from "express";
import {
  createStudent,
  getUploadSig,
  saveResponse,
} from "../controllers/student.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/get-upload-signature").get(getUploadSig);
router.route("/save-file").post(saveResponse);
router.route("/register").post(createStudent);

export default router;
