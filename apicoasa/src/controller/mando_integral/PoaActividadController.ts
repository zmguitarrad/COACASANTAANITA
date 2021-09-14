import { getRepository, ILike } from "typeorm";
import { Request, Response } from "express";
import { mando_integral_poa_actividad } from "../../entity/mando_integral/PoaActividadModel";
import { validate } from "class-validator";
import { proceso_actividad } from "../../entity/proceso/ActividadModel";
import { generales_estado } from "../../entity/generales/EstadoModel";
import { generales_calendario } from "../../entity/generales/CalendarioModel";
import { mando_integral_poa_maestro } from "../../entity/mando_integral/PoaMaestroModel";

export class PoaActividadController {
  static getAllActividadPOA = async (req: Request, res: Response) => {
    const poactividadBD = getRepository(mando_integral_poa_actividad);
    let poactividad: mando_integral_poa_actividad[];
    try {
      poactividad = await poactividadBD.find({
        relations: [
          "secuencial_poa_maestro",
          "secuencial_actividad",
          "secuencial_estado",
          "secuencial_calendario",
        ],
      });
    } catch (error) {
      return res.status(404).json({
        message: "Existe algun error",
      });
    }

    if (poactividad.length > 0) {
      res.send(poactividad);
    } else {
      res.status(404).json({ message: "No existe POA ACTIVIDAD aun" });
    }
  };

  static getCalendarioActividad = async (req: Request, res: Response) => {
    try {
      const CalendarioDB = getRepository(mando_integral_poa_actividad);
      const anio = req.params.anio;
      const secuencial = req.params.secuencial;

      const response = await CalendarioDB.query(
        `select ca.mes, pra.nombre_actividad,pac.secuencial 
        as "secuencial_poa_actividad", pac.presupuesto, pra.secuencial_poa_maestro, 
        ca.secuencial as "secuencial_calendario" , an.anio, ge.nombre_estado, ge.secuencial,pac.presupuesto_utilizado from generales_calendario ca
        left join generales_anio an on an.secuencial = ca.secuencial_anio
        left join mando_integral_poa_actividad pac on pac.secuencial_calendario=ca.secuencial
        left join proceso_actividad pra on pra.secuencial=pac.secuencial_actividad
        left join generales_estado ge on ge.secuencial =pac.secuencial_estado 
        where an.secuencial=$1 and pra.secuencial=$2
        order by an.anio;
            `,
        [anio, secuencial]
      );
      return res.json(response);
    } catch (error) {
      res.json({ error }).status(209);
    }
  };
  static updateEstadoActividad = async (req: Request, res: Response) => {
    const secuencial_estado = req.params.secuencial_estado;
    const secuencial_actividad = req.params.secuencial_actividad;
    const secuencial_calendario = req.params.secuencial_calendario;
    const sql = `UPDATE mando_integral_poa_actividad 
        set secuencial_estado=$1 
        where secuencial_actividad = $2 and secuencial_calendario = $3`;
    try {
      const PoaActividadDB = getRepository(mando_integral_poa_actividad);
      const response = await PoaActividadDB.query(sql, [
        secuencial_estado,
        secuencial_actividad,
        secuencial_calendario,
      ]);
      res.json({
        message: "Estado Actualizado",
        body: {
          estado: {
            secuencial_estado,
            secuencial_actividad,
            secuencial_calendario,
          },
        },
      });
    } catch (error) {
      res.json({ error });
    }
  };

  static getPresupuestoByPoa = async (req: Request, res: Response) => {
    try {
      const CalendarioDB = getRepository(mando_integral_poa_actividad);
      const secuencial_actividad = req.params.secuencial_actividad;
      const secuencial_calendario = req.params.secuencial_calendario;
 
      const response = await CalendarioDB.query(
        `select presupuesto_utilizado from public.mando_integral_poa_actividad
        where secuencial_actividad = $1 and secuencial_calendario=$2;
            `,
        [secuencial_actividad, secuencial_calendario]
      );
      return res.json(response);
    } catch (error) {
      res.json({ error }).status(209);
    }
  };

  static getPresupuestosUtilizados = async (req: Request, res: Response) => {
    const PoaActividadDB = getRepository(mando_integral_poa_actividad);
    const ProcesoActividadDB = getRepository(proceso_actividad);

    const prs = await PoaActividadDB.find({
      loadRelationIds: true,
    });

    const prsActvs = await ProcesoActividadDB.find({
      select: ["secuencial"],
    });

    const auxArray = [];

    for (const { secuencial } of prsActvs) {
      let auxTotal = 0;
      for (const pActividad of prs) {
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

    return res.json(auxArray);
  };
  static createPoaActividad = async (req: Request, res: Response) => {
    const {
      secuencial_poa_maestro,
      secuencial_actividad,
      secuencial_estado,
      secuencial_calendario,
      presupuesto_utilizado,
      presupuesto,
      secuencial_postergacion,
    } = req.body;
    const poactividadBD = getRepository(mando_integral_poa_actividad);
    const calendarioBD = getRepository(generales_calendario);
    let calendarioFound: generales_calendario;
    try {
      calendarioFound = await calendarioBD.findOneOrFail(secuencial_calendario);
    } catch (error) {
      return res.status(409).json({
        message: "Calendario no encontrado",
        error,
      });
    }
    const pomaestroBD = getRepository(mando_integral_poa_maestro);
    let pomaestroFound: mando_integral_poa_maestro;
    try {
      pomaestroFound = await pomaestroBD.findOneOrFail(secuencial_poa_maestro);
    } catch (error) {
      return res.status(409).json({
        message: "POa maestro no encontrado",
        error,
      });
    }

    const actividadBD = getRepository(proceso_actividad);

    let actividadFound: proceso_actividad;
    try {
      actividadFound = await actividadBD.findOneOrFail(secuencial_actividad);
    } catch (error) {
      return res.status(409).json({
        message: "Actividad no encontrado",
        error,
      });
    }
    const estadoBD = getRepository(generales_estado);
    let estadoFound: generales_estado;
    try {
      estadoFound = await estadoBD.findOneOrFail(secuencial_estado);
    } catch (error) {
      return res.status(409).json({
        message: "Etado no encontrado",
        error,
      });
    }

    const poactividad = new mando_integral_poa_actividad();
    poactividad.secuencial_poa_maestro = secuencial_poa_maestro;
    poactividad.secuencial_actividad = secuencial_actividad;
    poactividad.secuencial_estado = secuencial_estado;
    poactividad.secuencial_calendario = secuencial_calendario;
    poactividad.presupuesto = presupuesto;
    poactividad.presupuesto_utilizado = presupuesto_utilizado;

    poactividad.secuencial_postergacion = secuencial_postergacion;

    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(poactividad, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    let response: any;

    const secuencial_estado_t = 4;
    const secuencial_actividad_t = secuencial_actividad.secuencial;
    const secuencial_calendario_t = secuencial_postergacion;

    const sql = `UPDATE mando_integral_poa_actividad 
        set secuencial_estado=$1, presupuesto_utilizado=0
        where secuencial_actividad = $2 and secuencial_calendario = $3`;

    try {
      //updating
      if (secuencial_postergacion) {
        await poactividadBD.query(sql, [
          secuencial_estado_t,
          secuencial_actividad_t,
          secuencial_calendario_t,
        ]);
      }
      //saving
      response = await poactividadBD.save(poactividad);
    } catch (error) {
      return res.status(409).json({
        message: " Incorrecto",
        error,
      });
    }

    res.json({
      message: "POA Actividad se ha creado correctamente ",
      response: response,
    });
  };

  static uptadeCalendarioActividad = async (req: Request, res: Response) => {
    const calendario = req.params.calendario;
    const actividad = req.params.actividad;
    const secuencial = req.params.secuencial;
    const sql = `UPDATE mando_integral_poa_actividad set secuencial_calendario=$1
        where secuencial_actividad = $2 and secuencial =$3
        ;`;
    try {
      const PoaActividadDB = getRepository(mando_integral_poa_actividad);
      const response = await PoaActividadDB.query(sql, [
        calendario,
        actividad,
        secuencial,
      ]);
      res.json({
        message: "Calendario Actualizado",
        body: { estado: { calendario, actividad, secuencial } },
      });
    } catch (error) {
      res.json({ error });
    }
  };

  static getMonthsByYear = async (req: Request, res: Response) => {
    const calendarioBD = getRepository(generales_calendario);
    const response = await calendarioBD.query(
      `
      select 
      ca.secuencial, 
      ca.mes, 
      ca.secuencial_anio, 
      an.secuencial as "secuencial_anio" from generales_calendario ca
      inner join generales_anio an on an.secuencial=ca.secuencial_anio
      where an.secuencial = $1;
    `,
      [Number(req.params.secuencial)]
    );
    return res.json(response);
  };

  static getPOActividadbySecuencial = async (req: Request, res: Response) => {
    try {
      const CalendarioDB = getRepository(mando_integral_poa_actividad);

      const secuencial = req.params.secuencial;
      const response = await CalendarioDB.query(
        `
        select * from mando_integral_poa_actividad where secuencial =$1
        ;
        `,
        [secuencial]
      );
      return res.json(response);
    } catch (error) {
      res.json({ error }).status(209);
    }
  };
  static updatePoaActividadPresupuestoUtilizado = async (
    req: Request,
    res: Response
  ) => {
    const presupuesto_ulizado = req.params.presupuesto_ulizado;
    const secuencial = req.params.secuencial;
    const sql = `
      update mando_integral_poa_actividad  set presupuesto_utilizado=$1
      where secuencial=$2
        ;`;
    try {
      const PoaActividadDB = getRepository(mando_integral_poa_actividad);
      const response = await PoaActividadDB.query(sql, [
        presupuesto_ulizado,
        secuencial,
      ]);
      res.json({
        message: "Presupuesto Actualizado",
        body: { estado: { presupuesto_ulizado, secuencial } },
      });
    } catch (error) {
      res.json({ error });
    }
  };
}
