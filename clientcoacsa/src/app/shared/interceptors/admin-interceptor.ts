import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";


@Injectable()
export class AdminInterceptor implements HttpInterceptor {


    constructor(private authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        const authToken = this.authService.userTokenValue;
        
        const authReq = req.clone({
            setHeaders: {
                auth: authToken
            }
        });

        return next.handle(authReq);
    }


}