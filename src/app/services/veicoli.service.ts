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
    return this.http.get<Veicolo[]>('http://localhost:8080/api/veicoli')
      .pipe(
        catchError(this.handleError)
      );
  }

  selezionaVeicolo(codiceMezzo: string): Observable<Veicolo> {
    return this.http.get<Utente>('http://localhost:8080/api/veicoli/' + codiceMezzo)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  handleError(error) {
    return throwError(error);
  }

  salvaVeicolo(veicolo: Veicolo): Observable<Veicolo> {
    console.log(veicolo);
    return this.http.post<Utente>('http://localhost:8080/api/veicoli', JSON.stringify(veicolo), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
}
