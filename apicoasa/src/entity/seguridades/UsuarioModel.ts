import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  Unique,
  PrimaryGeneratedColumn,
  OneToMany,
  Generated,
} from "typeorm";
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNotEmptyObject,
  IsEmail,
} from "class-validator";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { seguridades_usuario_role } from "./UsuarioRoleModel";
import { mando_integral_usuario_plan_estrategico } from "../mando_integral/EstrategicoUsuarioModel";

@Entity()
@Unique(["secuencial"])
export class seguridades_usuario {
  @Column()
  @Generated("increment")
  id: number;
  @PrimaryColumn()
  @MaxLength(50)
  secuencial: string;

  // @ManyToOne(() => Role, role => role.users)
  // @IsNotEmptyObject()
  //secuencial_rol: Role;

  @Column()
  @MaxLength(10)
  @IsNotEmpty()
  cedula: string;

  @Column()
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  nombres: string;

  @Column()
  @MinLength(5)
  @MaxLength(100)
  @IsNotEmpty()
  apellidos: string;

  @Column()
  @MinLength(5)
  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @Column()
  @MinLength(10)
  @MaxLength(100)
  @IsNotEmpty()
  clave: string;

  @Column()
  @IsNotEmpty()
  activo: boolean;

  @OneToMany(
    () => seguridades_usuario_role,
    (userole) => userole.secuencial_usuario,
    { cascade: true }
  )
  userole: seguridades_usuario_role[];

  @OneToMany(
    () => mando_integral_usuario_plan_estrategico,
    (usuarioestra) => usuarioestra.secuencial_usuario,
    { cascade: true }
  )
  usuario: mando_integral_usuario_plan_estrategico[];

  hashPassword(): void {
    const salt = genSaltSync(10);
    this.clave = hashSync(this.clave, salt);
  }

  checkPassword(clave: string): boolean {
    return compareSync(clave.toString(), this.clave.toString());
  }

  checkPasswordSimple(clave: string) {
    return this.clave.toString().trim() === clave.toString().trim();
  }
}
