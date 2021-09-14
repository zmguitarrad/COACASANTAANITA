import { Component, OnDestroy, OnInit } from '@angular/core';
import { PoaActividad, Actividad } from 'src/app/modelos/actividad.interface';
import { CalendarioService } from '../../services/calendario/calendario.service';
import {
  checkMonth,
  getMonthsOfYear,
  checkMonthNext,
} from '../../services/util/util.app';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observacion } from 'src/app/modelos/observacion.interface';
import { ObservacionService } from 'src/app/services/proceso/observacion.service';
import { PoaService } from '../../services/poa/poa.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent implements OnInit {
  actividadCurrent: any;

  public poaActividad: PoaActividad[] = [];

  public obserCal: Observacion[] = [];
  public activeField = false;

  currentMonth = new Date();

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
    secPoaActividad: -1,
    presupuesto_utilizado: 0,
  };

  //datos originales desde la base datos
  actvsCal: PoaActividad[] = [];
  //idActividad
  secActividad: number = -1;
  //lista de todas las 12 actividades
  actividades: any = [];

  months: any[] = [];
  monthsAux: any[] = [];

  secAnio: number = -1;

  flagButtons = false;
  postergar: number;
  secPoaAct: number;

  //Router Angular
  private activatedRoute: ActivatedRoute;

  constructor(
    private calService: CalendarioService,
    activatedRoute: ActivatedRoute,
    private obService: ObservacionService,
    private poaService: PoaService
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
          this.secActividad = query.secActividad;
          this.getActividadesFromDB(query.secActividad);
        });
      });

    this.monthsAux = getMonthsOfYear();
  }

  getActividadesFromDB(secActividad: number) {
    //Obtengos mis parametros del query

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

  createObsertvation(form: HTMLFormElement) {
    const obs = form.elements.item(0)['value'].toString().trim();
    this.obService
      .createObservacion(obs, this.secPoaActividad)
      .subscribe((response) => {
        console.log(response);
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
          presupuesto_utilizado: response.presupuesto_utilizado,
          flagPostergar: response.secuencial === 4 ? true : false,
        };
      } else {
        return {
          estado: null,
          secEstado: -1,
          secuencialCalendario: -1,
          mes: month.mes,
          secuencialMes: month.secuencial,
          secPoaActividad: -1,
          presupuesto_utilizado: null,
          flagPostergar: false,
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

  viewObservacion(
    poaActividad: PoaActividad,
    postergar: HTMLSelectElement = null
  ) {
    // this.obserCal = [];
    this.poaActividadSelected = poaActividad;

    this.secPoaActividad = poaActividad.secPoaActividad;
    if (postergar) {
      this.setData(postergar, poaActividad);
      this.flagButtons = true;
    } else {
      this.flagButtons = false;
    }
    this.poaService
      .getPresupuestoByPoa(
        this.secActividad,
        this.poaActividadSelected['secuencialCalendario']
      )
      .subscribe((pre) => {
        console.log(pre);
      });
    this.obService
      .getObservacionesByPOActividad(poaActividad.secPoaActividad)
      .subscribe((obserCal) => {
        this.obserCal = obserCal;
      });
  }

  setActSelected(actividad) {
    this.poaActividadSelected = actividad;
    this.postergar = this.poaActividadSelected['secuencialMes'];
  }

  saveActividad() {
    this.calService
      .insertar(this.secAnio, this.secActividad, this.postergar)
      .subscribe((r) => {
        this.getActividadesFromDB(this.secActividad);
      });
  }

  onClickPostergar() {
    this.calService.getPoaActividadById(this.secPoaAct).subscribe((r) => {
      this.calService
        .postergar(r[0], this.secAnio, this.secActividad, this.postergar)
        .subscribe((r) => {
          this.getActividadesFromDB(this.secActividad);
          this.actividadCurrent.flagDisabled = true;
        });
    });
  }

  setData(postergar: HTMLSelectElement, actividad: any) {
    this.postergar = Number(postergar.value);
    console.log(postergar.value);
    this.secPoaAct = actividad.secPoaActividad;
    this.actividadCurrent = actividad;
  }

  getActividadToMonth(month: string) {
    return this.months.find((m) => m.mes.toUpperCase() === month.toUpperCase());
  }

  getMonths(month: string) {
    const { id } = this.monthsAux.find(
      (m: any) => m.month.toUpperCase() === month.toUpperCase()
    );
    const nextMonth = id + 1;
    const monthsValid = this.monthsAux.filter((m) => {
      if (m.id >= nextMonth) {
        m.month = m.month.toUpperCase();
        const found = this.getActividadToMonth(m.month);
        m.mes = found.mes;
        m.secuencial = found.secuencial;
        m.secuencial_anio = found.secuencial_anio;
        return { ...m };
      }
    });
    return monthsValid;
  }

  updatePre(newpre: string) {
    this.poaService
      .updatePresupuesto(Number(newpre), this.secPoaActividad)
      .subscribe((r) => {
        console.log(r);
      });
  }

  getValuePre() {
    if (this.obserCal.length > 0) return this.obserCal[0].presupuesto_utilizado;
    return '0';
  }

  checkMonths(month: string) {
    return checkMonth(month, this.currentMonth.getMonth());
  }

  checkMonthsNext(month: string) {
    return checkMonthNext(month, this.currentMonth.getMonth());
  }
}
