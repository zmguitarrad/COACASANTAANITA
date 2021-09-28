import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique, ManyToOne,JoinColumn} from "typeorm";
import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";
import { mando_integral_poa_actividad } from "../mando_integral/PoaActividadModel";


@Entity()
export class proceso_observacion {
    @PrimaryGeneratedColumn()
    secuencial: number;

    @Column()
    @MinLength(4)
    @MaxLength(1000)
    @IsNotEmpty()
    nombre_observacion: string;
    
    @Column("timestamp")
    fecha: Date;

    @Column({nullable:true})
    @MaxLength(500)
    entregables: string;

    @Column()
    @MaxLength(500)
    codigo_usuario: string;
    
    @ManyToOne(() => mando_integral_poa_actividad, poaactividad=> poaactividad.observacionpoa)
    @JoinColumn([{ name: "secuencial_poa_actividad", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_poa_actividad: mando_integral_poa_actividad;
}