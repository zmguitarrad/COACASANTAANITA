import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique, ManyToOne, JoinColumn} from "typeorm";

import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";
import { proceso_objetivo_perspectiva } from "../proceso/ObjetivoPerspectivaModel";
import { proceso_actividad } from "../proceso/ActividadModel";


@Entity()
@Unique(['nombre_indicador'])
export class indicadores_indicador {
    @PrimaryGeneratedColumn()
    secuencial: number;


    @Column()
    @MinLength(3)
    @MaxLength(200)
    @IsNotEmpty()
    nombre_indicador: string;

 
    @ManyToOne(() => proceso_objetivo_perspectiva, objetivo => objetivo.indicador)
    @JoinColumn([{ name: "secuencial_objetivo_perspectiva", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_objetivo_perspectiva: proceso_objetivo_perspectiva;
   
    
    @OneToMany(() => proceso_actividad, actividad => actividad.secuencial_indicador, { cascade: true })
    actividad: proceso_actividad[];


}