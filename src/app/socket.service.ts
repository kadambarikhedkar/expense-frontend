import { Injectable } from '@angular/core';
import {io} from 'socket.io-client/build/index';

import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000';
  private socket;

  constructor(public http: HttpClient) {
    this.socket = io(this.url);
  }


  public getExpenseHistory(expenseId): Observable<any> {

    return this.http.get(`${this.url}/api/v1/expenses/history?expenseId=${expenseId}`)
      .do(data => console.log('Data Received'))
      .catch(this.handleError);
  }

  public exitSocket = () =>{
   this.socket.disconnect();
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } 

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError

}
