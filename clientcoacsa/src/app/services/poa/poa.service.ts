import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../APIS/api.global';
import { MaestroI, PlanI } from '../../modelos/app.interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PoaService {
  constructor(private _http: HttpClient) {}

  getPlanEstrategico() {
    return this._http.get<PlanI[]>(API.poa + '/planestrategico/plan/usuario');
  }

  getPoaMaestro(secuencial: number) {
    return this._http.get<MaestroI[]>(
      `${API.poa}/planestrategico/poa/${secuencial}`
    );
  }

  getPerspectivas(secPoa: number) {
    return this._http.get<any[]>(
      `${API.poa}/perspectiva/usuario/poa/${secPoa}`
    );
  }

  updatePresupuesto(pres: number, secuencial: number) {
    return this._http.put<any[]>(
      `${API.poa}/poactividad/presupuestoutilizado/${pres}/secuencial/${secuencial}`,
      {}
    );
  }

  getPresupuestoByPoa(secActividad: number, secCal: number) {
    console.log(secActividad, secCal);

    return this._http
      .get<any>(
        `${API.poa}/poactividad/secActividad/${secActividad}/secCalendario/${secCal}`
      )
      .pipe(
        map((response) => {
          if (response.length > 0) {
            return Number(response[0].presupuesto_utilizado.toString());
          }
          return 0;
        })
      );
  }
}
