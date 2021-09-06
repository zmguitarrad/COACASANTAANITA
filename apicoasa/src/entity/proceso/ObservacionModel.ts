import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique, ManyToOne,JoinColumn} from "typeorm";
import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";
import { mando_integral_poa_actividad } from "../mando_integral/PoaActividadModel";


@Entity()
@Unique(['nombre_observacion'])
export class proceso_observacion {
    @PrimaryGeneratedColumn()
    secuencial: number;


    @Column()
    @MinLength(4)
    @MaxLength(200)
    @IsNotEmpty()
    nombre_observacion: string;
    @Column("timestamp")
    fecha: Date;

    @Column({nullable:true})
    @MinLength(4)
    @MaxLength(500)
    entregables: string;
    
    @ManyToOne(() => mando_integral_poa_actividad, poaactividad=> poaactividad.observacionpoa)
    @JoinColumn([{ name: "secuencial_poa_actividad", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_poa_actividad: mando_integral_poa_actividad;
}