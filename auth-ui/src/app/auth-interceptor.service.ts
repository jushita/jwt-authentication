import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Interception In Progress");
    const token: string = localStorage.getItem('token');
    if (token) {
      req = req.clone({ headers: req.headers.set('x-api-token', token) });
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
      req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    }


    return next.handle(req)
        .pipe(
           catchError((error: HttpErrorResponse) => {
             console.log(error);
                //401 UNAUTHORIZED
                if (error && error.status === 401) {
                    console.log("ERROR 401 UNAUTHORIZED")
                }
                return throwError(error);                    
           })
        );
  }  
}
