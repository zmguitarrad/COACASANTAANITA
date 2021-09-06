import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdmin = '';
  isLogged = false;
  user = {
    nombres: '',
    apellidos: '',
 
  }

  private subscription: Subscription = new Subscription();

  private destroy = new Subject<any>();


  constructor(private authService: AuthService) { }



  ngOnInit(): void {
    this.subscription.add(
      this.authService.isLogged.subscribe(res => (this.isLogged = res))
    );
    this.authService.isAdmin.pipe(
      takeUntil(this.destroy)
    ).subscribe((res) => (this.isAdmin = res));
    const userR = JSON.parse(localStorage.getItem('user') || '{}');
    this.user.nombres = userR.nombres;
    this.user.apellidos= userR.apellidos;
 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;

    this.destroy.next({});

    this.destroy.complete();
  }

  onLogout(): void {
    this.authService.logout();
  }

}
