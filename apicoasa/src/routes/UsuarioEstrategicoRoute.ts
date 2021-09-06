import { Router } from 'express';
import { UserRoleController } from "../controller/seguridades/UsuarioRoleController";
import { checkJwt } from "./../middlewares/jwt";
import { checkRole } from "../middlewares/role";
import { UsuarioPlanEstrategicoController } from '../controller/mando_integral/UsuarioPlanEstrategicoController';

const router = Router();

router.get('/', UsuarioPlanEstrategicoController.getAllUsuarioPlanEstrategico);
router.get('/:secuencial', UsuarioPlanEstrategicoController.getUsuarioPlanEstrategicoBySecuecial);
router.post('/',UsuarioPlanEstrategicoController.createUsuarioPlanEstrategico);
router.put('/:secuencial', UsuarioPlanEstrategicoController.updateUsuarioPlanEstrategicoBySecuencial)
router.delete('/:secuencial', UsuarioPlanEstrategicoController.removeUsuarioPlanEstrateicoBySecuencial)


export default router;