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
  doPost(elemento: any, url: string) { // elemento in teoria dovrebbe valere User, ecc ecc, come faccio? In particolare per stringify
    return this.http.post<any>(url, JSON.stringify(elemento), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  doDelete(id: string, url: string): Observable<any> {
    // let httpParams = new HttpParams().set('aaa', '111');
    // httpParams.set('bbb', '222');
    //
    // let options = { params: httpParams };


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
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
