import { Router } from 'express';
import { RoleController } from "../controller/seguridades/RoleController";
import { checkJwt } from "./../middlewares/jwt";

const router = Router();

router.get('/',[checkJwt], RoleController.getAllRoles);
router.get('/:secuencial',[checkJwt], RoleController.getRoleById);
router.get('/byname/:nombre_rol',[checkJwt], RoleController.getRoleByName);
router.post('/',[checkJwt],RoleController.createRole);
router.put('/:secuencial', [checkJwt], RoleController.updateRoleById);

export default router;