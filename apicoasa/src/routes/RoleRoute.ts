import { Router } from 'express';
import { RoleController } from "../controller/seguridades/RoleController";
import { checkJwt } from "./../middlewares/jwt";

const router = Router();

router.get('/',[checkJwt], RoleController.getAllRoles);
router.get('/:secuencial',[checkJwt], RoleController.getRoleById);
router.get('/byname/:nombre_rol',[checkJwt], RoleController.getRoleByName);
router.post('/', RoleController.createRole);
router.put('/:secuencial', [checkJwt], RoleController.updateRoleById)
router.delete('/:secuencial',[checkJwt], RoleController.removeRoleById)

export default router;