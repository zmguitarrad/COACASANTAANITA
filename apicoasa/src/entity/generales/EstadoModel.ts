import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique, ManyToOne} from "typeorm";

import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";
import { proceso_objetivo_perspectiva } from "../proceso/ObjetivoPerspectivaModel";
import { mando_integral_poa_actividad } from "../mando_integral/PoaActividadModel";


@Entity()
@Unique(['nombre_estado'])
export class generales_estado {
    @PrimaryGeneratedColumn()
    secuencial: number;


    @Column()
    @MinLength(3)
    @MaxLength(200)
    @IsNotEmpty()
    nombre_estado: string;

    
    @OneToMany(() => mando_integral_poa_actividad, actividad => actividad.secuencial_estado, { cascade: true })
    actividad: mando_integral_poa_actividad[];






    
}