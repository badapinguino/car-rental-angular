import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {config, Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const currentUser = this.authenticationService.currentUserValue;
    const currentJwtToken = this.authenticationService.currentJwtTokenValue;
    const isLoggedIn = currentUser && currentJwtToken;
    const isApiUrl = request.url.startsWith('http://localhost:8080/api/');
    // la prima richiesta non può essere loggato, quindi tolgo isLoggedIn
    if (/*isLoggedIn &&*/ isApiUrl) {
      console.log(currentJwtToken);
      request = request.clone({ // `${currentJwtToken}`
        setHeaders: {
          'X-Auth' : currentJwtToken
        },
        withCredentials: false
      });
      console.log(request);
    } else {
      request = request.clone({
        withCredentials: false
      });
    }

    return next.handle(request);
  }
}
