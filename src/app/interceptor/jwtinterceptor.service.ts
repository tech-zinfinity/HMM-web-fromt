import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JWTInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector,
    private auth: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        if(this.auth.getJWT()){
          const modifiedReq = request.clone({ 
            headers: request.headers.set('Authorization', 'Bearer '+this.auth.getJWT()),
          });
          return next.handle(modifiedReq);
        }        
        return next.handle(request);
    }
}
