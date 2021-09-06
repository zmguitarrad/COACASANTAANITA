//export type seguridades_usuario_role = 'Jefe de Negocios' | 'Tecnología' | 'Operaciones' | 'Gerencia';

export interface LoginI {
    secuencial: string;
    clave: string;
}

export interface ResponseI {
    message: string;
    token: string;
    secuencial: string;
    nombres: string,
    apellidos: string,
    //secuencialRoleSecuencial: seguridades_usuario_role
}

export interface USUARIO {
    secuencial: string,
    cedula:string,
    apellidos: string,
    nombres: string,
    correo: string;
    clave?: string,
    activo: boolean,

}

