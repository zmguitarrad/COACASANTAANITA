import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique, ManyToOne,JoinColumn} from "typeorm";

import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";
import { proceso_perspectiva } from "./PerspectivaModel";
import { indicadores_indicador } from "../indicadores/IndicadorModel";


@Entity()
export class proceso_objetivo_perspectiva {
    @PrimaryGeneratedColumn()
    secuencial: number;


    @Column()
    @MinLength(4)
    @MaxLength(200)
    @IsNotEmpty()
    nombre_objetivo_perspectiva: string;

    @ManyToOne(() => proceso_perspectiva, perspectiva => perspectiva.objetive)
    @JoinColumn([{ name: "secuencial_perspectiva", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_perspectiva: proceso_perspectiva;
 
    @OneToMany(() => indicadores_indicador, indicador => indicador.secuencial_objetivo_perspectiva, { cascade: true })
    indicador: indicadores_indicador[];

   
}