import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { seguridades_usuario } from "../../entity/seguridades/UsuarioModel";
import { validate } from "class-validator"
import { mando_integral_usuario_plan_estrategico } from "../../entity/mando_integral/EstrategicoUsuarioModel";
import { mando_integral_plan_estrategico } from "../../entity/mando_integral/PlanEstrategicoModel";

export class UsuarioPlanEstrategicoController {

    static getAllUsuarioPlanEstrategico = async (req: Request, res: Response) => {
        const usuarioplanBD = getRepository(mando_integral_usuario_plan_estrategico);
        let usuarioplan: mando_integral_usuario_plan_estrategico[];
        try {
            usuarioplan = await usuarioplanBD.find({ relations: ['secuencial_plan_estrategico', 'secuencial_usuario']  })
        } catch (error) {
            return res.status(404).json({
                message: 'Existe algun error'
            })
        }

        if (usuarioplan.length > 0) {
            res.send(usuarioplan);
        } else {
            res.status(404).json(
                { message: 'No hay usuario y plan estratégico aun' }
            );
        }
    }

    static getUsuarioPlanEstrategicoBySecuecial = async (req: Request, res: Response) => {

        const usuarioplanBD = getRepository(mando_integral_usuario_plan_estrategico);
        let usuarioplan: mando_integral_usuario_plan_estrategico;
        const { secuencial } = req.params;
        try {
            usuarioplan = await usuarioplanBD.findOneOrFail(secuencial, { relations: ["secuencial"] });
            res.send(usuarioplan);
        } catch (error) {
            res.status(404).json(
                { message: 'No existe el usuario ' }
            );
        }


    }
    static createUsuarioPlanEstrategico = async (req: Request, res: Response) => {
        const { secuencial_plan_estrategico,secuencial_usuario, activo } = req.body;
        const usuarioplanBD = getRepository(mando_integral_usuario_plan_estrategico);
        const planBD = getRepository(mando_integral_plan_estrategico);
        const usuarioBD = getRepository(seguridades_usuario);


        let planFound: mando_integral_plan_estrategico;
        try {
            planFound = await planBD.findOneOrFail(secuencial_plan_estrategico);
        } catch (error) {
            return res.status(409).json({
                message: 'Plan Estrategico no encontrado',
                error
            });
        }

        let userFound: seguridades_usuario;
        try {
            userFound = await usuarioBD.findOneOrFail(secuencial_usuario);
        } catch (error) {
            return res.status(409).json({
                message: 'Usuario no encontrado',
                error
            });
        }

        const usuarioplan = new mando_integral_usuario_plan_estrategico();
        usuarioplan.secuencial_plan_estrategico=secuencial_plan_estrategico;
        usuarioplan.secuencial_usuario= secuencial_usuario;
        usuarioplan.activo=activo;
        

        const validationOpt = { validationError: { target: false, value: false } }
        const errors = await validate(usuarioplan, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        let response: any;
        try {
            response = await usuarioplanBD.save(usuarioplan);
        } catch (error) {
            return res.status(409).json({
                message: 'Usuario o plan estratégico incorrecto',
                error
            });
        }

        res.json({
            "message": "Se ha asignado al usuario el plan estratégico correctamente ",
            "response": response,
        })


    }

    static updateUsuarioPlanEstrategicoBySecuencial = async (req: Request, res: Response) => {
        const { secuencial } = req.params;
        const { secuencial_plan_estrategico,secuencial_usuario,activo} = req.body;
        console.log(req.body);
        const usuarioplanBD = getRepository(mando_integral_usuario_plan_estrategico);
        let usuarioplan: mando_integral_usuario_plan_estrategico;
        const userBD = getRepository(seguridades_usuario);
        let userFound: seguridades_usuario;
        try {
            userFound = await userBD.findOneOrFail(secuencial_usuario);
        } catch (error) {
            return res.status(409).json({
                message: 'Usuario no encontrado',
                error
            });
        }

        const planBD = getRepository(mando_integral_plan_estrategico);

        
        let planFound: mando_integral_plan_estrategico;
        try {
            planFound = await planBD.findOneOrFail(secuencial_plan_estrategico);
        } catch (error) {
            return res.status(409).json({
                message: 'Plan Estratégico no encontrado',
                error
            });
        }


        try {
            usuarioplan = await usuarioplanBD.findOneOrFail(secuencial);
            usuarioplan.secuencial_plan_estrategico=secuencial_plan_estrategico;
            usuarioplan.secuencial_usuario = secuencial_usuario;
            usuarioplan.activo=activo;
           

        } catch (error) {
            return res.status(404).json(
                { message: 'Usuario y plan estratégico no encontrado' }
            );
        }

        const validationOpt = { validationError: { target: false, value: false } }
        const errors = await validate(usuarioplan, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        let response: any;
        try {
            response = await usuarioplanBD.save(usuarioplan);
        } catch (error) {
            return res.status(409).json(
                {
                    message: 'Existe algun error',
                    error
                }
            );
        }
        res.status(201).json({ message: 'Usuario y plan estratégico actualizado', response });

    }

  
}