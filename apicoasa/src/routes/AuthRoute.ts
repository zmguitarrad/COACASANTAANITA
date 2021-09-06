import { Router } from 'express';
import { AuthController } from "./../controller/AuthController";
import { checkJwt } from "./../middlewares/jwt";

const router = Router();
//login
router.post('/login', AuthController.login);

// change clave

router.post('/change-password', AuthController.changePassword);

export default router;