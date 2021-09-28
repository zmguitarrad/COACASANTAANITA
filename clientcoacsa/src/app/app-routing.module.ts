import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from "./shared/guards/auth.guard";
import { AuthLoginGuard } from "./shared/guards/auth-login.guard";
import { AuthAdminGuard } from "./shared/guards/auth-admin.guard";
import { ActividadComponent } from './components/actividad/actividad.component';
import {CalendarioComponent} from './components/calendario/calendario.component'

const routes: Routes = [

  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthLoginGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthLoginGuard] },
  { path: 'actividad', component: ActividadComponent },
  { path: 'calendario', component: CalendarioComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
