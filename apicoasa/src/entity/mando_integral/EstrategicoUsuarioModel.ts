import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique, ManyToOne, JoinColumn } from "typeorm";

import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";
import { mando_integral_plan_estrategico } from "../mando_integral/PlanEstrategicoModel";
import { seguridades_usuario } from "../seguridades/UsuarioModel";


@Entity()
export class mando_integral_usuario_plan_estrategico {
    @PrimaryGeneratedColumn()
    secuencial: number;

    @ManyToOne(() => mando_integral_plan_estrategico, usuarioestrategico => usuarioestrategico.estrategico)
    @JoinColumn([{ name: "secuencial_plan_estrategico", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_plan_estrategico: mando_integral_plan_estrategico;

    @ManyToOne(() => seguridades_usuario, usuarioestrategico => usuarioestrategico.usuario)
    @JoinColumn([{ name: "secuencial_usuario", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_usuario : seguridades_usuario;

    @Column()
    @IsNotEmpty()
    activo: boolean;

    
}