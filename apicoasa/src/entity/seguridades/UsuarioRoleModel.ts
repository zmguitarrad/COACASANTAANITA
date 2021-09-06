import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique, ManyToOne,JoinColumn} from "typeorm";

import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";

import { seguridades_usuario } from "./UsuarioModel";
import { seguridades_role } from "./RoleModel";

@Entity()
export class seguridades_usuario_role {
    @PrimaryGeneratedColumn()
    secuencial: number;
    @ManyToOne(() => seguridades_usuario, userole => userole.userole)
    @JoinColumn([{ name: "secuencial_usuario", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_usuario: seguridades_usuario;

    @ManyToOne(() => seguridades_role, userole => userole.role)
    @JoinColumn([{ name: "secuencial_role", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_role : seguridades_role;
 
    @Column()
    @IsNotEmpty()
    activo: boolean;


   
}