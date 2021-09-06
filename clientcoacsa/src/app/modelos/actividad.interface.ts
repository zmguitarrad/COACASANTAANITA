export interface Actividad{
    nombre_perspectiva:string;
    nombre_objetivo_perspectiva:string;
    nombre_actividad:string;
    personal_apoyo:string;
    entregables:string;
    nombre_rol: string
    secuencial: number;
    nombre_poa_maestro:string;
    avance:number;
  }


  export interface PoaActividad{
    "mes": string,
    "nombre_actividad": string,
    "nombre_observacion":string,
    "anio": number,
    "nombre_estado": string,
    "secuencial": number,
    "secuencial_calendario": number,
    "secuencial_poa_actividad": number;
    nombre_objetivo_perspectiva:string;
  }
