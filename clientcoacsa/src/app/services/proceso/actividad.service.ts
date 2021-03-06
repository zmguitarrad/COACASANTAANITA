import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../APIS/api.global';
import { Actividad, PoaActividad } from '../../modelos/actividad.interface';

@Injectable({
  providedIn: 'root',
})
export class ActividadService {
  constructor(private _http: HttpClient) {}

  getActividadesPoa(sec: number) {
    return this._http.get<Actividad[]>(
      `${API.poa}/actividad/usuario/poa/${sec}`
    );
  }

  getActividadesByPerspectiva(poaSec: number, perspectivaSec: number) {
    return this._http.get<Actividad[]>(
      `${API.poa}/actividad/usuario/poa/${poaSec}/perspectiva/${perspectivaSec}`
    );
  }

  getPresupuestos() {
    return this._http.get<{ secuencial_actividad: number; total: number }[]>(
      `${API.poa}/actividad/presupuestos/all`
    );
  }
}
