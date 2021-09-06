import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique, ManyToOne,Generated, JoinColumn} from "typeorm";

import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";
import { proceso_objetivo_perspectiva } from "../proceso/ObjetivoPerspectivaModel";
import { generales_anio } from "./AnioModel";
import { mando_integral_poa_maestro } from "../mando_integral/PoaMaestroModel";
import { mando_integral_poa_actividad } from "../mando_integral/PoaActividadModel";


@Entity()

export class generales_calendario {
    @PrimaryGeneratedColumn()
    secuencial: number;


    @Column()
    @MinLength(4)
    @MaxLength(200)
    @IsNotEmpty()
    mes: string;

    @ManyToOne(() => generales_anio, anio => anio.calendario)
    @JoinColumn([{ name: "secuencial_anio", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject() 
    secuencial_anio: generales_anio;

    
    @OneToMany(() => mando_integral_poa_actividad, poactividad => poactividad.secuencial_calendario, { cascade: true })
    poactividad:  mando_integral_poa_actividad[];

  
}