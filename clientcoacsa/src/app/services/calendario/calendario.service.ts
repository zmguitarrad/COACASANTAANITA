import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API} from "../APIS/api.global";
import {PoaActividad} from "../../modelos/actividad.interface";

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(
    private _http: HttpClient
  ) { }

  getCalendarioActividades(secAnio: number, secActividad: number){
    return this._http.get<PoaActividad[]>(`${API.poa}/poactividad/anio/${secAnio}/actividad/${secActividad}`)
  }

  updateEstado(estado: number, secActividad: number, secCalendario: number){
    return this._http.put<any>(`${API.poa}/poactividad/estado/${estado}/actividad/${secActividad}/calendario/${secCalendario}`,{});
  }

  postergar(){
    return this._http.post(`${API.poa}/poactividad`,{});
  }

  getMonths(sec: number){
    return this._http.get<any[]>(`${API.poa}/poactividad/months/${sec}`);
  }
}
