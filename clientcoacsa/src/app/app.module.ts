import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";


import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/plantillas/header/header.component';
import { FooterComponent } from './components/plantillas/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AdminInterceptor } from './shared/interceptors/admin-interceptor';
import { PlanestrategicoComponent } from '../app/components/planestrategico/planestrategico.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { CalendarioComponent } from './components/calendario/calendario.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PlanestrategicoComponent,
    ActividadComponent,
    CalendarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
 
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }