import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../APIS/api.global';
import { PoaActividad } from '../../modelos/actividad.interface';

@Injectable({
  providedIn: 'root',
})
export class CalendarioService {
  constructor(private _http: HttpClient) {}

  getCalendarioActividades(secAnio: number, secActividad: number) {
    return this._http.get<PoaActividad[]>(
      `${API.poa}/poactividad/anio/${secAnio}/actividad/${secActividad}`
    );
  }

  updateEstado(estado: number, secActividad: number, secCalendario: number) {
    return this._http.put<any>(
      `${API.poa}/poactividad/estado/${estado}/actividad/${secActividad}/calendario/${secCalendario}`,
      {}
    );
  }

  postergar(
    poaFound: any,
    secuencialPoaMaestro: number,
    secuencialActividad: number,
    secuencialCalendario: number
  ) {
    const poaActividad = {
      presupuesto: poaFound.presupuesto,
      presupuesto_ulizado: poaFound.presupuesto_ulizado,
      secuencial_postergacion: poaFound.secuencial_calendario,
      secuencial_poa_maestro: {
        secuencial: secuencialPoaMaestro,
      },
      secuencial_actividad: {
        secuencial: secuencialActividad,
      },
      secuencial_estado: {
        secuencial: 1,
      },
      secuencial_calendario: {
        secuencial: secuencialCalendario,
      },
    };
    console.log(poaActividad);

    return this._http.post(`${API.poa}/poactividad/`, poaActividad);
  }

  getPoaActividadById(id: number) {
    //http://localhost:3000/poactividad/
    return this._http.get<any[]>(`${API.poa}/poactividad/${id}`);
  }

  getMonths(sec: number) {
    return this._http.get<any[]>(`${API.poa}/poactividad/months/${sec}`);
  }
}
