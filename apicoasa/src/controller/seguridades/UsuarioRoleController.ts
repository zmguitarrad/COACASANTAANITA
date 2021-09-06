import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { seguridades_usuario } from "../../entity/seguridades/UsuarioModel";
import { seguridades_role } from "../../entity/seguridades/RoleModel";
import { validate } from "class-validator"
import { seguridades_usuario_role } from "../../entity/seguridades/UsuarioRoleModel";

export class UserRoleController {

    static getAllUsersRole = async (req: Request, res: Response) => {
        const useroleBD = getRepository(seguridades_usuario_role);
        let usersrole: seguridades_usuario_role[];
        try {
            usersrole = await useroleBD.find({ relations: ['secuencial_usuario', "secuencial_role"]  })
        } catch (error) {
            return res.status(404).json({
                message: 'Existe algun error'
            })
        }

        if (usersrole.length > 0) {
            res.send(usersrole);
        } else {
            res.status(404).json(
                { message: 'No hay usuario y rol aun' }
            );
        }
    }

    static getUserRoleById = async (req: Request, res: Response) => {

        const useroleBD = getRepository(seguridades_usuario_role);
        let userole: seguridades_usuario_role;
        const { secuencial } = req.params;
        try {
            userole = await useroleBD.findOneOrFail(secuencial, { relations: ["secuencial"] });
            res.send(userole);
        } catch (error) {
            res.status(404).json(
                { message: 'No existe rol usuario' }
            );
        }


    }



    static createUserRole = async (req: Request, res: Response) => {
        const { secuencial_role,secuencial_usuario,activo } = req.body;
        const useroleBD = getRepository(seguridades_usuario_role);
        const userBD = getRepository(seguridades_usuario);
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

        let userFound: seguridades_usuario;
        try {
            userFound = await userBD.findOneOrFail(secuencial_usuario);
        } catch (error) {
            return res.status(409).json({
                message: 'Usuario no encontrado',
                error
            });
        }

        const user = new seguridades_usuario_role();
        
        user.secuencial_usuario = userFound;
        user.secuencial_role = roleFound;
        user.activo= activo;
  

        const validationOpt = { validationError: { target: false, value: false } }
        const errors = await validate(user, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        let response: any;
        try {
            response = await useroleBD.save(user);
        } catch (error) {
            return res.status(409).json({
                message: 'Usuario incorrecto',
                error
            });
        }

        res.json({
            "message": "Se ha asignado al usuario el rol correctamente ",
            "response": response,
        })


    }

    static updateUserRoleById = async (req: Request, res: Response) => {
        const { secuencial } = req.params;
        const { secuencial_usuario, secuencial_role, activo } = req.body;
        console.log(req.body);
        const useroleBD = getRepository(seguridades_usuario_role);
        let userole: seguridades_usuario_role;
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
            userole = await useroleBD.findOneOrFail(secuencial);
            userole.secuencial_usuario = secuencial_usuario;
            userole.secuencial_role = secuencial_role;
            userole.activo = activo; 

        } catch (error) {
            return res.status(404).json(
                { message: 'Usuario y rol no encontrado' }
            );
        }

        const validationOpt = { validationError: { target: false, value: false } }
        const errors = await validate(userole, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        let response: any;
        try {
            response = await useroleBD.save(userole);
        } catch (error) {
            return res.status(409).json(
                {
                    message: 'Existe algun error',
                    error
                }
            );
        }
        res.status(201).json({ message: 'Usuario rol actualizado', response });

    }

    static removeUseRoleById = async (req: Request, res: Response) => {
        const { secuencial } = req.params;
        const useroleBD = getRepository(seguridades_usuario_role);
        try {
            await useroleBD.findOneOrFail(secuencial);
        } catch (error) {
            return res.status(404).json(
                { message: 'Usuario rol no encontrado!' }
            );
        }

        const response = await useroleBD.delete(secuencial);
        res.status(201).json(
            { message: 'Usuario y rol eliminado', response }
        );
    }

  
}