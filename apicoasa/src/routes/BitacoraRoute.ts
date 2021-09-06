import { Router } from 'express';
import { checkJwt } from "./../middlewares/jwt";
import { checkRole } from "../middlewares/role";
import { BitacoraController } from '../controller/auditoria/BitacoraController';

const router = Router();

router.get('/', BitacoraController.getAllBitacora);
router.get('/:secuencial',BitacoraController.getBitacoraBySecuencial);



export default router;