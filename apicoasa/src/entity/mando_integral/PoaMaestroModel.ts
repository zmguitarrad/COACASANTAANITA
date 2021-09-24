import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique, ManyToOne, JoinColumn} from "typeorm";

import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";
import { proceso_objetivo_perspectiva } from "../proceso/ObjetivoPerspectivaModel";
import { generales_anio } from "../generales/AnioModel";
import { mando_integral_plan_estrategico } from "./PlanEstrategicoModel";
import { mando_integral_poa_actividad } from "./PoaActividadModel";
import { proceso_actividad } from "../proceso/ActividadModel";
import { mando_integral_poa_actividad_presupuesto } from "./PoaActPresupuestoModel";


@Entity()
export class mando_integral_poa_maestro {
    @PrimaryGeneratedColumn()
    secuencial: number;


    @Column()
    @MinLength(3)
    @MaxLength(200)
    @IsNotEmpty()
    nombre_poa_maestro: string;

    @Column()
    @IsNotEmpty()
    activo: boolean;

 
    @ManyToOne(() => mando_integral_plan_estrategico, planest => planest.maestro)
    @JoinColumn([{ name: "secuencial_plan_estrategico", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_plan_estrategico: proceso_objetivo_perspectiva;

    @ManyToOne(() => generales_anio, anio => anio.calendario)
    @JoinColumn([{ name: "secuencial_anio", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_anio: proceso_objetivo_perspectiva;

    @OneToMany(() => mando_integral_poa_actividad, poactividad => poactividad.secuencial_poa_maestro, { cascade: true })
    poactividad:  mando_integral_poa_actividad[];
 
    @OneToMany(() => proceso_actividad, actividadpoa => actividadpoa.secuencial_poa_maestro, { cascade: true })
    actividadpoa: proceso_actividad[];

    @OneToMany(() => mando_integral_poa_actividad_presupuesto, poapresupuesto => poapresupuesto.secuencial_poa_maestro, { cascade: true })
    poapresupuesto: mando_integral_poa_actividad_presupuesto[];
}