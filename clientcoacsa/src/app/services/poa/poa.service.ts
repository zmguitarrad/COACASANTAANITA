import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {API} from "../APIS/api.global";
import {MaestroI, PlanI} from "../../modelos/app.interfaces";

@Injectable({
  providedIn: 'root'
})
export class PoaService {

  constructor(
    private _http: HttpClient
  ) { }

  getPlanEstrategico() {
    return this._http.get<PlanI[]>(API.poa + "/planestrategico/plan/usuario");
  }

  getPoaMaestro(secuencial: number){
    return this._http.get<MaestroI[]>(`${API.poa}/planestrategico/poa/${secuencial}`)
  }

  getPerspectivas(secPoa: number){
    return this._http.get<any[]>(`${API.poa}/perspectiva/usuario/poa/${secPoa}`);
  }
}
