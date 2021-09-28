import { Router } from 'express';
import { UserRoleController } from "../controller/seguridades/UsuarioRoleController";
import { checkJwt } from "./../middlewares/jwt";
import { checkRole } from "../middlewares/role";
import { UsuarioPlanEstrategicoController } from '../controller/mando_integral/UsuarioPlanEstrategicoController';

const router = Router();

router.get('/', [checkJwt],UsuarioPlanEstrategicoController.getAllUsuarioPlanEstrategico);
router.get('/:secuencial', [checkJwt],UsuarioPlanEstrategicoController.getUsuarioPlanEstrategicoBySecuecial);
router.post('/',[checkJwt],UsuarioPlanEstrategicoController.createUsuarioPlanEstrategico);
router.put('/:secuencial', [checkJwt],UsuarioPlanEstrategicoController.updateUsuarioPlanEstrategicoBySecuencial);


export default router;