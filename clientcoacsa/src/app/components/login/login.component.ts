import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthService} from "./../../services/auth/auth.service";

import {FormBuilder, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    private subscription: Subscription = new Subscription;
    loginForm = this.fb.group(
        {
            secuencial: ['', Validators.required],
            clave: ['', Validators.required]
        });
    alertFlag = false;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        //this.subscriptions.forEach(sub =>sub.unsubscribe())
        this.subscription.unsubscribe();
    }

    onLogin(): void {
        if (this.loginForm.valid) {
            const formValue = this.loginForm.value;
            this.subscription.add(
                this.authService.login(formValue).subscribe(res => {
                    if (res) {
                        this.router.navigate([''])
                    }
                }, error => {
                    this.alertFlag = true;
                    this.showValidated();
                })
            )
        } else {
            this.showValidated();
        }


    }

    showValidated() {
        Object.keys(this.loginForm.controls).forEach(field => {
            const control = this.loginForm.get(field);
            control.markAsTouched({onlySelf: true});
        });
    }

    resetAlertFlag(){
        this.alertFlag = false;
    }

}
