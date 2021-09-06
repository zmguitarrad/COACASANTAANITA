import { Router } from 'express';
import {PoaActividadController } from "../controller/mando_integral/PoaActividadController";
import { checkJwt } from '../middlewares/jwt';


const router = Router();

router.get('/', PoaActividadController.getAllActividadPOA );
router.get('/anio/:anio/actividad/:secuencial', PoaActividadController.getCalendarioActividad );
router.put('/estado/:secuencial_estado/actividad/:secuencial_actividad/calendario/:secuencial_calendario', PoaActividadController.updateEstadoActividad );
router.post('/', PoaActividadController.createPoaActividad );
router.put('/calendario/:calendario/actividad/:actividad/secuencial/:secuencial', PoaActividadController.uptadeCalendarioActividad );
router.get('/months/:secuencial', PoaActividadController.getMonthsByYear);
router.get('/:secuencial', PoaActividadController.getPOActividadbySecuencial );

export default router;