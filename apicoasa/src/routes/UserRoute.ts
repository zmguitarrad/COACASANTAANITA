import { Router } from 'express';
import { UserController } from "../controller/seguridades/UsuarioController";
import { checkJwt } from "./../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

router.get('/' ,[checkJwt],UserController.getAllUsers);
router.get('/:secuencial',[checkJwt], UserController.getUserBySecuencial);
router.get('/byid/:id',[checkJwt], UserController.getUserById);
router.post('/',UserController.createUser);
router.put('/:secuencial',[checkJwt],  UserController.updateUserById);

export default router;