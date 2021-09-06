import { Router } from 'express';
import { UserRoleController } from "../controller/seguridades/UsuarioRoleController";
import { checkJwt } from "./../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

router.get('/',[checkJwt], UserRoleController.getAllUsersRole);
router.get('/:secuencial',[checkJwt], UserRoleController.getUserRoleById);
router.post('/',UserRoleController.createUserRole);
router.put('/:secuencial',[checkJwt],  UserRoleController.updateUserRoleById)
router.delete('/:secuencial',[checkJwt], UserRoleController.removeUseRoleById)


export default router;