import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique, ManyToOne, JoinColumn } from "typeorm";

import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";
import { mando_integral_plan_estrategico } from "../mando_integral/PlanEstrategicoModel";
import { seguridades_usuario } from "../seguridades/UsuarioModel";
import { mando_integral_poa_maestro } from "./PoaMaestroModel";
import { proceso_actividad } from "../proceso/ActividadModel";


@Entity()
export class mando_integral_poa_actividad_presupuesto {
    @PrimaryGeneratedColumn()
    secuencial: number;

    @ManyToOne(() => mando_integral_poa_maestro, poamaestro => poamaestro.poapresupuesto)
    @JoinColumn([{ name: "secuencial_poa_maesro", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_poa_maestro: mando_integral_poa_maestro;

    @ManyToOne(() => proceso_actividad, actividad =>actividad.actividadpresupuesto)
    @JoinColumn([{ name: "secuencial_actividad", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_actividad : proceso_actividad;

    @Column("decimal", { precision: 6, scale: 2 })
    @IsNotEmpty()
    presupuesto:number;

    
}