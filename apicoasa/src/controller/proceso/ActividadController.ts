import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { proceso_actividad } from "../../entity/proceso/ActividadModel";
import { validate } from "class-validator";
import { indicadores_indicador } from "../../entity/indicadores/IndicadorModel";
import { seguridades_role } from "../../entity/seguridades/RoleModel";
import { mando_integral_poa_maestro } from "../../entity/mando_integral/PoaMaestroModel";
import { proceso_perspectiva } from "../../entity/proceso/PerspectivaModel";
import { mando_integral_poa_actividad } from "../../entity/mando_integral/PoaActividadModel";
import { mando_integral_poa_actividad_presupuesto } from "../../entity/mando_integral/PoaActPresupuestoModel";

async function getPresupuestos() {
  const PoaActividadDB = getRepository(mando_integral_poa_actividad);
  const ProcesoActividadDB = getRepository(proceso_actividad);

  //Poa presupuestos utilizados (mezcladas)
  const prs = await PoaActividadDB.find({
    loadRelationIds: true,
  });

  //actividades ids (10...)
  const prsActvs = await ProcesoActividadDB.find({
    select: ["secuencial"],
  });

  const auxArray = []; //total, secActividad

  for (const { secuencial } of prsActvs) {
    let auxTotal = 0; //sumas parciales de cada actividad
    for (const pActividad of prs) {
      //Comprobar si el presupusto utlizado perteneces a la actividad
      if (<unknown>pActividad.secuencial_actividad === secuencial) {
        auxTotal =
          auxTotal + Number(pActividad.presupuesto_utilizado.toString());
      }
    }
    auxArray.push({
      secuencial_actividad: secuencial,
      total: auxTotal,
    });
  }

  return auxArray;
}

export class ActividadController {
  static getAllActividad = async (req: Request, res: Response) => {
    const actividadBD = getRepository(proceso_actividad);
    let actividad: proceso_actividad[];
    try {
      actividad = await actividadBD.find({
        relations: [
          "secuencial_indicador",
          "secuencial_role",
          "secuencial_poa_maestro",
        ],
      });
    } catch (error) {
      return res.status(404).json({
        message: "Existe algun error",
      });
    }

    if (actividad.length > 0) {
      res.send(actividad);
    } else {
      res.status(404).json({ message: "No hay actividades todavia" });
    }
  };

  
  static getActividadPrincipal = async (req: Request, res: Response) => {
    try {
      const ActividadDB = getRepository(proceso_actividad);

      const presupuestoDB = getRepository(
        mando_integral_poa_actividad_presupuesto
      );

      const { secuencial } = res.locals.jwtPayload;
      const poa = req.params.poa;
      //Arreglo de actividades
      const response = await ActividadDB.query(
        `select
            actividades.secuencial,actividades.nombre_actividad, actividades.nombre_objetivo_perspectiva, 
            actividades.nombre_rol, actividades.entregables,actividades.personal_apoyo, coalesce(avance.avance,0) avance
            from 
            (
            select   pac.secuencial,obj.nombre_objetivo_perspectiva, ro.nombre_rol ,per.secuencial secperspectiva ,pma.secuencial secuecialpoa ,pac.secuencial actividad_sec ,pac.nombre_actividad,
            pma.nombre_poa_maestro,pac.personal_apoyo,pac.entregables
            , us.secuencial usuarios
            from proceso_perspectiva per
            inner join proceso_objetivo_perspectiva obj on per.secuencial = obj.secuencial_perspectiva
            inner join indicadores_indicador ind on obj.secuencial = ind.secuencial_objetivo_perspectiva
            inner join proceso_actividad pac on pac.secuencial_indicador=ind.secuencial
            inner join mando_integral_poa_maestro pma on pma.secuencial=pac.secuencial_poa_maestro
            inner join seguridades_role ro on ro.secuencial= pac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            ) actividades
                
            LEFT JOIN (
            
            select deno.secuencial_poa_maestro, deno.secu_us ,deno.actividad , deno.denomina,numer.num , ROUND( coalesce( numer.num / deno.denomina , 0)*100 ,2) avance
            
            from (
            select poac.secuencial_poa_maestro, us.secuencial secu_us ,pma.nombre_poa_maestro, ac.secuencial actividad,ac.nombre_actividad , CAST (count(*) AS numeric(6,2)) denomina
            from public.mando_integral_poa_actividad poac
            inner join mando_integral_poa_maestro pma on pma.secuencial=poac.secuencial_poa_maestro
            inner join proceso_actividad ac on ac.secuencial = poac.secuencial_actividad
            inner join seguridades_role ro on ro.secuencial = ac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            where poac.secuencial_estado<>4
            group by poac.secuencial_poa_maestro,ac.secuencial,pma.nombre_poa_maestro, ac.nombre_Actividad, us.secuencial
            )deno
            
            left join (
            select poac.secuencial_poa_maestro secpm, us.secuencial usuario ,pma.nombre_poa_maestro ,ac.secuencial secac,ac.nombre_actividad , CAST( count(*) AS  numeric(6,2))  num  
            from public.mando_integral_poa_actividad poac
            inner join mando_integral_poa_maestro pma on pma.secuencial = poac.secuencial_poa_maestro
            inner join proceso_actividad ac on ac.secuencial = poac.secuencial_actividad
            inner join seguridades_role ro on ro.secuencial = ac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            WHERE poac.secuencial_estado=2
            group by poac.secuencial_poa_maestro,ac.secuencial, pma.nombre_poa_maestro, ac.nombre_actividad, us.secuencial
            )numer  on numer.secpm =deno.secuencial_poa_maestro and numer.secac=deno.actividad
            and numer.usuario=deno.secu_us
            ) avance on avance.secuencial_poa_maestro=actividades.secuecialpoa and
            avance.secu_us=actividades.usuarios and  avance.actividad =actividades.actividad_sec
            
            where actividades.usuarios=$1 and actividades.secuecialpoa=$2 `,
        [secuencial, poa]
      );

      //la suma de presupuestos utilizados por cada actividad.
      const presupuestos = await getPresupuestos();
      const actvsFounds = []; //actividades con el porcentaje de presupuesto
      // obtener los presupuestos global de actividad
      const prsGlobal = await presupuestoDB.find({
        loadRelationIds: true,
      });

      response.forEach((actv) => {
        //Encontraar el presupuesto al que pertenece la actividad
        const preFound = presupuestos.find(
          (p) =>
            p["secuencial_actividad"].toString() === actv.secuencial.toString()
        );
        //Encontrar el presupuesto global para esta actividad
        const prsFound = prsGlobal.find((p) => {
          //validar si ese presupuesto global le pertenece
          //console.log(actividad.toString(), p["secuencial_actividad"].toString());

          if (
            actv.secuencial.toString() === p["secuencial_actividad"].toString()
          ) {
            return p;
          }
          return null;
        });

        let global = 0;
        let pp = 0;
        //validando si el presupuesto global existe para esa actividad
        if (prsFound) {
          global = prsFound.presupuesto;
          //Porcentaje
          pp = (preFound.total / Number(prsFound.presupuesto)) * 100;
        }

        //Modelado
        const actv_ = {
          ...actv,
          total: preFound.total,
          global,
          pp,
          prsGlobal
        };
        actvsFounds.push(actv_);
      });

      return res.json(actvsFounds);
    } catch (error) {
      res.json({ error }).status(209);
    }
  };

  static getActividadAllPrincipal = async (req: Request, res: Response) => {
    try {
      const ActividadDB = getRepository(proceso_perspectiva);
      const { secuencial } = res.locals.jwtPayload;
      const poa = req.params.poa;
      const actividad = req.params.actividad;
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
        [secuencial, actividad, poa]
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
      const perspectiva = req.params.perspectiva;
      const response = await ActividadDB.query(
        `select
            actividades.secuencial as "secuencial_perspectiva",actividades.nombre_perspectiva,actividades.secuencial,actividades.nombre_actividad, actividades.nombre_objetivo_perspectiva, 
            actividades.nombre_rol, actividades.entregables,actividades.personal_apoyo, coalesce(avance.avance,0) avance
            from 
            (
            select  per.secuencial as "secuencial_perspectiva",per.nombre_perspectiva, pac.secuencial,obj.nombre_objetivo_perspectiva, ro.nombre_rol ,per.secuencial secperspectiva ,pma.secuencial secuecialpoa ,pac.secuencial actividad_sec ,pac.nombre_actividad,
            pma.nombre_poa_maestro,pac.personal_apoyo,pac.entregables
            , us.secuencial usuarios
            from proceso_perspectiva per
            inner join proceso_objetivo_perspectiva obj on per.secuencial = obj.secuencial_perspectiva
            inner join indicadores_indicador ind on obj.secuencial = ind.secuencial_objetivo_perspectiva
            inner join proceso_actividad pac on pac.secuencial_indicador=ind.secuencial
            inner join mando_integral_poa_maestro pma on pma.secuencial=pac.secuencial_poa_maestro
            inner join seguridades_role ro on ro.secuencial= pac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            ) actividades
                
            LEFT JOIN (
            
            select deno.secuencial_poa_maestro, deno.secu_us ,deno.actividad , deno.denomina,numer.num , ROUND( coalesce( numer.num / deno.denomina , 0)*100 ,2) avance
            
            from (
            select poac.secuencial_poa_maestro, us.secuencial secu_us ,pma.nombre_poa_maestro, ac.secuencial actividad,ac.nombre_actividad , CAST (count(*) AS numeric(6,2)) denomina
            from public.mando_integral_poa_actividad poac
            inner join mando_integral_poa_maestro pma on pma.secuencial=poac.secuencial_poa_maestro
            inner join proceso_actividad ac on ac.secuencial = poac.secuencial_actividad
            inner join seguridades_role ro on ro.secuencial = ac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            group by poac.secuencial_poa_maestro,ac.secuencial,pma.nombre_poa_maestro, ac.nombre_Actividad, us.secuencial
            )deno
            
            left join (
            select poac.secuencial_poa_maestro secpm, us.secuencial usuario ,pma.nombre_poa_maestro ,ac.secuencial secac,ac.nombre_actividad , CAST( count(*) AS  numeric(6,2))  num  
            from public.mando_integral_poa_actividad poac
            inner join mando_integral_poa_maestro pma on pma.secuencial = poac.secuencial_poa_maestro
            inner join proceso_actividad ac on ac.secuencial = poac.secuencial_actividad
            inner join seguridades_role ro on ro.secuencial = ac.secuencial_role
            inner join seguridades_usuario_role usr on usr.secuencial_role=ro.secuencial
            inner join seguridades_usuario us on us.secuencial=usr.secuencial_usuario
            WHERE poac.secuencial_estado=2
            group by poac.secuencial_poa_maestro,ac.secuencial, pma.nombre_poa_maestro, ac.nombre_actividad, us.secuencial
            )numer  on numer.secpm =deno.secuencial_poa_maestro and numer.secac=deno.actividad
            and numer.usuario=deno.secu_us
            ) avance on avance.secuencial_poa_maestro=actividades.secuecialpoa and
            avance.secu_us=actividades.usuarios and  avance.actividad =actividades.actividad_sec
            
            where actividades.usuarios=$1 AND actividades.secperspectiva=$2 and actividades.secuecialpoa=$3	`,
        [secuencial, perspectiva, poa]
      );
      return res.json(response);
    } catch (error) {
      res.json({ error }).status(209);
    }
  };

  static createActividad = async (req: Request, res: Response) => {
    const {
      nombre_actividad,
      personal_apoyo,
      entregables,
      secuencial_indicador,
      secuencial_role,
      secuencial_poa_maestro,
    } = req.body;
    const actividadBD = getRepository(proceso_actividad);
    const indicadorBD = getRepository(indicadores_indicador);
    const poaMaestroBD = getRepository(mando_integral_poa_maestro);
    const roleBD = getRepository(seguridades_role);

    let indicadorFound: indicadores_indicador;
    try {
      indicadorFound = await indicadorBD.findOneOrFail(secuencial_indicador);
    } catch (error) {
      return res.status(409).json({
        message: "indicador no encontrado",
        error,
      });
    }

    let poaMaestroFound: mando_integral_poa_maestro;
    try {
      poaMaestroFound = await poaMaestroBD.findOneOrFail(
        secuencial_poa_maestro
      );
    } catch (error) {
      return res.status(409).json({
        message: "POA no encontrado",
        error,
      });
    }

    let roleFound: seguridades_role;
    try {
      roleFound = await roleBD.findOneOrFail(secuencial_role);
    } catch (error) {
      return res.status(409).json({
        message: "Rol no encontrado",
        error,
      });
    }

    const actividad = new proceso_actividad();
    actividad.nombre_actividad = nombre_actividad;
    actividad.personal_apoyo = personal_apoyo;
    actividad.entregables = entregables;
    actividad.secuencial_indicador = secuencial_indicador;
    actividad.secuencial_role = secuencial_role;
    actividad.secuencial_poa_maestro = secuencial_poa_maestro;

    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(actividad, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    let response: any;
    try {
      response = await actividadBD.save(actividad);
    } catch (error) {
      return res.status(409).json({
        message: "Actividad incorrecto",
        error,
      });
    }

    res.json({
      message: "Asignado correctamente ",
      response: response,
    });
  };

  static updateActividadBySecuencial = async (req: Request, res: Response) => {
    const { secuencial } = req.params;
    const {
      nombre_actividad,
      personal_apoyo,
      entregables,
      secuencial_indicador,
      secuencial_role,
      secuencial_poa_maestro,
    } = req.body;
    const actividadBD = getRepository(proceso_actividad);
    const poaMaestroBD = getRepository(mando_integral_poa_maestro);

    let actividad: proceso_actividad;
    const indicadorBD = getRepository(indicadores_indicador);
    let indicadorFound: indicadores_indicador;
    try {
      indicadorFound = await indicadorBD.findOneOrFail(secuencial_indicador);
    } catch (error) {
      return res.status(409).json({
        message: "Indicador no encontrado",
        error,
      });
    }

    let poaMaestroFound: mando_integral_poa_maestro;
    try {
      poaMaestroFound = await poaMaestroBD.findOneOrFail(
        secuencial_poa_maestro
      );
    } catch (error) {
      return res.status(409).json({
        message: "POA no encontrado",
        error,
      });
    }

    const roleBD = getRepository(seguridades_role);
    let roleFound: seguridades_role;
    try {
      roleFound = await roleBD.findOneOrFail(secuencial_role);
    } catch (error) {
      return res.status(409).json({
        message: "Rol no encontrado",
        error,
      });
    }

    try {
      actividad = await actividadBD.findOneOrFail(secuencial);
      actividad.nombre_actividad = nombre_actividad;
      actividad.personal_apoyo = personal_apoyo;
      actividad.entregables = entregables;
      actividad.secuencial_indicador = secuencial_indicador;
      actividad.secuencial_poa_maestro = secuencial_poa_maestro;
      actividad.secuencial_role = secuencial_role;
    } catch (error) {
      return res
        .status(404)
        .json({ message: "Datos(indicador,poa,rol) no encontrados" });
    }

    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(actividad, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    let response: any;
    try {
      response = await actividadBD.save(actividad);
    } catch (error) {
      return res.status(409).json({
        message: "Existe algun error",
        error,
      });
    }
    res.status(201).json({ message: "Actividad actualizado", response });
  };

  static removeActividadBySecuencial = async (req: Request, res: Response) => {
    const { secuencial } = req.params;
    const actividadBD = getRepository(proceso_actividad);
    try {
      await actividadBD.findOneOrFail(secuencial);
    } catch (error) {
      return res.status(404).json({ message: "Actividad no encontrado!" });
    }

    const response = await actividadBD.delete(secuencial);
    res.status(201).json({ message: "Actividad borrado", response });
  };
}
