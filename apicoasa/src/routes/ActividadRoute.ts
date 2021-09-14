import { Router } from 'express';
import { ActividadController } from "../controller/proceso/ActividadController";
import { checkJwt } from "./../middlewares/jwt";
import { checkRole } from "../middlewares/role";
import { PoaActividadController } from '../controller/mando_integral/PoaActividadController';

const router = Router();

router.get('/', ActividadController.getAllActividad);
//router.get('/:secuencial',ActividadController.getActividadBySecuencial);
router.get('/usuario/poa/:poa',[checkJwt], ActividadController.getActividadPrincipal);
router.get('/usuario/poa/:poa/perspectiva/:perspectiva',[checkJwt], ActividadController.getActividadByPerspectiva);
router.get('/usuario/actividad/:actividad/poa/:poa',[checkJwt], ActividadController.getActividadAllPrincipal);
router.post('/',ActividadController.createActividad);
router.put('/:secuencial', ActividadController.updateActividadBySecuencial)
router.delete('/:secuencial', ActividadController.removeActividadBySecuencial);
router.get('/presupuestos/all', PoaActividadController.getPresupuestosUtilizados);



export default router;