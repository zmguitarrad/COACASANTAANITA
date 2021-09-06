import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique, ManyToOne, JoinColumn, IsNull} from "typeorm";

import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject, IsEmpty } from "class-validator";
import { mando_integral_poa_maestro } from "./PoaMaestroModel";
import { proceso_actividad } from "../proceso/ActividadModel";
import { generales_estado } from "../generales/EstadoModel";
import { generales_calendario } from "../generales/CalendarioModel";
import { proceso_observacion } from "../proceso/ObservacionModel";


@Entity()
export class mando_integral_poa_actividad {
    @PrimaryGeneratedColumn()
    secuencial: number;

    @Column("decimal", { precision: 6, scale: 2 })
    @IsNotEmpty()
    presupuesto:number;

    @Column("decimal", { precision: 6, scale: 2 })
    @IsNotEmpty()
    presupuesto_ulizado :number;

    @Column("decimal", { precision: 6, scale: 2 })
    @IsNotEmpty()
    avance:number;
     
    @Column({nullable:true} )
    secuencial_postergacion: number;

 
    @ManyToOne(() => mando_integral_poa_maestro, poamaestro => poamaestro.poactividad)
    @JoinColumn([{ name: "secuencial_poa_maestro", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_poa_maestro: mando_integral_poa_maestro;

    @ManyToOne(() => proceso_actividad, actividad => actividad.poactividad)
    @JoinColumn([{ name: "secuencial_actividad", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_actividad: proceso_actividad;
   
    @ManyToOne(() => generales_estado, estado => estado.actividad)
    @JoinColumn([{ name: "secuencial_estado", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_estado: generales_estado;
  
    @ManyToOne(() => generales_calendario, calendario => calendario.poactividad)
    @JoinColumn([{ name: "secuencial_calendario", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_calendario: generales_calendario;

    @OneToMany(() => proceso_observacion, observacionpoa => observacionpoa.secuencial_poa_actividad, { cascade: true })
    observacionpoa: proceso_observacion[];
   
}