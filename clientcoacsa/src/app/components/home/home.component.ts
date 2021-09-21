import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import {PoaService} from "../../services/poa/poa.service";
import {MaestroI, PlanI} from "../../modelos/app.interfaces";
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAdmin = '';
  planes: PlanI[] = [];
  maestros: MaestroI[] = [];

  btnFlag = true;

  data = {
    idSecuencial: "",
    poaMaestro: ""
  }

  private destroy = new Subject<any>();
  constructor(
    private authService: AuthService,
    private poaService: PoaService,
    private router: Router
    ) {

  }

  ngOnInit(): void {
    this.authService.isAdmin.pipe(
      takeUntil(this.destroy)
    ).subscribe((res) => (this.isAdmin = res));
    console.log('Home')
    this.poaService.getPlanEstrategico().subscribe(planes=>{
      this.planes = planes;
    })
  }

  changePlan(plan: HTMLSelectElement){
    this.poaService.getPoaMaestro(Number(plan.value)).subscribe(maestros=>{
      this.maestros = maestros;
      this.data.idSecuencial = plan.value;
      this.checkButtonNext();
    })
  }

  changeMaestro(maestro: HTMLSelectElement){
    this.data.poaMaestro = maestro.value;
    this.checkButtonNext();
  }

  goToGoActividad(){
    return this.router.
    navigate(["/actividad"],{queryParams: {q: this.data.poaMaestro}});
  }

  checkButtonNext(){
    if (this.data.poaMaestro === "" ||
      this.data.poaMaestro ==="-1"  ||
      this.data.idSecuencial === "" ||
      this.data.idSecuencial === "-1"
    ){
      this.btnFlag = true;
    }else{
      this.btnFlag = false;
    }
  }

}
