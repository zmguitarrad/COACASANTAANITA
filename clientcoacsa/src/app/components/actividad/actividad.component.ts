import { Component, OnInit } from '@angular/core';
import { Actividad, PoaActividad } from 'src/app/modelos/actividad.interface';
import { ActividadService } from 'src/app/services/proceso/actividad.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CalendarioService } from '../../services/calendario/calendario.service';
import { getMonthsOfYear } from '../../services/util/util.app';
import { Router } from '@angular/router';
import { PoaService } from 'src/app/services/poa/poa.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css'],
})
export class ActividadComponent implements OnInit {
  public actividades: Actividad[] = [];
  actvsCal: PoaActividad[] = [];
  secAnio: number = -1;
  secActividad: number = -1;
  perspectivas: any[] = [];
  actividadSelected: Actividad = {
    secuencial: -1,
    nombre_perspectiva: '',
    entregables: '',
    nombre_actividad: '',
    nombre_objetivo_perspectiva: '',
    personal_apoyo: '',
    nombre_rol: '',
    nombre_poa_maestro: '',
    avance: -1,
  };
  poaFound: PoaActividad = {
    mes: '',
    nombre_estado: '',
    nombre_actividad: '',
    nombre_observacion: '',
    nombre_objetivo_perspectiva: '',
    anio: 0,
    secuencial: 0,
    secuencial_calendario: 0,
    secuencial_poa_actividad: 0,
  };

  constructor(
    private actividadService: ActividadService,
    private activatedRouter: ActivatedRoute,
    private calService: CalendarioService,
    private poaService: PoaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRouter.queryParams
      .pipe(map((query) => Number(query['q'])))
      .subscribe((secuencial) => {
        this.actividadService
          .getActividadesPoa(secuencial)
          .subscribe((actvs) => {
            this.actividades = actvs;
            this.secAnio = secuencial;
          });
        this.poaService.getPerspectivas(secuencial).subscribe((ps) => {
          this.perspectivas = ps;
        });
      });
  }

  changePerspective(pSec: number) {
    console.log(pSec);
    this.actividadService
      .getActividadesByPerspectiva(this.secAnio, pSec)
      .subscribe((actvs) => {
        this.actividades = actvs;
      });
  }

  viewCalendario(actividad: Actividad) {
    this.actvsCal = [];
    this.actividadSelected = actividad;
    this.secActividad = actividad.secuencial;
    this.calService
      .getCalendarioActividades(this.secAnio, this.secActividad)
      .subscribe((actvsCal) => {
        this.actvsCal = actvsCal;
      });
  }

  goToCalendar(actividad: Actividad) {
    this.secActividad = actividad.secuencial;
    this.router.navigate(['/calendario'], {
      queryParams: {
        qAnio: this.secAnio,
        qActividad: this.secActividad,
      },
    });
  }

  checkActividad(month: string) {
    const monthUpperCase = month.toUpperCase();
    const poaFoundL = this.actvsCal.find(
      (poa) => poa.mes.toUpperCase() === monthUpperCase
    );
    // @ts-ignore
    this.poaFound = poaFoundL;
    return poaFoundL;
  }

  getMonths() {
    return getMonthsOfYear();
  }

  goToGoCalender() {
    return this.router.navigate(['/calendario'], {
      queryParams: { q: this.secAnio, p: this.secActividad },
    });
  }
}
