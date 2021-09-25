import { Router } from "express";
import { ObservacionController } from "../controller/proceso/ObservacionController";
import { checkJwt } from "./../middlewares/jwt";
import { checkRole } from "../middlewares/role";
import * as multer from "multer";
import * as path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads");
  },
  filename: (req, file, cb) => {
    const secObservation = req.params["secObs"];
    const poaId = req.params["poa"];
    const fileName = poaId.toString() + "_" + secObservation.toString();
    cb(null, fileName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = Router();

router.get("/", ObservacionController.getAllObservacion);
router.get("/:secuencial", ObservacionController.getObservacionByPoaActividad);
router.post("/", checkJwt, ObservacionController.createObservacion);
router.put("/:secuencial", ObservacionController.updateObservacionBySecuencial);
router.delete(
  "/:secuencial",
  ObservacionController.removeObservacionBySecuencial
);
//For files upload
router.post(
  "/upload/file/:secObs/poaActividad/:poa",
  upload.single("file"),
  ObservacionController.uploadFile
);

router.get("/get/file/:file", ObservacionController.getImageFile);

export default router;
