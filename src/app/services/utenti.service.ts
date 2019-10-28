import {EventEmitter, Injectable, Output} from '@angular/core';
import {RestApiRequests} from './rest-api-requests';
import {Utente} from '../model/utente';
import {catchError, first, retry} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {CreaModificaUtenteComponent} from '../views/crea-modifica-utente/crea-modifica-utente.component';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  @Output() risultatoRichiesta: EventEmitter<any> = new EventEmitter();
  a: Promise<Utente[]>;

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  selezionaTuttiUtenti(): Observable<any[]> {
    return this.http.get<Utente[]>('http://localhost:8080/api/utenti')
      .pipe(
        catchError(this.handleError)
      );
  }

  selezionaUtente(codiceFiscale: string): Observable<Utente> {
    return this.http.get<Utente>('http://localhost:8080/api/utenti/' + codiceFiscale)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  handleError(error) {
    return throwError(error);
  }

  salvaUtente(utente: Utente): Observable<Utente> {
    console.log(utente);
    return this.http.post<Utente>('http://localhost:8080/api/utenti', JSON.stringify(utente), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // TODO: da rimuovere perché assieme a salva
  aggiornaUtente(utente: Utente): Observable<Utente> {
    return this.http.put<Utente>('http://localhost:8080/api/utenti/' + utente.id, JSON.stringify(utente), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
}
