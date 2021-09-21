import { getRepository } from "typeorm";
import { Request, Response } from 'express';
import { seguridades_usuario } from "../entity/seguridades/UsuarioModel";
import * as jwt from "jsonwebtoken";
import config from "./../config/config"
import { validate } from 'class-validator';

export class AuthController {
    static login = async (req: Request, res: Response) => {
        const { secuencial, clave } = req.body;

        if (!(secuencial && clave)) {
            res.status(400).json(
                { message: 'Username & Password are required!' }
            );
        }

        const userRepository = getRepository(seguridades_usuario);
        let user: seguridades_usuario;
        try {
            user = await userRepository.findOneOrFail(secuencial);
        } catch (error) {
            return res.status(400).json(
                { message: 'Username or password incorrect!' }
            )
        }

      

        //Generate token this user
        const token = jwt.sign(
            {
                secuencial: user.secuencial
            }
            , config.jwtSecret, { expiresIn: '1h' });

        res.json({
            message: 'OK',
            token,
            secuencial: user.secuencial,
            nombres: user.nombres,
            apellidos: user.apellidos,
            

        });
    }

    static changePassword = async (req: Request, res: Response) => {
        const { secuencial } = res.locals.jwtPayload;
        const { oldPassword, newPassword } = req.body;

        if (!(oldPassword && newPassword)) {
            res.status(400).json({
                message: 'Old password & new password are required'
            })
        }

        const userRepository = getRepository(seguridades_usuario);
        let user: seguridades_usuario;
        try {
            user = await userRepository.findOneOrFail(secuencial);
        } catch (error) {
            res.status(400).json({
                message: 'Something goes wrong'
            });
        }

        

        user.clave = newPassword;

        const validationOpt = { validationError: { target: false, value: false } }
        const errors = await validate(user, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        //Hash password
        user.hashPassword();
        userRepository.save(user);

        res.json({ message: 'Password changed' });
    }
}