import {EventEmitter, Injectable, Output} from '@angular/core';
import {Utente} from '../model/utente';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Veicolo} from '../model/veicolo';

@Injectable({
  providedIn: 'root'
})
export class VeicoliService {
  @Output() risultatoRichiesta: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  selezionaTuttiVeicoli(): Observable<Veicolo[]> {
    return this.http.get<Veicolo[]>('https://localhost:8443/api/veicoli')
      .pipe(
        catchError(this.handleError)
      );
  }

  selezionaVeicolo(codiceMezzo: string): Observable<Veicolo> {
    return this.http.get<Utente>('https://localhost:8443/api/veicoli/' + codiceMezzo)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  handleError(error) {
    return throwError(error);
  }

  salvaVeicolo(veicolo: Veicolo): Observable<Veicolo> {
    return this.http.post<Utente>('https://localhost:8443/api/veicoli', JSON.stringify(veicolo), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
}
