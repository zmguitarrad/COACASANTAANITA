import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique } from "typeorm";

import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";

import { seguridades_usuario_role } from "./UsuarioRoleModel";
import { proceso_actividad } from "../proceso/ActividadModel";

@Entity()
@Unique(['nombre_rol'])
export class seguridades_role {
    @PrimaryGeneratedColumn()
    secuencial: number;

    @Column()
    @MinLength(3)
    @MaxLength(100)
    @IsNotEmpty()
    nombre_rol: string;

    @Column()
    @IsNotEmpty()
    activo: boolean;

    @OneToMany(() => seguridades_usuario_role, usersroles => usersroles.secuencial_role, { cascade: true })
   role: seguridades_role[];

   @OneToMany(() => proceso_actividad, actividad => actividad.secuencial_role, { cascade: true })
   actividad: seguridades_role[];
}