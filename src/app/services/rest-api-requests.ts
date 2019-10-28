import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RestApiRequests {

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // select
  doGetAll(url: string): Observable<any> {
    return this.http.get(url, {responseType: 'text'})
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  doGet(url: string, id: string): Observable<any> {
    return this.http.get(url +  id, {responseType: 'text'})
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  // create
  doPost(elemento: any, url: string) {
    return this.http.post<any>(url, JSON.stringify(elemento), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  doDelete(id: string, url: string): Observable<any> {
    return this.http.delete<any>(url + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  doUpdate(id: string, elemento: any, url: string) {
    return this.http.put<any>(url + '/' + id, JSON.stringify(elemento), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Error handling
  handleError(error) {
    window.alert(error);
    return throwError(error);
  }
}
