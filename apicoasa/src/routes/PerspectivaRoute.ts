import { Router } from 'express';
import { PerspectivaController } from '../controller/proceso/PerspectivaController';
import { checkJwt } from "./../middlewares/jwt";


const router = Router();


router.get('/usuario/poa/:poa',[checkJwt], PerspectivaController.getPerspectivaByUsuario);


export default router;