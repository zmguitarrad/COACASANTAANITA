import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { proceso_observacion } from "../../entity/proceso/ObservacionModel";
import { validate } from "class-validator"
import { mando_integral_poa_actividad } from "../../entity/mando_integral/PoaActividadModel";

export class ObservacionController {

    static getAllObservacion = async (req: Request, res: Response) => {
        const observacionBD = getRepository(proceso_observacion);
        let observacion: proceso_observacion[];
      try {
            observacion = await observacionBD.find({ relations: ['secuencial_poa_actividad']  });
        } catch (error) {
            return res.status(404).json({
                message: 'Existe algun error'
            })
        }

        if (observacion.length > 0) {
            res.send(observacion);
        } else {
            res.status(404).json(
                { message: 'No hay observaciones todavia' }
            );
        }
    }
    static getObservacionByPoaActividad = async (req: Request, res: Response) => {
        try {
          const ObservacionDB = getRepository(proceso_observacion);
          const secuencial = req.params.secuencial;
          const response = await ObservacionDB.query(
            `select ob.secuencial, ob.nombre_observacion,
            pac.secuencial as "secuencial_poa_actividad",ac.nombre_actividad, 
            ca.secuencial as "secuencial_calendario", ca.mes, ob.fecha, ob.entregables,
            pac.presupuesto_utilizado
            from mando_integral_poa_actividad pac 
                       inner join proceso_observacion ob on ob.secuencial_poa_actividad=pac.secuencial
                       inner join proceso_actividad ac on ac.secuencial = pac.secuencial_actividad
                       inner join generales_calendario ca on ca.secuencial = pac.secuencial_calendario
            where pac.secuencial=$1
            order by ob.secuencial;
            `,
            [secuencial]
          );
          return res.json(response);
        } catch (error) {
          res.json({ error }).status(209);
        }
      };

    static createObservacion = async (req: Request, res: Response) => {
        const {nombre_observacion,entregables, secuencial_poa_actividad} = req.body;
        const poactividadBD = getRepository(mando_integral_poa_actividad);
        const observacionBD = getRepository(proceso_observacion);

        let poactividadFound: mando_integral_poa_actividad;
        try {
            poactividadFound = await poactividadBD.findOneOrFail(secuencial_poa_actividad);
        } catch (error) {
            return res.status(409).json({
                message: 'POA Actividad no encontrado',
                error
            });
        }
        let date: Date = new Date();

        const observacion = new proceso_observacion();
        observacion.nombre_observacion = nombre_observacion;
        observacion.fecha =date;
        observacion.entregables =entregables || "";
        observacion.secuencial_poa_actividad=secuencial_poa_actividad;

        const validationOpt = { validationError: { target: false, value: false } }
        const errors = await validate(observacion, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        let response: any;
        try {
            response = await observacionBD.save(observacion);
        } catch (error) {
            return res.status(409).json({
                message: 'Observación incorrecta',
                error
            });
        }
        res.json({
            "message": "Observacion creada",
            "response": response,
        })


    }

    static updateObservacionBySecuencial = async (req: Request, res: Response) => {
        const { secuencial } = req.params;
        const { nombre_observacion } = req.body;
        console.log(req.body);
        
        const observacionBD = getRepository(proceso_observacion);
     
        let observacion: proceso_observacion;
        try {
            observacion = await observacionBD.findOneOrFail(secuencial);
            observacion.nombre_observacion = nombre_observacion;           

        } catch (error) {
            return res.status(404).json(
                { message: 'Observacion no encontrado!' }
            );
        }

        const validationOpt = { validationError: { target: false, value: false } }
        const errors = await validate(observacion, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        let response: any;
        try {
            response = await observacionBD.save(observacion);
        } catch (error) {
            return res.status(409).json(
                {
                    message: 'Existe algun error',
                    error
                }
            );
        }
        res.status(201).json({ message: 'Observacion actualizada', response });

    }

    static removeObservacionBySecuencial = async (req: Request, res: Response) => {
        const { secuencial } = req.params;
        const observacionBD = getRepository(proceso_observacion);
        try {
            await observacionBD.findOneOrFail(secuencial);
        } catch (error) {
            return res.status(404).json(
                { message: 'Observacion no encontrado!' }
            );
        }

        const response = await observacionBD.delete(secuencial);
        res.status(201).json(
            { message: 'Observacion borrado', response }
        );
    }

  
}