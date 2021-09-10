import { Entity, PrimaryGeneratedColumn, OneToMany, Column, Unique, ManyToOne, JoinColumn} from "typeorm";

import { IsNotEmpty, MinLength, MaxLength, IsNotEmptyObject } from "class-validator";
import { proceso_perspectiva } from "./PerspectivaModel";
import { proceso_objetivo_perspectiva } from "./ObjetivoPerspectivaModel";
import { indicadores_indicador } from "../indicadores/IndicadorModel";
import { proceso_observacion } from "./ObservacionModel";
import { seguridades_role } from "../seguridades/RoleModel";
import { mando_integral_poa_actividad } from "../mando_integral/PoaActividadModel";
import { mando_integral_poa_maestro } from "../mando_integral/PoaMaestroModel";
import { mando_integral_poa_actividad_presupuesto } from "../mando_integral/PoaActPresupuestoModel";


@Entity()
@Unique(['nombre_actividad'])
export class proceso_actividad {
    @PrimaryGeneratedColumn()
    secuencial: number;

    @Column()
    @MinLength(5)
    @MaxLength(1000)
    @IsNotEmpty()
    nombre_actividad: string;

    @Column()
    @MinLength(3)
    @MaxLength(500)
    @IsNotEmpty()
    personal_apoyo: string;

    @Column()
    @MinLength(3)
    @MaxLength(500)
    @IsNotEmpty()
    entregables: string;

 

    @ManyToOne(() => indicadores_indicador, indicador => indicador.actividad)
    @JoinColumn([{ name: "secuencial_indicador", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_indicador: indicadores_indicador;

   

    
    @ManyToOne(() => seguridades_role, role => role.actividad)
    @JoinColumn([{ name: "secuencial_role", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_role: seguridades_role;

    @ManyToOne(() => mando_integral_poa_maestro, poamaestro => poamaestro.actividadpoa)
    @JoinColumn([{ name: "secuencial_poa_maestro", referencedColumnName: "secuencial" }])
    @IsNotEmptyObject()
    secuencial_poa_maestro: mando_integral_poa_maestro;
    
    @OneToMany(() => mando_integral_poa_actividad, poactividad => poactividad.secuencial_actividad, { cascade: true })
    poactividad: mando_integral_poa_actividad[];
    
    @OneToMany(() => mando_integral_poa_actividad_presupuesto, actividadpresupuesto => actividadpresupuesto.secuencial_actividad, { cascade: true })
    actividadpresupuesto: mando_integral_poa_actividad_presupuesto[];

    


    
}