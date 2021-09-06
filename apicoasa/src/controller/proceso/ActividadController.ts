import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { proceso_actividad } from "../../entity/proceso/ActividadModel";
import { validate } from "class-validator"
import { indicadores_indicador } from "../../entity/indicadores/IndicadorModel";
import { seguridades_role } from "../../entity/seguridades/RoleModel";
import { mando_integral_poa_maestro } from "../../entity/mando_integral/PoaMaestroModel";
import { proceso_perspectiva } from "../../entity/proceso/PerspectivaModel";


export class ActividadController {

    static getAllActividad = async (req: Request, res: Response) => {
        const actividadBD = getRepository(proceso_actividad);
        let actividad: proceso_actividad[];
      try {
            actividad = await actividadBD.find({relations:['secuencial_indicador','secuencial_role','secuencial_poa_maestro']});
        } catch (error) {
            return res.status(404).json({
                message: 'Existe algun error'
            })
        }

        if (actividad.length > 0) {
            res.send(actividad);
        } else {
            res.status(404).json(
                { message: 'No hay actividades todavia' }
            );
        }
    }
    static getActividadPrincipal = async (req: Request, res: Response) => {
        try {
          const ActividadDB = getRepository(proceso_actividad);
          const { secuencial } = res.locals.jwtPayload;
          const poa = req.params.poa;
          const response = await ActividadDB.query(
            `select pers.nombre_perspectiva,pers.secuencial,obper.nombre_objetivo_perspectiva,
            us.nombres, us.secuencial,ro.nombre_rol,ac.personal_apoyo,ac.secuencial,ac.nombre_actividad,
            ac.entregables, poma.nombre_poa_maestro, avance.avance from proceso_actividad ac
                        inner join seguridades_role ro on ro.secuencial=ac.secuencial_role
                        inner join seguridades_usuario_role usr on usr.secuencial_role= ro.secuencial
                        inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
                        inner join mando_integral_poa_maestro poma on poma.secuencial =ac.secuencial_poa_maestro
                        inner join indicadores_indicador ind on ind.secuencial =ac.secuencial_indicador
                        inner join proceso_objetivo_perspectiva obper on obper.secuencial= ind.secuencial_objetivo_perspectiva
                        inner join proceso_perspectiva pers on pers.secuencial =obper.secuencial_perspectiva
                       left join(
                        select poac.secuencial_poa_maestro,ac.secuencial, 
                        ROUND ((cast (coalesce(max(num.num),0) as numeric(6,2))/cast (count(*) as numeric(6,2)))*100,2) avance
                        from public.mando_integral_poa_actividad poac
                        inner join proceso_actividad ac on ac.secuencial = poac.secuencial_actividad
                        inner join seguridades_role ro on ro.secuencial = ac.secuencial_role
                        inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
                        inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
                        left join(
                        select poac.secuencial_poa_maestro secpm,ac.secuencial secac, count(*) num  from public.mando_integral_poa_actividad poac
                        inner join proceso_actividad ac on ac.secuencial = poac.secuencial_actividad
                        inner join seguridades_role ro on ro.secuencial = ac.secuencial_role
                        inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
                        inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
                        WHERE US.SECUENCIAL=$1 AND poac.secuencial_poa_maestro =$2 AND poac.secuencial_estado=2
                        group by poac.secuencial_poa_maestro,ac.secuencial
                        ) num on num.secpm= poac.secuencial and num.secac = ac.secuencial
                        WHERE US.SECUENCIAL=$1 AND poac.secuencial_poa_maestro =$2
                        group by poac.secuencial_poa_maestro,ac.secuencial
                        ) avance on avance.secuencial_poa_maestro = poma.secuencial and avance.secuencial = ac.secuencial
                          where (us.secuencial=$1) AND (ac.secuencial_poa_maestro=$2); `,
            [secuencial,poa]
          );
          return res.json(response);
        } catch (error) {
          res.json({ error }).status(209);
        }
      };



  
    static getActividadAllPrincipal = async (req: Request, res: Response) => {
        try {
          const ActividadDB = getRepository(proceso_perspectiva);
          const { secuencial } = res.locals.jwtPayload;
          const poa = req.params.poa;
          const actividad =req.params.actividad;
          const response = await ActividadDB.query(
            `select per.secuencial as "secuencial_perspectiva",per.nombre_perspectiva, obj.nombre_objetivo_perspectiva,
            pac.nombre_actividad, pma.nombre_poa_maestro,pac.personal_apoyo,pac.secuencial as "secuencial_actividad",pac.entregables, 
            ro.nombre_rol, us.secuencial as "secuencial_usuario", us.nombres, avance.avance
            from proceso_perspectiva per
            inner join proceso_objetivo_perspectiva obj on per.secuencial = obj.secuencial_perspectiva
            inner join indicadores_indicador ind on obj.secuencial = ind.secuencial_objetivo_perspectiva
            inner join proceso_actividad pac on pac.secuencial_indicador=ind.secuencial
            inner join mando_integral_poa_maestro pma on pma.secuencial=pac.secuencial_poa_maestro
            inner join seguridades_role ro on ro.secuencial= pac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            left join(
            select poac.secuencial_poa_maestro,ac.secuencial, 
            ROUND ((cast (coalesce(max(num.num),0) as numeric(6,2))/cast (count(*) as numeric(6,2)))*100,2) avance
            from public.mando_integral_poa_actividad poac
            inner join proceso_actividad ac on ac.secuencial = poac.secuencial_actividad
            inner join seguridades_role ro on ro.secuencial = ac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            
            left join(
            select poac.secuencial_poa_maestro secpm,ac.secuencial secac, count(*) num  from public.mando_integral_poa_actividad poac
            inner join proceso_actividad ac on ac.secuencial = poac.secuencial_actividad
            inner join seguridades_role ro on ro.secuencial = ac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            WHERE US.SECUENCIAL=$1 AND ac.secuencial=$2 AND poac.secuencial_poa_maestro =$3 AND poac.secuencial_estado=2
            group by poac.secuencial_poa_maestro,ac.secuencial
            ) num on num.secpm= poac.secuencial and num.secac = ac.secuencial
            WHERE US.SECUENCIAL=$1 AND ac.secuencial=$2 AND poac.secuencial_poa_maestro =$3
            group by poac.secuencial_poa_maestro,ac.secuencial
            ) avance on avance.secuencial_poa_maestro = pma.secuencial and avance.secuencial = pac.secuencial
            WHERE US.SECUENCIAL=$1 AND PMA.SECUENCIAL=$3 `,
            [secuencial,actividad,poa]
          );
          return res.json(response);
        } catch (error) {
          res.json({ error }).status(209);
        }
      };


    static getActividadByPerspectiva = async (req: Request, res: Response) => {
        try {
          const ActividadDB = getRepository(proceso_perspectiva);
          const { secuencial } = res.locals.jwtPayload;
          const poa = req.params.poa;
          const actividad =req.params.actividad;
          const perspectiva =req.params.perspectiva;
          const response = await ActividadDB.query(
            `select per.secuencial as "secuencial_perspectiva",per.nombre_perspectiva, obj.nombre_objetivo_perspectiva,
            pac.nombre_actividad, pma.nombre_poa_maestro,pac.personal_apoyo,pac.secuencial as "secuencial_actividad",pac.entregables, 
            ro.nombre_rol, us.secuencial as "secuencial_usuario", us.nombres, avance.avance
            from proceso_perspectiva per
            inner join proceso_objetivo_perspectiva obj on per.secuencial = obj.secuencial_perspectiva
            inner join indicadores_indicador ind on obj.secuencial = ind.secuencial_objetivo_perspectiva
            inner join proceso_actividad pac on pac.secuencial_indicador=ind.secuencial
            inner join mando_integral_poa_maestro pma on pma.secuencial=pac.secuencial_poa_maestro
            inner join seguridades_role ro on ro.secuencial= pac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            left join(
            select poac.secuencial_poa_maestro,ac.secuencial, 
            ROUND ((cast (coalesce(max(num.num),0) as numeric(6,2))/cast (count(*) as numeric(6,2)))*100,2) avance
            from public.mando_integral_poa_actividad poac
            inner join proceso_actividad ac on ac.secuencial = poac.secuencial_actividad
            inner join seguridades_role ro on ro.secuencial = ac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            
            left join(
            select poac.secuencial_poa_maestro secpm,ac.secuencial secac, count(*) num  from public.mando_integral_poa_actividad poac
            inner join proceso_actividad ac on ac.secuencial = poac.secuencial_actividad
            inner join seguridades_role ro on ro.secuencial = ac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            WHERE US.SECUENCIAL=$1 AND ac.secuencial=$2 AND poac.secuencial_poa_maestro =$3 AND poac.secuencial_estado=2
            group by poac.secuencial_poa_maestro,ac.secuencial
            ) num on num.secpm= poac.secuencial and num.secac = ac.secuencial
            WHERE US.SECUENCIAL=$1 AND ac.secuencial=$2 AND poac.secuencial_poa_maestro =$3
            group by poac.secuencial_poa_maestro,ac.secuencial
            ) avance on avance.secuencial_poa_maestro = pma.secuencial and avance.secuencial = pac.secuencial
            WHERE US.SECUENCIAL=$1 AND PMA.SECUENCIAL=$3  AND per.secuencial=$4	 `,
            [secuencial,actividad,poa,perspectiva]
          );
          return res.json(response);
        } catch (error) {
          res.json({ error }).status(209);
        }
      };

    static createActividad = async (req: Request, res: Response) => {
        const { nombre_actividad,personal_apoyo,entregables,secuencial_indicador,secuencial_role,secuencial_poa_maestro } = req.body;
        const actividadBD = getRepository(proceso_actividad);
        const indicadorBD = getRepository(indicadores_indicador);
        const poaMaestroBD = getRepository(mando_integral_poa_maestro);
        const roleBD = getRepository(seguridades_role);

        let indicadorFound: indicadores_indicador;
        try {
            indicadorFound = await indicadorBD.findOneOrFail(secuencial_indicador);
        } catch (error) {
            return res.status(409).json({
                message: 'indicador no encontrado',
                error
            });
        }

        let poaMaestroFound: mando_integral_poa_maestro;
        try {
            poaMaestroFound = await poaMaestroBD.findOneOrFail(secuencial_poa_maestro);
        } catch (error) {
            return res.status(409).json({
                message: 'POA no encontrado',
                error
            });
        }

        let roleFound: seguridades_role;
        try {
            roleFound = await roleBD.findOneOrFail(secuencial_role);
        } catch (error) {
            return res.status(409).json({
                message: 'Rol no encontrado',
                error
            });
        }

        const actividad = new proceso_actividad();
        actividad.nombre_actividad = nombre_actividad;
        actividad.personal_apoyo = personal_apoyo;
        actividad.entregables = entregables;
        actividad.secuencial_indicador=secuencial_indicador;
        actividad.secuencial_role = secuencial_role;
        actividad.secuencial_poa_maestro = secuencial_poa_maestro;

        const validationOpt = { validationError: { target: false, value: false } }
        const errors = await validate(actividad, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        let response: any;
        try {
            response = await actividadBD.save(actividad);
        } catch (error) {
            return res.status(409).json({
                message: 'Actividad incorrecto',
                error
            });
        }

        res.json({
            "message": "Asignado correctamente ",
            "response": response,
        })


    }



    static updateActividadBySecuencial = async (req: Request, res: Response) => {
        const { secuencial } = req.params;
        const { nombre_actividad,personal_apoyo,entregables,secuencial_indicador,secuencial_role,secuencial_poa_maestro } = req.body;
        const actividadBD = getRepository(proceso_actividad);
        const poaMaestroBD = getRepository(mando_integral_poa_maestro);
      
        let actividad: proceso_actividad;
        const indicadorBD = getRepository(indicadores_indicador);
        let indicadorFound: indicadores_indicador;
        try {
            indicadorFound = await indicadorBD.findOneOrFail(secuencial_indicador);
        } catch (error) {
            return res.status(409).json({
                message: 'Indicador no encontrado',
                error
            });
        }

        let poaMaestroFound: mando_integral_poa_maestro;
        try {
            poaMaestroFound = await poaMaestroBD.findOneOrFail(secuencial_poa_maestro);
        } catch (error) {
            return res.status(409).json({
                message: 'POA no encontrado',
                error
            });
        }


        const roleBD = getRepository(seguridades_role);
        let roleFound: seguridades_role;
        try {
            roleFound = await roleBD.findOneOrFail(secuencial_role);
        } catch (error) {
            return res.status(409).json({
                message: 'Rol no encontrado',
                error
            });
        }


        try {
            actividad = await actividadBD.findOneOrFail(secuencial);
            actividad.nombre_actividad = nombre_actividad;
            actividad.personal_apoyo = personal_apoyo;
            actividad.entregables = entregables;
            actividad.secuencial_indicador=secuencial_indicador;
            actividad.secuencial_poa_maestro = secuencial_poa_maestro
            actividad.secuencial_role = secuencial_role;
           

        } catch (error) {
            return res.status(404).json(
                { message: 'Datos(indicador,poa,rol) no encontrados' }
            );
        }

        const validationOpt = { validationError: { target: false, value: false } }
        const errors = await validate(actividad, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        let response: any;
        try {
            response = await actividadBD.save(actividad);
        } catch (error) {
            return res.status(409).json(
                {
                    message: 'Existe algun error',
                    error
                }
            );
        }
        res.status(201).json({ message: 'Actividad actualizado', response });

    }

    static removeActividadBySecuencial = async (req: Request, res: Response) => {
        const { secuencial } = req.params;
        const actividadBD = getRepository(proceso_actividad);
        try {
            await actividadBD.findOneOrFail(secuencial);
        } catch (error) {
            return res.status(404).json(
                { message: 'Actividad no encontrado!' }
            );
        }

        const response = await actividadBD.delete(secuencial);
        res.status(201).json(
            { message: 'Actividad borrado', response }
        );
    }

   
  
}