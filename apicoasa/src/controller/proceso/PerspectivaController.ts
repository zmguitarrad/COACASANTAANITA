import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { proceso_perspectiva } from "../../entity/proceso/PerspectivaModel";


export class PerspectivaController {
 
    static getPerspectivaByUsuario = async (req: Request, res: Response) => {
        try {
          const PerspectivaDB = getRepository(proceso_perspectiva);
          const { secuencial } = res.locals.jwtPayload;
          const poa = req.params.poa;

          const response = await PerspectivaDB.query(
            `select distinct pma.secuencial as secuencial_poa,per.secuencial as secuencial_perspectiva,per.nombre_perspectiva
            from proceso_perspectiva per
            inner join proceso_objetivo_perspectiva obj on per.secuencial = obj.secuencial_perspectiva
            inner join indicadores_indicador ind on obj.secuencial = ind.secuencial_objetivo_perspectiva
            inner join proceso_actividad pac on pac.secuencial_indicador=ind.secuencial
            inner join mando_integral_poa_maestro pma on pma.secuencial=pac.secuencial_poa_maestro
            inner join seguridades_role ro on ro.secuencial= pac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            WHERE US.SECUENCIAL=$1 AND PMA.SECUENCIAL=$2
            `,
            [secuencial,poa]
          );
          return res.json(response);
        } catch (error) {
          res.json({ error }).status(209);
        }
      };

}