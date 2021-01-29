import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private url =  'http://13.127.244.156:3000';

  constructor(public http: HttpClient
    ) { }

    public getUserInfoFromLocalstorage = () => {

      return JSON.parse(localStorage.getItem('userInfo'));
  
    } 
    public sendForgetPasswordLink=(data)=>
    {
      return this.http.post(`${this.url}/api/v1/users/sendLink`, data);

    }
    public checkEmail=(email)=>
    {
      return this.http.get(`${this.url}/api/v1/users/checkEmail?email=${email}`);

    }
    public updatePassword=(data)=>
    {
      return this.http.put(`${this.url}/api/v1/users/updatePassword`,data);

    }
    public getExpensesForGroup=(groupId)=>
    {
      return this.http.get(`${this.url}/api/v1/expenses/get/group?groupId=${groupId}`)
      .do(data => console.log('Data Received'))
      .catch(this.handleError);
    }

    public setUserInfoInLocalStorage = (data) =>{
      localStorage.setItem('userInfo', JSON.stringify(data))
    }
    
  public signinFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
    return this.http.post(`${this.url}/api/v1/users/login`, params);
  } 
  public logout(data): Observable<any> {

    const params = new HttpParams()
      .set('userId',data)

    return this.http.post(`${this.url}/api/v1/users/logout`, params);

  }
   public signupFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('countryCode', data.countryCode)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password)

    return this.http.post(`${this.url}/api/v1/users/signup`, params);

  }
  public addGroup(data): Observable<any> {
   return this.http.post(`${this.url}/api/v1/groups/add`, data);

  }
  public addExpense(data): Observable<any> {
    return this.http.post(`${this.url}/api/v1/expenses/add`, data);

  }
  public editExpense(data): Observable<any> {
    return this.http.put(`${this.url}/api/v1/expenses/edit`, data);

  }
  public deleteExpense(data): Observable<any> {
    return this.http.put(`${this.url}/api/v1/expenses/delete`, data);

  }
  public inviteUser(data): Observable<any> {

    const params = new HttpParams()
    .set('firstName', data.firstName)
      .set('emailId', data.emailId)
      .set('createdBy', data.createdBy)

    return this.http.post(`${this.url}/api/v1/users/invite`, params);

  }
  public listGroup(userId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/groups/list?userId=${userId}`)
    .do(data => console.log('Data Received'))
    .catch(this.handleError);
  }
  public listFriends(userId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/users/list?userId=${userId}`)
    .do(data => console.log('Data Received'))
    .catch(this.handleError);
  }
  public getFriend(friendId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/users/get?userId=${friendId}`)
    .do(data => console.log('Data Received'))
    .catch(this.handleError);
  }
  public getFriendByObjectId(objectId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/users/get/id?userId=${objectId}`)
    .do(data => console.log('Data Received'))
    .catch(this.handleError);
  }
  public getGroupDetail(groupId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/groups/get?groupId=${groupId}`)
    .do(data => console.log('Data Received'))
    .catch(this.handleError);
  }
  public listExpense(userId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/expenses/list?userId=${userId}`)
    .do(data => console.log('Data Received'))
    .catch(this.handleError);
  }
  public getExpenseDetail(expenseId): Observable<any> {
    return this.http.get(`${this.url}/api/v1/expenses/get?expenseId=${expenseId}`)
    .do(data => console.log('Data Received'))
    .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }

}
