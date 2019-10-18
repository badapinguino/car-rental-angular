import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {Utente} from '../model/utente';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
// booleano per sapere se superuser l'utente loggato
//   private currentUserSuperuserSubject: BehaviorSubject<any>;
//   public currentUserSuperuser: Observable<any>;

  private currentJwtTokenSubject: BehaviorSubject<any>;
  public currentJwtToken: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    // this.currentUserSuperuserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUserSuperuser'));
    // this.currentUserSuperuser = this.currentUserSuperuserSubject.asObservable();

    this.currentJwtTokenSubject = new BehaviorSubject<any>(localStorage.getItem('currentJwtToken'));
    this.currentJwtToken = this.currentJwtTokenSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // public get currentUserSuperuserValue() {
  //   return this.currentUserSuperuserSubject.value;
  // }

  public get currentJwtTokenValue() {
    return this.currentJwtTokenSubject.value;
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  impostaUtenteLocalStorage(codiceFiscale): Observable<Utente> {
    return this.http.get<any>(`http://localhost:8080/api/utenti/` + codiceFiscale ) // + '&password=' + password
    // .pipe(
    //   retry(1),
    //   catchError(this.handleError)
    // );
      .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          // localStorage.setItem('currentUserSuperuser', user.superuser);
          // this.currentUserSuperuserSubject.next(user);

          return user;
        }
      ));
  }

  login(codiceFiscale, password): Observable<any> {

    // const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    const body: any = {
      username: codiceFiscale,
      password
    };

    // body = JSON.parse(body + '');

    return this.http.post<any>(
      'http://localhost:8080/login',
      body
      // config
    ).pipe(
      map(token => {
        localStorage.setItem('currentJwtToken', JSON.stringify(token.jwt));
        this.currentJwtTokenSubject.next(token.jwt);
        return token;
        }
      ),
      catchError(this.handleError)
    );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

    // localStorage.removeItem('currentUserSuperuser');
    // this.currentUserSuperuserSubject.next(null);

    localStorage.removeItem('currentJwtToken');
    this.currentJwtTokenSubject.next(null);
  }
}
