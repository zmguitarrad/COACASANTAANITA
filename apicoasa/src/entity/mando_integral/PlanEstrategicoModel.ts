import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique } from "typeorm";

import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";
import { proceso_perspectiva } from "../proceso/PerspectivaModel";
import { mando_integral_poa_maestro } from "./PoaMaestroModel";
import { mando_integral_usuario_plan_estrategico } from "./EstrategicoUsuarioModel";


@Entity()
export class mando_integral_plan_estrategico {
    @PrimaryGeneratedColumn()
    secuencial: number;

    @Column()
    @MinLength(4)
    @MaxLength(500)
    @IsNotEmpty()
    nombre_plan_estrategico: string;

    @Column()
    @IsNotEmpty()
    anio_inicio: number;

    @Column()
    @IsNotEmpty()
    anio_fin: number;

    @OneToMany(() => mando_integral_usuario_plan_estrategico, plan => plan.secuencial_plan_estrategico, { cascade: true })
    estrategico: mando_integral_usuario_plan_estrategico[];

    @OneToMany(() => proceso_perspectiva, perspective => perspective.secuencial_plan_estrategico, { cascade: true })
   perspective: proceso_perspectiva[];

   @OneToMany(() => mando_integral_poa_maestro, maestro => maestro.secuencial_plan_estrategico, { cascade: true })
   maestro: mando_integral_poa_maestro[];


}