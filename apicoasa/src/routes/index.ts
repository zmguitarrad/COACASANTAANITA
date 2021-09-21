import { Router } from 'express';
import role from "./RoleRoute";
import user from "./UserRoute";
import userole from "./UserRoleRoute";
import usuarioplanestrategico from "./UsuarioEstrategicoRoute";
import planestrategico from "./PlanEstrategicoRoute";
import actividad from "./ActividadRoute";
import observacion from "./ObservacionRoute";
import poactividad from "./PoaActividadRoute";
import perspectiva from "./PerspectivaRoute"

import auth from "./AuthRoute";



const routes = Router();
routes.use('/roles', role);
routes.use('/users', user);
routes.use('/userole', userole);
routes.use('/auth', auth);
routes.use('/planestrategico', planestrategico);
routes.use('/usuarioplanestrategico', usuarioplanestrategico);
routes.use('/actividad', actividad);
routes.use('/perspectiva', perspectiva);
routes.use('/observacion', observacion);
routes.use('/poactividad', poactividad);





routes.use("/", (req, res) => {
    res.send(`
        <h3>WELCOME API RESt PLAN ESTRATTEGICO</h3>
    `);
});
export default routes;