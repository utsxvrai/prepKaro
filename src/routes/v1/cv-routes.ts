import { Router } from "express";
import { uploadCVController } from "../../controllers/cv-controller";
import { upload } from "../../middlewares/upload";

const router = Router();

router.post("/upload", upload.single("file"), uploadCVController);

export default router;