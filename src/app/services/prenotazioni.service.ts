import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Veicolo} from '../model/veicolo';
import {catchError, retry} from 'rxjs/operators';
import {Utente} from '../model/utente';
import {Prenotazione} from '../model/prenotazione';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {

  @Output() risultatoRichiesta: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient /*private restApiRequest: RestApiRequests*/) { }

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

  salvaPrenotazione(prenotazione: Prenotazione): Observable<Prenotazione> {
    console.log(prenotazione);
    return this.http.post<Prenotazione>('http://localhost:8080/api/prenotazione', JSON.stringify(prenotazione), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
}
