import { Router } from 'express';
import { UserController } from "../controller/seguridades/UsuarioController";
import { checkJwt } from "./../middlewares/jwt";
import { checkRole } from "../middlewares/role";
import { PlanEstrategicoController } from '../controller/mando_integral/PlanEstrategicoController';

const router = Router();

router.get('/', [checkJwt],PlanEstrategicoController.getAllPlanEstrategico);
router.get('/:secuencial', [checkJwt],PlanEstrategicoController.getPlanEstrategicoBySecuencial);
router.get('/plan/usuario', [checkJwt], PlanEstrategicoController.getPlanEstrategicoysecuencialUsuario);
router.get('/poa/:secuencial', [checkJwt],PlanEstrategicoController.getPlanEstrategicoPOAMaestro)


export default router;