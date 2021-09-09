import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../APIS/api.global';
import { Observacion } from '../../modelos/observacion.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ObservacionService {
  constructor(private _http: HttpClient) {}
  getObservacionesByPOActividad(sec: number) {
    return this._http.get<Observacion[]>(`${API.poa}/observacion/${sec}`).pipe(
      map((obs) => {
        return obs.map((ob) => {
          const date = new Date(ob.fecha.toString());
          ob.fecha = date.toLocaleDateString();
          return ob;
        });
      })
    );
  }

  createObservacion(obs: string, secPoaAct: number){
    const newObs = {
      "nombre_observacion": obs,
      "fecha": "CURRENT_TIME",
      "entregables": "http://www.africau.edu/images/default/sample.pdf",
      "secuencial_poa_actividad": {
        "secuencial": secPoaAct
      }
    }
    return this._http.post<any>(`${API.poa}/observacion/`, newObs);
  }
}
