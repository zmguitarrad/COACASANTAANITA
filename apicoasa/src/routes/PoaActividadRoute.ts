import { Router } from 'express';
import {PoaActividadController } from "../controller/mando_integral/PoaActividadController";
import { checkJwt } from '../middlewares/jwt';


const router = Router();

router.get('/', [checkJwt],PoaActividadController.getAllActividadPOA );
router.get('/anio/:anio/actividad/:secuencial', [checkJwt],PoaActividadController.getCalendarioActividad );
router.put('/estado/:secuencial_estado/actividad/:secuencial_actividad/calendario/:secuencial_calendario', [checkJwt],PoaActividadController.updateEstadoActividad );
router.post('/', [checkJwt],PoaActividadController.createPoaActividad );
router.put('/calendario/:calendario/actividad/:actividad/secuencial/:secuencial', [checkJwt],PoaActividadController.uptadeCalendarioActividad );
router.get('/months/:secuencial',[checkJwt],PoaActividadController.getMonthsByYear);
router.get('/:secuencial',[checkJwt], PoaActividadController.getPOActividadbySecuencial );
router.put('/presupuestoutilizado/:presupuesto_ulizado/secuencial/:secuencial', [checkJwt],PoaActividadController.updatePoaActividadPresupuestoUtilizado );
router.get('/secActividad/:secuencial_actividad/secCalendario/:secuencial_calendario', [checkJwt],PoaActividadController.getPresupuestoByPoa);

export default router;