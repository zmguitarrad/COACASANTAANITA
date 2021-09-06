import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { seguridades_role } from "../../entity/seguridades/RoleModel";
import { validate } from "class-validator"

export class RoleController {

    static getAllRoles = async (req: Request, res: Response) => {
        const roleBD = getRepository(seguridades_role);
        let roles: seguridades_role[];

        try {
            roles = await roleBD.find();
        } catch (error) {
            return res.status(404).json({
                message: 'Existe algun error'
            })
        }

        if (roles.length > 0) {
            res.send(roles);
        } else {
            res.status(404).json(
                { message: 'No hay roles todavia' }
            );
        }
    }
    static getRoleById = async (req: Request, res: Response) => {
        const roleBD = getRepository(seguridades_role);
        let role: seguridades_role;
        const { secuencial } = req.params;
        try {
            role = await roleBD.findOneOrFail(secuencial);
            res.send(role);
        } catch (error) {
            res.status(404).json(
                { message: 'No existe el rol' }
            );
        }

    }
    static getRoleByName = async (req: Request, res: Response) => {
        const roleBD = getRepository(seguridades_role);
        let role: seguridades_role;
        const { nombre_rol } = req.params;
        try {
            role = await roleBD.createQueryBuilder().
                select("role").from(seguridades_role, "role").
                where("role.nombre_rol = :nombre_rol", {nombre_rol }).getOneOrFail();
            res.send(role);
        } catch (error) {
            res.status(404).json(
                { message: 'No existe el rol con ese nombre' }
            );
        }


    }
    static createRole = async (req: Request, res: Response) => {
        const { nombre_rol,activo } = req.body;

        const role = new seguridades_role();
        role.nombre_rol = nombre_rol;
        role.activo = activo;
        
        const validationOpt = { validationError: { target: false, value: false } }
        const errors = await validate(role, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }


        let response: any;
        const roleBD = getRepository(seguridades_role);
        try {
            response = await roleBD.save(role);
        } catch (error) {
            return res.status(409).json({
                message: 'Rol incorrecto'
            });
        }

        res.json({
            "message": "Rol creado",
            "response": response,
        })
    }
    static updateRoleById = async (req: Request, res: Response) => {
        const { secuencial } = req.params;
        const { nombre_rol } = req.body;
        const roleBD = getRepository(seguridades_role);
        let role: seguridades_role;

        try {
            role = await roleBD.findOneOrFail(secuencial);
            role.nombre_rol = nombre_rol;
        } catch (error) {
            return res.status(404).json(
                { message: 'Rol no encontrado!' }
            );
        }

        const validationOpt = { validationError: { target: false, value: false } }
        const errors = await validate(role, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        let response: any;
        try {
            response = await roleBD.save(role);
        } catch (error) {
            return res.status(409).json(
                {
                    message: 'Rol esta en uso',
                    error
                }
            );
        }
        res.status(201).json({ message: 'Rol actualizado', response });
    }
    static removeRoleById = async (req: Request, res: Response) => {
        const { secuencial } = req.params;
        const roleBD = getRepository(seguridades_role);
        try {
            await roleBD.findOneOrFail(secuencial);
        } catch (error) {
            return res.status(404).json(
                { message: 'Role not found!' }
            );
        }

        const response = await roleBD.delete(secuencial);
        res.status(201).json(
            { message: 'Role eliminado', response }
        );
    }

}