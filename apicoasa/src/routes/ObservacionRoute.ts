import { Router } from 'express';
import { ObservacionController } from "../controller/proceso/ObservacionController";
import { checkJwt } from "./../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

router.get('/', ObservacionController.getAllObservacion);
router.get('/:secuencial', ObservacionController.getObservacionByPoaActividad);
router.post('/',ObservacionController.createObservacion);
router.put('/:secuencial', ObservacionController.updateObservacionBySecuencial)
router.delete('/:secuencial', ObservacionController.removeObservacionBySecuencial)


export default router;