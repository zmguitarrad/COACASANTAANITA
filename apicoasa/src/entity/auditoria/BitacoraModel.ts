import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique, ManyToOne} from "typeorm";

import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";


@Entity()
export class auditoria_bitacora {
    @PrimaryGeneratedColumn()
    secuencial: number;

    @Column()
    @IsNotEmpty()
    fecha_evento: Date;

    @Column()
    @MinLength(3)
    @MaxLength(200)
    @IsNotEmpty()
    nombre_clase: string;

    @Column()
    @MinLength(3)
    @MaxLength(200)
    @IsNotEmpty()
    nombre_metodo: string;

    @Column()
    @MinLength(3)
    @MaxLength(500)
    @IsNotEmpty()
    descripcion_evento: string;

    @Column()
    @MinLength(3)
    @MaxLength(500)
    @IsNotEmpty()
    id_usuario: string;

    @Column()
    @MinLength(3)
    @MaxLength(500)
    @IsNotEmpty()
    direccion_ip: string;

 
 
   
    
    
}