import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { seguridades_usuario } from "../../entity/seguridades/UsuarioModel";

import { seguridades_role } from "../../entity/seguridades/RoleModel";
import { validate } from "class-validator"

export class UserController {

    static getAllUsers = async (req: Request, res: Response) => {
        const userBD = getRepository(seguridades_usuario);
        let users: seguridades_usuario[];
      try {
            users = await userBD.find();
        } catch (error) {
            return res.status(404).json({
                message: 'Existe algun error'
            })
        }

        if (users.length > 0) {
            res.send(users);
        } else {
            res.status(404).json(
                { message: 'No hay usuarios todavia' }
            );
        }
    }

    static getUserBySecuencial = async (req: Request, res: Response) => {
        const userBD = getRepository(seguridades_usuario);
        let user: seguridades_usuario;
        const { secuencial } = req.params;
        try {
            user = await userBD.findOneOrFail(secuencial);
            res.send(user);
        } catch (error) {
            res.status(404).json(
                { message: 'No existe el usuario' }
            );
        }

    }
    static getUserById = async (req: Request, res: Response) => {
        const userBD = getRepository(seguridades_usuario);
        let user: seguridades_usuario;
        const { id } = req.params;
        try {
            user = await userBD.createQueryBuilder().
                select("user").from(seguridades_usuario, "user").
                where("user.id = :id", {id }).getOneOrFail();
            res.send(user);
        } catch (error) {
            res.status(404).json(
                { message: 'No existe con el id'+id }
            );
        }


    }



    static createUser = async (req: Request, res: Response) => {
        const { secuencial, cedula, apellidos, nombres, correo, clave, activo } = req.body;
        const userBD = getRepository(seguridades_usuario);

        const user = new seguridades_usuario();
        user.secuencial = secuencial;
        user.cedula = cedula;
        user.apellidos = apellidos;
        user.nombres = nombres;
        user.correo = correo;
        user.clave = clave;
        user.activo = activo;
   
        const validationOpt = { validationError: { target: false, value: false } }
        const errors = await validate(user, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        let response: any;
        try {
            response = await userBD.save(user);
        } catch (error) {
            return res.status(409).json({
                message: 'Usuario incorrecto',
                error
            });
        }
        res.json({
            "message": "Usuario creado",
            "response": response,
        })


    }

    static updateUserById = async (req: Request, res: Response) => {
        const { secuencial } = req.params;
        const { cedula, apellidos, nombres, correo, clave, activo } = req.body;
        
        
        const userBD = getRepository(seguridades_usuario);
     
        let user: seguridades_usuario;
        try {
            user = await userBD.findOneOrFail(secuencial);
            user.cedula =cedula
            user.apellidos = apellidos;
            user.nombres = nombres;
            user.correo = correo;
            user.clave = clave;
            user.activo = activo;
           

        } catch (error) {
            return res.status(404).json(
                { message: 'Usuario no encontrado!' }
            );
        }

        const validationOpt = { validationError: { target: false, value: false } }
        const errors = await validate(user, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        let response: any;
        try {
            response = await userBD.save(user);
        } catch (error) {
            return res.status(409).json(
                {
                    message: 'Existe algun error',
                    error
                }
            );
        }
        res.status(201).json({ message: 'Usuario actualizado', response });

    }

  
}