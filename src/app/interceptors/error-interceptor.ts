import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 && err.error.path !== '/login' && err.error.path !== '/registrati') {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        window.location.replace('/login');
        // location.reload();
      }
      if (err.status === 403) {
        // se risposta è 403 Forbidden lancio un errore
        const error = 'Non sei autorizzato ad eseguire l\'azione richiesta';
        return throwError(error);
      }
      if (err.url.startsWith('https://localhost:8443/api/utenti/') && err.status === 500) {
        const error = 'Codice fiscale non trovato';
        return throwError(error);
      } else {
        console.log('Error: ' + err);
        console.log('Error: ' + err.error);
        const error = err.error.message || err.statusText;
        return throwError(error);
      }
    }));
  }
}
