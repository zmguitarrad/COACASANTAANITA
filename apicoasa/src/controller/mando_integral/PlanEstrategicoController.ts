import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { mando_integral_plan_estrategico } from "../../entity/mando_integral/PlanEstrategicoModel";
import { mando_integral_usuario_plan_estrategico } from "../../entity/mando_integral/EstrategicoUsuarioModel";
import { mando_integral_poa_maestro } from "../../entity/mando_integral/PoaMaestroModel";


export class PlanEstrategicoController {
  static getAllPlanEstrategico = async (req: Request, res: Response) => {
    const planBD = getRepository(mando_integral_plan_estrategico);
    let plan: mando_integral_plan_estrategico[];
    try {
      plan = await planBD.find();
    } catch (error) {
      return res.status(404).json({
        message: "Existe algun error",
      });
    }

    if (plan.length > 0) {
      res.send(plan);
    } else {
      res.status(404).json({ message: "No hay plan estrtaegico todavia" });
    }
  };

  static getPlanEstrategicoysecuencialUsuario = async (
    req: Request,
    res: Response
  ) => {
    const { secuencial } = res.locals.jwtPayload;
    try {
      const planBD = getRepository(mando_integral_usuario_plan_estrategico);
      const response = await planBD.query(
        `select su.secuencial, mpe.secuencial, mpe.nombre_plan_estrategico from mando_integral_plan_estrategico mpe
                inner join mando_integral_usuario_plan_estrategico mupe on mupe.secuencial_plan_estrategico = mpe.secuencial
                inner join seguridades_usuario su on  su.secuencial = mupe.secuencial_usuario
                where mupe.secuencial_usuario=$1;`,
        [secuencial]
      );
      res.json(response);
    } catch (error) {
      res.json({ error });
    }
  };

  static getPlanEstrategicoPOAMaestro = async (req: Request, res: Response) => {
    try {
      const PoaDB = getRepository(mando_integral_poa_maestro);
      const secuencial = req.params.secuencial;
      const response = await PoaDB.query(
        `select distinct mpe.nombre_plan_estrategico,poama.nombre_poa_maestro, poama.secuencial 
        from mando_integral_plan_estrategico mpe 
        inner join mando_integral_poa_maestro poama 
        on poama.secuencial_plan_estrategico = mpe.secuencial
        where mpe.secuencial=$1;
        `,
        [secuencial]
      );
      return res.json(response);
    } catch (error) {
      res.json({ error }).status(209);
    }
  };

  static getPlanEstrategicoBySecuencial = async (
    req: Request,
    res: Response
  ) => {
    const planBD = getRepository(mando_integral_plan_estrategico);

    let planestrategico: mando_integral_plan_estrategico;
    const { secuencial } = req.params;
    try {
      planestrategico = await planBD.findOneOrFail(secuencial);
      res.send(planestrategico);
    } catch (error) {
      res.status(404).json({ message: "No existe el Plan Estratégico" });
    }
  };

  static createPlanEstrategico = async (req: Request, res: Response) => {
    const { nombre_plan_estrategico, anio_inicio, anio_fin } = req.body;
    const planBD = getRepository(mando_integral_plan_estrategico);
    const planestrategico = new mando_integral_plan_estrategico();
    planestrategico.nombre_plan_estrategico = nombre_plan_estrategico;
    planestrategico.anio_inicio = anio_inicio;
    planestrategico.anio_fin = anio_fin;

    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(planestrategico, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    let response: any;
    try {
      response = await planBD.save(planestrategico);
    } catch (error) {
      return res.status(409).json({
        message: "Plan Estrategico incorrecto",
        error,
      });
    }
    res.json({
      message: "Plan Estrategico creado",
      response: response,
    });
  };

  static updatePlanEstrategicoBySecuencial = async (
    req: Request,
    res: Response
  ) => {
    const { secuencial } = req.params;
    const { nombre_plan_estrategico, anio_inicio, anio_fin } = req.body;
    console.log(req.body);

    const planBD = getRepository(mando_integral_plan_estrategico);

    let planestrategico: mando_integral_plan_estrategico;
    try {
      planestrategico = await planBD.findOneOrFail(secuencial);
      planestrategico.nombre_plan_estrategico = nombre_plan_estrategico;
      planestrategico.anio_inicio = anio_inicio;
      planestrategico.anio_fin = anio_fin;
    } catch (error) {
      return res
        .status(404)
        .json({ message: "Plan Estrategico no encontrado!" });
    }

    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(planestrategico, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    let response: any;
    try {
      response = await planBD.save(planestrategico);
    } catch (error) {
      return res.status(409).json({
        message: "Existe algun error",
        error,
      });
    }
    res
      .status(201)
      .json({ message: "Plan Estrataegico actualizado", response });
  };

  static removePlanEstrategicoBySecuenccial = async (
    req: Request,
    res: Response
  ) => {
    const { secuencial } = req.params;
    const planBD = getRepository(mando_integral_plan_estrategico);
    try {
      await planBD.findOneOrFail(secuencial);
    } catch (error) {
      return res
        .status(404)
        .json({ message: "Plan Estratégico no encontrado!" });
    }

    const response = await planBD.delete(secuencial);
    res.status(201).json({ message: "Plan Estratégico eliminado", response });
  };
}
