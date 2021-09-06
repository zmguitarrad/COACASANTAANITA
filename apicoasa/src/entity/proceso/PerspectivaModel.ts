import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique, ManyToOne,JoinColumn} from "typeorm";

import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";
import { mando_integral_plan_estrategico } from "../mando_integral/PlanEstrategicoModel";
import { proceso_objetivo_perspectiva } from "./ObjetivoPerspectivaModel";


@Entity()
export class proceso_perspectiva {
    @PrimaryGeneratedColumn()
    secuencial: number;

    @ManyToOne(() => mando_integral_plan_estrategico, planestrategico => planestrategico.perspective)
    @JoinColumn([{ name: "secuencial_plan_estrategico", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_plan_estrategico: mando_integral_plan_estrategico;
 
    @Column()
    @MinLength(4)
    @MaxLength(200)
    @IsNotEmpty()
    nombre_perspectiva: string;

    @OneToMany(() => proceso_objetivo_perspectiva, objetive => objetive.secuencial_perspectiva, { cascade: true })
    objetive: proceso_objetivo_perspectiva[];
   
}