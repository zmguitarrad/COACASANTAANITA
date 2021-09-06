import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { seguridades_usuario } from "../entity/seguridades/UsuarioModel";
import { seguridades_usuario_role } from "../entity/seguridades/UsuarioRoleModel";

export const checkRole = (roles: Array<String>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = res.locals.jwtPayload;
        const userRepository = getRepository(seguridades_usuario_role);
        let user: seguridades_usuario_role;

        try {
            user = await userRepository.findOneOrFail(userId, { relations: ["role"] });
        } catch (e) {
            return res.status(401).json({ message: 'There are no messages' })
        }

        const { nombre_rol } = user.secuencial_role;
        if (roles.includes(nombre_rol)) {
            next();
        } else {
            res.status(401).json({ message: 'Not Authorized' })
        }
    }
}