import { Component, OnDestroy, OnInit } from '@angular/core';
import { PoaActividad, Actividad } from 'src/app/modelos/actividad.interface';
import { CalendarioService } from '../../services/calendario/calendario.service';
import { getMonthsOfYear } from '../../services/util/util.app';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observacion } from 'src/app/modelos/observacion.interface';
import { ObservacionService } from 'src/app/services/proceso/observacion.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent implements OnInit {
  observacion: Observacion[] = [];
  secpoac: number = -1;
  ObservacionSelected: Observacion = {
    secuencial: -1,
    nombre_observacion: '',
    secuencial_poa_actividad: -1,
    nombre_actividad: '',
    secuencial_calendario: -1,
    mes: '',
    fecha: '',
    entregables: '',
  };
  public poaActividad: PoaActividad[] = [];

  public obserCal: Observacion[] = [];
  secPoaActividad: number = -1;
  poaActividadSelected: PoaActividad = {
    mes: '',
    nombre_actividad: '',
    anio: -1,
    nombre_estado: '',
    nombre_observacion: '',
    nombre_objetivo_perspectiva: '',
    secuencial: -1,
    secuencial_calendario: 1,
    secuencial_poa_actividad: -1,
  };

  //datos originales desde la base datos
  actvsCal: PoaActividad[] = [];
  //idActividad
  secActividad: number = -1;
  //lista de todas las 12 actividades
  actividades: any = [];

  months: any[] = [];

  secAnio: number = -1;

  flag = false;
  postergar: number;
  secPoaAct: number;

  //Router Angular
  private activatedRoute: ActivatedRoute;

  constructor(
    private calService: CalendarioService,
    activatedRoute: ActivatedRoute,
    private obService: ObservacionService
  ) {
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    //Obtener los parametros de página anterior
    this.activatedRoute.queryParams
      .pipe(
        //Operador map para transformar de strings a numbers
        map<any, { secAnio: number; secActividad: number }>((query) => {
          return {
            secAnio: Number(query['qAnio']),
            secActividad: Number(query['qActividad']),
          };
        })
      )
      .subscribe((query) => {
        this.calService.getMonths(query.secAnio).subscribe((months) => {
          this.months = months;
          this.secAnio = query.secAnio;
          this.getActividadesFromDB(query.secActividad);
        });

       
      });
  }

  getActividadesFromDB(secActividad: number) {
    //Obtengos mis parametros del query
    this.secActividad = secActividad;
    this.calService
      .getCalendarioActividades(this.secAnio, secActividad)
      .subscribe((actvsCal) => {
        //Actividades originales (solo las que estan en la base de datos)
        this.actvsCal = actvsCal;
        console.log(this.actvsCal);
        //Todas las actividades durante el año
        this.actividades = this.getActividades();
      });
  }

  checkActividad(month: string) {
    const monthUpperCase = month.toUpperCase();
    const poaFoundL = this.actvsCal.find(
      (poa) => poa.mes.toUpperCase() === monthUpperCase
    );
    // @ts-ignore
    return poaFoundL;
  }

  getActividades() {
    //const months = getMonthsOfYear();
    return this.months.map((month) => {
      //Obtengo mi actividad si existe, si no existe undefined
      const response = this.checkActividad(month.mes);
      if (response) {
        return {
          estado: response.nombre_estado,
          secEstado: response.secuencial,
          secuencialCalendario: response.secuencial_calendario,
          mes: month.mes,
          secuencialMes: month.secuencial,
          secPoaActividad: response.secuencial_poa_actividad,
        };
      } else {
        return {
          estado: null,
          secEstado: -1,
          secuencialCalendario: -1,
          mes: month.mes,
          secuencialMes: month.secuencial,
          secPoaActividad: -1,
        };
      }
    });
  }

  onChangeActividad(actividad: any, estado: HTMLSelectElement) {
    if (estado.value === '4') {
      actividad.secEstado = 4;
      return;
    }

    this.calService
      .updateEstado(
        Number(estado.value),
        this.secActividad,
        actividad.secuencialCalendario
      )
      .subscribe((r) => {
        console.log('Actualizado');
      });
  }

  viewObservaciones(observacion: Observacion) {
    this.observacion = [];
    this.ObservacionSelected = observacion;
    this.secpoac = observacion.secuencial_poa_actividad;
    this.obService
      .getObservacionesByPOActividad(this.secpoac)
      .subscribe((obserPoa) => {
        this.observacion = obserPoa;
      });
  }

  viewObservacion(poaActividad: PoaActividad) {
    this.obserCal = [];
    this.poaActividadSelected = poaActividad;
    this.secPoaActividad = poaActividad.secuencial;
    this.obService
      .getObservacionesByPOActividad(this.secPoaActividad)
      .subscribe((obserCal) => {
        this.obserCal = obserCal;
      });
  }

  onChangePostergar(postergar: HTMLSelectElement, secPoaAct: number) {}

  onClickPostergar() {
    this.calService.getPoaActividadById(this.secPoaAct).subscribe((r) => {
      this.calService
        .postergar(r[0], this.secAnio, this.secActividad, this.postergar)
        .subscribe((r) => {
          this.getActividadesFromDB(this.secActividad);
        });
    });
  }

  setData(postergar: HTMLSelectElement, secPoaAct: number) {
    this.postergar = Number(postergar.value);
    this.secPoaAct = secPoaAct;
  }

  getMonths() {
    return getMonthsOfYear();
  }
}
