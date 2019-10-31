import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Prenotazione} from '../model/prenotazione';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {

  @Output() risultatoRichiesta: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  selezionaTuttePrenotazioniUtente(codiceFiscale: string): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>('http://localhost:8080/api/prenotazioni?codiceFiscale=' + codiceFiscale)
      .pipe(
        catchError(this.handleError)
      );
  }

  selezionaPrenotazione(id: number): Observable<Prenotazione> {
    return this.http.get<Prenotazione>('http://localhost:8080/api/prenotazioni/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  handleError(error) {
    return throwError(error);
  }

  salvaPrenotazione(prenotazione: Prenotazione): Observable<Prenotazione> {
    return this.http.post<Prenotazione>('http://localhost:8080/api/prenotazioni', JSON.stringify(prenotazione), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
}
