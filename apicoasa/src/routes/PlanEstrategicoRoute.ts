import { Router } from 'express';
import { UserController } from "../controller/seguridades/UsuarioController";
import { checkJwt } from "./../middlewares/jwt";
import { checkRole } from "../middlewares/role";
import { PlanEstrategicoController } from '../controller/mando_integral/PlanEstrategicoController';

const router = Router();

router.get('/',PlanEstrategicoController.getAllPlanEstrategico);
router.get('/:secuencial',PlanEstrategicoController.getPlanEstrategicoBySecuencial);
router.get('/plan/usuario', [checkJwt], PlanEstrategicoController.getPlanEstrategicoysecuencialUsuario);
router.get('/poa/:secuencial',PlanEstrategicoController.getPlanEstrategicoPOAMaestro)


export default router;