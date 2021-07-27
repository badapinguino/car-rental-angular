import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {Utente} from '../model/utente';
import * as bcrypt from 'bcryptjs';
import * as sha512 from 'js-sha512';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private currentJwtTokenSubject: BehaviorSubject<any>;
  public currentJwtToken: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentJwtTokenSubject = new BehaviorSubject<any>(localStorage.getItem('currentJwtToken'));
    this.currentJwtToken = this.currentJwtTokenSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

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
    return throwError(error);
  }

  impostaUtenteLocalStorage(codiceFiscale): Observable<Utente> {
    return this.http.get<any>(`https://localhost:8443/api/utenti/` + codiceFiscale )
      .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);

          return user;
        }
      ));
  }

  login(codiceFiscale, password): Observable<any> {
    // inserito calcolo dell'hash così la password non viene inviata in chiaro

    // const salt = bcrypt.genSaltSync(10);
    // const pass = bcrypt.hashSync(password, salt);
    const pwdhash = sha512.sha512(password);

    const body: any = {
      username: codiceFiscale,
      password: pwdhash
    };

    return this.http.post<any>(
      'https://localhost:8443/login',
      body
      // config
    ).pipe(
      map(token => {
        localStorage.setItem('currentJwtToken', token.jwt);
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

    localStorage.removeItem('currentJwtToken');
    this.currentJwtTokenSubject.next(null);
  }
}
