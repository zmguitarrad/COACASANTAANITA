import { Component } from '@angular/core';
import { ActividadService } from './services/proceso/actividad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coacsantaanita';
  public actividades:Array<any>=[]

   constructor(
    private actividadService:  ActividadService
  ){

  }
}
