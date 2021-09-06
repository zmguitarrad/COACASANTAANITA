import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique, ManyToOne} from "typeorm";

import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";
import { proceso_objetivo_perspectiva } from "../proceso/ObjetivoPerspectivaModel";
import { generales_calendario } from "./CalendarioModel";
import { mando_integral_poa_maestro } from "../mando_integral/PoaMaestroModel";


@Entity()
export class generales_anio {
    @PrimaryGeneratedColumn()
    secuencial: number;


    @Column()
    @IsNotEmpty()
    anio: number;
   
   
    @OneToMany(() => generales_calendario, calendario => calendario.secuencial_anio, { cascade: true })
    calendario: generales_calendario[];

    @OneToMany(() => mando_integral_poa_maestro, poamaestro => poamaestro.secuencial_anio, { cascade: true })
    poamaestro: mando_integral_poa_maestro[];
}