import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { validate } from "class-validator"
import { auditoria_bitacora } from "../../entity/auditoria/BitacoraModel";

export class BitacoraController {

    static getAllBitacora = async (req: Request, res: Response) => {
        const bitacoraBD = getRepository(auditoria_bitacora);
        let bitacora: auditoria_bitacora[];
      try {
            bitacora = await bitacoraBD.find();
        } catch (error) {
            return res.status(404).json({
                message: 'Existe algun error'
            })
        }

        if (bitacora.length > 0) {
            res.send(bitacora);
        } else {
            res.status(404).json(
                { message: 'No hay usuarios todavia' }
            );
        }
    }

    static getBitacoraBySecuencial = async (req: Request, res: Response) => {
        const bitacoraBD = getRepository(auditoria_bitacora);
        let bitacora: auditoria_bitacora;
        const { secuencial } = req.params;
        try {
            bitacora = await bitacoraBD.findOneOrFail(secuencial);
            res.send(bitacora);
        } catch (error) {
            res.status(404).json(
                { message: 'No existe bitacora' }
            );
        }

    }

     
}