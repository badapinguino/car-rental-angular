import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
// booleano per sapere se superuser l'utente loggato
  private currentUserSuperuserSubject: BehaviorSubject<any>;
  public currentUserSuperuser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentUserSuperuserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUserSuperuser'));
    this.currentUserSuperuser = this.currentUserSuperuserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  public get currentUserSuperuserValue() {
    return this.currentUserSuperuserSubject.value;
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

  login(codiceFiscale, password) {
    // return this.http.post<any>(`https://7bc40c7b-99da-48af-b5bb-acd4ef31eb79.mock.pstmn.io/login`, { username, password })
    // // http://localhost:4000/users/authenticate
    // // https://7bc40c7b-99da-48af-b5bb-acd4ef31eb79.mock.pstmn.io/login
    //   .pipe(map(user => {
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     this.currentUserSubject.next(user);
    //     return user;
    //   }));

    return this.http.get<any>(`http://localhost:3000/utenti?codiceFiscale=` + codiceFiscale + '&password=' + password)
      // .pipe(
      //   retry(1),
      //   catchError(this.handleError)
      // );
      .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user[0]));
      this.currentUserSubject.next(user[0]);
      localStorage.setItem('currentUserSuperuser', user[0].superuser);

      return user;
  }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

    localStorage.removeItem('currentUserSuperuser');
    this.currentUserSuperuserSubject.next(null);
  }
}
