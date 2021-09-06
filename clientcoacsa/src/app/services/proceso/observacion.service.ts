import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../APIS/api.global';
import {Observacion} from '../../modelos/observacion.interface'

@Injectable({
  providedIn: 'root'
})
export class ObservacionService {

  constructor(
    private _http: HttpClient
  ) { }
  getObservacionesByPOActividad(sec: number) {
    return this._http.get<Observacion[]>(`${API.poa}/observacion/secuencial/${sec}`);
  }
}
